var express = require("express"),
	path = require("path"),
	bodyParser = require("body-parser"),
	compression = require("compression"),
	port = process.env.PORT || 8080,
	app = express(),
	router = express.Router();
app.set("views", "./view");
app.set("view engine", "jade");
app.use(compression(9));
app.use(bodyParser.urlencoded({
	extended : 1
}));
app.use(express.static(path.join(__dirname, "./resource"), {
	index : 0,
	maxAge : 600000
}));
app.use(function(req, res, next){
	next();
});
app.use(require("./controller/static")(router));
app.listen(port);
console.log("server started on port " + port);