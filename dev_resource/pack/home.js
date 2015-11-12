var React = require("react"),
	Util = require("../pack/util"),
	Component = require("../pack/component"),
	Banner = Component.Banner,
	Menu = Component.Menu;
var Page  = React.createClass({
	render : function(){
		return (
			<body>
				<Banner data={
					[
						{
							href : "/activity/1",
							imgSrc : "/images/banner/1.png"
						},
						{
							href : "/activity/2",
							imgSrc : "/images/banner/2.png"
						},
						{
							href : "/activity/3",
							imgSrc : "/images/banner/3.png"
						},
						{
							href : "/activity/4",
							imgSrc : "/images/banner/4.png"
						},
						{
							href : "/activity/5",
							imgSrc : "/images/banner/5.png"
						}
					]
				} />
				<Menu type={2} option={
					[
						{
							href : "/bonus",
							text : "推荐送红包"
						},
						{
							href : "/activity",
							text : "活动中心"
						},
						{
							href : "/sign",
							text : "马上签到"
						}
					]
				} />
				<Menu type={1} option={
					[
						{
							href : "/",
							text : "首页"
						},
						{
							href : "/product",
							text : "理财产品"
						},
						{
							href : "/account",
							text : "我的账户"
						},
						{
							href : "/more",
							text : "更多"
						}
					]
				} currentIndex={0} />
			</body>
		);
	}
});
module.exports = {
	main : Page,
	init : function(){
		Util.setRem();
		React.render(
			<Page />,
			document.body
		);
	}
};