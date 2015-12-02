import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
import {Tab} from "../component/tab";
import {Content} from "../component/content";
class Page extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data : []
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
					(data, status) => {
						this.setState({
							data : data.data,
							status : status
						});
					}
				} />
				<Content data={this.state.data} type="interest" status={this.state.status} />
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