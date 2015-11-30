import React from "react";
export class Warning extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			message : props.message
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			message : nextProps.message
		});
	}
	render(){
		return (
			<p className="message">
				{this.state.message}
			</p>
		);
	}
}
Warning.defaultProps = {
	message : ""
};