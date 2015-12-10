import {Component} from "react";
import {Link} from "react-router";
const Select = class extends Component{
	render(){
		let props = this.props;
		return (
			<Link className={props.className} to={props.url}>
				<span>
					{props.placeholder}
				</span>
				<em>
					{props.choice}
				</em>
			</Link>
		);
	}
}
export default Select;