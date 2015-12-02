import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
import {Tab} from "../component/tab";
class List extends React.Component{
	constructor(){
		super();
		this.getStatus = () => {
			let returnValue = "";
			switch(this.props.status){
				case 0:
					returnValue = `到期时间:${this.props.expirationDate}`;
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
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			data : nextProps.data
		});
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
			<div className="content">
				{lists}
			</div>
		);
	}
}
class Page extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data : []
		};
	}
	render(){
		return (
			<body>
				<a className="rule bonus"></a>
				<Tab setting={
					[
						{
							name : "未使用",
							value : "/api/getbonus/0"
						},
						{
							name : "已使用",
							value : "/api/getbonus/1"
						},
						{
							name : "已过期",
							value : "/api/getbonus/2"
						}
					]
				} callback={
					data => {
						this.setState({
							data : data.data
						});
					}
				} />
				<Content data={this.state.data} />
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