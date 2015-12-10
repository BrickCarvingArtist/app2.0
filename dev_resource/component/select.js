import React from "react";
import ReactDOM from "react-dom";
import {Link} from "react-router";
const Select = class extends React.Component{
	constructor(){
		super();
		this.state = {
			choice : "123"
		};
	}
	render(){
		let props = this.props;
		return (
			<div className={props.className}>
				<Link to={props.url}>
					<span>
						{props.placeholder}
					</span>
					<em>
						{this.state.choice}
					</em>
				</Link>
			</div>
		);
	}
}
export default Select;