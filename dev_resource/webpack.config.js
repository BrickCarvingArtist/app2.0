module.exports = {
	entry : {
		home : "./entry/home",
		product : "./entry/product",
		me : "./entry/me",
		more : "./entry/more",
		asset : "./entry/asset",
		profit : "./entry/profit",
		basic : "./entry/basic",
		record : "./entry/record",
		score : "./entry/score",
		bonus : "./entry/bonus",
		interest : "./entry/interest",
		invite : "./entry/invite",
		info : "./entry/info",
		activity : "./entry/activity",
		signin : "./entry/signin",
		signup: "./entry/signup",
		reset : "./entry/reset",
		payment : "./entry/payment"
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