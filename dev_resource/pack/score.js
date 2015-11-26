import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
class Part1 extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			vip : props.vip,
			name : props.name,
			score : props.score
		}
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
				<i className="sign"></i>
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
		$.ajax({
			url : "/api/getscoredetail",
			success : data => {
				this.setState({
					data : data.data || []
				});
			}
		});
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
	render(){
		return (
			<body>
				<Part1 />
				<a className="entrance" href="/activity/rule"></a>
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