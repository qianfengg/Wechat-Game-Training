# websocket

> 知识大纲
1. creator只支持websocket, h5的标准也只支持websocket;
2. websocket 底层是 tcp socket, 基于tcp socket上建立了连接，收发数据的标准，
    保证了用户收到的数据和发到的数据是一致的，不用考虑粘包等问题,websocket协议已经解决了;
3. websocket的使用方式:
     1. new WebSocket(url); 服务器对应的url: “ws://127.0.0.1:6081/ws”, ip + port
     2. 支持的数据: 文本数据类型与二进制数据类型;
        * sock.binaryType = "arraybuffer"/"Blob";   
        * 支持arraybuffer和Blob类型,一般配置成arraybuffer,根据服务器而定;
     3. 配置好websocket的回调函数: 
        * onopen(event) 
        * onmessage(event)
        * onclose(event) 
        * onerror(event)
     4. 不用了关闭socket或收到服务器关闭遇到错误: close方法;
4. 基于node.js来测试下websocket, node.js在之后服务器的学习会说到;

> 练习
1. 首先我们有个后端小项目**echo_server**,具体就是用户发什么这个就会回什么，我们用node启动下
    * 可以简单看下echo_server.js
        ```
        var ws = require("ws");
        var server = new ws.Server({
            // host: ip, // 如果加了host，外部链接不上
            port: 6080,
        });
        
        console.log("#######");
        function on_server_client_comming(session) {
            session.on("close", function() {
            });
        
            // error事件
            session.on("error", function(err) {
            });
            // end 
        
            session.on("message", function(data) {
                console.log("######", data);
        
                session.send(data);
            });
        }
        server.on("connection", on_server_client_comming);
        
        
        var socket_io = require('socket.io')
        var sio = socket_io(6081);
        
        sio.sockets.on('connection',function(socket){
            console.log("connect called");
        
            // 自定义事件
            socket.on("your_echo", function (data) {
                console.log("your_echo", data);
        
                socket.emit("your_echo", data);
            });
            // end 
        
            // 系统事件
            socket.on('disconnect',function(data){
                console.log("disconnect");		
            });
        
        
        });

        ```
2. creator新建个项目，然后新建**game_scene.js**挂在Canvas下
3. 把提前写好的脚本**websocket**放到scripts目录下
4. 编写代码
    1. 引用websocket.js
    2. 在onLoad里编写代码
    3. 完整代码如下
        ```
        let websocket = require("websocket.js");
        cc.Class({
            extends: cc.Component,
        
            properties: {
        
            },
        
            // LIFE-CYCLE CALLBACKS:
        
            onLoad () {
                websocket.connect("ws://localhost:6080/ws");
            },
        
            start () {
        
            },
        
            // update (dt) {},
        });

        ```
    4. 模拟器运行结果
        
        ![](./images/websocket模拟器运行.jpg)
        
    5. 分析下这个流程是什么样子的   
        1. 首先我们creator客户端，引用了**websocket.js**这个脚本，该脚本下有这么个方法
            ```
            // 网络连接成功了以后调用
            on_open: function(event) {
                // test
                this.send_data("HelloWorld");
                // end
            },
            ```    
        2. 所以我们在建立连接后向服务端发送了Hello World
        3. 在看我们后端**echo_server.js**，有这么几行代码,意思是接受到消息我们在回发这个消息
            ```
        	session.on("message", function(data) {
        		console.log("######", data);
        
        		session.send(data);
        	});
            ```
        4. 然后在回到我们的**websocket.js**，依然有个onmessage的方法
            ```
            // 客户端收到数据的时候
            on_message: function(event) {
                console.log("#####", event.data);
            },
            ```
        5. 所以最后在我们控制台呈现了Hello World    
