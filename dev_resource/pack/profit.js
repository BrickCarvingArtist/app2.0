import React from "react";
import ReactDOM from "react-dom";
import {PageData, QueryString} from "./util";
import {Tab} from "../component/tab";
class List1 extends React.Component{
	constructor(){
		super();
	}
	render(){
		let props = this.props;
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
				<p>
					{`交易金额 (¥) : ${props.money}`}
				</p>
				<p >
					<span>收益金额 (¥) : </span>
					<b>
						{props.dueInterest}
					</b>
				</p>
				<em>未结算</em>
			</section>
		);
	}
}
class List2 extends React.Component{
	constructor(){
		super();
	}
	render(){
		let props = this.props;
		console.log(props);
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
class List3 extends React.Component{
	constructor(){
		super();
	}
	render(){
		let props = this.props;
		console.log(props);
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
		this.getContent = data => {
			let returnValue = "";
			switch(this.state.status){
				case 0:
					returnValue = <List1 name={data.prod_Name} money={data.money} dueInterest={data.dueInterest} time={data.payTime.split(" ")[0]} status={data.status} />;
					break;
				case 1:
					returnValue = <List2 name={data.prod_Name} money={data.money} dueInterest={data.dueInterest} time={data.payTime.split(" ")[0]} status={data.status} />;
					break;
				case 2:
					returnValue = <List3 name={data.prod_Name} money={data.money} dueInterest={data.dueInterest} time={data.payTime.split(" ")[0]} status={data.status} />;
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
					this.getContent(list)
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
class Total extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			money : props.money
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		return (
			<div className="total">
				{this.state.money.toFixed(2)}
			</div>
		);
	}
}
Total.defaultProps = {
	money : 0
};
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
				<Total />
				<Tab setting={
					[
						{
							name : "产品收益",
							value : "",
							href : "/api/getinvest/0"
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