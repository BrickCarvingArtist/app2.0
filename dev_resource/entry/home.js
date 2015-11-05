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
							href : "/",
							imgSrc : "/images/banner/1.png"
						},
						{
							href : "/",
							imgSrc : "/images/banner/2.png"
						},
						{
							href : "/",
							imgSrc : "/images/banner/3.png"
						},
						{
							href : "/",
							imgSrc : "/images/banner/4.png"
						},
						{
							href : "/",
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