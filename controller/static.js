module.exports = function(request, router, babel, react, reactDOMServer, Util){
	babel = babel;
	//api
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
				page : "<div class=\"loading\"></div>"
			});
		});
	router
		.route("/product")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/product.css"],
				script : ["/js/product.js"],
				title : "理财产品",
				page : "<div class=\"loading\"></div>"
			});
		});
	router
		.route("/infocenter")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/info.css"],
				script : ["/js/info.js"],
				title : "消息中心",
				page : "<div class=\"loading\"></div>"
			});
		});
	router
		.route("*")
		.get(function(req, res, next){
			res.end();
		});
	return router;
};