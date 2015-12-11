import {Component} from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
class List extends Component{
	render(){
		let data = this.props.data;
		return (
			<section>
				<a href={data.linkWeixin}>
					<img src={data.imgWeixin} />
				</a>
				<p>{`活动时间 ${data.beginDate} 到 ${data.endDate}`}</p>
			</section>
		);
	}
}
class Page extends Component{
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