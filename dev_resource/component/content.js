import React from "react";
class List extends React.Component{
	constructor(){
		super();
		this.getStatus = () => {
			let returnValue = "";
			switch(this.props.status){
				case 0:
					returnValue = `${this.props.expirationDate}到期`;
					break;
				case 1:
					returnValue = "已使用";
					break;
				case 2:
					returnValue = "已过期";
					break;
			}
			return returnValue;
		}
	}
	render(){
		let props = this.props;
		return (
			<section>
				<b>
					{props.money}
				</b>
				<p>
					{props.name}
				</p>
				<p>
					<span>
						{`单笔投资≥${props.condition}元`}
					</span>
					<em>
						{this.getStatus()}
					</em>
				</p>
			</section>
		);
	}
}
class Content extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data : props.data
		};
		this.getClassName = () => {
			let returnValue = "";
			switch(this.state.status){
				case 0:
					returnValue = " available";
					break;
				case 1:
				case 2:
					returnValue = " unavailable";
					break;
				default:
					returnValue = "";
					break;
			}
			return returnValue;
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let lists = [],
			data = this.state.data;
		if(data.length){
			data.forEach(list => {
				lists.push(
					<List money={list.money} name={list.name} condition={list.conditions} expirationDate={list.expirationDate.split(" ")[0]} status={list.status} />
				);
			});
		}else{
			lists[0] = (
				<div className="default"></div>
			);
		}
		return (
			<div className={`content ${this.props.type}${this.getClassName()}`}>
				{lists}
			</div>
		);
	}
}
export {
	Content
}