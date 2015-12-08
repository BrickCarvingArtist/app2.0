import React from "react";
import ReactDOM from "react-dom";
import {Warning} from "../component/warning";
import {isMatch} from "../pack/util";
const Input = class extends React.Component{
	constructor(){
		super();
		this.state = {
			matched : 0
		};
		this.handleCheck = () => {
			ReactDOM.render(
				<Warning message={this.state.matched ? "" : `${this.props.placeholder}输入错误`} />,
				document.querySelector(".warning")
			);
			return this.state.matched;
		};
	}
	componentDidMount(){
		let dom = ReactDOM.findDOMNode(this);
		dom.onchange = dom.onblur = e => {
			this.setState({
				matched : isMatch(this.props.className.split(" ")[1], e.target.value)
			});
		};
	}
	componentDidUpdate(){
		this.handleCheck();
	}
	render(){
		return (
			<input name={this.props.name} type={this.props.type} className={this.props.className} placeholder={this.props.placeholder} maxLength={this.props.maxLength} />
		);
	}
}
export default Input;