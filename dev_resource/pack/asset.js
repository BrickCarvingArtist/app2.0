import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
class Page extends React.Component{
	componentDidMount(){
		$.ajax({
			type : "post",
			url : "/api/getinvest",
			success : data => {
				console.log(data)
			}
		});
	}
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