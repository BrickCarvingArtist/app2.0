var React = require("react"),
	Util = require("../pack/util"),
	Component = require("../pack/component"),
	Menu = Component.Menu;
var List = React.createClass({
	componentDidMount : function(){
		this.getDOMNode().onclick = function(){
			$.ajax({
				url : this.props.data.value,
				success : function(data){

				}
			});
		}.bind(this);
	},
	render : function(){
		return (
			<h1>
				{this.props.data.name}
			</h1>
		);
	}
});
var Page = React.createClass({
	getDefaultProps : function(){
		return {
			setting : [
				{
					name : "关于喜蓝理财",
					value : ""
				},
				{
					name : "常见问题",
					value : ""
				},
				{
					name : "意见反馈",
					value : "",
				},
				{
					name : "联系客服",
					value : ""
				}
			]
		};
	},
	render : function(){
		var lists = [],
			setting = this.props.setting;
		setting.forEach(function(list){
			lists.push(
				<List data={list} />
			);
		});
		return (
			<body>
				{lists}
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
				} currentIndex={3} />
			</body>
		);
	}
});
var init = function(){
	Util.PageData.setData(null, function(){
		document.title = "更多";
		document.body.style.backgroundColor = "rgb(244, 244, 244)";
		React.render(
			<Page />,
			document.body
		);
	}).render(init);
};
module.exports = {
	main : Page,
	init : init
};