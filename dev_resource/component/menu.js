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
		};
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
	constructor(props){
		super(props);
		this.state = {
			href : props.option.href,
			name : props.option.name,
			value : props.option.value
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			href : nextProps.option.href,
			name : nextProps.option.name,
			value : nextProps.option.value
		});
	}
	render(){
		let state = this.state;
		return (
			<a href={state.href}>
				<h1>
					{state.name}
				</h1>
				<h2>
					{state.value}
				</h2>
			</a>
		);
	}
}
class Menu extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentIndex : props.currentIndex,
			menu : (() => {
				let returnValue;
				switch(props.type){
					case 1:
						returnValue = props.menu1;
						break;
					case 2:
						returnValue = props.menu2;
						break;
					case 3:
						returnValue = props.menu3;
						break;
					case 4:
						returnValue = props.menu4;
						break;
				}
				return returnValue;
			})()
		};
		this.getListType = (list, index) => {
			let returnValue;
			switch(this.props.type){
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
				case 4:
					returnValue = (
						<List3 option={
							{
								href : list.href,
								name : list.name,
								value : list.value
							}
						} />
					);
					break;
			}
			return returnValue;
		}
	}
	componentDidMount(){
		if(this.props.type === 3 || this.props.type === 4){
			$.ajax({
				type : "post",
				url : "/api/getinvest",
				success : data => {
					this.setState({
						menu : {
							className : this.state.menu.className,
							option : this.props.type === 3 ? [
								{
									href : "/asset",
									name : "我的资产",
									value : (data.money + data.investment || 0).toFixed(2)
								},
								{
									href : "",
									name : "预期收益",
									value : (data.investment || 0).toFixed(2)
								},
								{
									href : "/profit?status=1",
									name : "历史收益",
									value : (data.allInvestment || 0).toFixed(2)
								}
							] : [
								{
									href : "/asset",
									name : "我的资产",
									value : (data.money + data.investment || 0).toFixed(2)
								},
								{
									href : "",
									name : "预期收益",
									value : (data.investment || 0).toFixed(2)
								}
							]
						}
					});
				}
			});
		}
	}
	render(){
		let lists = [],
			menu = this.state.menu;
		menu.option.forEach((list, index) => {
			lists.push(this.getListType(list, index));
		});
		return (
			<menu className={menu.className}>
				{lists}
			</menu>
		);
	}
}
Menu.defaultProps = {
	menu1 : {
		className : "footer",
		option : [
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
	},
	menu2 : {
		className : "menu_3col_anchor",
		option : [
			{
				href : "/bonus",
				text : "推荐送红包"
			},
			{
				href : "/activity",
				text : "活动中心"
			},
			{
				href : "/score?sign=1",
				text : "马上签到"
			}
		]
	},
	menu3 : {
		className : "menu_3col_infoAnchor",
		option : [
			{
				href : "/asset",
				name : "我的资产",
				value : "0.00"
			},
			{
				href : "",
				name : "预期收益",
				value : "0.00"
			},
			{
				href : "/profit?status=1",
				name : "历史收益",
				value : "0.00"
			}
		]
	},
	menu4 : {
		className : "menu_2col_infoAnchor",
		option : [
			{
				href : "/asset",
				name : "我的资产",
				value : "0.00"
			},
			{
				href : "",
				name : "预期收益",
				value : "0.00"
			}
		]
	}
};
export {
	Menu
}