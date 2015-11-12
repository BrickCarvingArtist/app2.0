var React = require("react"),
	Util = require("../pack/util"),
	Component = require("../pack/component"),
	Banner = Component.Banner,
	Menu = Component.Menu;
var Info = React.createClass({
	getInitialState : function(){
		return {
			data : this.props.data
		};
	},
	render : function(){
		var data = this.state.data;
		return (
			<div className="info">
				<div className="bg"></div>
				<div className="circle">
					<h1>
						<strong>9.8</strong>
						<em>％</em>
					</h1>
					<h2>周一见12号</h2>
				</div>
				<ul>
					<li>起投500元</li>
					<li>可投100000元</li>
					<li>30天</li>
				</ul>
			</div>
		);
	}
});
var Button = React.createClass({
	render : function(){
		return (
			<a className="btnBuy">立即购买</a>
		);
	}
});
var Option = React.createClass({
	handleClick : function(){
		console.log(123);
	},
	getInitialState : function(){
		return {
			type : this.props.type
		}
	},
	render : function(){
		return (
			<i className={this.state.type >> 1 ? "next" : "prev"} onClick={this.handleClick}></i>
		);
	}
});
var Product = React.createClass({
	getInitialState : function(){
		return {
			currentIndex : 0
		};
	},
	render : function(){
		var lists = [];
		return (
			<div className="product">
				<div className="container">
					<Info />
				</div>
				<Option type={1} />
				<Option type={2} />
				<Button />
			</div>
		);
	}
});
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
				<Product />
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