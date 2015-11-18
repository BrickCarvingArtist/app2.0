module.exports = function(request, router, babel, react, reactDOMServer, Util){
	var babel = babel,
		loading = "<div class=\"loading\"></div>";
	//api
	router
		.route("/api/gethomeproduct")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getproducts", function(err, request, body){
				if(!err && request.statusCode === 200){
					res.json(JSON.parse(body));
				}else{
					next();
				}
			});
		});
	router
		.route("/api/getinfo")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getnews?pageindex=1&pagesize=99&newstype=1", function(err, request, body){
				if(!err && request.statusCode === 200){
					res.json(JSON.parse(body));
				}else{
					next();
				}
			});
		});
	router
		.route("/api/getinfo/:id")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getnews/" + req.params.id, function(err, request, body){
				if(!err && request.statusCode === 200){
					res.json(JSON.parse(body));
				}else{
					next();
				}
			});
		});
	router
		.route("/api/getproduct")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getproducts?pageindex=1&pagesize=99&supertype=&type=&status=", function(err, request, body){
				if(!err && request.statusCode === 200){
					res.json(JSON.parse(body));
				}else{
					next();
				}
			});
		});
	router
		.route("/api/getproduct/:id")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getproducts/" + req.params.id, function(err, request, body){
				if(!err && request.statusCode === 200){
					res.json(JSON.parse(body));
				}else{
					next();
				}
			});
		});
	router
		.route("/api/getbidder/:id")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getproductbuy?pageindex=1&pagesize=99&id=" + req.params.id, function(err, request, body){
				if(!err && request.statusCode === 200){
					res.json(JSON.parse(body));
				}else{
					next();
				}
			});
		});
	router
		.route("/api/postbill")
		.post(function(req, res, next){
			console.log(req.body)
			request("http://www.xilanlicai.com/api/getorder", function(err, request, body){
				if(!err && request.statusCode === 200){
					res.redirect("/payment");
				}else{
					next();
				}
			});
		});
	//route
	router
		.route("/")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getproducts", function(err, request, body){
				if(!err && request.statusCode === 200){
					res.render("./index", {
						style : ["/css/home.css"],
						script : ["/js/home.js"],
						title : "首页",
						page : reactDOMServer.renderToString(react.createFactory(require("../dev_resource/pack/home").main)({
							data : JSON.parse(body)
						}))
					});
				}else{
					next();
				}
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
				}else{
					next();
				}
			});
		});
	router
		.route("*")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/base.css"],
				script : [],
				title : "迷路了",
				page : loading
			});
		});
	return router;
};