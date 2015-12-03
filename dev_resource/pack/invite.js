import React from "react";
import ReactDOM from "react-dom";
import {PageData, QueryString} from "./util";
import {Info} from "../component/info";
import {Tab} from "../component/tab";
import {Dialog} from "../component/dialog";
class List extends React.Component{
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
class Content extends React.Component{
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
			data.forEach(list => {
				lists.push(
					<List mobile={list.phone} name={list.trueName} status={list.isNew} time={list.regTime.split(" ")[0]} />
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
class Detail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data : []
		};
	}
	componentDidMount(){
		if(QueryString("status")){
			ReactDOM.findDOMNode(this.refs.tab.refs[`list${QueryString("status")}`]).click();
		}
	}
	render(){
		return (
			<body>
				<Info />
				<Tab ref="tab" setting={
					[
						{
							name : "全部",
							value : "/api/getinvite/0"
						},
						{
							name : "已投资",
							value : "/api/getinvite/1"
						},
						{
							name : "未投资",
							value : "/api/getinvite/2"
						}
					]
				} callback={
					data => {
						this.setState({
							data : data.data
						});
					}
				} />
				<Content data={this.state.data} />
			</body>
		);
	}
}
class Case extends React.Component{
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
class Entrance extends React.Component{
	render(){
		let lists = [],
			setting = this.props.setting;
		setting.forEach((list, index) => {
			lists.push(
				<Case ref={`case${index + 1}`} name={list.name} value={list.value} status={index + 1} />
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
class Rule extends React.Component{
	render(){
		return (
			<body>
				<img src="../images/inviterule.png" />
			</body>
		);
	}
}
class Page extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
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
			ReactDOM.render(
				<Dialog html=" " enableClose="1" />,
				document.querySelector(".shadow")
			);
		}
	}
	render(){
		return (
			<body>
				<a ref="rule" className="rule invite"></a>
				<Entrance ref="entrance" />
				<a className="longBtn">赶紧邀请小伙伴吧</a>
				<div className="shadow">
					<Dialog />
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