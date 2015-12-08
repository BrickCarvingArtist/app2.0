import React from "react";
import ReactDOM from "react-dom";
import {PageData, QueryString} from "./util";
import Input from "../component/input";
import Select from "../component/select";
class Form extends React.Component{
	componentDidMount(){
		let refs = this.refs,
			domBtnCaptcha = ReactDOM.findDOMNode(refs.btnCaptcha),
			domAgreement = ReactDOM.findDOMNode(refs.ckb);
		domBtnCaptcha.onclick = () => {
			$.ajax({
				type : "post",
				url : `/api/paycode?mobile=${domMobile.value}`,
				data : {},
				success : data => {
					ReactDOM.render(
						<Warning message={data.message} />,
						document.querySelector(".warning")
					);
				}
			});
		};
		ReactDOM.findDOMNode(refs.btnSubmit).onclick = () => {
			if(domAgreement.checked){
				$.ajax({
					type : "post",
					url : "/api/pay",
					data : {},
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
				<Select />
				{lists}
				<input ref="btnCaptcha" className="shortBtn" type="button" value="获取" />
				<input ref="ckb" className="ckb" id="ckb" type="checkbox" checked="checked" />
				<label htmlFor="ckb">
					<span>我同意</span>
					<b ref="btnProtocol">《喜蓝互联网金融平台用户协议》</b>
				</label>
				<input ref="btnSubmit" className="longBtn" type="button" value="确认" />
			</form>
		);
	}
}
Form.defaultProps = {
	setting : [
		{
			ref : "captcha",
			name : "captcha",
			type : "text",
			className : "shortInput captcha",
			placeholder : "验证码",
			maxLength : "11"
		}
	]
};
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
		React.render(
			<Page />,
			document.body
		);
	}).render(init);
};
export {
	init
};