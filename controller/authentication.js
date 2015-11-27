module.exports = function(request, router, md5, Util){
	//authentication
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
		.route("/api/signup")
		.post(function(req, res, next){
			request.post({
				url : "http://"
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
								res.redirect("/me");
							}else{
								res.json(body);
							}
						}else{
							next();
						}
					});
				}else{
					next();
				}
			});
		});
	return router;
};