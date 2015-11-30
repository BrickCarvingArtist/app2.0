module.exports = function(request, router, md5, cookie, Util){
	router
		.route("/api/getauth")
		.get(function(req, res, next){
			var authCookie = cookie.parse(req.headers.cookie);
			request({
				url : "http://www.xilanlicai.com/api/getuserauth",
				headers : {
					cookie : cookie.serialize("xlauth", authCookie.xlauth)
				}
			}, function(err, response, body){
				if(!err && response.statusCode === 200){
					res.json(JSON.parse(body));
				}else{
					next();
				}
			});
		})
		.post(function(req, res, next){
			var authCookie = cookie.parse(req.headers.cookie);
			request.post({
				url : "http://account.xilanlicai.com/api/getuserauth",
				headers : {
					cookie : cookie.serialize("xlauth", authCookie.xlauth)
				}
			}, function(err, response, body){
				if(!err && response.statusCode === 200){
					res.json(JSON.parse(body));
				}else{
					next();
				}
			});
		});
	router
		.route("/api/signup")
		.post(function(req, res, next){
			request.post({
				url : "http://account.xilanlicai.com/register",
				form : {
					phone : req.body.mobile,
					password : req.body.password,
					invitor : req.body.invitor,
					captcha : req.body.captcha
				}
			}, function(err, response, body){
				if(!err){
					res.json(JSON.parse(body));
				}else{
					next();
				}
			});
		});
	router
		.route("/api/signin")
		.post(function(req, res, next){
			request("http://account.xilanlicai.com/api/login", function(err, response, body){
				if(!err && response.statusCode === 200){
					body = body.replace(/"/g, "");
					request.post({
						url : "http://account.xilanlicai.com/api/login",
						form : {
							phone : req.body.mobile,
							password : md5(md5(md5(req.body.password).toUpperCase()).toUpperCase() + "2xeDFvZHKSt8Eldh" + body).toUpperCase(),
							clientId : 2,
							loginTime : body
						}
					}, function(err, response, body){
						body = JSON.parse(body);
						if(!err && response.statusCode === 200){
							if(body.code === 200){
								var cookies = cookie.parse(body.data);
								for(var i in cookies){
									res.cookie(i, cookies[i], {
										// domain : ".xilanlicai.com",
										maxAge : 600000,
										httpOnly : 1
									});
								}
							}
							res.json(body);
						}else{
							next();
						}
					});
				}else{
					next();
				}
			});
		});
	router
		.route("/api/reset")
		.get(function(req, res, next){
			var authCookie = cookie.parse(req.headers.cookie);
			request({
				url : "http://account.xilanlicai.com/api/resetpwd?phone=" + req.query.mobile,
				headers : {
					cookie : cookie.serialize("xlauth", authCookie.xlauth)
				}
			}, function(err, response, body){
				if(!err && response.statusCode === 200){
					res.json(JSON.parse(body));
				}else{
					next();
				}
			});
		})
		.post(function(req, res, next){
			var authCookie = cookie.parse(req.headers.cookie);
			request.post({
				url : "http://account.xilanlicai.com/api/resetpwd",
				headers : {
					cookie : cookie.serialize("xlauth", authCookie.xlauth)
				},
				form : {
					code : req.body.captcha,
					password : req.body.password,
					confirmPassword : req.body.rePassword,
					phone : req.body.mobile
				}
			}, function(err, response, body){
				if(!err && response.statusCode === 200){
					res.json(JSON.parse(body));
				}else{
					next();
				}
			});
		});
	return router;
};