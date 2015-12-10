import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Link} from "react-router";
import {createStore} from "redux";
import {Provider, connect} from "react-redux";
import {setRem, QueryString} from "./util";
import Input from "../component/input";
import {Content} from "../component/content";
import Select from "../component/select";
import {Warning} from "../component/warning";
// class List extends React.Component{
// 	render(){
// 		return (
// 			<li className={this.props.className}>
// 				<span>
// 					{this.props.name}
// 				</span>
// 				<em>
// 					{this.props.value}
// 				</em>
// 			</li>
// 		);
// 	}
// }
// class Bank extends React.Component{
// 	constructor(){
// 		super();
// 		this.state = {
// 			data : []
// 		};
// 	}
// 	componentDidMount(){
// 		$.ajax({
// 			url : "/api/getuserbank",
// 			success : data => {
// 				if(data.code === 200){
// 					this.setState({
// 						data : data.data
// 					});
// 				}else{
// 					let warning = document.querySelector(".warning");
// 					if(warning){
// 						ReactDOM.render(
// 							<Warning message={data.message} />,
// 							warning
// 						);
// 						let t = setTimeout(() => {
// 							clearTimeout(t);
// 							window.location.href = "/signin";
// 						}, 1000);
// 					}
// 				}
// 			}
// 		});
// 	}
// 	render(){
// 		let lists = [],
// 			data = this.state.data;
// 		data.forEach(list => {
// 			lists.push(
// 				<List className={list.imgCss} name={list.bankName} value={list.cardNO} id={list.id} />
// 			);
// 		});
// 		return (
// 			<body>
// 				<div className="warning">
// 					<Warning />
// 				</div>
// 				<ul className="bank">
// 					{lists}
// 				</ul>
// 				<i ref="btnAdd" className="add">点击添加银行卡</i>
// 			</body>
// 		);
// 	}
// }
class Form extends React.Component{
	constructor(){
		super();
		this.handleClick = () => {
			console.log(this.props.routes[0]);
		};
	}
	render(){
		let lists = [],
			setting = this.props.setting;
		setting.map((list, index) => {
			lists.push(
				<Select ref={list.ref} className={list.className} placeholder={list.placeholder} url={list.url} key={index} />
			);
		});
		return (
			<div className="main form">
				{lists}
				<Input ref="captcha" name="captcha" type="text" className="shortInput captcha" placeholder="验证码" maxLength="5" />
				<input ref="btnCaptcha" className="shortBtn" type="button" value="获取" />
				<input ref="ckb" className="ckb" id="ckb" type="checkbox" checked="checked" readOnly="readOnly" onClick={this.handleClick} />
				<label htmlFor="ckb">
					<span>我同意</span>
					<b ref="btnProtocol">《喜蓝互联网金融平台支付协议》</b>
				</label>
				<input ref="btnSubmit" className="longBtn" type="button" value="确认" />
			</div>
		);
	}
}
Form.defaultProps = {
	setting : [
		{
			ref : "bonus",
			className : "select payBonus",
			placeholder : "选择理财红包",
			value : "bonus",
			url : "/bonus"
		},
		{
			ref : "interest",
			className : "select payInterest",
			placeholder : "选择加息券",
			value : "interest",
			url : "/interest"
		},
		{
			ref : "bank",
			className : "select bank",
			placeholder : "选择银行卡",
			value : "bank",
			url : "/bank"
		}
	]
};
class Bonus extends React.Component{
	render(){
		return (
			<div className="main">
				<Content url="/api/getbonus/0" type="bonus" status="0" />
			</div>
		);
	}
}
class Interest extends React.Component{
	render(){
		return (
			<div className="main">
				<Content url="/api/getbonus/0" type="interest" status="0" />
			</div>
		);
	}
}
const Page = class extends React.Component{
	render(){
		return (
			<div className="page">
				<div className="warning">
					<Warning />
				</div>
				{this.props.children}
			</div>
		);
	}
};
const init = () => {
	setRem();
	document.body.style.opacity = 1;
	ReactDOM.render(
		(
			<Router>
				<Route path="/" component={Page}>
					<Route path="form" component={Form} />
					<Route path="bonus" component={Bonus} />
					<Route path="interest" component={Interest} />
				</Route>
			</Router>
		), document.body
	);
};
export {
	init
};