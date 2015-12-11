!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}({0:function(e,t,n){"use strict";var r=n(30);r.init()},1:function(e,t){e.exports=React},2:function(e,t){e.exports=ReactDOM},3:function(e,t){"use strict";var n={isMatch:function(e,t){switch(e){case"name":return t.toString().length>>1;case"mobile":return t.toString().match(/^1\d{10}$/)?1:0;case"phone":return t.toString().match(/^(0|8)[1-9]{1,2}\d{7,8}$/)?1:0;case"captcha":return t.toString().match(/^\d{5}$/)?1:0;case"password":return t.toString().match(/^\S{6,16}$/)?1:0;case"bankcard":return t.toString().match(/^\d{16,19}$/)?1:0;case"idcard":return t.toString().match(/^\d{15,18}$/)?1:0}},QueryString:function(e,t){var n=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),r=t?t.substr(1).match(n):window.location.search.substr(1).match(n);return null===r?null:unescape(r[2])},ParamString:function(){var e=window.location.href,t=window.location.search,n=t?e.split(t)[0].substring(e.split(t)[0].lastIndexOf("/")+1):e.split("/")[e.split("/").length-1];return~n.indexOf("#")?n.split("#")[0]:n},Storage:function(e){var t=this;this.name=e.name,this.version=e.version,this.url=e.url,this.callback=e.callback,localStorage[this.name]&&localStorage[this.name+"_v"]===this.version?this.callback(JSON.parse(localStorage[this.name])):$.ajax({url:this.url,success:function(e){localStorage[t.name]=JSON.stringify(e),localStorage[t.name+"_v"]=t.version,t.callback(e)}})},getPage:function(e){var t=(e.react,e.reactDOMServer,e.req,e.main);return t},setRem:function(){document.documentElement.style.fontSize=window.innerWidth/16+"px"},PageData:{render:function(e){n.setRem(),document.body.style.opacity=1,window.onpopstate=function(){e()}},setData:function(e,t){var n=this;return e&&!this.getData()?$.ajax({url:e,success:function(e){n.data=e,t(e)}}):t(this.getData()),this},getData:function(){return this.data}}};e.exports=n},4:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),c=function(e){function t(e){r(this,t);var n=a(this,Object.getPrototypeOf(t).call(this,e));return n.state={message:e.message,autoHide:e.autoHide},n.autoHide=function(){n.state.autoHide&&!function(){var e=setTimeout(function(){clearTimeout(e),n.setState({message:""})},2500)}()},n}return o(t,e),u(t,[{key:"componentWillReceiveProps",value:function(e){this.setState({message:e.message})}},{key:"componentDidMount",value:function(){this.autoHide()}},{key:"shouldComponentUpdate",value:function(e,t){return e.message!==this.props.message||t.message!==this.state.message}},{key:"componentDidUpdate",value:function(){this.autoHide()}},{key:"render",value:function(){return React.createElement("p",{className:"message"},this.state.message)}}]),t}(i.Component);c.defaultProps={message:""},t["default"]=c},10:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0});var c=(n(1),n(4)),s=(r(c),n(3)),l=function(e){function t(){a(this,t);var e=o(this,Object.getPrototypeOf(t).call(this));return e.state={matched:0},e.handleCheck=function(){var t=e.props;return t.store.warning.component.setState({message:e.state.matched?"":t.placeholder+"输入错误"}),e.state.matched},e.handleEvent=function(t){e.setState({matched:s.isMatch(e.props.className.split(" ")[1],t.target.value)},e.handleCheck)},e}return u(t,e),i(t,[{key:"render",value:function(){return React.createElement("input",{name:this.props.name,type:this.props.type,className:this.props.className,placeholder:this.props.placeholder,maxLength:this.props.maxLength,onChange:this.handleEvent,onBlur:this.handleEvent})}}]),t}(React.Component);t["default"]=l},30:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();Object.defineProperty(t,"__esModule",{value:!0}),t.init=void 0;var c=n(1),s=r(c),l=n(2),f=r(l),p=n(3),d=n(4),m=r(d),h=n(10),y=r(h),v=function(e){function t(){return a(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return u(t,e),i(t,[{key:"componentDidMount",value:function(){var e=this,t=this.refs,n=f["default"].findDOMNode(t.mobile),r=f["default"].findDOMNode(t.password),a=f["default"].findDOMNode(t.rePassword),o=f["default"].findDOMNode(t.captcha),u=f["default"].findDOMNode(t.btnCaptcha);u.onclick=function(){t.mobile.handleCheck()&&$.ajax({url:"/api/reset?mobile="+n.value,success:function(e){f["default"].render(s["default"].createElement(m["default"],{message:e.message}),document.querySelector(".warning"))}})},f["default"].findDOMNode(t.btnSubmit).onclick=function(){var u=1,i=!0,c=!1,l=void 0;try{for(var p,d=e.props.setting[Symbol.iterator]();!(i=(p=d.next()).done);i=!0){var h=p.value;if(!t[h.ref].handleCheck())return void(u=0);if(r.value!==a.value)return f["default"].render(s["default"].createElement(m["default"],{message:"两次输入的密码不一致"}),document.querySelector(".warning")),void(u=0)}}catch(y){c=!0,l=y}finally{try{!i&&d["return"]&&d["return"]()}finally{if(c)throw l}}u&&$.ajax({type:"post",url:"/api/reset",data:{mobile:n.value,password:r.value,rePassword:a.value,captcha:o.value},success:function(e){f["default"].render(s["default"].createElement(m["default"],{message:e.message}),document.querySelector(".warning")),200===e.code&&!function(){var e=setTimeout(function(){clearTimeout(e),window.location.href="/me"},1e3)}()}})}}},{key:"render",value:function(){var e=[],t=this.props.setting;return t.forEach(function(t){e.push(s["default"].createElement(y["default"],{ref:t.ref,name:t.name,type:t.type,className:t.className,placeholder:t.placeholder,maxLength:t.maxLength}))}),s["default"].createElement("form",null,e,s["default"].createElement("input",{ref:"btnCaptcha",className:"shortBtn",type:"button",value:"获取"}),s["default"].createElement("input",{ref:"btnSubmit",className:"longBtn",type:"button",value:"确认"}))}}]),t}(s["default"].Component);v.defaultProps={setting:[{ref:"mobile",name:"mobile",type:"tel",className:"longInput mobile",placeholder:"手机号码",maxLength:"11"},{ref:"password",name:"password",type:"password",className:"longInput password",placeholder:"新密码",maxLength:"20"},{ref:"rePassword",name:"rePassword",type:"password",className:"longInput password",placeholder:"确认密码",maxLength:"20"},{ref:"captcha",name:"captcha",type:"text",className:"shortInput captcha",placeholder:"验证码",maxLength:"5"}]};var g=function(e){function t(){return a(this,t),o(this,Object.getPrototypeOf(t).apply(this,arguments))}return u(t,e),i(t,[{key:"render",value:function(){return s["default"].createElement("body",null,s["default"].createElement("div",{className:"warning"},s["default"].createElement(m["default"],null)),s["default"].createElement(v,null))}}]),t}(s["default"].Component),b=function w(){p.PageData.setData(null,function(){f["default"].render(s["default"].createElement(g,null),document.body)}).render(w)};t.init=b}});