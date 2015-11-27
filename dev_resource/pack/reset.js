import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
class Form extends React.Component{
	render(){
		return (
			<form method="post" action="/api/reset">
				<input className="longInput mobile" type="tel" placeholder="手机号码" />
				<input className="shortInput captcha" type="text" placeholder="验证码" />
				<input className="shortBtn" type="button" value="获取" />
				<input className="longInput password" type="password" placeholder="新密码" />
				<input className="longInput password" type="password" placeholder="确认密码" />
				<input className="longBtn" type="submit" value="确认" />
			</form>
		);
	}
}
class Page extends React.Component{
	render(){
		return (
			<body>
				<Form />
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