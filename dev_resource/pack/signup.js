import React from "react";
import ReactDOM from "react-dom";
import {PageData, QueryString} from "./util";
import {Protocol} from "../component/protocol";
import {Warning} from "../component/warning";
import {Input} from "../component/input";
class Form extends React.Component{
	componentDidMount(){
		this.refs.btnProtocol.onclick = () => {
			if(!QueryString("protocol")){
				document.title = "喜蓝互联网金融平台用户协议";
				window.history.pushState({}, document.title, "?protocol=1");
			}
			ReactDOM.render(
				<Protocol type="signIn" />,
				document.body
			);
		};
		ReactDOM.findDOMNode(this.refs.btnSubmit).onclick = e => {
			let refs = this.refs;
			for(let i of this.props.setting){
				if(!refs[i.ref].handleCheck()){
					e.preventDefault();
					return;
				}
			}
		};
	}
	render(){
		let lists = [],
			setting = this.props.setting;
		setting.forEach(list => {
			lists.push(
				<Input ref={list.ref} name={list.name} type={list.type} className={list.className} placeholder={list.placeholder} maxLength={list.maxLength} />
			);
		});
		return (
			<form method="post" action="/api/signup">
				{lists}
				<input className="shortBtn" type="button" value="获取" />
				<input className="longInput invitor" type="tel" placeholder="推荐人" maxLength="11" />
				<input ref="ckb" className="ckb" id="ckb" type="checkbox" checked="checked" />
				<label htmlFor="ckb">
					<span>我同意</span>
					<b ref="btnProtocol">《喜蓝互联网金融平台用户协议》</b>
				</label>
				<input ref="btnSubmit" className="longBtn" type="submit" value="确认" />
			</form>
		);
	}
}
Form.defaultProps = {
	setting : [
		{
			ref : "mobile",
			name : "mobile",
			type : "tel",
			className : "longInput mobile",
			placeholder : "手机号码",
			maxLength : "11"
		},
		{
			ref : "password",
			name : "password",
			type : "password",
			className : "longInput password",
			placeholder : "密码",
			maxLength : "20"
		},
		{
			ref : "rePassword",
			name : "rePassword",
			type : "password",
			className : "longInput mobile",
			placeholder : "确认密码",
			maxLength : "20"
		},
		{
			ref : "captcha",
			name : "captcha",
			type : "text",
			className : "shortInput captcha",
			placeholder : "验证码",
			maxLength : "5"
		}
	]
};
class Page extends React.Component{
	componentDidMount(){
		if(QueryString("protocol")){
			this.refs.form.refs.btnProtocol.click();
		}
	}
	render(){
		return (
			<body>
				<div className="warning">
					<Warning />
				</div>
				<Form ref="form" />
			</body>
		)
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