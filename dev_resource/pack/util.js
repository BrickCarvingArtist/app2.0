var Util = {
	isMatch : function(type, value){
		switch(type){
			case "name":
				return value.toString().length >> 1;
			case "tel":
				return value.toString().match(/^1\d{10}$/) ? 1 : 0;
			case "phone":
				return value.toString().match(/^(0|8)[1-9]{1,2}\d{7,8}$/) ? 1 : 0;
			case "captcha":
				return value.toString().match(/^\d{6}$/) ? 1 : 0;
			case "password":
				return value.toString().match(/^\S{6,16}$/) ? 1 : 0;
			case "bankcard":
			    return value.toString().match(/^\d{16,19}$/) ? 1 : 0;
			case "idcard":
				return value.toString().match(/^\d{15,18}$/) ? 1 : 0;
		}
	},
	Adaptor : function(type, data){
		var _data;
		switch(type){
			case "complexNav":
				_data = {
					supList : []
				};
				data.forEach(function(list, index){
					if(list.level === 1){
						list.subList = [];
						_data.supList.push(list);
					}else{
						_data.supList[list.type - 1].subList.push(list);
					}
				});
				break;
		}
		return _data;
	},
	QueryString : function(name){
		var result = window.location.search.substr(1).match(new RegExp("(^|&)" + name + "=([^&]*)(&|$)"));
		return result === null ? null : unescape(result[2]);
	},
	ParamString : function(){
		var href = window.location.href,
			search = window.location.search,
			result = search ? href.split(search)[0].substring(href.split(search)[0].lastIndexOf("/") + 1) : href.split("/")[href.split("/").length - 1];
		return ~result.indexOf("#") ? result.split("#")[0] : result;
	},
	Storage : function(option){
		this.name = option.name;
		this.version = option.version;
		this.url = option.url;
		this.callback = option.callback;
		if(localStorage[this.name] && localStorage[this.name + "_v"] === this.version){
			this.callback(JSON.parse(localStorage[this.name]));
		}else{
			$.ajax({
				url : this.url,
				success : function(data){
					localStorage[this.name] = JSON.stringify(data);
					localStorage[this.name + "_v"] = this.version;
					this.callback(data);
				}.bind(this)
			});
		}
	},
	getPage : function(option){
		var react = option.react,
			reactDOMServer = option.reactDOMServer,
			req = option.req,
			main = option.main;
		return main;
	},
	setRem : function(){
		document.documentElement.style.fontSize = window.innerWidth / 16 + "px";
	}
};
module.exports = Util;