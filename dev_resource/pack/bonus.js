import {Component} from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {PageData, QueryString} from "./util";
import Tab from "../component/tab";
import Content from "../component/content";
import Warning from "../component/warning";
//状态寄存器
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
//红包规则组件
class Rule extends Component{
	render(){
		return (
			<body>
				<img src="../images/bonusrule.png" />
			</body>
		);
	}
}
//页面组件
class Page extends Component{
	constructor(){
		super();
		this.state = {
			data : []
		};
	}
	componentDidMount(){
		store.dispatch({
			type : "warning",
			component : this.refs.warning
		});
		this.refs.rule.onclick = () => {
			if(!QueryString("rule")){
				document.title = "加息规则";
				window.history.pushState({}, document.title, "?rule=1");
			}
			ReactDOM.render(
				<Rule />,
				document.body
			);
		};
		if(QueryString("rule")){
			this.refs.rule.click();
		}
	}
	render(){
		return (
			<body>
				<div className="warning">
					<Warning ref="warning" />
				</div>
				<a ref="rule" className="rule bonus"></a>
				<Tab setting={
					QueryString("rule") ?
					[] :
					[
						{
							name : "未使用",
							href : "/api/getbonus/0"
						},
						{
							name : "已使用",
							href : "/api/getbonus/1"
						},
						{
							name : "已过期",
							href : "/api/getbonus/2"
						}
					]
				} callback={
					(data, status) => {
						if(data.code === 200){
							this.setState({
								data : data.data,
								status : status
							});
						}else{
							this.refs.warning.setState({
								message : data.message
							});
							if(data.code !== 405){
								let t = setTimeout(() => {
									clearTimeout(t);
									window.location.href = "/signin";
								}, 1000);
							}
						}
					}
				} />
				<Content data={this.state.data} type="bonus" status={this.state.status} store={store.getState()} />
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