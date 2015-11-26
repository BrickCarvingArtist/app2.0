import React from "react";
import ReactDOM from "react-dom";
import {PageData, QueryString} from "./util";
class List extends React.Component{
	render(){
		let data = this.props.data;
		return (
			<section></section>
		);
	}
}
class Page extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		let lists = [],
			data = this.props.data;
		data.forEach((list, index) => {
			lists.push(
				<List data={list} index={index+1} ref={`activity${index + 1}`} />
			);
		});
		return (
			<body>
				{lists}
			</body>
		);
	}
}
const init = () => {
	PageData.setData("/api/getactivity", data => {
		ReactDOM.render(
			<Page data={data.data} />,
			document.body
		);
	}).render(init);
};
export {
	init
}