import React from "react";
class Warning extends React.Component{
	constructor(props){
		super(props);
	}
	componentWillReceiveProps(nextProps){
		this.setState({

		});
	}
	render(){
		return (
			<div className="warning"></div>
		);
	}
}
Warning.defaultProps = {

};
export {
	Warning
}