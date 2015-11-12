var React = require("react");
var List1 = React.createClass({
	getInitialState : function(){
		var option = this.props.option;
		return {
			currentIndex : option.currentIndex,
			index : option.index,
			href : option.href,
			text : option.text
		};
	},
	render : function(){
		var state = this.state;
		return (
			<a className={state.currentIndex === state.index ? "current" : ""} href={state.href}>
				<i></i>
				<span>
					{state.text}
				</span>
			</a>
		);
	}
});
var List2 = React.createClass({
	getInitialState : function(){
		var option = this.props.option;
		return {
			href : option.href,
			text : option.text
		};
	},
	render : function(){
		var state = this.state;
		return (
			<a href={state.href}>
				<i></i>
				<span>
					{state.text}
				</span>
			</a>
		);
	}
});
var List3 = React.createClass({
	getInitialState : function(){
		return {};
	},
	render : function(){
		return (
			<a></a>
		);
	}
});
var MenuBar = React.createClass({
	getClassType : function(classList){
		var returnValue;
		switch(this.state.type){
			case 1:
				returnValue = "footer";
				break;
			case 2:
				returnValue = "menu_3col_anchor";
				break;
			case 3:
				returnValue = "menu_3col"
				break;
		}
		return returnValue;
	},
	getListType : function(list, index){
		var returnValue;
		switch(this.state.type){
			case 1:
				returnValue = (
					<List1 option={
						{
							currentIndex : this.state.currentIndex,
							index : index,
							href : list.href,
							text : list.text
						}
					} />
				);
				break;
			case 2:
				returnValue = (
					<List2 option={
						{
							href : list.href,
							text : list.text
						}
					} />
				);
				break;
			case 3:
				break;
		}
		return returnValue;
	},
	getInitialState : function(){
		return {
			currentIndex : this.props.currentIndex,
			type : this.props.type,
			option : this.props.option
		};
	},
	render : function(){
		var lists = [],
			option = this.state.option;
		option.forEach(function(list, index){
			lists.push(this.getListType(list, index));
		}.bind(this));
		return (
			<menu className={this.getClassType()}>
				{lists}
			</menu>
		);
	}
});
module.exports = MenuBar;