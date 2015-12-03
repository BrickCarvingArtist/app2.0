import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
import {Info} from "../component/info";
import {Tab} from "../component/tab";
class List extends React.Component{
	constructor(){
		super();
		this.getStatus = () => {
			let returnValue = "";
			switch(this.props.status){
				case 0:
					returnValue = "未投资";
					break;
				case 1:
					returnValue = "已投资";
					break;
			}
			return returnValue;
		};
	}
	render(){
		let props = this.props;
		return (
			<ul>
				<li>
					{props.mobile}
				</li>
				<li>
					{props.name}
				</li>
				<li>
					{this.getStatus()}
				</li>
				<li>
					{props.time}
				</li>
			</ul>
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
		this.setState(nextProps);
	}
	render(){
		let lists = [],
			data = this.state.data;
		if(data.length){
			data.forEach(list => {
				lists.push(
					<List mobile={list.phone} name={list.trueName} status={list.isNew} time={list.regTime.split(" ")[0]} />
				);
			});
		}else{
			lists[0] = (
				<div className="default"></div>
			);
		}
		return (
			<div className="content">
				<ul>
					<li>手机号码</li>
					<li>被邀请人</li>
					<li>投资状态</li>
					<li>邀请时间</li>
				</ul>
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
				<Info />
				<Tab setting={
					[
						{
							name : "全部",
							value : "/api/getinvite/0"
						},
						{
							name : "已投资",
							value : "/api/getinvite/1"
						},
						{
							name : "未投资",
							value : "/api/getinvite/2"
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