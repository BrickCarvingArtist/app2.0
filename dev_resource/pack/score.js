import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
class Part1 extends React.Component{
	render(){
		return (
			<div className="part1">
			</div>
		);
	}
}
class Part2 extends React.Component{
	render(){
		return (
			<div className="part2">
			</div>
		);
	}
}
class Record extends React.Component{
	render(){
		return (
			<div className="record">
			</div>
		);
	}
}
class Page extends React.Component{
	render(){
		return (
			<body>
				<Part1 />
				<Part2 />
				<Record />
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