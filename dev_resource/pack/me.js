import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
import {Menu} from "../component/menu";
import {Dialog} from "../component/dialog";
import {Info} from "../component/info";
class Option extends React.Component{
	render(){
		return (
			<a className={`option ${this.props.data.className}`} href={this.props.data.value}>
				<i></i>
				<span>
					{this.props.data.name}
				</span>
			</a>
		)
	}
};
class Entrance extends React.Component{
	render(){
		let lists = [],
			setting = this.props.setting;
		setting.forEach(list => {
			lists.push(
				<Option data={list} />
			);
		});
		return (
			<div className="entrance">
				{lists}
			</div>
		);
	}
}
Entrance.defaultProps = {
	setting : [
		{
			name : "个人信息",
			className : "account",
			value : "/basic"
		},
		{
			name : "交易记录",
			className : "record",
			value : ""
		},
		{
			name : "我的积分",
			className : "score",
			value : "/score"
		},
		{
			name : "我的红包",
			className : "bonus",
			value : ""
		},
		{
			name : "我的加息",
			className : "ticket",
			value : ""
		},
		{
			name : "我的邀请",
			className : "invitation",
			value : ""
		},
		{
			name : "安全中心",
			className : "safty",
			value : "/reset"
		},
		{
			name : "消息中心",
			className : "infoCenter",
			value : "/infocenter"
		}
	]
};
class Page extends React.Component{
	render(){
		return (
			<body>
				<Info />
				<Menu type={3} />
				<Entrance />
				<Menu type={1} currentIndex={2} />
				<div className="shadow">
					<Dialog />
				</div>
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