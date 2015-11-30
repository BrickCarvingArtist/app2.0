import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
import {Warning} from "../component/warning";
import {Input} from "../component/input";
class Form extends React.Component{
	componentDidMount(){
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
			<form method="post" action="/api/reset">
				{lists}
				<input className="shortBtn" type="button" value="获取" />
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
			placeholder : "新密码",
			maxLength : "20"
		},
		{
			ref : "rePassword",
			name : "rePassword",
			type : "password",
			className : "longInput password",
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
	render(){
		return (
			<body>
				<div className="warning">
					<Warning />
				</div>
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