import React from "react";
import ReactDOM from "react-dom";
import {PageData, QueryString} from "./util";
import Info from "../component/info";
import Menu from "../component/menu";
import Warning from "../component/warning";
class List extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			value : props.value
		};
	}
	componentDidMount(){
		if(this.props.url){
			$.ajax({
				url : this.props.url,
				success : data => {
					this.setState({
						value : `${data.total}张`
					});
				}
			});
		}
	}
	render(){
		return (
			<a href={this.props.href}>
				<h1>
					<span>
						{this.props.name}
					</span>
					<em>
						{this.state.value}
					</em>
				</h1>
			</a>
		);
	}
}
class Option extends React.Component{
	render(){
		let lists = [],
			setting = this.props.setting;
		setting.forEach(list => {
			lists.push(
				<List name={list.name} value={list.value} url={list.url} href={list.href} />
			);
		});
		return (
			<div className="option">
				{lists}
			</div>
		);
	}
}
Option.defaultProps = {
	setting : [
		{
			name : "红包",
			value : "0张",
			url : "/api/getbonus",
			href : "/bonus"
		},
		{
			name : "加息券",
			value : "0张",
			href : "/interest"
		},
		{
			name : "历史收益",
			value : "查看",
			href : "/profit"
		}
	]
};
class Page extends React.Component{
	componentDidMount(){
		if(QueryString("all")){
			
		}
	}
	render(){
		return (
			<div className="page">
				<div className="warning">
					<Warning />
				</div>
				<Info />
				<Menu type={4} />
				<Option />
			</div>
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