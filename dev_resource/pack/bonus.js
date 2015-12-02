import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
import {Tab} from "../component/tab";
class Content extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data : props.data
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			data : nextProps.data
		});
	}
	render(){
		let lists = [],
			data = this.state.data;
		if(data){
			console.log(data)
		}else{
			lists[0] = (
				<div className="default"></div>
			);
		}
		return (
			<div className="content">
				{lists}
			</div>
		);
	}
}
class Page extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data : null
		};
	}
	render(){
		return (
			<body>
				<a className="rule bonus"></a>
				<Tab setting={
					[
						{
							name : "未使用",
							value : "/api/getbonus/0"
						},
						{
							name : "已使用",
							value : "/api/getbonus/1"
						},
						{
							name : "已过期",
							value : "/api/getbonus/2"
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