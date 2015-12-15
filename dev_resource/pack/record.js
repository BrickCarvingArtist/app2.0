import {Component} from "react";
import ReactDOM from "react-dom";
import {PageData, QueryString} from "./util";
class Page extends Component{
	render(){
		return (
			<div className="page"></div>
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