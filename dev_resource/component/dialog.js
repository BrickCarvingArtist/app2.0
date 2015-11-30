import React from "react";
export class Dialog extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			html : props.html
		};
	}
	componentDidMount(){
		if(this.state.html){
			document.querySelector(".shadow").style.display = "block";
		}
	}
	componentReceiveProps(nextProps){
		this.setState({
			html : nextProps.html
		});
	}
	render(){
		return (
			<div className="dialog">
				{this.state.html}
			</div>
		);
	}
}
Dialog.defaultProps = {
	html : ""
};