!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var r=n(13);r.init()},function(e,t){e.exports=React},function(e,t){"use strict";var n={isMatch:function(e,t){switch(e){case"name":return t.toString().length>>1;case"tel":return t.toString().match(/^1\d{10}$/)?1:0;case"phone":return t.toString().match(/^(0|8)[1-9]{1,2}\d{7,8}$/)?1:0;case"captcha":return t.toString().match(/^\d{6}$/)?1:0;case"password":return t.toString().match(/^\S{6,16}$/)?1:0;case"bankcard":return t.toString().match(/^\d{16,19}$/)?1:0;case"idcard":return t.toString().match(/^\d{15,18}$/)?1:0}},QueryString:function(e){var t=window.location.search.substr(1).match(new RegExp("(^|&)"+e+"=([^&]*)(&|$)"));return null===t?null:unescape(t[2])},ParamString:function(){var e=window.location.href,t=window.location.search,n=t?e.split(t)[0].substring(e.split(t)[0].lastIndexOf("/")+1):e.split("/")[e.split("/").length-1];return~n.indexOf("#")?n.split("#")[0]:n},Storage:function(e){var t=this;this.name=e.name,this.version=e.version,this.url=e.url,this.callback=e.callback,localStorage[this.name]&&localStorage[this.name+"_v"]===this.version?this.callback(JSON.parse(localStorage[this.name])):$.ajax({url:this.url,success:function(e){localStorage[t.name]=JSON.stringify(e),localStorage[t.name+"_v"]=t.version,t.callback(e)}})},getPage:function(e){var t=(e.react,e.reactDOMServer,e.req,e.main);return t},setRem:function(){document.documentElement.style.fontSize=window.innerWidth/16+"px"},PageData:{render:function(e){n.setRem(),document.body.style.opacity=1,window.onpopstate=function(){e()}},setData:function(e,t){var n=this;return e&&!this.getData()?$.ajax({url:e,success:function(e){n.data=e,t(e)}}):t(this.getData()),this},getData:function(){return this.data}}};e.exports=n},function(e,t){e.exports=ReactDOM},,,,,,,,,,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0}),t.init=void 0;var i=n(1),c=r(i),s=n(3),f=r(s),d=n(2),p=function(e){function t(){a(this,t);var e=o(this,Object.getPrototypeOf(t).call(this));return e.state={score:0},e}return u(t,e),l(t,[{key:"componentDidMount",value:function(){$.ajax({type:"post",url:"/api/sign",success:function(e){$.ajax({url:"/api/getscore",success:function(e){console.log(e)}})}})}},{key:"render",value:function(){return c["default"].createElement("body",null,c["default"].createElement("div",{className:"sign"},c["default"].createElement("b",null,this.state.score)))}}]),t}(c["default"].Component),m=function(e){function t(e){a(this,t);var n=o(this,Object.getPrototypeOf(t).call(this,e));return n.state={vip:e.vip,name:e.name,score:e.score},n}return u(t,e),l(t,[{key:"componentDidMount",value:function(){var e=this;d.QueryString("sign")||$.ajax({url:"/api/getscore",success:function(e){console.log(e)}}),this.refs.btnSign.onclick=function(){d.QueryString("sign")||window.history.pushState({},e.state.title,"?sign=1"),f["default"].render(c["default"].createElement(p,null),document.body)}}},{key:"render",value:function(){var e=this.state;return c["default"].createElement("div",{className:"part1"},c["default"].createElement("p",null,""+e.vip+e.name),c["default"].createElement("p",null,c["default"].createElement("span",null,"我的积分:"),c["default"].createElement("b",null,e.score)),c["default"].createElement("i",{className:"btnSign",ref:"btnSign"}))}}]),t}(c["default"].Component);m.defaultProps={vip:"普通会员",name:"＊＊＊",score:0};var h=function(e){function t(){return a(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return u(t,e),l(t,[{key:"render",value:function(){return c["default"].createElement("ul",null,c["default"].createElement("li",null,this.props.time),c["default"].createElement("li",null,this.props.value),c["default"].createElement("li",null,this.props.datail))}}]),t}(c["default"].Component),v=function(e){function t(){a(this,t);var e=o(this,Object.getPrototypeOf(t).call(this));return e.state={data:[]},e}return u(t,e),l(t,[{key:"componentDidMount",value:function(){var e=this;d.QueryString("sign")||$.ajax({url:"/api/getscoredetail",success:function(t){e.setState({data:t.data||[]})}})}},{key:"render",value:function(){var e=[],t=this.state.data;return t.length?t.forEach(function(t){e.push(c["default"].createElement(h,{time:t.time,value:t.value,detail:t.detail}))}):e=c["default"].createElement("i",{className:"default"}),c["default"].createElement("div",{className:"record"},c["default"].createElement("h1",null,"积分纪录"),c["default"].createElement("ul",null,c["default"].createElement("li",null,"发生时间"),c["default"].createElement("li",null,"变更值"),c["default"].createElement("li",null,"变更详情")),e)}}]),t}(c["default"].Component),y=function(e){function t(){return a(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return u(t,e),l(t,[{key:"componentDidMount",value:function(){d.QueryString("sign")&&this.refs.part1.refs.btnSign.click()}},{key:"render",value:function(){return c["default"].createElement("body",null,c["default"].createElement(m,{ref:"part1"}),c["default"].createElement("a",{className:"entrance",href:"/activity/score"}),c["default"].createElement(v,null))}}]),t}(c["default"].Component),g=function b(){d.PageData.setData(null,function(){f["default"].render(c["default"].createElement(y,null),document.body)}).render(b)};t.init=g}]);