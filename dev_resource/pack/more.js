var React = require("react"),
	Util = require("../pack/util"),
	Component = require("../pack/component"),
	Menu = Component.Menu;
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
var Question = React.createClass({
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
		var url = this.props.data.value,
			body = document.body;
		this.getDOMNode().onclick = function(){
			if(url.match(/api/)){
				$.ajax({
					url : url,
					success : function(data){
						if(!Util.QueryString("index")){
							window.history.pushState({}, document.title, "?index=" + this.props.index);
						}
						document.title = "常见问题";
						React.render(
							<Question data={data.data} />,
							body
						);
					}.bind(this)
				});
			}else{
				console.log(url);
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
					value : "/api/gethelp",
				},
				{
					name : "意见反馈",
					value : "/",
				},
				{
					name : "联系客服",
					value : ""
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