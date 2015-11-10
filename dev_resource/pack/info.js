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
			status : this.props.status,
			title : this.props.title,
			introduce : this.props.introduce,
			detail : this.props.detail,
			source : this.props.source,
			time : this.props.time
		};
	},
	handleClick : function(){
		var body = document.body;
		if(!Util.QueryString("index")){
			window.history.pushState({}, this.state.title, "?index=" + this.state.index);
		}
		window.addEventListener("popstate", function(e){
			init();
		}, 0);
		document.title = this.state.title;
		document.body.style.backgroundColor = "white";
		// React.render(
		// 	<InfoDetail title={this.state.title} time={this.state.time} source={this.state.source} detail={this.state.detail}/>,
		// 	body
		// );
	},
	render : function(){
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
	shouldComponentUpdate : function(nextProps, nextState){
		return nextState.data.length !== this.state.data.length;
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
				<Info index={index + 1} status={list.status} title={list.title} introduce={list.introduce} detail={list.detail} source={list.source} time={list.time} ref={"info" + (index + 1)}/>
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
	$.ajax({
		url : "http://www.xilanlicai.com/api/getnews?pageindex=1&pagesize=99&newstype=1",
		success : function(data){
			Util.setRem();
			console.log(data)
			document.title = "消息中心";
			document.body.style.backgroundColor = "rgb(244, 244, 244)";
			// React.render(
			// 	<Page data={data.data} />,
			// 	document.body
			// );
		}
	});
};
module.exports = {
	main : Page,
	init : init
};