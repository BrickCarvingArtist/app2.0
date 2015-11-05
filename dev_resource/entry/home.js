var React = require("react"),
	Util = require("../pack/util"),
	Component = require("../pack/component"),
	Banner = Component.Banner,
	Shortcut = Component.Shortcut;
Util.setRem();
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
				<Shortcut index={0} data={
					[
						{
							href : "/",
							title : "首页"
						},
						{
							href : "/product",
							title : "理财产品"
						},
						{
							href : "/account",
							title : "我的账户"
						},
						{
							href : "/more",
							title : "更多"
						},
					]
				} />
			</body>
		);
	}
});
React.render(
	<Page />,
	document.body
);