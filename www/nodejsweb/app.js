const http = require('http');
const os = require('os');
console.log("服务启动");
var handler = function (request, response) {
	 response.writeHeader(200, {
        'Content-Type': 'text/html;charset=UTF-8'
      })
    response.end("请求的IP:" + request.connection.remoteAddress + " 容器的IP：" + os.hostname() + "\n");
};
var www = http.createServer(handler);
www.listen(3000);
