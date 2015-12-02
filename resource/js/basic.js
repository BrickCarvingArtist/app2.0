!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return e[r].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var r=n(14);r.init()},function(e,t){e.exports=React},function(e,t){"use strict";var n={isMatch:function(e,t){switch(e){case"name":return t.toString().length>>1;case"mobile":return t.toString().match(/^1\d{10}$/)?1:0;case"phone":return t.toString().match(/^(0|8)[1-9]{1,2}\d{7,8}$/)?1:0;case"captcha":return t.toString().match(/^\d{5}$/)?1:0;case"password":return t.toString().match(/^\S{6,16}$/)?1:0;case"bankcard":return t.toString().match(/^\d{16,19}$/)?1:0;case"idcard":return t.toString().match(/^\d{15,18}$/)?1:0}},QueryString:function(e){var t=window.location.search.substr(1).match(new RegExp("(^|&)"+e+"=([^&]*)(&|$)"));return null===t?null:unescape(t[2])},ParamString:function(){var e=window.location.href,t=window.location.search,n=t?e.split(t)[0].substring(e.split(t)[0].lastIndexOf("/")+1):e.split("/")[e.split("/").length-1];return~n.indexOf("#")?n.split("#")[0]:n},Storage:function(e){var t=this;this.name=e.name,this.version=e.version,this.url=e.url,this.callback=e.callback,localStorage[this.name]&&localStorage[this.name+"_v"]===this.version?this.callback(JSON.parse(localStorage[this.name])):$.ajax({url:this.url,success:function(e){localStorage[t.name]=JSON.stringify(e),localStorage[t.name+"_v"]=t.version,t.callback(e)}})},getPage:function(e){var t=(e.react,e.reactDOMServer,e.req,e.main);return t},setRem:function(){document.documentElement.style.fontSize=window.innerWidth/16+"px"},PageData:{render:function(e){n.setRem(),document.body.style.opacity=1,window.onpopstate=function(){e()}},setData:function(e,t){var n=this;return e&&!this.getData()?$.ajax({url:e,success:function(e){n.data=e,t(e)}}):t(this.getData()),this},getData:function(){return this.data}}};e.exports=n},function(e,t){e.exports=ReactDOM},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0}),t.Dialog=void 0;var s=n(1),c=r(s),l=function(e){function t(e){o(this,t);var n=a(this,Object.getPrototypeOf(t).call(this,e));return n.state={html:e.html},n}return u(t,e),i(t,[{key:"componentDidMount",value:function(){this.state.html&&(document.querySelector(".shadow").style.display="block")}},{key:"componentReceiveProps",value:function(e){this.setState({html:e.html})}},{key:"render",value:function(){return c["default"].createElement("div",{className:"dialog"},this.state.html)}}]),t}(c["default"].Component);l.defaultProps={html:""},t.Dialog=l},function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0}),t.Warning=void 0;var s=n(1),c=r(s),l=function(e){function t(e){o(this,t);var n=a(this,Object.getPrototypeOf(t).call(this,e));return n.state={message:e.message},n}return u(t,e),i(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({message:e.message})}},{key:"render",value:function(){return c["default"].createElement("p",{className:"message"},this.state.message)}}]),t}(c["default"].Component);l.defaultProps={message:""},t.Warning=l},,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0}),t.Info=void 0;var s=n(1),c=r(s),l=n(4),f=function(e){function t(e){o(this,t);var n=a(this,Object.getPrototypeOf(t).call(this,e));return n.state={vip:"普通会员",name:"***"},n}return u(t,e),i(t,[{key:"componentDidMount",value:function(){var e=this;$.ajax({url:"/api/getauth",success:function(t){200===t.code?$.ajax({type:"post",url:"/api/getauth",success:function(t){e.setState({vip:t.vip,name:t.name})}}):ReactDOM.render(c["default"].createElement(l.Dialog,{html:c["default"].createElement("a",{className:"longBtn",href:"/signin"},"登录/注册")}),document.querySelector(".shadow"))}})}},{key:"render",value:function(){return c["default"].createElement("div",{className:"info common"},""+this.state.vip+this.state.name+",你好!")}}]),t}(c["default"].Component);f.defaultProps={setting:[{name:"common",value:"普通会员"},{name:"jadeite",value:"翡翠会员"},{name:"platinum",value:"铂金会员"},{name:"diamond",value:"钻石会员"}]},t.Info=f},,,,,,,function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0}),t.init=void 0;var s=n(1),c=r(s),l=n(3),f=r(l),p=n(2),d=n(7),h=n(5),m=function(e){function t(){return o(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments))}return u(t,e),i(t,[{key:"render",value:function(){return c["default"].createElement("div",null,c["default"].createElement("h1",{className:this.props.className},c["default"].createElement("span",null,this.props.name),c["default"].createElement("em",null,this.props.value)))}}]),t}(c["default"].Component),g=function(e){function t(e){o(this,t);var n=a(this,Object.getPrototypeOf(t).call(this,e));return n.state={setting:e.setting},n}return u(t,e),i(t,[{key:"componentDidMount",value:function(){var e=this,t=this.state.setting;$.ajax({type:"post",url:"/api/getauth",success:function(n){t[0].value=n.name,t[1].value=n.idNumber,e.setState({setting:t})}}),$.ajax({url:"/api/getuserbank",success:function(n){n.data.forEach(function(n){t.push({className:n.imgCss,name:n.bankName,value:n.cardNO}),e.setState({setting:t})})}})}},{key:"render",value:function(){var e=[],t=this.state.setting;return t.forEach(function(t){e.push(c["default"].createElement(m,{className:t.className,name:t.name,value:t.value}))}),c["default"].createElement("div",{className:"detail"},e)}}]),t}(c["default"].Component);g.defaultProps={setting:[{className:"name",name:"账户名",value:""},{className:"idCard",name:"身份证",value:""}]};var y=function(e){function t(){return o(this,t),a(this,Object.getPrototypeOf(t).apply(this,arguments))}return u(t,e),i(t,[{key:"componentDidMount",value:function(){this.refs.btn.onclick=function(){$.ajax({url:"/api/signout",success:function(e){f["default"].render(c["default"].createElement(h.Warning,{message:e.message}),document.querySelector(".warning")),200===e.code&&!function(){var e=setTimeout(function(){clearTimeout(e),window.location.href="/me"},1e3)}()}})}}},{key:"render",value:function(){return c["default"].createElement("body",null,c["default"].createElement("div",{className:"warning"},c["default"].createElement(h.Warning,null)),c["default"].createElement(d.Info,null),c["default"].createElement(g,null),c["default"].createElement("a",{ref:"btn",className:"longBtn"},"安全退出"))}}]),t}(c["default"].Component),b=function v(){p.PageData.setData(null,function(){f["default"].render(c["default"].createElement(y,null),document.body)}).render(v)};t.init=b}]);