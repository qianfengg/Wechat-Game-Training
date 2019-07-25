var nav_agent = require("nav_agent");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
        think_f_time: 0.25,

        search_R: 150, // 发现玩家追击上去
        attack_R: 30, // 攻击玩家。 

        player_agent: {
            type: nav_agent,
            default: null,
        }
    },

    // use this for initialization
    onLoad: function () {
        this.think_time = 0.0; 
        this.agent = this.getComponent("nav_agent");
    },

    _do_think_AI: function() {
        var target_pos = this.player_agent.node.getPosition();
        var now_pos = this.node.getPosition();

        var dir = target_pos.sub(now_pos);
        var len = dir.mag();
        if(len > this.search_R) { // 停止下来
            this.agent.stop_nav();
            return;
        }

        if(len < this.attack_R) {
            this.agent.stop_nav();
            return;
        }

        target_pos = this.player_agent.node.convertToWorldSpaceAR(cc.v2(0, 0));
        this.agent.nav_to_map(target_pos);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.think_time += dt;
        if(this.think_time >= this.think_f_time) { // 决策来做思考
            this.think_time = 0.0;
            this._do_think_AI();
        }
    },
});
