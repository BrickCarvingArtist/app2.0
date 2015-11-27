import React from "react";
import ReactDOM from "react-dom";
import {PageData} from "./util";
import {Banner} from "../component/banner";
import {Warning} from "../component/warning";
class Form extends React.Component{
	render(){
		return (
			<form>
				<input className="longInput mobile" type="tel" placeholder="手机号码" />
				<input className="longInput password" type="password" placeholder="密码" />
				<a href="/reset">忘记密码?</a>
				<input className="longBtn" type="submit" value="确认" />
				<p>
					<span>还没账号</span>
					<a href="/signup">立即注册</a>
				</p>
			</form>
		);
	}
}
class Page extends React.Component{
	render(){
		return (
			<body>
				<Banner data={
					[
						{
							href : "/activity/1",
							imgSrc : "/images/banner/1.png"
						},
						{
							href : "/activity/2",
							imgSrc : "/images/banner/2.png"
						},
						{
							href : "/activity/3",
							imgSrc : "/images/banner/3.png"
						},
						{
							href : "/activity/4",
							imgSrc : "/images/banner/4.png"
						},
						{
							href : "/activity/5",
							imgSrc : "/images/banner/5.png"
						}
					]
				} />
				<Form />
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