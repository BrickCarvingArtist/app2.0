import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "../pack/util";
import {Menu} from "../component/menu";
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
			value : "/infocenter"
		}
	]
};
class Page extends React.Component{
	render(){
		return (
			<body>
				<Info />
				<Menu type={3} option={
					[
						{
							href : "",
							name : "我的资产",
							value : "1024.00"
						},
						{
							href : "",
							name : "预期收益",
							value : "24.00"
						},
						{
							href : "",
							name : "历史收益",
							value : "1024.00"
						}
					]
				} />
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
const init = () => {
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