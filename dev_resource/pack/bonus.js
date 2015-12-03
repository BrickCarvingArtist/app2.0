import React from "react";
import ReactDOM from "react-dom";
import {PageData, QueryString} from "./util";
import {Tab} from "../component/tab";
import {Content} from "../component/content";
class Rule extends React.Component{
	render(){
		return (
			<body>
				<img src="../images/bonusrule.png" />
			</body>
		);
	}
}
class Page extends React.Component{
	constructor(){
		super();
		this.state = {
			data : []
		};
	}
	componentDidMount(){
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
						this.setState({
							data : data.data,
							status : status
						});
					}
				} />
				<Content data={this.state.data} type="bonus" status={this.state.status} />
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