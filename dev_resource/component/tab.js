import React from "react";
import ReactDOM from "react-dom";
class List extends React.Component{
	constructor(){
		super();
		this.setCurrent = () => {
			let userClass = this.props.userClass,
				dom = ReactDOM.findDOMNode(this);
			if(this.props.index === userClass.state.currentIndex){
				dom.classList.add("current");
			}else{
				dom.classList.remove("current");
			}
		};
		this.getData = userClass => {
			$.ajax({
				url : this.props.value,
				success : data => {
					userClass.setState({
						currentIndex : this.props.index
					});
					userClass.props.callback(data);
				}
			});
		};
	}
	componentDidMount(){
		let dom = ReactDOM.findDOMNode(this),
			userClass = this.props.userClass;
		dom.onclick = () => {
			if(this.props.index !== userClass.state.currentIndex){
				this.getData(userClass);
			}
		};
	}
	componentDidUpdate(){
		this.setCurrent();
	}
	render(){
		return (
			<a>
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
				<List userClass={this} ref={`list${index + 1}`} index={index + 1} name={list.name} value={list.value} />
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