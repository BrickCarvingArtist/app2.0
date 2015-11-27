import React from "react";
class Warning extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			message : props.message
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			nextProps.message
		});
	}
	render(){
		return (
			<div className="warning">
				{this.state.message}
			</div>
		);
	}
}
Warning.defaultProps = {
	message : ""
};
export {
	Warning
}