import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
import {Banner} from "../component/banner";
import {Menu} from "../component/menu";
class Info extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			index : this.props.index,
			currentIndex : this.props.currentIndex,
			data : this.props.data
		}
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			currentIndex : nextProps.currentIndex
		});	
	}
	render(){
		let data = this.state.data;
		return (
			<div className={`info${this.state.index === this.state.currentIndex ? " current" : ""}`}>
				<div className="bg"></div>
				<div className="circle">
					<h1>
						<strong>
							{(data.primeRate * 100).toFixed(1)}
						</strong>
						<em>％</em>
					</h1>
					<h2>
						{data.name}
					</h2>
				</div>
				<ul>
					<li>
						{`起投${data.minUnitCount*data.unitCount}元`}
					</li>
					<li>
						{`可投${data.lumpSum}元`}
					</li>
					<li>
						{`${data.days}天`}
					</li>
				</ul>
			</div>
		);
	}
}
class Button extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			href : this.props.href
		};
	}
	shouldComponentUpdate(nextProps, nextState){
		return this.state.href !== nextState.href;
	}
	render(){
		return (
			<a className="longBtn" href={`/api/getproduct/${this.state.href}`}>立即购买</a>
		);
	}
};
class Option extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			sum : this.props.sum,
			userClass : this.props.userClass,
			type : this.props.type
		};
	}
	componentDidMount(){
		let userClass = this.state.userClass,
			sum = this.state.sum;
		ReactDOM.findDOMNode(this).onclick = () => {
			let currentIndex = userClass.state.currentIndex;
			userClass.setState({
				currentIndex : this.state.type >> 1 ? currentIndex >= sum - 1 ? 0 : currentIndex + 1 : currentIndex <= 0 ? sum - 1 : currentIndex - 1
			});
		};
	}
	render(){
		return (
			<i className={this.state.type >> 1 ? "next" : "prev"}></i>
		);
	}
};
class Product extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentIndex : 0,
			data : this.props.data.data
		};
	}
	componentDidUpdate(){
		let state = this.state;
		this.refs.button.setState({
			href : state.data[state.currentIndex].id
		});
	}
	render(){
		let lists = [],
			data = this.state.data,
			dataLen = data.length;
		data.forEach((list, index) => {
			lists.push(
				<Info index={index} currentIndex={this.state.currentIndex} data={list} />
			);
		});
		return (
			<div className="product">
				{lists}
				<Option sum={dataLen} userClass={this} type={1} />
				<Option sum={dataLen} userClass={this} type={2} />
				<Button ref="button" href={this.state.data[this.state.currentIndex].id} />
			</div>
		);
	}
};
class Page extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data : this.props.data
		};
	}
	render(){
		return (
			<body>
				<Banner data={
					[
						{
							href : "/activity/1",
							imgSrc : "/images/banner/1.png"
						},
						{
							href : "/activity/2",
							imgSrc : "/images/banner/2.png"
						},
						{
							href : "/activity/3",
							imgSrc : "/images/banner/3.png"
						},
						{
							href : "/activity/4",
							imgSrc : "/images/banner/4.png"
						},
						{
							href : "/activity/5",
							imgSrc : "/images/banner/5.png"
						}
					]
				} />
				<Menu type={2} />
				<Product data={this.state.data} />
				<Menu type={1} currentIndex={0} />
			</body>
		);
	}
}
const init = () => {
	PageData.setData("/api/gethomeproduct", data => {
		ReactDOM.render(
			<Page data={data} />,
			document.body
		);
	}).render(init);
}
export {
	Page as main,
	init as init
};