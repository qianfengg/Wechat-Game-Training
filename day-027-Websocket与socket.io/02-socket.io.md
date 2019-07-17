# socket.io

> 知识大纲
1. socket.io是基于 TCP socket/Websocket封装的上层的一个框架;
2. 使得人们能方便的使用类似事件的模式来处理网络数据包;
3. creator 搭建socket.io注意:
     1. jsb里面原生实现了SocketIO;
     2. h5使用js的实现socket-io.js; // 下载标准的socket.io.js,然后修改过滤掉原生平台的;
4. socket.io的使用: 注意版本一定要对上,使用课堂提供的版本匹配
    1.  使用上大致是这样的
        ```
        var opts = {
                        'reconnection':false,
                        'force new connection': true,
                        'transports':['websocket', 'polling']
                    }
        this.sio = window.io.connect(this.ip,opts);
        ```
            
    2. 系统事件: connect/disconnect,connect_failed, 
    3. 自定义事件:
    4. 关闭 this.sio.disconnect();
