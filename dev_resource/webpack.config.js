module.exports = {
	entry : {
		home : "./entry/home",
		info : "./entry/info",
		product : "./entry/product",
		me : "./entry/me",
		more : "./entry/more"
	},
	output : {
		filename : "../resource/js/[name].js"
	},
	externals : {
		react : "React",
		"react-dom" : "ReactDOM"
	},
	module : {
		loaders : [
			{
				test : /\.js/,
				loaders : [
					"jsx",
					"babel"
				]
			}
		]
	},
	extensions : [".js"]
};