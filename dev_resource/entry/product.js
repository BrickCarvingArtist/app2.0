var React = require("react"),
	Util = require("../pack/util");
var ProductDetail = React.createClass({
	getInitialState : function(){
		return {
			title : this.props.title,
			beginTime : this.props.beginTime,
			stopBuyTime : this.props.stopBuyTime
		};
	},
	render : function(){
		return (
			<body>
				<div className="part1">
				</div>
				<div className="part2">
				</div>
				<div className="part3">
				</div>
				<p>
					{"募集时间:" + this.state.beginTime + " 至 " + this.state.stopBuyTime}
				</p>
				<a className="btnBuy"></a>
			</body>
		);
	}
});
var Product = React.createClass({
	getInitialState : function(){
		return {
			index : this.props.index,
			title : this.props.title,
			scale : this.props.scale,
			rate : this.props.rate,
			term : this.props.term,
			beginTime : this.props.beginTime,
			stopBuyTime : this.props.stopBuyTime
		};
	},
	handleClick : function(){
		var body = document.body;
		if(!Util.QueryString("index")){
			window.history.pushState({}, this.state.title, "?index=" + this.state.index);
		}
		window.addEventListener("popstate", function(e){
			init();
		}, 0);
		document.title = this.state.title;
		React.render(
			<ProductDetail title={this.state.title} beginTime={this.state.beginTime} stopBuyTime={this.state.stopBuyTime} />,
			body
		);
	},
	render : function(){
		return (
			<section onClick={this.handleClick}>
				<h1>
					<strong>
						{this.state.title}
					</strong>
					<em>
						{this.state.scale}
					</em>
				</h1>
				<div className="main">
					<div className="column1">
						<span>年化率</span>
						<p>
							<strong>
								{this.state.rate}
							</strong>
							<em>%</em>
						</p>
					</div>
					<div className="column2">
						<span>期限</span>
						<p>
							<strong>
								{this.state.term}
							</strong>
							<em>天</em>
						</p>
					</div>
					<a href="">立即购买</a>
				</div>
			</section>
		);
	}
});
var Page = React.createClass({
	getInitialState : function(){
		return {
			data : this.props.data
		};
	},
	componentDidMount : function(){
		if(Util.QueryString("index")){
			this.refs["info" + Util.QueryString("index")].getDOMNode().click();
		}
	},
	render : function(){
		var lists = [],
			data = this.state.data;
			console.log(data);
		data.forEach(function(list, index){
			lists.push(
				<Product index={index + 1} title={list.title} scale={list.scale} rate={(list.rate * 100).toFixed(1)} term={list.term} beginTime={list.beginTime} stopBuyTime={list.stopBuyTime} />
			);
		});
		return (
			<body>
				{lists}
			</body>
		);
	}
});
function init(){
	$.ajax({
		url : "/api/getproduct",
		success : function(data){
			React.render(
				<Page data={data.data} />,
				document.body
			);
		}
	});
}
init();