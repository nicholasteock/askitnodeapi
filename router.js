var	queryString = require("querystring"),
	mysql 		= require("mysql"),
	sys 		= require("sys");

function route(parsedUrl, request, response) {
	var pathname = parsedUrl.pathname,
		query = parsedUrl.query;

	var origin = (request.headers.origin || "*");

	if( request.method.toUpperCase() === "OPTIONS" ) {
		response.writeHead(
			"204",
			"No Content",
			{
				"access-control-allow-origin": origin,
                "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
                "access-control-allow-headers": "content-type, accept",
                "access-control-max-age": 10, // Seconds.
                "content-length": 0
			}
		);

		return( response.end() );
	}
	else {
		switch(pathname) {
			case "/":
				// Explicitly ignore the call for favicon
				displayRoot(request, response);
				break;
			case "/getSubjects":
				getSubjects(query, request, response);
				break;
			default:
				display404(pathname, request, response);
				break;
		}
	}
}

function displayRoot(request, response) {
	console.log("In displayRoot");
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("<b>NICK</b>nickkkkk");
	response.end();
}

function getSubjects(query, request, response) {
	console.log("In getSubjects");

	var connection = mysql.createConnection({
		host 	: "askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com",
		user 	: "nicholasteo",
		password: "nicholasteo",
		database: "askitdb",
	});

	var origin = (request.headers.origin || "*");

	connection.query("SELECT DISTINCT subject FROM topics WHERE level='Secondary 1'", function(err, rows, fields) {
		if (err) throw err;

		response.writeHead(200, {"access-control-allow-origin": origin, "Content-Type": "application/json"});
		response.end(JSON.stringify(rows));
	});
}

function display404(pathname, request, response) {
	console.log("In display404");
	response.writeHead(404, {"Content-Type": "text/plain"});
	response.write("Display 404 Done");
	response.end();
}


exports.route = route;