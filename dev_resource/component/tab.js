import React from "react";
import ReactDOM from "react-dom";
class List extends React.Component{
	constructor(){
		super();
		this.getData = userClass => {
			$.ajax({
				url : this.props.value,
				success : data => {
					userClass.setState({
						currentIndex : this.props.index
					});
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
		return (
			<a className={this.props.index === userClass.state.currentIndex ? "current" : ""}>
				{this.props.name}
			</a>
		);
	}
}
class Tab extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			currentIndex : props.currentIndex
		};
	}
	componentDidMount(){
		ReactDOM.findDOMNode(this.refs.list1).click();
	}
	shouldComponentUpdate(nextProps, nextState){
		return this.state.currentIndex !== nextState.currentIndex;
	}
	render(){
		let lists = [],
			setting = this.props.setting;
		setting.forEach((list, index) => {
			lists.push(
				<List userClass={this} ref={`list${index + 1}`} index={index + 1} name={list.name} value={list.value} status={index} />
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
export {
	Tab
}