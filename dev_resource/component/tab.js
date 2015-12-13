import React from "react";
import ReactDOM from "react-dom";
import {QueryString} from "../pack/util";
const List = class extends React.Component{
	constructor(){
		super();
		this.getData = userClass => {
			$.ajax({
				url : this.props.href,
				success : data => {
					userClass.setState({
						currentIndex : this.props.index
					});
					if(parseInt(QueryString("status")) !== this.props.index){
						window.history.pushState({}, document.title, `/profit?status=${this.props.index}`);
					}
					userClass.props.callback(data, this.props.status);
				}
			});
		};
	}
	componentDidMount(){
		let userClass = this.props.userClass;
		ReactDOM.findDOMNode(this).onclick = () => {
			if(this.props.index !== userClass.state.currentIndex){
				this.getData(userClass);
			}
		};
	}
	render(){
		let userClass = this.props.userClass;
		return this.props.value + 0 ?
		(
			<a className={this.props.index === userClass.state.currentIndex ? "current" : ""}>
				<h1>
					{this.props.name}
				</h1>
				<h2>
					{(this.props.value || 0).toFixed(2)}
				</h2>
			</a>
		) :
		(
			<a className={this.props.index === userClass.state.currentIndex ? "current" : ""}>
				{this.props.name}
			</a>
		);
	}
}
const Tab = class extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentIndex : props.currentIndex
		};
	}
	componentDidMount(){
		ReactDOM.findDOMNode(this.refs[`list${QueryString("status")}`]).click();
	}
	shouldComponentUpdate(nextProps, nextState){
		return this.state.currentIndex !== nextState.currentIndex;
	}
	render(){
		let lists = [],
			setting = this.props.setting;
		setting.map((list, index) => {
			lists.push(
				<List userClass={this} ref={`list${index + 1}`} index={index + 1} name={list.name} value={list.value} href={list.href} status={index} key={index} />
			);
		});
		return (
			<menu className="tab">
				{lists}
			</menu>
		);
	}
}
Tab.defaultProps = {
	currentIndex : 0
};
export default Tab;