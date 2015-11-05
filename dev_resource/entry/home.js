var React = require("react"),
	Util = require("../pack/util"),
	Component = require("../pack/component"),
	Shortcut = Component.Shortcut;
Util.setRem();
var Page  = React.createClass({
	render : function(){
		return (
			<body>
				<Shortcut />
			</body>
		);
	}
});
React.render(
	<Page />,
	document.body
);