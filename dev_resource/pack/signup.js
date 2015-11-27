import React from "react";
import ReactDOM from "react-dom";
import {PageData, QueryString, isMatch} from "./util";
import {Protocol} from "../component/protocol";
import {Warning} from "../component/warning";
class Form extends React.Component{
	constructor(){
		super();
		this.state = {
			matched : 0
		};
	}
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
		ReactDOM.findDOMNode(this.refs.btn).onclick = e => {
			if(!this.state.matched){
				e.preventDefault();
				ReactDOM.render(
					<Warning message={`${this.refs.mobile.placeholder}输入错误`} />,
					document.querySelector(".warning")
				);
			}
		};
	}
	render(){
		return (
			<form method="post" action="/api/signup">
				<input ref="mobile" className="longInput mobile" type="tel" placeholder="手机号码" />
				<input ref="password" className="longInput password" type="password" placeholder="密码" />
				<input ref="password" className="longInput password" type="password" placeholder="确认密码" />
				<input ref="captcha" className="shortInput captcha" type="text" placeholder="验证码" />
				<input className="shortBtn" type="button" value="获取" />
				<input className="longInput invitor" type="tel" placeholder="推荐人" />
				<input ref="ckb" className="ckb" id="ckb" type="checkbox" checked="checked" />
				<label htmlFor="ckb">
					<span>我同意</span>
					<b ref="btnProtocol">《喜蓝互联网金融平台用户协议》</b>
				</label>
				<input ref="btn" className="longBtn" type="submit" value="确认" />
			</form>
		);
	}
}
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