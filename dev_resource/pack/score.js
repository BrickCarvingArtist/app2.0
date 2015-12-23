import {Component} from "react";
import ReactDOM from "react-dom";
import {createStore} from "redux";
import {PageData, QueryString} from "./util";
import Warning from "../component/warning";
let store = createStore((state = [], action) => {
	if(state[action.type]){
		for(let i in action){
			state[action.type][i] = action[i];
		}
	}else{
		state[action.type] = action;
	}
	return state;
});
class Sign extends Component{
	constructor(){
		super();
		this.state = {
			score : 0
		};
		this.getScore = day => {
			return day > 10 ? 20 : day * 2;
		};
	}
	componentDidMount(){
		$.ajax({
			type : "post",
			url : "/api/sign",
			success : data => {
				if(data.code === 200 || data.code === 300){
					this.setState({
						score : this.getScore(parseInt(data.message))
					});
					if(data.code === 300){
						store.getState().warning.component.setState({
							message : "今日已签到"
						});	
					}
				}else if(data.code === 405){
					store.getState().warning.component.setState({
						message :  data.message
					});
				}
			}
		});
	}
	render(){
		return (
			<div className="page">
				<div className="warning">
					<Warning ref="warning" />
				</div>
				<div className="sign">
					<b>
						{this.state.score}
					</b>
				</div>
			</div>
		);
	}
}
class Part1 extends Component{
	constructor(props){
		super(props);
		this.state = {
			vip : props.vip,
			name : props.name,
			score : props.score
		}
	}
	componentDidMount(){
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
	name : "***",
	score : 0
};
class List extends Component{
	constructor(props){
		super(props);
		this.state = {
			time : props.time,
			value : props.value,
			detail : props.detail
		};
	}
	render(){
		let state = this.state;
		return (
			<ul>
				<li>
					{state.time}
				</li>
				<li>
					{state.value}
				</li>
				<li>
					{state.detail}
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
	render(){
		let lists = [],
			data = this.state.data;
		if(data.length){
			data.forEach(list => {
				lists.push(
					<List time={list.createDate} value={list.points} detail={list.remark} />
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
class Page extends Component{
	componentDidMount(){
		if(QueryString("sign")){
			let refs = this.refs;
			refs.part1.refs.btnSign.click();
			store.dispatch({
				type : "warning",
				component : refs.warning
			});
		}else{
			let refs = this.refs;
			$.ajax({
				type : "post",
				url : "/api/getauth",
				success : data => {
					if(data.code === 200){
						refs.part1.setState({
							vip : data.vip,
							name : data.name
						});
					}else{
						this.refs.warning.setState({
							message : data.message
						});
						if(data.code !== 405){
							let t = setTimeout(() => {
								clearTimeout(t);
								window.location.href = "/signin";
							}, 1000);
						}
					}
				}
			});
			$.ajax({
				url : "/api/getscore",
				success : data => {
					if(data.code === 200){
						refs.part1.setState({
							score : JSON.parse(data.other).points
						});
						refs.record.setState({
							data : data.data || []
						});
					}else{
						this.refs.warning.setState({
							message : data.message
						});
						if(data.code !== 405){
							let t = setTimeout(() => {
								clearTimeout(t);
								window.location.href = "/signin";
							}, 1000);
						}
					}
				}
			});
		}
	}
	render(){
		return (
			<body>
				<div className="warning">
					<Warning ref="warning" />
				</div>
				<Part1 ref="part1" />
				<a className="entrance" href="/activity/score"></a>
				<Record ref="record" />
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