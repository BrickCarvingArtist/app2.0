module.exports = {
	entry : {
		home : "./entry/home",
		product : "./entry/product",
		me : "./entry/me",
		more : "./entry/more",
		info : "./entry/info",
		score : "./entry/score"
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