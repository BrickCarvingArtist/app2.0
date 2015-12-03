import React from "react";
import ReactDOM from "react-dom";
import {PageData, QueryString} from "./util";
import {Info} from "../component/info";
import {Tab} from "../component/tab";
class Page extends React.Component{
	render(){
		return (
			<body></body>
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