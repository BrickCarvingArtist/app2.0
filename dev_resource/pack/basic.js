import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
import {Info} from "../component/info";
import Warning from "../component/warning";
class List extends React.Component{
	render(){
		return (
			<div>
				<h1 className={this.props.className}>
					<span>
						{this.props.name}
					</span>
					<em>
						{this.props.value}
					</em>
				</h1>
			</div>
		);
	}
}
class Detail extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			setting : props.setting
		};
	}
	componentDidMount(){
		let setting = this.state.setting;
		$.ajax({
			type : "post",
			url : "/api/getauth",
			success : data => {
				if(data.code === 200){
					setting[0].value = data.name;
					setting[1].value = data.idNumber;
					this.setState({
						setting : setting
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
		$.ajax({
			url : "/api/getuserbank",
			success : data => {
				if(data.code === 200){
					data.data.forEach(list => {
						setting.push({
							className : list.imgCss,
							name : list.bankName,
							value : list.cardNO
						});
						this.setState({
							setting : setting
						});
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
		})
	}
	render(){
		let lists = [],
			setting = this.state.setting;
		setting.forEach(list => {
			lists.push(
				<List className={list.className} name={list.name} value={list.value} />
			);
		});
		return (
			<div className="detail">
				{lists}
			</div>
		);
	}
}
Detail.defaultProps = {
	setting : [
		{
			className : "name",
			name : "账户名",
			value : ""
		},
		{
			className : "idCard",
			name : "身份证",
			value : ""
		}
	]
};
class Page extends React.Component{
	componentDidMount(){
		this.refs.btn.onclick = () => {
			$.ajax({
				url : "/api/signout",
				success : data => {
					ReactDOM.render(
						<Warning message={data.message} />,
						document.querySelector(".warning")
					);
					if(data.code === 200){
						let t = setTimeout(() => {
							clearTimeout(t);
							window.location.href = "/me";
						}, 1000);
					}
				}
			});
		};
	}
	render(){
		return (
			<body>
				<div className="warning">
					<Warning />
				</div>
				<Info />
				<Detail />
				<a ref="btn" className="longBtn">安全退出</a>
			</body>
		);
	}
}
const init = () => {
	PageData.setData(null, () => {
		ReactDOM.render(
			<Page />,
			document.body
		);
	}).render(init);
};
export {
	init
}