module.exports = function(request, router, cookie){
	function isAuth(res, statusCode, body){
		res.json(statusCode === 200 ? (function(){
			var _body = JSON.parse(body);
			_body.code = _body.code || statusCode;
			return _body;
		})() : {
			code : statusCode,
			message : "您已长时间未进行操作，需要重新登录"
		});
	}
	function isConnect(res, err, next){
		if(err.code === "ENOTFOUND"){
			res.json({
				code : 405,
				message : "请求数据失败，请检查您的网络设置。"
			});
		}else{
			next();
		}
	}
	router
		.route("/api/getinvest")
		.post(function(req, res, next){
			var authCookie = cookie.parse(req.headers.cookie);
			request.post({
				url : "http://account.xilanlicai.com/api/getprodinvested",
				headers : {
					cookie : cookie.serialize("xlauth", authCookie.xlauth)
				}
			}, function(err, response, body){
				if(!err){
					isAuth(res, response.statusCode, body);
				}else{
					isConnect(res, err, next);
				}
			});
		});
	router
		.route("/api/getinvest/:status")
		.get(function(req, res, next){
			var authCookie = cookie.parse(req.headers.cookie);
			request.get({
				url : "http://account.xilanlicai.com/api/getprodinvested?pageindex=1&pagesize=99&status=" + req.params.status,
				headers : {
					cookie : cookie.serialize("xlauth", authCookie.xlauth)
				}
			}, function(err, response, body){
				if(!err){
					isAuth(res, response.statusCode, body);
				}else{
					isConnect(res, err, next);
				}
			});
		});
	router
		.route("/api/getbonus/:status")
		.get(function(req, res, next){
			var authCookie = cookie.parse(req.headers.cookie);
			request({
				url : "http://account.xilanlicai.com/api/getvouchers?pageindex=1&pagesize=99&status=" + req.params.status,
				headers : {
					cookie : cookie.serialize("xlauth", authCookie.xlauth)
				}
			}, function(err, response, body){
				if(!err){
					isAuth(res, response.statusCode, body);
				}else{
					isConnect(res, err, next);
				}
			});
		});
	router
		.route("/api/getinterest/:status")
		.get(function(req, res, next){
			var authCookie = cookie.parse(req.headers.cookie);
			request({
				url : "http://account.xilanlicai.com/api/getinterests?pageindex=1&pagesize=99&status=" + req.params.status,
				headers : {
					cookie : cookie.serialize("xlauth", authCookie.xlauth)
				}
			}, function(err, response, body){
				if(!err){
					isAuth(res, response.statusCode, body);
				}else{
					isConnect(res, err, next);
				}
			});
		});
	router
		.route("/api/getinvite/:status")
		.get(function(req, res, next){
			var authCookie = cookie.parse(req.headers.cookie);
			request({
				url : "http://account.xilanlicai.com/api/getinvite?pageindex=1&pagesize=2"/* + req.params.status*/,
				headers : {
					cookie : cookie.serialize("xlauth", authCookie.xlauth)
				}
			}, function(err, response, body){
				if(!err){
					isAuth(res, response.statusCode, body);
				}else{
					isConnect(res, err, next);
				}
			});
		});
	router
		.route("/api/getuserbank")
		.get(function(req, res, next){
			var authCookie = cookie.parse(req.headers.cookie);
			request({
				url:"http://account.xilanlicai.com/api/getuserbank?pageindex=1&pagesize=99",
				headers : {
					cookie : cookie.serialize("xlauth", authCookie.xlauth)
				}
			}, function(err, response, body){
				if(!err){
					isAuth(res, response.statusCode, body);
				}else{
					isConnect(res, err, next);
				}
			});
		});
	router
		.route("/api/sign")
		.post(function(req, res, next){
			var authCookie = cookie.parse(req.headers.cookie);
			request.post({
				url : "http://account.xilanlicai.com/api/sign",
				headers : {
					cookie : cookie.serialize("xlauth", authCookie.xlauth)
				}
			}, function(err, response, body){
				if(!err){
					isAuth(res, response.statusCode, body);
				}else{
					isConnect(res, err, next);
				}
			});
		});
	router
		.route("/api/getscore")
		.get(function(req, res, next){
			var authCookie = cookie.parse(req.headers.cookie);
			request({
				url : "http://account.xilanlicai.com/api/getpoints?pageindex=1&pagesize=99",
				headers : {
					cookie : cookie.serialize("xlauth", authCookie.xlauth)
				}
			}, function(err, response, body){
				if(!err){
					isAuth(res, response.statusCode, body);
				}else{
					isConnect(res, err, next);
				}
			});
		});
	return router;
};