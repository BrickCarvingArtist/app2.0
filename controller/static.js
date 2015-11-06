module.exports = function(router, react, reactDOMServer, Util){
	//api
	router
		.route("/api/getinfo")
		.get(function(req, res, next){
			res.json({
				data : [
					{
						status : 1,
						title : "关于认证支付升级改造的通知",
						summary : "为了保证迁移数据准确性，届时将停止认证支付服务，数据库迁移完毕且验证正常后恢复使用。请各位用户提前做",
						detail : "<p>     为了更好地提供服务，我公司将对认证支付功能进行升级改造，我司计划在下述两个时段进行认证支付系统数据库迁移：<br />2015-07-16（本周四）晚 20:00<br />2015-07-17 （本周五）早 09:00<br />2015-07-17（本周五）晚 20:00<br />2015-07-18 （本周六）早 09:00<br />为了确保迁移数据准确性，届时将停止认证支付服务，数据库迁移完毕且验证正常后恢复使用。请各位用户提前做好相关安排。因本次升级给您带来的不便，敬请谅解！</p>",
						source : "喜蓝理财",
						time : "2015-11-05"
					},
					{
						status : 0,
						title : "什么是喜马拉雅？",
						summary : "为了保证迁移数据准确性，届时将停止认证支付服务，数据库迁移完毕且验证正常后恢复使用。",
						detail : "无内容",
						source : "喜蓝理财",
						time : "2015-11-05"
					},
					{
						status : 0,
						title : "敢买就敢送",
						summary : "为了保证迁移数据准确性，届时将停止认证支付服务，数据库迁移完毕且验证正常后恢复使用。请各位用户提前做",
						detail : "无内容",
						source : "喜蓝理财",
						time : "2015-11-05"
					},
					{
						status : 1,
						title : "什么是喜马拉雅？",
						summary : "为了保证迁移数据准确性，届时将停止认证支付服务，数据库迁移完毕且验证正常后恢复使用。",
						detail : "无内容",
						source : "喜蓝理财",
						time : "2015-11-05"
					}
				]
			});
		});
	//router
	router
		.route("/")
		.get(function(req, res, next){
			res.render("./index", {
				style : ["/css/home.css"],
				script : ["/js/home.js"],
				title : "首页",
				page : "loading..."
			});
		});
	router
		.route("/infocenter")
		.get(function(req, res, next){
			// page = reactDOMServer.renderToString(react.createFactory(Foot)({}));
			res.render("./index", {
				style : ["/css/info.css"],
				script : ["/js/info.js"],
				title : "消息中心",
				page : "loading..."
			});
		});
	return router;
};