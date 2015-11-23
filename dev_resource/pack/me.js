var React = require("react"),
	Util = require("../pack/util");
var Page = React.createClass({
	render : function(){
		console.log(this.props.data);
		return (
			<body></body>
		);
	}
});
var init = function(){
	Util.PageData.setData("/api/getauth", function(data){
		React.render(
			<Page data={data} />,
			document.body
		);
	}).render(init);
};
module.exports = {
	main : Page,
	init : init
};