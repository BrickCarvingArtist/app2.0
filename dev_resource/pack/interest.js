import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
class Page extends React.Component{
	render(){
		return (
			<body>
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