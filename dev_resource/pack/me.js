var React = require("react"),
	Util = require("../pack/util"),
	Component = require("./component"),
	Menu = Component.Menu;
var Info = React.createClass({
	getInitialState : function(){
		return {
			vip : "普通会员",
			name : "＊＊＊",
			setting : [
				{
					name : "common",
					value : "普通会员"
				},
				{
					name : "jadeite",
					value : "翡翠会员"
				},
				{
					name : "platinum",
					value : "铂金会员"
				},
				{
					name : "diamond",
					value : "钻石会员"
				}
			]
		}
	},
	componentDidMount : function(){
		$.ajax({
			url : "/api/getauth",
			success : function(data){
				if(data.code !== 400){
					this.setState({
						vip : data.vip,
						name : data.name
					});
				}
			}.bind(this)
		});
	},
	render : function(){
		return (
			<div className="info common">
				{this.state.vip + this.state.name + ",你好!"}
			</div>
		);
	}
});
var Asset = React.createClass({
	render : function(){
		return (
			<div className="asset"></div>
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
			<div className={"option" + " " + this.props.data.className}>
				<i></i>
				<span>
					{this.props.data.name}
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
					className : "account",
					value : ""
				},
				{
					name : "交易记录",
					className : "record",
					value : ""
				},
				{
					name : "我的积分",
					className : "score",
					value : ""
				},
				{
					name : "我的红包",
					className : "bonus",
					value : ""
				},
				{
					name : "我的加息",
					className : "ticket",
					value : ""
				},
				{
					name : "我的邀请",
					className : "invitation",
					value : ""
				},
				{
					name : "安全中心",
					className : "safty",
					value : ""
				},
				{
					name : "消息中心",
					className : "infoCenter",
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
		return (
			<body>
				<Info />
				<Asset />
				<Entrance />
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
							href : "/me",
							text : "我的账户"
						},
						{
							href : "/more",
							text : "更多"
						}
					]
				} currentIndex={2} />
			</body>
		);
	}
});
var init = function(){
	Util.PageData.setData(null, function(){
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