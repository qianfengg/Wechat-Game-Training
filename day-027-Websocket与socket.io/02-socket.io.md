# socket.io

> 知识大纲
1. socket.io是基于 TCP socket/Websocket封装的上层的一个框架;
2. 使得人们能方便的使用类似事件的模式来处理网络数据包;
3. creator 搭建socket.io注意:
     1. jsb里面原生实现了SocketIO;
     2. h5使用js的实现socket-io.js; // 下载标准的socket.io.js,然后修改过滤掉原生平台的;
4. socket.io的使用: 注意客户端服务端版本一定要对上            
    1. 系统事件: connect/disconnect,connect_failed, 
    2. 自定义事件:
    3. 关闭 this.sio.disconnect();
    
> 练习   
1. 我们先把**net**和**socket-io**脚本放入scripts文件夹中
2. 引用net，把之前引用的websocket代码注释掉
    ```
    // let websocket = require("websocket.js");
    let net = require("net.js")
    cc.Class({
        extends: cc.Component,
    
        properties: {
    
        },
    
        // LIFE-CYCLE CALLBACKS:
    
        onLoad () {
            // websocket.connect("ws://localhost:6080/ws");
            net.connect("localhost:6081");
        },
    
        start () {
    
        },
    
        // update (dt) {},
    });
    
    ```
3. 点击运行
    
    ![](./images/socket-io模拟器运行.png)   
    
4. 这里的流程逻辑，请大家参考websocket自行总结     
