var React = require("react"),
	Util = require("../pack/util"),
	Component = require("../pack/component"),
	Menu = Component.Menu;
var About = React.createClass({
	getDefaultProps : function(){
		return {
			description : "\t喜蓝理财互联网金融平台由杭州喜马拉雅电子商务有限公司负责运营。喜马拉雅作为启蓝控股集团旗下的子公司之一，于2014年初正式成立，其经营团队由投资理财、线上交易及风险控制等业界一流的专业人士组成。\n\t公司经营的理财平台于2015年4月先后被评为“中国互联网金融服务年度最具竞争力品牌”和“中国互联网金融服务年度最具发展潜力平台”。后于2015年6月，公司被评为“2015最具投资价值互联网金融公司”。公司董事长家族世代经商，2011年入驻上海世博会并获评“最浙江家庭”。喜蓝理财秉持并延续家族诚信经营的商业理念，全力为客户打造安全、稳定、高效的理财体验。",
			imgSrc : "/images/about.png"
		};
	},
	render : function(){
		return (
			<body>
				<header></header>
				<div className="description">
					<h1>公司简介</h1>
					<pre>
						<p>
							{this.props.description}
						</p>
					</pre>
					<img src={this.props.imgSrc} />
				</div>
			</body>
		);
	}
});
var QA = React.createClass({
	checkMarkup : function(data){
		return {
			__html : data
		};
	},
	componentDidMount : function(){
		this.getDOMNode().onclick = function(){
			if(this.status){
				$(this).removeClass("current");
				this.status = 0;
			}else{
				$("section").removeClass("current");
				$(this).addClass("current");
				this.status = 1;
			}
		};
	},
	render : function(){
		return (
			<section>
				<h1>
					{this.props.data.q}
				</h1>
				<pre>
					<p dangerouslySetInnerHTML={this.checkMarkup(this.props.data.a)}></p>
				</pre>
			</section>
		);
	}
});
var Help = React.createClass({
	render : function(){
		var lists = [],
			data = this.props.data;
		data.forEach(function(list, index){
			lists.push(
				<QA data={list} ref={"q" + (index + 1)} />
			);
		});
		return (
			<body>
				{lists}
			</body>
		);
	}
});
var List = React.createClass({
	componentDidMount : function(){
		var title = this.props.data.name,
			value = this.props.data.value,
			body = document.body;
		this.getDOMNode().onclick = function(){
			if(typeof value === "string"){
				$.ajax({
					url : value,
					success : function(data){
						document.title = title;
						if(!Util.QueryString("index")){
							window.history.pushState({}, document.title, "?index=" + this.props.index);
						}
						React.render(
							<Help data={data.data} />,
							body
						);
					}.bind(this)
				});
			}else{
				React.render(
					React.createElement(value, null),
					body
				);
				document.title = title;
				if(!Util.QueryString("index")){
					window.history.pushState({}, document.title, "?index=" + this.props.index);
				}
			}
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
var Suggestion = React.createClass({
	render : function(){
		return (
			<body>
				<form method="post" action="/api/getsuggestion">
					<textarea name="suggestion" placeholder="我们很高兴能收到您反馈的意见！"></textarea>
					<input className="longBtn" type="submit" value="确定" />
				</form>
			</body>
		);
	}
});
var Contact = React.createClass({
	getDefaultProps : function(){
		return {
			setting : [
				{
					name : "微信订阅号:xmlyjr",
					value : ""
				},
				{
					name : "微信订阅号:hi-lend",
					value : ""
				},
				{
					name : "@喜蓝理财",
					value : ""
				},
				{
					name : "4000525522",
					value : "mqqwpa://im/chat?chat_type=wpa&uin=4000525522"
				}
			]
		};
	},
	render : function(){
		var lists = [],
			setting = this.props.setting;
		setting.forEach(function(list){
			lists.push(
				<h1 className="withIcon">
					<i></i>
					<a href={list.value}>
						{list.name}
					</a>
				</h1>
			);
		});
		return (
			<body>
				<header></header>
				<div className="tel">
					<h2>400-052-5522</h2>
					<p>客服热线 (09:00-21:00)</p>
					<a className="longBtn" href="tel:4000525522">拨打客服热线</a>
				</div>
				{lists}
			</body>
		);
	}
});
var Page = React.createClass({
	getDefaultProps : function(){
		return {
			setting : [
				{
					name : "关于喜蓝理财",
					value : About
				},
				{
					name : "常见问题",
					value : "/api/gethelp",
				},
				{
					name : "意见反馈",
					value : Suggestion,
				},
				{
					name : "联系客服",
					value : Contact
				}
			]
		};
	},
	componentDidMount : function(){
		if(Util.QueryString("index")){
			this.refs["more" + Util.QueryString("index")].getDOMNode().click();
		}
	},
	render : function(){
		var lists = [],
			setting = this.props.setting;
		setting.forEach(function(list, index){
			lists.push(
				<List data={list} index={index + 1} ref={"more" + (index + 1)} />
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
							href : "/me",
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