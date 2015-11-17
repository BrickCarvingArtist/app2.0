var React = require("react"),
	Util = require("../pack/util"),
	Component = require("../pack/component"),
	Menu = Component.Menu;
var Part1 = React.createClass({
	getInitialState : function(){
		return {
			data : this.props.data
		};
	},
	render : function(){
		var data = this.state.data,
			other = "";
		data.other = "满20000元即可获得20元红包!";
		if(data.other){
			other = (
				<p>
					<i></i>
					<span>
						{data.other}
					</span>
				</p>
			);
		}
		return (
			<div className="part1">
				<p>
					<strong>
						{(data.primeRate * 100).toFixed(1)}
					</strong>
					<em>％</em>
					<span>预计年化收益</span>
					<b>起息日:T+1</b>
				</p>
				<ul>
					<li>
						<p>
							{data.days + "天"}
						</p>
						<p>项目期限</p>
					</li>
					<li>
						<p>
							{data.unitPrice * data.minUnitCount + "元"}
						</p>
						<p>起投金额</p>
					</li>
					<li>
						<p>
							{data.lumpSum + "元"}
						</p>
						<p>项目总额</p>
					</li>
				</ul>
				{other}
			</div>
		);
	}
});
var Part2 = React.createClass({
	getDefaultProps : function(){
		return {
			setting : [
				{
					name : "还款方式",
					value : "自动还款"
				},
				{
					name : "产品描述",
					value : "利率高"
				},
				{
					name : "资金保障",
					value : "风险低"
				},
				{
					name : "申购情况",
					value : "已申购订单"
				}
			]
		};
	},
	render : function(){
		var lists = [],
			setting = this.props.setting;
		setting.forEach(function(list){
			lists.push(
				<p>
					<span>
						{list.name}
					</span>
					<em>
						{list.value}
					</em>
				</p>
			);
		});
		return (
			<div className="part2">
				{lists}
			</div>
		);
	}
});
var Part3 = React.createClass({
	getInitialState : function(){
		return {
			data : this.props.data
		}
	},
	render : function(){
		var data = this.state.data;
		return (
			<div className="part3">
				<div>
					<p>
						{data.balance + "元"}
					</p>
					<p>可投金额</p>
				</div>
				<div>
					<p>
						{"0元"}
					</p>
					<p>预期收益</p>
				</div>
				<form>
					<span>－</span>
					<input className="num" type="text" defaultValue="0" />
					<span>＋</span>
					<p className="term">
						{"募集时间:" + data.beginTime.split(" ")[0] + " 至 " + data.stopBuyTime.split(" ")[0]}
					</p>
					<input className="longBtn btnBuy" type="submit" value="立即购买" />
				</form>
			</div>
		);
	}
});
var ProductDetail = React.createClass({
	getInitialState : function(){
		return {
			data : this.props.data
		};
	},
	render : function(){
		var product = this.state.data.product,
			detail = this.state.data.detail;
		return (
			<body>
				<Part1 data={product} />
				<Part2 data={detail} />
				<Part3 data={product} />
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
			$.ajax({
				url : "/api/getproduct/" + data.id,
				success : function(data){
					React.render(
						<ProductDetail data={data.data} />,
						body
					);
				}
			});
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