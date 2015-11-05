module.exports = {
	entry : {
		home : "./entry/home",
		info : "./entry/info",
		product : "./entry/product"
	},
	output : {
		filename : "../resource/js/[name].js"
	},
	externals : {
		react : "React"
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