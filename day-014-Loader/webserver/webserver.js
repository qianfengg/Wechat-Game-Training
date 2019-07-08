var express = require("express");
var app = express();
var path = require("path");

//设置跨域访问
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

app.use(express.static(path.join(process.cwd(), "www_root")));
// http://127.0.0.1:6080/
// http://127.0.0.1:6080/baidu.htm
// http://127.0.0.1:6080/index.html
app.listen(6080);

// 我们的客服端配置一个服务器抽奖的响应地址
// request: 客户端发来的请求对象,
// respones: 服务器回复给客户端的对象
app.get("/lucky", function (request, respones) {
	console.log(request.query);

	// 在服务器上，根据概率进行抽奖
	// [1, 7]
	var ret = 1 + Math.random() * 7; // [1, 8)
	ret = Math.floor(ret);
	console.log("give ", request.query.uname, " result = ", ret);
	respones.send("" + ret);
});