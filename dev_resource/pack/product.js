var React = require("react"),
	Util = require("../pack/util"),
	Component = require("../pack/component"),
	Menu = Component.Menu;
var ProductDetail = React.createClass({
	getInitialState : function(){
		return {
			data : this.props.data
		};
	},
	render : function(){
		var data = this.state.data;
		return (
			<body>
				<div className="part1">
				</div>
				<div className="part2">
				</div>
				<div className="part3">
				</div>
				<p>
					{"募集时间:" + data.beginTime + " 至 " + data.stopBuyTime}
				</p>
				<a className="btnBuy" href={"/payment/" + data.id}></a>
			</body>
		);
	}
});
var Product = React.createClass({
	getInitialState : function(){
		return {
			index : this.props.index,
			data : this.props.data
		};
	},
	componentDidMount : function(){
		this.getDOMNode().onclick = function(){
			var body = document.body,
				data = this.state.data;
			if(!Util.QueryString("index")){
				window.history.pushState({}, data.name, "?index=" + this.state.index);
			}
			document.title = data.name;
			React.render(
				<ProductDetail data={data} />,
				body
			);
		}.bind(this);
	},
	render : function(){
		var data = this.state.data;
		return (
			<section>
				<h1>
					<strong>
						{data.name}
					</strong>
					<em>
						{"项目规模:" + data.lumpSum + "元"}
					</em>
				</h1>
				<div className="main">
					<div className="column1">
						<p>年化率</p>
						<p>
							<strong>
								{(data.primeRate * 100).toFixed(1)}
							</strong>
							<em>％</em>
						</p>
					</div>
					<div className="column2">
						<p>期限</p>
						<p>
							<strong>
								{data.days}
							</strong>
							<em>天</em>
						</p>
					</div>
					<a href={data.id}>立即购买</a>
				</div>
			</section>
		);
	}
});
var Page = React.createClass({
	getInitialState : function(){
		return {
			data : this.props.data.data
		};
	},
	componentDidMount : function(){
		if(Util.QueryString("index")){
			this.refs["product" + Util.QueryString("index")].getDOMNode().click();
		}
	},
	render : function(){
		var lists = [],
			data = this.state.data;
		data.forEach(function(list, index){
			lists.push(
				<Product index={index + 1} data={list} ref={"product" + (index + 1)} />
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
				} currentIndex={1} />
			</body>
		);
	}
});
var init = function(){
	Util.PageData.setData("/api/getproduct", function(data){
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