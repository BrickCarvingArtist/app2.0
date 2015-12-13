import {Component} from "react";
const Dialog = class extends Component{
	constructor(props){
		super(props);
		this.state = {
			html : props.html
		};
	}
	componentDidUpdate(){
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
export default Dialog;