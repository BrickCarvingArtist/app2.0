import React from "react";
import ReactDOM from "react-dom";
import {PageData, QueryString} from "./util";
import {Protocol} from "../component/protocol";
import {Warning} from "../component/warning";
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
		}
	}
	render(){
		return (
			<form method="post" action="/api/signup">
				<input className="longInput mobile" type="tel" placeholder="手机号码" />
				<input className="longInput password" type="password" placeholder="密码" />
				<input className="longInput password" type="password" placeholder="确认密码" />
				<input className="shortInput captcha" type="text" placeholder="验证码" />
				<input className="shortBtn" type="button" value="获取" />
				<input className="longInput invitor" type="tel" placeholder="推荐人" />
				<input className="ckb" id="ckb" type="checkbox" checked="checked" />
				<label htmlFor="ckb">
					<span>我同意</span>
					<b ref="btnProtocol">《喜蓝互联网金融平台用户协议》</b>
				</label>
				<input className="longBtn" type="submit" value="确认" />
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