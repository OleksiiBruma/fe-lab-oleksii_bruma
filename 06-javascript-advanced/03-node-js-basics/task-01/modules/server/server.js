const index = require("./index.js");
const http = require("http");
var fs = require("fs");

function onRequest(request, response) {
    response.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile("./../../static/index.html", null, function (error, data) {
            if (error) {
                response.writeHead(404);
                response.write('File not found!');
            } else {
                response.write(data);
            }
            response.end();
        });
    console.log(index.walkSync("./content"));
}

http.createServer(onRequest).listen(8000);

