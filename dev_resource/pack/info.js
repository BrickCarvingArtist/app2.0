import {Component} from "react";
import ReactDOM from "react-dom";
import {PageData, QueryString} from "./util";
//消息详情组件
class InfoDetail extends Component{
	constructor(props){
		super(props);
		this.state = {
			title : props.title,
			time : props.time,
			source : props.source,
			detail : props.detail
		};
		this.checkMarkup = () => {
			return {
				__html : this.state.detail
			};
		};
	}
	render(){
		return (
			<section className="detail">
				<h1>
					{this.state.title}
				</h1>
				<h2>
					{`来源:${this.state.source}`}
				</h2>
				<div className="detail" dangerouslySetInnerHTML={this.checkMarkup()}></div>
				<span>
					{this.state.time}
				</span>
			</section>
		);
	}
}
//消息组件
class Info extends Component{
	constructor(props){
		super(props);
		this.state = {
			index : props.index,
			id : props.id,
			status : props.status,
			title : props.title,
			source : props.source,
			introduce : props.introduce,
			time : props.time
		};
	}
	componentDidMount(){
		ReactDOM.findDOMNode(this).onclick = () => {
			$.ajax({
				url : `/api/getinfo/${this.state.id}`,
				success : data => {
					document.title = this.state.title;
					document.body.style.backgroundColor = "white";
					if(!QueryString("index")){
						window.history.pushState({}, this.state.title, `?index=${this.state.index}`);
					}
					ReactDOM.render(
						<InfoDetail title={this.state.title} time={this.state.time} source={this.state.source} detail={data.data.details} />,
						document.body
					);
				}
			});
		};
	}
	render(){
		return (
			<section className={this.state.status ? "unread" : ""}>
				<h1>
					{this.state.title}
				</h1>
				<p>
					{this.state.introduce}
				</p>
				<span>
					{this.state.time}
				</span>
			</section>
		);
	}
}
//页面组件
class Page extends Component{
	constructor(props){
		super(props);
		this.state = {
			data : props.data
		};
	}
	componentDidMount(){
		if(QueryString("index")){
			ReactDOM.findDOMNode(this.refs[`info${QueryString("index")}`]).click();
		}
	}
	render(){
		let lists = [],
			data = this.state.data;
		data.forEach((list, index) => {
			lists.push(
				<Info index={index + 1} id={list.id} status={list.status} title={list.title} source={list.source} introduce={list.introduce} time={list.time.split(" ")[0]} ref={`info${index + 1}`} />
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
	PageData.setData("/api/getinfo", data => {
		document.title = "消息中心";
		document.body.style.backgroundColor = "rgb(244, 244, 244)";
		ReactDOM.render(
			<Page data={data.data} />,
			document.body
		);
	}).render(init);
};
export {
	init
}