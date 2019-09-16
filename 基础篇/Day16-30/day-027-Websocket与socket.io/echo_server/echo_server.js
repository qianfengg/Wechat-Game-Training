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
