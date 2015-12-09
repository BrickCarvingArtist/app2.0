import React from "react";
import ReactDOM from "react-dom";
const Select = class extends React.Component{
	constructor(){
		super();
		this.state = {
			choice : "123"
		};
	}
	componentDidMount(){
		let detail = this.props.detail;
		if(detail){
			ReactDOM.findDOMNode(this).onclick = () => {
				ReactDOM.render(
					detail,
					document.body
				);
			};
		}
	}
	render(){
		return (
			<div className={this.props.className}>
				<span>
					{this.props.placeholder}
				</span>
				<em>
					{this.state.choice}
				</em>
			</div>
		);
	}
}
export default Select;