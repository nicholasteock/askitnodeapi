var mysql = require("mysql");

function execSql(query) {
	var connection = mysql.createConnection({
		host 	: "askitdb.cvumcgqvkpk0.us-west-2.rds.amazonaws.com",
		user 	: "nicholasteo",
		password: "nicholasteo",
		database: "askitdb",
	});

	connection.query(query, function(err, rows, fields) {
		connection.end();
		if(err) throw err;
		return JSON.stringify(rows);
	});
}

function getSubjects(query, req, res) {
	console.log("In getSubjects");
	var origin 	= (req.headers.origin || "*"),
		query 	= "SELECT DISTINCT subject FROM topics WHERE level='Secondary 1'",
		result 	= execSql(query);

	res.writeHead(200, {"Access-Control-Allow-Origin": origin, "Content-Type": "application/json"});
	res.end(result);
}

// function getSubjects(query, req, res) {
// 	var connection 	= connectDb(),
// 		origin 		= (req.headers.origin || "*");

// 	connection.query("SELECT DISTINCT subject FROM topics WHERE level='Secondary 1'", function(err, rows, fields) {
// 		if (err) throw err;
// 		connection.end();
// 		res.writeHead(200, { "access-control-allow-origin": origin, "Content-Type": "application/json" });
// 		res.end(JSON.stringify(rows));
// 	});
// }

function getTopics(query, req, res) {
}

exports.getSubjects = getSubjects;
// exports.getTopics 	= getTopics;