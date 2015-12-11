import {Component} from "react";
const Case = class extends Component{
	constructor(props){
		super(props);
		this.state = {
			index : this.props.index,
			href : this.props.href,
			backgroundImage : this.props.backgroundImage
		}
	}
	render(){
		return (
			<a href={this.state.href} style={
				{
					backgroundImage : `url(${this.state.backgroundImage})`
				}
			}></a>
		);
	}
};
const Banner = class extends Component{
	constructor(props){
		super(props);
		this.state = {
			index : 0,
			data : this.props.data
		};
	}
	render(){
		let lists = [],
			data = this.state.data;
		data.map((list, index) => {
			lists.push(
				<Case index={index} href={list.href} backgroundImage={list.imgSrc} key={index} />
			);
		});
		lists.push(
			<Case index={0} href={data[0].href} backgroundImage={data[0].imgSrc} key={data.length} />
		);
		return (
			<header>
				<div className="container">
					{lists}
				</div>
			</header>
		);
	}
};
export default Banner;