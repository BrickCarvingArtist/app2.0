module.exports = function(request, router, cookie){
	router
		.route("/api/postbill")
		.post(function(req, res, next){
			var authCookie = cookie.parse(req.headers.cookie);
			console.log(req.body);
			request.post({
				url : "http://www.xilanlicai.com/api/checkorder",
				form : {}
			}, function(err, response, body){
				if(!err && response.statusCode === 200){
					res.redirect("/payment");
				}else{
					next();
				}
			});
		});
	return router;
};