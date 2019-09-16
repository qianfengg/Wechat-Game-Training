var websocket = {
    sock: null,  // 连接的socket 对象 WebSocket, h5标准对象;

    // 网络连接成功了以后调用
    on_open: function(event) {
        // test
        this.send_data("HelloWorld");
        // end
    },

    // 客户端收到数据的时候
    on_message: function(event) {
        console.log("#####", event.data);
    },

    // 客户端收到socket 关闭的时间的时候调用;
    on_close: function (event) {
        this.close();
    },

    on_error: function (event) {
        this.close();
    }, 

    close: function() {
        if (this.sock != null) {
            this.sock.close(); // 关闭socket
            this.sock = null;
        }
    },

    // 连接函数, 
    connect: function(url) {
        this.sock = new WebSocket(url); // h5标准的websocket对象
        this.sock.binaryType = "arraybuffer"; // 配置接受二进制的数据类型,与服务器保持一次, "Blob"

        // 为这个websocket对象制定对应的回掉函数;
        this.sock.onopen = this.on_open.bind(this);
        this.sock.onmessage = this.on_message.bind(this);
        this.sock.onclose = this.on_close.bind(this);
        this.sock.onerror = this.on_error.bind(this);
    },

    // 发送数据, sock.send;
    send_data: function(data) {
        this.sock.send(data);
    },
};


module.exports = websocket;


