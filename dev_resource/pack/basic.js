import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
import {Info} from "../component/info";
class Page extends React.Component{
	render(){
		return (
			<body>
				<Info />
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