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
					main : "首页"
				})
			});
		});
	router
		.route("/infocenter")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/infocenter.css"],
				script : ["/js/infocenter.js"],
				title : "消息中心",
				page : Util.getPage({
					react : react,
					reactDOMServer : reactDOMServer,
					req : req,
					main : "消息中心"
				})
			});
		});
	return router;
};