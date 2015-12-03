module.exports = function(request, router, babel, react, reactDOMServer, Util){
	var babel = babel,
		loading = "<div class=\"loading\"></div>";
	router
		.route("/signin")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/authentication.css"],
				script : ["/js/signin.js"],
				title : "登录",
				page : loading
			});
		});
	router
		.route("/signup")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/authentication.css"],
				script : ["/js/signup.js"],
				title : "注册",
				page : loading
			});
		});
	router
		.route("/reset")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/authentication.css"],
				script : ["/js/reset.js"],
				title : "修改密码",
				page : loading
			});
		});
	router
		.route("/")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getproducts", function(err, response, body){
				if(!err && response.statusCode === 200){
					res.render("./index", {
						style : ["/css/home.css"],
						script : ["/js/home.js"],
						title : "首页",
						page : loading/*reactDOMServer.renderToString(react.createFactory(require("../dev_resource/pack/home").main)({
							data : JSON.parse(body)
						}))*/
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
		.route("/me")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/me.css"],
				script : ["/js/me.js"],
				title : "我的账户",
				page : loading
			});
		});
	router
		.route("/asset")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/asset.css"],
				script : ["/js/asset.js"],
				title : "我的资产",
				page : loading
			});
		});
	router
		.route("/basic")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/basic.css"],
				script : ["/js/basic.js"],
				title : "个人信息",
				page : loading
			});
		});
	router
		.route("/record")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/record.css"],
				script : ["/js/record.js"],
				title : "交易记录",
				page : loading
			});
		});
	router
		.route("/score")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/score.css"],
				script : ["/js/score.js"],
				title : "我的积分",
				page : loading
			});
		});
	router
		.route("/bonus")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/bonus.css"],
				script : ["/js/bonus.js"],
				title : "我的红包",
				page : loading
			});
		});
	router
		.route("/interest")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/bonus.css"],
				script : ["/js/interest.js"],
				title : "我的加息券",
				page : loading
			});
		});
	router
		.route("/invite")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/invite.css"],
				script : ["/js/invite.js"],
				title : "我的邀请",
				page : loading
			});
		});
	router
		.route("/infocenter")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getnews?pageindex=1&pagesize=99&newstype=1", function(err, response, body){
				if(!err && response.statusCode === 200){
					res.render("./index", {
						style : ["/css/info.css"],
						script : ["/js/info.js"],
						title : "消息中心",
						page : loading/*reactDOMServer.renderToString(react.createFactory(require("../dev_resource/pack/info").main)({
							data : JSON.parse(body).data
						}))*/
					});
				}else{
					next();
				}
			});
		});
	router
		.route("/more")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/more.css"],
				script : ["/js/more.js"],
				title : "更多",
				page : loading
			});
		});
	router
		.route("/activity")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/activity.css"],
				script : ["/js/activity.js"],
				title : "活动中心",
				page : loading
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