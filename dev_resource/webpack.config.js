module.exports = {
	entry : {
		home : "./entry/home",
		product : "./entry/product",
		me : "./entry/me",
		more : "./entry/more",
		asset : "./entry/asset",
		basic : "./entry/basic",
		bonus : "./entry/bonus",
		interest : "./entry/interest",
		info : "./entry/info",
		score : "./entry/score",
		activity : "./entry/activity",
		signin : "./entry/signin",
		signup: "./entry/signup",
		reset : "./entry/reset"
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