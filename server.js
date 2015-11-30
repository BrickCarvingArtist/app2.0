var express = require("express"),
	path = require("path"),
	bodyParser = require("body-parser"),
	compression = require("compression"),
	babel = require("babel-core/register"),
	react = require("react"),
	reactDOMServer = require("react-dom/server"),
	port = process.env.PORT || 8080,
	app = express(),
	request = require("request"),
	md5 = require("md5"),
	cookie = require("cookie"),
	router = express.Router(),
	Util = require("./dev_resource/pack/util");
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
app.use(require("./controller/authentication")(request, router, md5, cookie, Util));
app.use(require("./controller/api")(request, router));
app.use(require("./controller/static")(request, router, babel, react, reactDOMServer, Util));
app.listen(port);
console.log("server started on port " + port);