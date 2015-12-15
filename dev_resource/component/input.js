import {Component} from "react";
import {isMatch} from "../pack/util";
const Input = class extends Component{
	constructor(){
		super();
		this.state = {
			matched : 0
		};
		this.handleCheck = () => {
			let props = this.props;
			props.store.warning.component.setState({
				message : this.state.matched ? "" : `${props.placeholder}输入错误`
			});
			return this.state.matched;
		};
		this.handleEvent = e => {
			this.setState({
				matched : isMatch(this.props.className.split(" ")[1], e.target.value)
			}, this.handleCheck);
		};
	}
	render(){
		return (
			<input name={this.props.name} type={this.props.type} className={this.props.className} placeholder={this.props.placeholder} maxLength={this.props.maxLength} onChange={this.handleEvent} onBlur={this.handleEvent} />
		);
	}
}
export default Input;