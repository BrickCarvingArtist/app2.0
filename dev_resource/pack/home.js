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
						<strong>
							{(data.primeRate * 100).toFixed(1)}
						</strong>
						<em>％</em>
					</h1>
					<h2>
						{data.name}
					</h2>
				</div>
				<ul>
					<li>
						{"起投" + data.minUnitCount * data.unitCount + "元"}
					</li>
					<li>
						{"可投" + data.lumpSum + "元"}
					</li>
					<li>
						{data.days + "天"}
					</li>
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
	getInitialState : function(){
		return {
			userClass : this.props.userClass,
			type : this.props.type
		}
	},
	componentDidMount : function(){
		var userClass = this.state.userClass;
		this.getDOMNode().onclick = function(){
			userClass.setState({
				currentIndex : this.state.type >> 1 ? userClass.state.currentIndex + 1 : userClass.state.currentIndex - 1
			});
		}.bind(this);
	},
	render : function(){
		return (
			<i className={this.state.type >> 1 ? "next" : "prev"}></i>
		);
	}
});
var Product = React.createClass({
	getInitialState : function(){
		return {
			currentIndex : 0,
			data : this.props.data
		};
	},
	componentDidUpdate : function(){
		console.log(this.state.currentIndex);
	},
	render : function(){
		var lists = [];
		this.state.data.forEach(function(list, index){
			lists.push(
				<Info data={list} />
			);
		});
		return (
			<div className="product">
				<div className="container">
					{lists}
				</div>
				<Option userClass={this} type={1} />
				<Option userClass={this} type={2} />
				<Button />
			</div>
		);
	}
});
var Page  = React.createClass({
	getInitialState : function(){
		return {
			data : this.props.data
		}
	},
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
				<Product data={this.state.data} />
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
		$.ajax({
			url : "/api/gethomeproduct",
			success : function(data){
				React.render(
					<Page data={data.data} />,
					document.body
				);
			}
		});
	}
};