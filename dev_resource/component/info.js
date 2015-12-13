import React from "react";
import Dialog from "./dialog";
class Info extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			vip : "普通会员",
			name : "***"
		};
	}
	componentDidMount(){
		$.ajax({
			url : "/api/getauth",
			success : data => {
				if(data.code === 200){
					$.ajax({
						type : "post",
						url : "/api/getauth",
						success : data => {
							this.setState({
								vip : data.vip,
								name : data.name
							});
						}
					});
				}else{
					this.props.store.dialog.component.setState({
						html : (<a className="longBtn" href="/signin">登录/注册</a>)
					});
				}
			}
		});
	}
	render(){
		return (
			<div className="info common">
				{`${this.state.vip}${this.state.name},你好!`}
			</div>
		);
	}
}
Info.defaultProps = {
	setting : [
		{
			name : "common",
			value : "普通会员"
		},
		{
			name : "jadeite",
			value : "翡翠会员"
		},
		{
			name : "platinum",
			value : "铂金会员"
		},
		{
			name : "diamond",
			value : "钻石会员"
		}
	]
};
export {
	Info
}