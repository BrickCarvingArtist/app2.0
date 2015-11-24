import React from "react";
class Case extends React.Component{
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
}
class Banner extends React.Component{
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
		data.forEach((list, index) => {
			lists.push(
				<Case index={index} href={list.href} backgroundImage={list.imgSrc} />
			);
		});
		lists.push(
			<Case index={0} href={data[0].href} backgroundImage={data[0].imgSrc} />
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
export {
	Banner
}