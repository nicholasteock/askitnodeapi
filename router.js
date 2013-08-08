var	queryString = require("querystring"),
	sys 		= require("sys"),
	askitapi 	= require("./askitapi");

function route(parsedUrl, req, res) {
	var pathname = parsedUrl.pathname,
		query = parsedUrl.query;

	var origin = (req.headers.origin || "*");

	if( req.method.toUpperCase() === "OPTIONS" ) {
		res.writeHead(
			"204",
			"No Content",
			{
				"Access-Control-Allow-Origin": origin,
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, Accept",
                "Access-Control-Max-Age": 10, // Seconds.
                "Content-Length": 0
			}
		);

		return( res.end() );
	}
	else {
		switch(pathname) {
			case "/":
				// Explicitly ignore the call for favicon
				displayRoot(req, res);
				break;
			case "/getSubjects":
				askitapi.getSubjects(query, req, res);
				break;
			default:
				display404(pathname, req, res);
				break;
		}
	}
}

function displayRoot(req, res) {
	console.log("In displayRoot");
	res.writeHead(200, {"Content-Type": "text/html"});
	res.write("displayRoot output.");
	res.end();
}

function display404(pathname, req, res) {
	console.log("In display404");
	res.writeHead(404, {"Content-Type": "text/plain"});
	res.write("Display 404 Done");
	res.end();
}


exports.route = route;