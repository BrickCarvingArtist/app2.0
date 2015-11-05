var React = require("react");
var Case = React.createClass({
	getInitialState : function(){
		return {
			index : this.props.index,
			href : this.props.href,
			backgroundImage : this.props.backgroundImage
		};
	},
	render : function(){
		return (
			<a href={this.state.href} style={
				{
					backgroundImage : "url(" + this.state.backgroundImage + ")"
				}
			}></a>
		);
	}
});
var Banner = React.createClass({
	getInitialState : function(){
		return {
			index : 0,
			data : this.props.data
		};
	},
	render : function(){
		var lists = [],
			data = this.state.data;
		data.forEach(function(list, index){
			lists.push(
				<Case index={index} href={list.href} backgroundImage={list.imgSrc} />
			);
		});
		lists.push(
			<Case index={0} href={data[0].href} backgroundImage={data[0].imgSrc} />
		);
		return (
			<header>
				<div className="container">
					{lists}
				</div>
			</header>
		);
	}
});
module.exports = Banner;