var React = require("react"),
	Util = require("../pack/util");
Util.setRem();
var Info = React.createClass({
	getInitialState : function(){
		return {
			status : this.props.status,
			title : this.props.title,
			summary : this.props.summary,
			time : this.props.time
		};
	},
	render : function(){
		return (
			<section className={this.state.status ? "unread" : ""}>
				<h1>
					{this.state.title}
				</h1>
				<p>
					{this.state.summary}
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
	render : function(){
		var lists = [],
			data = this.state.data;
		data.forEach(function(list){
			lists.push(
				<Info status={list.status} title={list.title} summary={list.summary} time={list.time} />
			);
		});
		return (
			<body>
				{lists}
			</body>
		);
	}
});
React.render(
	<Page data={
		[
			{
				status : 1,
				title : "标题",
				summary : "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
				time : "2015-11-05"
			},
			{
				status : 0,
				title : "标题",
				summary : "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
				time : "2015-11-05"
			},
			{
				status : 0,
				title : "标题",
				summary : "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
				time : "2015-11-05"
			},
			{
				status : 1,
				title : "标题",
				summary : "简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介简介",
				time : "2015-11-05"
			}
		]
	} />,
	document.body
);