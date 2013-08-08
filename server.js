var http = require("http"),
	url = require("url");

var port = 8080;

function start(route) {
	function onRequest(req, res) {
		var parsedUrl = url.parse(req.url, true);

		console.log("req for " + parsedUrl.pathname + " received");

		route(parsedUrl, req, res);
	}

	http.createServer(onRequest).listen(port);
	console.log("Server has started on " + port + ".");
}

exports.start = start;