module.exports = function(request, router, babel, react, reactDOMServer, Util){
	var babel = babel,
		loading = "<div class=\"loading\"></div>";
	//api
	router
		.route("/api/getinfo")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getnews?pageindex=1&pagesize=99&newstype=1", function(err, request, body){
				if(!err && request.statusCode === 200){
					res.json(JSON.parse(body));
				}
			});
		});
	router
		.route("/api/getinfo/:id")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getnews/" + req.params.id, function(err, request, body){
				res.json(JSON.parse(body));
			});
		});
	router
		.route("/api/getproduct")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getproducts/56", function(err, response, body){
				var data = JSON.parse(body).data;
				res.json({
					data : [
						{
							title : data.product.name,
							scale : data.product.lumpSum,
							rate : data.product.primeRate,
							term : data.product.days,
							beginTime : data.product.beginTime,
							stopBuyTime : data.product.stopBuyTime
						},
						{
							title : "周一见12号",
							scale : 200000,
							rate : 0.095,
							term : 30,
							beginTime : data.product.beginTime,
							stopBuyTime : data.product.stopBuyTime
						}
					]
				});
			});
		});
	//route
	router
		.route("/")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/home.css"],
				script : ["/js/home.js"],
				title : "首页",
				page : reactDOMServer.renderToString(react.createFactory(require("../dev_resource/pack/home").main)({}))
			});
		});
	router
		.route("/product")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/product.css"],
				script : ["/js/product.js"],
				title : "理财产品",
				page : loading
			});
		});
	router
		.route("/infocenter")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getnews?pageindex=1&pagesize=99&newstype=1", function(err, request, body){
				if(!err && request.statusCode === 200){
					res.render("./index", {
						style : ["/css/info.css"],
						script : ["/js/info.js"],
						title : "消息中心",
						page : reactDOMServer.renderToString(react.createFactory(require("../dev_resource/pack/info").main)({
							data : JSON.parse(body).data
						}))
					});
				}
			});
		});
	router
		.route("*")
		.get(function(req, res, next){
			res.end();
		});
	return router;
};