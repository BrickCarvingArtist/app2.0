import React from "react";
class List1 extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentIndex : props.option.currentIndex,
			index : props.option.index,
			href : props.option.href,
			text : props.option.text
		};
	}
	render(){
		let state = this.state;
		return (
			<a className={state.currentIndex === state.index ? "current" : ""} href={state.href}>
				<i></i>
				<span>
					{state.text}
				</span>
			</a>
		);
	}
}
class List2 extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			href : props.option.href,
			text : props.option.text
		}
	}
	render(){
		let state = this.state;
		return (
			<a href={state.href}>
				<i></i>
				<span>
					{state.text}
				</span>
			</a>
		);
	}
}
class List3 extends React.Component{
	constructor(){
		super();
	}
	render(){
		return (
			<a></a>
		);
	}
}
class Menu extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentIndex : props.currentIndex,
			type : props.type,
			option : props.option
		};
		this.getClassType = classList => {
			let returnValue;
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
		};
		this.getListType = (list, index) => {
			let returnValue;
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
		}
	}
	render(){
		let lists = [],
			option = this.state.option;
		option.forEach((list, index) => {
			lists.push(this.getListType(list, index));
		});
		return (
			<menu className={this.getClassType()}>
				{lists}
			</menu>
		);
	}
}
export {
	Menu
}