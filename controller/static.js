module.exports = function(request, router, babel, react, reactDOMServer, Util){
	var babel = babel,
		loading = "<div class=\"loading\"></div>";
	//api
	router
		.route("/api/gethomeproduct")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getproducts", function(err, response, body){
				if(!err && response.statusCode === 200){
					res.json(JSON.parse(body));
				}else{
					next();
				}
			});
		});
	router
		.route("/api/getinfo")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getnews?pageindex=1&pagesize=99&newstype=1", function(err, response, body){
				if(!err && response.statusCode === 200){
					res.json(JSON.parse(body));
				}else{
					next();
				}
			});
		});
	router
		.route("/api/getinfo/:id")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getnews/" + req.params.id, function(err, response, body){
				if(!err && response.statusCode === 200){
					res.json(JSON.parse(body));
				}else{
					next();
				}
			});
		});
	router
		.route("/api/getproduct")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getproducts?pageindex=1&pagesize=99&supertype=&type=&status=", function(err, response, body){
				if(!err && response.statusCode === 200){
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
			request("http://www.xilanlicai.com/api/getproductbuy?pageindex=1&pagesize=99&id=" + req.params.id, function(err, response, body){
				if(!err && response.statusCode === 200){
					res.json(JSON.parse(body));
				}else{
					next();
				}
			});
		});
	router
		.route("/api/getauth")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getuserauth", function(err, response, body){
				if(!err && response.statusCode === 200){
					res.json(JSON.parse(body));
				}else{
					next();
				}
			});
		});
	router
		.route("/api/getinvest")
		.post(function(req, res, next){
			request.post({
				url:"http://account.xilanlicai.com/api/getprodinvested"
			}, function(err, response, body){
				if(!err){
					res.json(JSON.parse(body));
				}else{
					next();
				}
			});
		});
	router
		.route("/api/postbill")
		.post(function(req, res, next){
			console.log(req.body);
			request("http://www.xilanlicai.com/api/getorder", function(err, response, body){
				if(!err && response.statusCode === 200){
					res.redirect("/payment");
				}else{
					next();
				}
			});
		});
	router
		.route("/api/gethelp")
		.get(function(req, res, next){
			res.json({
				data : [
					{
						q : "登陆过程中忘记密码如何找回？",
						a : "\t在登录页直接点击忘记密码，跳转到密码找回页面后，输入手机号与动态验证码后即可重置密码。"
					},
					{
						q : "购买产品时接收不到手机验证码？",
						a : "\t收不到验证码有以下三种情况：一、您的手机出现短信自动屏蔽的情况；二、手机信号导致短信接收延迟，请稍等或点击重新发送；三、短信平台故障，请及时联系我们的在线客服或拨打客服电话400-052-5522。"
					},
					{
						q : "积分是怎样形成的？",
						a : "\ta.投资得积分；b.邀请得积分；c.签到得积分。详情请见<a href=\"/help/score\">积分规则</a>。（可点击）"
					},
					{
						q : "在平台上如何进行实名认证？",
						a : "\t喜蓝理财线上平台现为简化用户操作流程，首次进入喜蓝理财的客户不用单独进行实名认证操作，只需在购买过程中如实填写个人身份证号和手机号及其验证码，即可完成认证环节。"
					},
					{
						q : "购买过程中使用过的银行卡是否可以解绑？",
						a : "\t喜蓝理财现不支持客户将已使用过的银行卡进行解绑，如处于产品期限的回款银行卡发生冻结等事项需更换回款银行卡，请直接拨打客服电话400-052-5522，客服人员将帮助您完成更换。"
					},
					{
						q : "理财红包的获取规则和使用范围？",
						a : "\t新用户注册后将获得10元理财红包，首次投资金额大于等于500元且投资产品不属于新手专享系列的，将再次获赠20元理财红包。在平台完成首次投资的用户，可邀请好友进行注册投资，好友成功投资后， 推荐人将额外获赠20元理财红包。\n\t平台赠送的理财红包在提交订单时可以自主选择使用，所有的理财红包不能用于购买新手专享产品。"
					},
					{
						q : "年化收益计算公式？",
						a : "\t收益=您购买的金额*预期年化收益率/365*理财期限。"
					},
					{
						q : "产品到期后，本金和利息需要多长时间到账？",
						a : "\t产品的本金和利息，一般会于2个工作日内到账（遇法定节假日则顺延）。"
					},
					{
						q : "手机号码、身份证号码需要更换时应该如何操作？",
						a : "\t请您准备好身份证原件和新手机号码后，主动联系喜蓝理财客服400-052-5522，在客服的指引下更换身份证号码和手机号码。"
					},
					{
						q : "如何查询自己的产品购买记录？",
						a : "\t您可以先在首页上进行登录操作，然后进入“我的账户”，即可查看自己的产品购买记录与到期时间。"
					}
				]
			});
		});
	router
		.route("/api/getsuggestion")
		.post(function(req, res, next){
			console.log(req.body.suggestion);
			res.redirect("/");
		});
	//route
	router
		.route("/")
		.get(function(req, res, next){
			request("http://www.xilanlicai.com/api/getproducts", function(err, response, body){
				if(!err && response.statusCode === 200){
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
		.route("/me")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/me.css"],
				script : ["/js/me.js"],
				title : "我的资产",
				page : loading
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