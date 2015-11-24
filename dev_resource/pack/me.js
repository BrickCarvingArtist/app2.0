import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "../pack/util";
import {MenuBar as Menu} from "../component/menu";
class Info extends React.Component{
	constructor(){
		super();
		this.state = {
			vip : "普通会员",
			name : "＊＊＊",
			setting : [
				{
					name : "common",
					value : "普通会员"
				},
				{
					name : "jadeite",
					value : "翡翠会员"
				},
				{
					name : "platinum",
					value : "铂金会员"
				},
				{
					name : "diamond",
					value : "钻石会员"
				}
			]
		};
	}
	componentDidMount(){
		$.ajax({
			url : "/api/getauth",
			success : data => {
				if(data.code !== 400){
					this.setState({
						vip : data.vip,
						name : data.name
					});
				}
			}
		});
	}
	render(){
		return (
			<div className="info common">
				{`${this.state.vip}${this.state.name},你好!`}
			</div>
		);
	}
}
class Asset extends React.Component{
	render(){
		return (
			<div className="asset"></div>
		);
	}
}
class Option extends React.Component{
	componentDidMount(){
		ReactDOM.findDOMNode(this).onclick = () => {
			ReactDOM.render(
				React.createElement(this.props.data.value, null),
				document.body
			);
		};
	}
	render(){
		return (
			<div className={`option ${this.props.data.className}`}>
				<i></i>
				<span>
					{this.props.data.name}
				</span>
			</div>
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
			value : ""
		},
		{
			name : "交易记录",
			className : "record",
			value : ""
		},
		{
			name : "我的积分",
			className : "score",
			value : ""
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
			value : ""
		},
		{
			name : "消息中心",
			className : "infoCenter",
			value : ""
		}
	]
};
class Page extends React.Component{
	render(){
		return (
			<body>
				<Info />
				<Asset />
				<Entrance />
				<Menu type={1} option={
					[
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
				} currentIndex={2} />
			</body>
		);
	}
}
const init = init => {
	PageData.setData(null, () => {
		ReactDOM.render(
			<Page />,
			document.body
		);
	}).render(init);
};
export {
	Page as main,
	init as init
}