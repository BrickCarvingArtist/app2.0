var React = require("react"),
	Util = require("../pack/util"),
	Component = require("../pack/component"),
	Banner = Component.Banner,
	Menu = Component.Menu;
var Info = React.createClass({
	getInitialState : function(){
		return {
			index : this.props.index,
			currentIndex : this.props.currentIndex,
			data : this.props.data
		};
	},
	componentDidMount : function(){},
	componentWillReceiveProps : function(nextProps){
		this.setState({
			currentIndex : nextProps.currentIndex
		});	
	},
	componentDidUpdate : function(){},
	render : function(){
		var data = this.state.data;
		return (
			<div className={"info" + (this.state.index === this.state.currentIndex ? " current" : "")}>
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
	getInitialState : function(){
		return {
			href : this.props.href
		};
	},
	shouldComponentUpdate : function(nextProps, nextState){
		return this.state.href !== nextState.href;
	},
	render : function(){
		return (
			<a className="btnBuy" href={"/api/getproduct/" + this.state.href}>立即购买</a>
		);
	}
});
var Option = React.createClass({
	getInitialState : function(){
		return {
			sum : this.props.sum,
			userClass : this.props.userClass,
			type : this.props.type
		}
	},
	componentDidMount : function(){
		var userClass = this.state.userClass,
			sum = this.state.sum;
		this.getDOMNode().onclick = function(){
			var currentIndex = userClass.state.currentIndex;
			userClass.setState({
				currentIndex : this.state.type >> 1 ? currentIndex >= sum - 1 ? 0 : currentIndex + 1 : currentIndex <= 0 ? sum - 1 : currentIndex - 1
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
			data : this.props.data.data
		};
	},
	componentDidUpdate : function(){
		var state = this.state;
		this.refs.button.setState({
			href : state.data[state.currentIndex].id
		});
	},
	render : function(){
		var lists = [],
			data = this.state.data,
			dataLen = data.length;
		data.forEach(function(list, index){
			lists.push(
				<Info index={index} currentIndex={this.state.currentIndex} data={list} />
			);
		}.bind(this));
		return (
			<div className="product">
				{lists}
				<Option sum={dataLen} userClass={this} type={1} />
				<Option sum={dataLen} userClass={this} type={2} />
				<Button ref="button" href={this.state.data[this.state.currentIndex].id} />
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
		document.body.style.opacity = 1;
		$.ajax({
			url : "/api/gethomeproduct",
			success : function(data){
				React.render(
					<Page data={data} />,
					document.body
				);
			}
		});
	}
};