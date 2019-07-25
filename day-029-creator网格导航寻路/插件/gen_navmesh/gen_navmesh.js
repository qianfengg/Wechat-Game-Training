const Fs = require('fire-fs');

var item_size = 32;
var gen_tools = {
	
	find_map: function(root) {
		if (root.active === false) {
			return null;
		}

		if(root.group === "NAV_MAP") {
			return root;
		}

		for(var i = 0; i < root.children.length; i ++) {
			var node = this.find_map(root.children[i]);
			if (node) {
				return node;
			}
		}

		return null;
	},

	gen_one_obstacle: function(map_root, item, map) {
		if (item.width <= 0 || item.height <= 0) {
			return;
		}

		var w_pos = item.convertToWorldSpaceAR(cc.v2(0, 0));
		var m_pos = map_root.convertToNodeSpaceAR(w_pos);

		var left = m_pos.x - item.width * 0.5;
		var right = m_pos.x + item.width * 0.5;
		var top = m_pos.y + item.height * 0.5;
		var bottom = m_pos.y - item.height * 0.5;

		var left_index = Math.floor(left / item_size);
		var bottom_index = Math.floor(bottom / item_size);
		var right_index = Math.floor((right + item_size - 1) / item_size);
		var top_index = Math.floor((top + item_size - 1) / item_size);

		for(var i = bottom_index; i < top_index; i ++) {
			for(var j = left_index; j < right_index; j ++) {
				map.data[i * map.width + j] = 1;
			}
		}
	},

	gen_obstacle_data: function(map_root, root, map) {
		if(root.group !== "MAP_OBSTACLE") {
			return;
		}

		this.gen_one_obstacle(map_root, root, map);

		for(var i = 0; i < root.children.length; i ++) {
			this.gen_obstacle_data(map_root, root.children[i], map);
		}
	},

	gen_map_data: function(map_root) {
		var map_width = Math.floor((map_root.width + item_size - 1) / item_size);
		var map_height = Math.floor((map_root.height + item_size - 1) / item_size);

		var map_data = [];
		for(var i = 0; i < map_height; i ++) {
			for(var j = 0; j < map_width; j ++) {
				map_data.push(0);
			}
		}
		
		var map = {};
		map.name = map_root.name;
		map.data = map_data;
		map.width = map_width;
		map.height = map_height;
		map.item_size = item_size;

		for(var i = 0; i < map_root.children.length; i ++) {
			this.gen_obstacle_data(map_root, map_root.children[i], map);
		}
		return map;
	},

    'gen_nevmesh': function (event) {
        /*;
        Editor.log('children length : ' + canvas.children.length);
        var pos = canvas.convertToWorldSpaceAR(cc.v2(0, 0));
        Editor.log(pos);
		*/
		var canvas = cc.find('Canvas')

        var map = gen_tools.find_map(canvas);

        var game_map = null;
        if(map) {
        	game_map = gen_tools.gen_map_data(map);
        }

        if (event.reply) {
            event.reply("OK", game_map);
        }
    },
};

module.exports = gen_tools;