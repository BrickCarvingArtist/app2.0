import React from "react";
import {render} from "react-dom";
import {Router, Route, Link} from "react-router";
import {createStore} from "redux";
import {setRem, QueryString} from "./util";
import {Content} from "../component/content";
import Input from "../component/input";
import Select from "../component/select";
import Warning from "../component/warning";
let store = createStore((state = [], action) => {
	if(state[action.type]){
		for(let i in action){
			state[action.type][i] = action[i];
		}
	}else{
		state[action.type] = action;
	}
	return state;
});
class List extends React.Component{
	constructor(){
		super();
		this.handleClick = () => {
			store.dispatch({
				type : "bill",
				bankNumber : this.props.value,
				id : this.props.id
			});
		};
	}
	render(){
		return (
			<Link className={this.props.className} to="/form" onClick={this.handleClick}>
				<span>
					{this.props.name}
				</span>
				<em>
					{this.props.value}
				</em>
			</Link>
		);
	}
}
class Bank extends React.Component{
	constructor(){
		super();
		this.state = {
			data : []
		};
	}
	componentDidMount(){
		$.ajax({
			url : "/api/getuserbank",
			success : data => {
				if(data.code === 200){
					this.setState({
						data : data.data
					});
				}else{
					store.getState().warning.component.setState({
						message : data.message
					});
					let t = setTimeout(() => {
						clearTimeout(t);
						window.location.href = "/signin";
					}, 1000);
				}
			}
		});
	}
	render(){
		let lists = [],
			data = this.state.data;
		data.map((list, index) => {
			lists.push(
				<List className={list.imgCss} name={list.bankName} value={list.cardNO} id={list.id} key={index}/>
			);
		});
		return (
			<div className="main">
				<div className="bank">
					{lists}
				</div>
				<i ref="btnAdd" className="add">点击添加银行卡</i>
			</div>
		);
	}
}
class Form extends React.Component{
	constructor(){
		super();
		this.handleProtocol = () => {
			store.getState().warning.component.setState({
				message : "请务必同意《喜蓝互联网金融平台支付协议》!",
				autoHide : 1
			});
		};
		this.handleClick = () => {
			console.log(store.getState());
		};
	}
	render(){
		let lists = [],
			setting = this.props.setting;
		setting.map((list, index) => {
			lists.push(
				<Select ref={list.ref} className={list.className} placeholder={list.placeholder} url={list.url} key={index} choice={store.getState().bill ? store.getState().bill[list.choice] : ""} />
			);
		});
		return (
			<div className="main form">
				{lists}
				<Input ref="captcha" name="captcha" type="text" className="shortInput captcha" placeholder="验证码" maxLength="5" store={store.getState()} />
				<input ref="btnCaptcha" className="shortBtn" type="button" value="获取" />
				<input ref="ckb" className="ckb" id="ckb" type="checkbox" checked="checked" readOnly="readOnly" onClick={this.handleProtocol} />
				<label htmlFor="ckb">
					<span>我同意</span>
					<b ref="btnProtocol">《喜蓝互联网金融平台支付协议》</b>
				</label>
				<input ref="btnSubmit" className="longBtn" type="button" value="确认" onClick={this.handleClick} />
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
			choice : "bonusMoney",
			url : "/bonus"
		},
		{
			ref : "interest",
			className : "select payInterest",
			placeholder : "选择加息券",
			choice : "interestRate",
			url : "/interest"
		},
		{
			ref : "bank",
			className : "select bank",
			placeholder : "选择银行卡",
			choice : "bankNumber",
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
	componentDidMount(){
		store.dispatch({
			type : "warning",
			component : this.refs.warning
		});
		store.dispatch({
			type : "bill",
			money : Math.min(QueryString("money", this.props.location.search))
		});
	}
	render(){
		return (
			<div className="page">
				<div className="warning">
					<Warning ref="warning" />
				</div>
				{this.props.children}
			</div>
		);
	}
};
const init = () => {
	setRem();
	document.body.style.opacity = 1;
	render(
		(
			<Router>
				<Route path="/" component={Page}>
					<Route path="form" component={Form} />
					<Route path="bonus" component={Bonus} />
					<Route path="interest" component={Interest} />
					<Route path="bank" component={Bank} />
				</Route>
			</Router>
		), document.body
	);
};
export {
	init
};