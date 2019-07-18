if(window.io == null){ // h5
    window.io = require("socket-io");
}


var net = {
    sio: null,
        
    connect:function(url) {
        var self = this;
        
        var opts = {
            'reconnection':true,
            'force new connection': true,
            'transports':['websocket', 'polling']
        }

        this.sio = window.io.connect(url, opts);

        // 监听地城的系统事件
        this.sio.on('reconnect',function(){
            console.log('reconnection');
        });

        // 连接成功
        this.sio.on('connect',function(data){
            self.sio.connected = true;

            console.log("%%%%%%%%%%%%% connect");
            // 事件 + 数据名字
            self.send("your_echo", "HelloWorld");
        });
        

        // 断开连接
        this.sio.on('disconnect',function(data){
            console.log("MMMMMdisconnect");
            self.sio.connected = false;
            // self.close();
        });
        
        // 连接失败
        this.sio.on('connect_failed',function (){
            console.log('connect_failed');
        });
        
        
        // 自己定义,如果你向要收那种事件的数据，你就监听这个事件
        this.sio.on('your_echo',function(data){
            console.log("your_echo", data);
        });
    },
    

    // 发送数据: 事件+数据的模型;
    send:function(event,data){
        if(this.sio.connected){
            this.sio.emit(event,data);  // 触发一个网络事件，名字 + 数据body ---> 服务器;              
        }
    },

    // 关闭socket
    close:function(){
        if(this.sio && this.sio.connected){
            this.sio.connected = false;
            this.sio.disconnect(); // API
            this.sio = null;
        }
    },
};

module.exports = net;
