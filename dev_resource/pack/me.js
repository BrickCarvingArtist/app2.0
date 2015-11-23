var React = require("react"),
	Util = require("../pack/util");
var Info = React.createClass({
	render : function(){
		return (
			<div className="info"></div>
		);
	}
});
var Option = React.createClass({
	componentDidMount : function(){
		this.getDOMNode().onclick = function(){
			React.render(
				React.createElement(this.props.data.value, null),
				document.body
			);
		}.bind(this);
	},
	render : function(){
		return (
			<div className="option">
				<i></i>
				<span>
					{this.props.name}
				</span>
			</div>
		)
	}
});
var Entrance = React.createClass({
	getDefaultProps : function(){
		return {
			setting : [
				{
					name : "个人信息",
					value : ""
				},
				{
					name : "交易记录",
					value : ""
				},
				{
					name : "我的积分",
					value : ""
				},
				{
					name : "我的红包",
					value : ""
				},
				{
					name : "我的加息",
					value : ""
				},
				{
					name : "我的邀请",
					value : ""
				},
				{
					name : "安全中心",
					value : ""
				},
				{
					name : "消息中心",
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
				<Option data={list} />
			);
		});
		return (
			<div className="entrance">
				{lists}
			</div>
		);
	}
});
var Page = React.createClass({
	render : function(){
		console.log(this.props.data);
		return (
			<body>
				<Info />
				<Entrance />
			</body>
		);
	}
});
var init = function(){
	Util.PageData.setData("/api/getauth", function(data){
		React.render(
			<Page data={data} />,
			document.body
		);
	}).render(init);
};
module.exports = {
	main : Page,
	init : init
};