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
4. 基于node.js来测试下websocket, node.js见到时候服务器的学习;
