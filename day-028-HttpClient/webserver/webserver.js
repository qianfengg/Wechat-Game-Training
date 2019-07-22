var express = require("express");
var path = require("path");
var app = express();
var fs = require("fs");

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.use(express.static(path.join(process.cwd(), "www_root")));
app.listen(6080);

app.get("/get", function (request, respones) {
	console.log(request.query);
	respones.send("HelloWorld!!!!");
});

app.post("/upload", function (request, respones) {
	request.now_len = 0;
	
	var file_name = "./upload/" + request.query.name;	

	var fd = fs.openSync(file_name, "w");

	request.on("data", function(data) {
		request.now_len += data.length;
		fs.write(fd, data, 0, data.length);
	});

	request.on("end", function() {
		console.log("upload file " + request.query.name + " SUCCESS");
		fs.close(fd);

		respones.send("OK");
	});
});

app.get("/download", function(request, respones) {
	var file_name = "./upload/" + request.query.name;

	fs.readFile(file_name, function(err, data) {
		if (err) {
			respones.send("file_err !");
			return;
		}
		respones.send(data);
	});
});