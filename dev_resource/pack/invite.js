import {Component} from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {PageData, QueryString} from "./util";
import {Info} from "../component/info";
import Tab from "../component/tab";
import Dialog from "../component/dialog";
import Warning from "../Component/warning";
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
	constructor(){
		super();
		this.getStatus = () => {
			let returnValue = "";
			switch(this.props.status){
				case 0:
					returnValue = "未投资";
					break;
				case 1:
					returnValue = "已投资";
					break;
			}
			return returnValue;
		};
	}
	render(){
		let props = this.props;
		return (
			<ul>
				<li>
					{props.mobile}
				</li>
				<li>
					{props.name || "***"}
				</li>
				<li>
					{this.getStatus()}
				</li>
				<li>
					{props.time}
				</li>
			</ul>
		);
	}
}
class Content extends Component{
	constructor(props){
		super(props);
		this.state = {
			data : props.data
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let lists = [],
			data = this.state.data;
		if(data.length){
			data.map((list, index) => {
				lists.push(
					<List mobile={list.phone} name={list.trueName} status={list.isNew} time={list.regTime.split(" ")[0]} key={index} />
				);
			});
		}else{
			lists[0] = (
				<div className="default"></div>
			);
		}
		return (
			<div className="content">
				<ul>
					<li>手机号码</li>
					<li>被邀请人</li>
					<li>投资状态</li>
					<li>邀请时间</li>
				</ul>
				{lists}
			</div>
		);
	}
}
class Detail extends Component{
	constructor(props){
		super(props);
		this.state = {
			data : []
		};
	}
	componentDidMount(){
		ReactDOM.findDOMNode(this.refs.tab.refs[`list${QueryString("status")}`]).click();
	}
	render(){
		return (
			<div className="page">
				<Info />
				<Tab ref="tab" setting={
					[
						{
							name : "全部",
							href : "/api/getinvite/0"
						},
						{
							name : "已投资",
							href : "/api/getinvite/1"
						},
						{
							name : "未投资",
							href : "/api/getinvite/2"
						}
					]
				} callback={
					data => {
						if(data.code === 200){
							this.setState({
								data : data.data
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
				} />
				<Content data={this.state.data} />
			</div>
		);
	}
}
class Case extends Component{
	componentDidMount(){
		ReactDOM.findDOMNode(this).onclick = () => {
			if(!QueryString("status")){
				window.history.pushState({}, document.title, `?status=${this.props.status}`);
			}
			ReactDOM.render(
				<Detail />,
				document.body
			);
		};
	}
	render(){
		return (
			<div ref="all">
				<p>
					{this.props.name}
				</p>
				<p>
					{this.props.value}
				</p>
			</div>
		);
	}
}
class Entrance extends Component{
	render(){
		let lists = [],
			setting = this.props.setting;
		setting.map((list, index) => {
			lists.push(
				<Case ref={`case${index + 1}`} name={list.name} value={list.value} status={index + 1} key={index} />
			);
		});
		return (
			<div className="entrance">
				{lists}
			</div>
		);
	}
}
Entrance.defaultProps = {
	setting : [
		{
			name : "邀请总人数",
			value : "0"
		},
		{
			name : "已邀请人数",
			value : "0"
		},
		{
			name : "未投资人数",
			value : "0"
		}
	]
};
class Rule extends Component{
	render(){
		return (
			<body>
				<img src="../images/inviterule.png" />
			</body>
		);
	}
}
class Page extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		store.dispatch({
			type : "warning",
			component : this.refs.warning
		});
		this.refs.rule.onclick = () => {
			if(!QueryString("rule")){
				document.title = "邀请规则";
				window.history.pushState({}, document.title, "?rule=1");
			}
			ReactDOM.render(
				<Rule />,
				document.body
			);
		};
		if(QueryString("rule")){
			this.refs.rule.click();
		}else if(QueryString("status")){
			ReactDOM.findDOMNode(this.refs.entrance.refs[`case${QueryString("status")}`]).click();
		}else{
			this.refs.dialog.setState({
				html : " ",
				enableClose : 1
			});
		}
	}
	render(){
		return (
			<body>
				<div className="warning">
					<Warning ref="warning" />
				</div>
				<a ref="rule" className="rule invite"></a>
				<Entrance ref="entrance" />
				<a className="longBtn">赶紧邀请小伙伴吧</a>
				<div className="shadow">
					<Dialog ref="dialog" />
				</div>
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