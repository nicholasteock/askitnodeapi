var http = require("http"),
	url = require("url");

var port = 8080;

function start(route) {
	function onRequest(request, response) {
		var parsedUrl = url.parse(request.url, true);

		console.log("Request for " + parsedUrl.pathname + " received");

		route(parsedUrl, request, response);
	}

	http.createServer(onRequest).listen(port);
	console.log("Server has started on " + port + ".");
}

exports.start = start;