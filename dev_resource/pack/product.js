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
var DetailDetail = React.createClass({
	render : function(){
		var data = this.props.data;
		return (
			<div>

			</div>
		);
	}
});
var List = React.createClass({
	componentDidMount : function(){
		var id = this.props.id,
			index = this.props.index,
			data = this.props.data;
		if(index){
			this.getDOMNode().onclick = function(){
				if(Object.keys(data).length){
					React.render(
						<DetailDetail data={data} />,
						document.body
					);
					if(!Util.QueryString("detail")){
						window.history.pushState({}, data.name, "&detail=" + index);
					}
				}else{
					$.ajax({
						url : "/api/getbidder/" + id,
						success : function(data){
							console.log(data);
						}
					});
				}
			}.bind(this);
		}
	},
	render : function(){
		var props = this.props;
		return (
			<p>
				<span>
					{props.name}
				</span>
				<em>
					{props.value}
				</em>
			</p>
		);
	}
});
var Part2 = React.createClass({
	getDefaultProps : function(){
		return {
			setting : [
				{
					name : "还款方式",
					value : "自动还款",
					detail : []
				},
				{
					name : "产品描述",
					value : "利率高",
					detail : ["fundUse", "collateral", "source"]
				},
				{
					name : "资金保障",
					value : "风险低",
					detail : ["repayment", "guaranteeIntroduce", "fundSafe"]
				},
				{
					name : "申购情况",
					value : "已申购订单",
					detail : []
				}
			]
		};
	},
	adaptor : function(detail, data){
		var _data = {};
		for(var i = 0, detailLen = detail.length; i < detailLen; i++){
			_data[detail[i]] = data[detail[i]];
		}
		return _data;
	},
	render : function(){
		var lists = [],
			setting = this.props.setting,
			data = this.props.data;
		setting.forEach(function(list, index){
			lists.push(
				<List id={data.id} index={index} name={list.name} value={list.value} data={this.adaptor(list.detail, data)} />
			);
		}.bind(this));
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
			interest : 0
		};
	},
	matchNum : function(dom, lumpSum){
		var data = this.props.data,
			value = dom.value = Math.floor(dom.value);
		dom.value = value = value >= 0 ? value > lumpSum ? value = lumpSum : value : 0;
		this.setState({
			interest : (value * data.primeRate / 365 * data.days).toFixed(2)
		});
	},
	componentDidMount : function(){
		var _this = this,
			data = this.props.data,
			minus = this.refs.minus,
			plus = this.refs.plus,
			num = this.refs.num;
		num.onkeyup = function(){
			_this.matchNum(this, data.lumpSum);
		};
		minus.onclick = function(){
			num.value -= 500;
			num.onkeyup();
		};
		plus.onclick = function(){
			num.value = parseInt(num.value) + 500;
			num.onkeyup();
		};
	},
	render : function(){
		var data = this.props.data;
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
						{this.state.interest + "元"}
					</p>
					<p>预期收益</p>
				</div>
				<form method="post" action="/api/postbill">
					<span ref="minus">－</span>
					<input name="invest" ref="num" className="num" type="text" defaultValue="0" />
					<span ref="plus">＋</span>
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
			detail = this.state.data.details;
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
					<a>立即购买</a>
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