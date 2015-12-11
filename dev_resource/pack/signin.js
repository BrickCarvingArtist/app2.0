import {Component} from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {PageData} from "./util";
import Banner from "../component/banner";
import Warning from "../component/warning";
import Input from "../component/Input";
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
class Form extends Component{
	componentDidMount(){
		let refs = this.refs,
			domMobile = ReactDOM.findDOMNode(refs.mobile),
			domPassword = ReactDOM.findDOMNode(refs.password);
		ReactDOM.findDOMNode(refs.btnSubmit).onclick = () => {
			let match = 1;
			for(let i of this.props.setting){
				if(!refs[i.ref].handleCheck()){
					match = 0;
					return;
				}
			}
			if(match){
				$.ajax({
					type : "post",
					url : "/api/signin",
					data : {
						mobile : domMobile.value,
						password : domPassword.value
					},
					success : data => {
						store.getState().warning.component.setState({
							message : data.message
						});
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
		setting.map((list, index) => {
			lists.push(
				<Input ref={list.ref} name={list.name} type={list.type} className={list.className} placeholder={list.placeholder} maxLength={list.maxLength} store={store.getState()} key={index} />
			);
		});
		return (
			<form>
				{lists}
				<a href="/reset">忘记密码?</a>
				<input ref="btnSubmit" className="longBtn" type="button" value="确认" />
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
class Page extends Component{
	componentDidMount(){
		store.dispatch({
			type : "warning",
			component : this.refs.warning
		});
	}
	render(){
		return (
			<div className="page">
				<div className="warning">
					<Warning ref="warning" />
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
			</div>
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