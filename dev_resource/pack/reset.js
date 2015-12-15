import {Component} from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
import Warning from "../component/warning";
import Input from "../component/input";
class Form extends Component{
	componentDidMount(){
		let refs = this.refs,
			domMobile = ReactDOM.findDOMNode(refs.mobile),
			domPassword = ReactDOM.findDOMNode(refs.password),
			domRePassword = ReactDOM.findDOMNode(refs.rePassword),
			domCaptcha = ReactDOM.findDOMNode(refs.captcha),
			domBtnCaptcha = ReactDOM.findDOMNode(refs.btnCaptcha);
		domBtnCaptcha.onclick = () => {
			if(refs.mobile.handleCheck()){
				$.ajax({
					url : `/api/reset?mobile=${domMobile.value}`,
					success : data => {
						ReactDOM.render(
							<Warning message={data.message} />,
							document.querySelector(".warning")
						);
					}
				});
			}
		};
		ReactDOM.findDOMNode(refs.btnSubmit).onclick = () => {
			let match = 1;
			for(let i of this.props.setting){
				if(!refs[i.ref].handleCheck()){
					match = 0;
					return;
				}else{
					if(domPassword.value !== domRePassword.value){
						ReactDOM.render(
							<Warning message="两次输入的密码不一致" />,
							document.querySelector(".warning")
						);
						match = 0;
						return;
					}
				}
			}
			if(match){
				$.ajax({
					type : "post",
					url : "/api/reset",
					data : {
						mobile : domMobile.value,
						password : domPassword.value,
						rePassword : domRePassword.value,
						captcha : domCaptcha.value
					},
					success : data => {
						ReactDOM.render(
							<Warning message={data.message} />,
							document.querySelector(".warning")
						);
						if(data.code === 200){
							let t = setTimeout(() => {
								clearTimeout(t);
								window.location.href = "/me";
							}, 1000);
						}
					}
				});
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
			<form>
				{lists}
				<input ref="btnCaptcha" className="shortBtn" type="button" value="获取" />
				<input ref="btnSubmit" className="longBtn" type="button" value="确认" />
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
class Page extends Component{
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