import React from "react";
import ReactDOM from "react-dom";
import {PageData, QueryString} from "./util";
import {Tab} from "../component/tab";
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
		console.log(props)
		return (
			<section>
				<h1>
					<b>
						{props.name}
					</b>
					<span>
						{`交易时间:${props.time}`}
					</span>
				</h1>
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
					returnValue = " fromProduct";
					break;
				case 1:
					returnValue = " fromBonus";
					break;
				case 2:
					returnValue = " fromInterest";
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
					<List name={list.prod_Name} money={list.money} dueInterest={list.dueInterest} time={list.payTime.split(" ")[0]} status={list.status} />
				);
			});
		}else{
			lists[0] = (
				<div className="default"></div>
			);
		}
		return (
			<div className={`content ${this.getClassName()}`}>
				{lists}
			</div>
		);
	}
}
class Page extends React.Component{
	constructor(){
		super();
		this.state = {
			data : []
		};
	}
	render(){
		return (
			<body>
				<Tab setting={
					[
						{
							name : "产品收益",
							value : "",
							href : "/api/getinvest"
						},
						{
							name : "红包奖励",
							value : "",
							href : "/api/getbonus/1"
						},
						{
							name : "加息收益",
							value : "",
							href : "/api/getbonus/2"
						}
					]
				} callback={
					(data, status) => {
						this.setState({
							data : data.data,
							status : status
						});
					}
				} />
				<Content data={this.state.data} status={this.state.status} />
			</body>
		);
	}
}
const init = () => {
	PageData.setData(null, () => {
		ReactDOM.render(
			<Page />,
			document.body
		);
	}).render(init);
};
export {
	init
}