import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
import {Banner} from "../component/banner";
import {Warning} from "../component/warning";
import {Input} from "../component/Input";
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
			<form method="post" action="/api/signin">
				{lists}
				<a href="/reset">忘记密码?</a>
				<input ref="btnSubmit" className="longBtn" type="submit" value="确认" />
				<p>
					<span>还没账号?</span>
					<a href="/signup">立即注册</a>
				</p>
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
				<Banner data={
					[
						{
							href : "/activity/1",
							imgSrc : "/images/banner/1.png"
						},
						{
							href : "/activity/2",
							imgSrc : "/images/banner/2.png"
						},
						{
							href : "/activity/3",
							imgSrc : "/images/banner/3.png"
						},
						{
							href : "/activity/4",
							imgSrc : "/images/banner/4.png"
						},
						{
							href : "/activity/5",
							imgSrc : "/images/banner/5.png"
						}
					]
				} />
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