import React from "react";
import ReactDOM from "react-dom";
import {PageData, QueryString} from "./util";
class Sign extends React.Component{
	constructor(){
		super();
		this.state = {
			score : 0
		};
	}
	componentDidMount(){
		$.ajax({
			type : "post",
			url : "/api/sign",
			success : data => {
				$.ajax({
					url : "/api/getscore",
					success : data => {
						// this.setState({
						// 	score : data.data
						// });
						console.log(data);
					}
				});
			}
		});
	}
	render(){
		return (
			<body>
				<div className="sign">
					<b>
						{this.state.score}
					</b>
				</div>
			</body>
		);
	}
}
class Part1 extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			vip : props.vip,
			name : props.name,
			score : props.score
		}
	}
	componentDidMount(){
		if(!QueryString("sign")){
			$.ajax({
				url : "/api/getscore",
				success : data => {
					// this.setState({
					// 	score : data.data
					// });
					console.log(data);
				}
			});
		}
		this.refs.btnSign.onclick = () => {
			if(!QueryString("sign")){
				window.history.pushState({}, this.state.title, `?sign=1`);
			}
			ReactDOM.render(
				<Sign />,
				document.body
			);
		};
	}
	render(){
		let state = this.state;
		return (
			<div className="part1">
				<p>
					{`${state.vip}${state.name}`}
				</p>
				<p>
					<span>我的积分:</span>
					<b>{state.score}</b>
				</p>
				<i className="btnSign" ref="btnSign"></i>
			</div>
		);
	}
}
Part1.defaultProps = {
	vip : "普通会员",
	name : "＊＊＊",
	score : 0
};
class List extends React.Component{
	render(){
		return (
			<ul>
				<li>
					{this.props.time}
				</li>
				<li>
					{this.props.value}
				</li>
				<li>
					{this.props.datail}
				</li>
			</ul>
		);
	}
}
class Record extends React.Component{
	constructor(){
		super();
		this.state = {
			data : []
		};
	}
	componentDidMount(){
		if(!QueryString("sign")){
			$.ajax({
				url : "/api/getscoredetail",
				success : data => {
					this.setState({
						data : data.data || []
					});
				}
			});
		}
	}
	render(){
		let lists = [],
			data = this.state.data;
		if(data.length){
			data.forEach(list => {
				lists.push(
					<List time={list.time} value={list.value} detail={list.detail} />
				);
			});
		}else{
			lists = (
				<i className="default"></i>
			);
		}
		return (
			<div className="record">
				<h1>积分纪录</h1>
				<ul>
					<li>发生时间</li>
					<li>变更值</li>
					<li>变更详情</li>
				</ul>
				{lists}
			</div>
		);
	}
}
class Page extends React.Component{
	componentDidMount(){
		if(QueryString("sign")){
			this.refs.part1.refs.btnSign.click();
		}
	}
	render(){
		return (
			<body>
				<Part1 ref="part1" />
				<a className="entrance" href="/activity/score"></a>
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