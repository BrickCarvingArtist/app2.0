import React from "react";
const Warning = class extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			message : props.message,
			autoHide : props.autoHide
		};
		this.autoHide = () => {
			if(this.state.autoHide){
				let t = setTimeout(() => {
					clearTimeout(t);
					this.setState({
						message : ""
					});
				}, 2500);
			}
		};
	}
	componentWillReceiveProps(nextProps){
		this.setState({
			message : nextProps.message
		});
	}
	componentDidMount(){
		this.autoHide();
	}
	shouldComponentUpdate(nextProps, nextState){
		return nextProps.message !== this.props.message || nextState.message !== this.state.message;
	}
	componentDidUpdate(){
		this.autoHide();
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
export {
	Warning
}