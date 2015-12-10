import React from "react";
import ReactDOM from "react-dom";
import Warning from "./warning";
class List extends React.Component{
	constructor(){
		super();
		this.getStatus = () => {
			let returnValue = "";
			switch(this.props.status){
				case 0:
					returnValue = `${this.props.expirationDate}到期`;
					break;
				case 1:
					returnValue = "已使用";
					break;
				case 2:
					returnValue = "已过期";
					break;
			}
			return returnValue;
		}
	}
	render(){
		let props = this.props;
		return (
			<section>
				<b>
					{props.money}
				</b>
				<p>
					{props.name}
				</p>
				<p>
					<span>
						{`单笔投资≥${props.condition}元`}
					</span>
					<em>
						{this.getStatus()}
					</em>
				</p>
			</section>
		);
	}
}
class Content extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data : props.data || [],
			status : 0
		};
		this.getClassName = () => {
			let returnValue = "";
			switch(this.state.status){
				case 0:
					returnValue = " available";
					break;
				case 1:
				case 2:
					returnValue = " unavailable";
					break;
				default:
					returnValue = "";
					break;
			}
			return returnValue;
		};
	}
	componentDidMount(){
		if(this.props.url){
			$.ajax({
				url : this.props.url,
				success : data => {
					if(data.code === 200){
						this.setState({
							data : data.data
						});
					}else{
						let warning = document.querySelector(".warning");
						if(warning){
							ReactDOM.render(
								<Warning message={data.message} />,
								warning
							);
							let t = setTimeout(() => {
								clearTimeout(t);
								window.location.href = "/signin";
							}, 1000);
						}
					}
				}
			});
		}
	}
	componentWillReceiveProps(nextProps){
		this.setState(nextProps);
	}
	render(){
		let lists = [],
			data = this.state.data;
		if(data.length){
			data.map((list, index) => {
				lists.push(
					<List ref={`list${index + 1}`} money={list.money} name={list.name} condition={list.conditions} expirationDate={list.expirationDate.split(" ")[0]} status={list.status} id={list.id} callback={this.props.callback} key={index} />
				);
			});
		}else{
			lists[0] = (
				<div className="default"></div>
			);
		}
		return (
			<div className={`content ${this.props.type}${this.getClassName()}`}>
				{lists}
			</div>
		);
	}
}
export {
	Content
}