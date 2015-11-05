var React = require("react");
var List = React.createClass({
	getInitialState : function(){
		return {
			index : this.props.index,
			href : this.props.href,
			title : this.props.title,
			currentIndex : this.props.currentIndex
		};
	},
	render : function(){
		var state = this.state;
		return (
			<a className={state.currentIndex === state.index ? "current" : ""} href={state.href}>
				<i className="icon48"></i>
				<span>
					{state.title}
				</span>
			</a>
		);
	}
});
var Shortcut = React.createClass({
	getInitialState : function(){
		return {
			currentIndex : this.props.index,
			data : this.props.data
		}
	},
	render : function(){
		var lists = [],
			data = this.state.data;
		data.forEach(function(list, index){
			lists.push(
				<List index={index} href={list.href} title={list.title} currentIndex={this.state.currentIndex} />
			);
		}.bind(this))
		return (
			<footer>
				{lists}
			</footer>
		);
	}
});
module.exports = Shortcut;