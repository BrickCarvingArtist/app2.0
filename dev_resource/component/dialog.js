import React from "react";
class Dialog extends React.Component{
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
		let domShadow = document.querySelector(".shadow");
		domShadow.onclick = () => {
			if(this.props.enableClose){
				domShadow.style.display = "none";
			}
		};
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
export {
	Dialog
}