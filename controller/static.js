module.exports = function(router, react, reactDOMServer, Util){
	router
		.route("/")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/home.css"],
				script : ["/js/home.js"],
				title : "首页",
				page : Util.getPage({
					react : react,
					reactDOMServer : reactDOMServer,
					req : req,
					main : ""
				})
			});
		});
	router
		.route("/infocenter")
		.get(function(req, res, next){
			// page = reactDOMServer.renderToString(react.createFactory(Foot)({}));
			res.render("./index", {
				style : ["/css/info.css"],
				script : ["/js/info.js"],
				title : "消息中心",
				page : Util.getPage({
					react : react,
					reactDOMServer : reactDOMServer,
					req : req,
					main : ""
				})
			});
		});
	return router;
};