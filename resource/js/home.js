!function(t){function e(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return t[r].call(a.exports,a,a.exports,e),a.loaded=!0,a.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){var r=n(1),a=n(2),i=n(3),s=i.Banner,c=i.Shortcut;a.setRem();var o=r.createClass({displayName:"Page",render:function(){return r.createElement("body",null,r.createElement(s,{data:[{href:"/activity/1",imgSrc:"/images/banner/1.png"},{href:"/activity/2",imgSrc:"/images/banner/2.png"},{href:"/activity/3",imgSrc:"/images/banner/3.png"},{href:"/activity/4",imgSrc:"/images/banner/4.png"},{href:"/activity/5",imgSrc:"/images/banner/5.png"}]}),r.createElement(c,{index:0,data:[{href:"/",title:"首页"},{href:"/product",title:"理财产品"},{href:"/account",title:"我的账户"},{href:"/more",title:"更多"}]}))}});r.render(r.createElement(o,null),document.body)},function(t,e){t.exports=React},function(t,e){var n={isMatch:function(t,e){switch(t){case"name":return e.toString().length>>1;case"tel":return e.toString().match(/^1\d{10}$/)?1:0;case"phone":return e.toString().match(/^(0|8)[1-9]{1,2}\d{7,8}$/)?1:0;case"captcha":return e.toString().match(/^\d{6}$/)?1:0;case"password":return e.toString().match(/^\S{6,16}$/)?1:0;case"bankcard":return e.toString().match(/^\d{16,19}$/)?1:0;case"idcard":return e.toString().match(/^\d{15,18}$/)?1:0}},Adaptor:function(t,e){var n;switch(t){case"complexNav":n={supList:[]},e.forEach(function(t,e){1===t.level?(t.subList=[],n.supList.push(t)):n.supList[t.type-1].subList.push(t)})}return n},QueryString:function(t){var e=window.location.search.substr(1).match(new RegExp("(^|&)"+t+"=([^&]*)(&|$)"));return null===e?null:unescape(e[2])},ParamString:function(){var t=window.location.href,e=window.location.search,n=e?t.split(e)[0].substring(t.split(e)[0].lastIndexOf("/")+1):t.split("/")[t.split("/").length-1];return~n.indexOf("#")?n.split("#")[0]:n},Storage:function(t){this.name=t.name,this.version=t.version,this.url=t.url,this.callback=t.callback,localStorage[this.name]&&localStorage[this.name+"_v"]===this.version?this.callback(JSON.parse(localStorage[this.name])):$.ajax({url:this.url,success:function(t){localStorage[this.name]=JSON.stringify(t),localStorage[this.name+"_v"]=this.version,this.callback(t)}.bind(this)})},getPage:function(t){var e=(t.react,t.reactDOMServer,t.req,t.main);return e},setRem:function(){document.documentElement.style.fontSize=window.innerWidth/16+"px"}};t.exports=n},function(t,e,n){t.exports={Banner:n(5),Shortcut:n(4)}},function(t,e,n){var r=n(1),a=r.createClass({displayName:"List",getInitialState:function(){return{index:this.props.index,href:this.props.href,title:this.props.title,currentIndex:this.props.currentIndex}},render:function(){var t=this.state;return r.createElement("a",{className:t.currentIndex===t.index?"current":"",href:t.href},r.createElement("i",{className:"icon48"}),r.createElement("span",null,t.title))}}),i=r.createClass({displayName:"Shortcut",getInitialState:function(){return{currentIndex:this.props.index,data:this.props.data}},render:function(){var t=[],e=this.state.data;return e.forEach(function(e,n){t.push(r.createElement(a,{index:n,href:e.href,title:e.title,currentIndex:this.state.currentIndex}))}.bind(this)),r.createElement("footer",null,t)}});t.exports=i},function(t,e,n){var r=n(1),a=r.createClass({displayName:"Case",getInitialState:function(){return{index:this.props.index,href:this.props.href,backgroundImage:this.props.backgroundImage}},render:function(){return r.createElement("a",{href:this.state.href,style:{backgroundImage:"url("+this.state.backgroundImage+")"}})}}),i=r.createClass({displayName:"Banner",getInitialState:function(){return{index:0,data:this.props.data}},render:function(){var t=[],e=this.state.data;return e.forEach(function(e,n){t.push(r.createElement(a,{index:n,href:e.href,backgroundImage:e.imgSrc}))}),t.push(r.createElement(a,{index:0,href:e[0].href,backgroundImage:e[0].imgSrc})),r.createElement("header",null,r.createElement("div",{className:"container"},t))}});t.exports=i}]);