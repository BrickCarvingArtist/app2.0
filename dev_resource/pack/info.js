var React = require("react"),
	Util = require("../pack/util");
var InfoDetail = React.createClass({
	getInitialState : function(){
		return {
			title : this.props.title,
			time : this.props.time,
			source : this.props.source,
			detail : this.props.detail
		};
	},
	checkMarkup : function(){
		return {
			__html : this.state.detail
		};
	},
	render : function(){
		return (
			<section className="detail">
				<h1>
					{this.state.title}
				</h1>
				<h2>
					{"来源:" + this.state.source}
				</h2>
				<div className="detail" dangerouslySetInnerHTML={this.checkMarkup()}></div>
				<span>
					{this.state.time}
				</span>
			</section>
		);
	}
});
var Info = React.createClass({
	getInitialState : function(){
		return {
			index : this.props.index,
			id : this.props.id,
			status : this.props.status,
			title : this.props.title,
			introduce : this.props.introduce,
			source : this.props.source,
			time : this.props.time
		};
	},
	handleClick : function(){
		console.log(123)
		// var body = document.body;
		// if(!Util.QueryString("index")){
		// 	window.history.pushState({}, this.state.title, "?index=" + this.state.index);
		// }
		// $.ajax({
		// 	url : "http://www.xilanlicai.com/api/getnews/" + this.state.id,
		// 	success : function(data){
		// 		document.title = this.state.title;
		// 		document.body.style.backgroundColor = "white";
		// 		React.render(
		// 			<InfoDetail title={this.state.title} time={this.state.time} source={this.state.source} detail={data.data.details} />,
		// 			body
		// 		);
		// 	}.bind(this)
		// });
	},
	render : function(){
		console.log(this.handleClick)
		return (
			<section className={this.state.status ? "unread" : ""} onClick={this.handleClick}>
				<h1>
					{this.state.title}
				</h1>
				<p>
					{this.state.introduce}
				</p>
				<span>
					{this.state.time}
				</span>
			</section>
		);
	}
});
var	Page = React.createClass({
	getInitialState : function(){
		return {
			data : this.props.data
		};
	},
	componentDidMount : function(){
		if(Util.QueryString("index")){
			this.refs["info" + Util.QueryString("index")].getDOMNode().click();
		}
	},
	render : function(){
		var lists = [],
			data = this.state.data;
		data.forEach(function(list, index){
			lists.push(
				<Info index={index + 1} id={list.id} status={list.status} title={list.title} introduce={list.introduce} source={list.source} time={list.time} ref={"info" + (index + 1)}/>
			);
		});
		return (
			<body>
				{lists}
			</body>
		);
	}
});
var init = function(){
	Util.setRem();
	window.onpopstate = function(){
		init();
	};
	$.ajax({
		url : "/api/getinfo",
		success : function(data){
			document.title = "消息中心";
			document.body.style.backgroundColor = "rgb(244, 244, 244)";
			React.render(
				<Page data={data.data} />,
				document.body
			);
		}
	});
};
module.exports = {
	main : Page,
	init : init
};