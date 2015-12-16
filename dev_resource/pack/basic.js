import {Component} from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {PageData} from "./util";
import Info from "../component/info";
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
class List extends Component{
	render(){
		return (
			<div>
				<h1 className={this.props.className}>
					<span>
						{this.props.name}
					</span>
					<em>
						{this.props.value}
					</em>
				</h1>
			</div>
		);
	}
}
class Detail extends Component{
	constructor(props){
		super(props);
		this.state = {
			setting : props.setting
		};
	}
	componentDidMount(){
		let setting = this.state.setting;
		$.ajax({
			type : "post",
			url : "/api/getauth",
			success : data => {
				if(data.code === 200){
					setting[0].value = data.name;
					setting[1].value = data.idNumber;
					this.setState({
						setting : setting
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
		$.ajax({
			url : "/api/getuserbank",
			success : data => {
				if(data.code === 200){
					data.data.map(list => {
						setting.push({
							className : list.imgCss,
							name : list.bankName,
							value : list.cardNO
						});
						this.setState({
							setting : setting
						});
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
		})
	}
	render(){
		let lists = [],
			setting = this.state.setting;
		setting.map((list, index) => {
			lists.push(
				<List className={list.className} name={list.name} value={list.value} key={index} />
			);
		});
		return (
			<div className="detail">
				{lists}
			</div>
		);
	}
}
Detail.defaultProps = {
	setting : [
		{
			className : "name",
			name : "账户名",
			value : ""
		},
		{
			className : "idCard",
			name : "身份证",
			value : ""
		}
	]
};
class Page extends Component{
	componentDidMount(){
		let warning = this.refs.warning;
		store.dispatch({
			type : "warning",
			component : warning
		});
		this.refs.btn.onclick = () => {
			$.ajax({
				url : "/api/signout",
				success : data => {
					warning.setState({
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
		};
	}
	render(){
		return (
			<div className="page">
				<div className="warning">
					<Warning ref="warning"/>
				</div>
				<Info />
				<Detail />
				<a ref="btn" className="longBtn">安全退出</a>
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