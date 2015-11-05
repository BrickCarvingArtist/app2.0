module.exports = {
	entry : {
		home : "./entry/home",
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
				loader : "babel"
			}
		]
	},
	extensions : [".js"]
};