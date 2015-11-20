!function(e){function t(r){if(n[r])return n[r].exports;var a=n[r]={exports:{},id:r,loaded:!1};return e[r].call(a.exports,a,a.exports,t),a.loaded=!0,a.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";var r=n(8),a=(r.main,r.init);a()},function(e,t){e.exports=React},function(e,t){"use strict";var n={isMatch:function(e,t){switch(e){case"name":return t.toString().length>>1;case"tel":return t.toString().match(/^1\d{10}$/)?1:0;case"phone":return t.toString().match(/^(0|8)[1-9]{1,2}\d{7,8}$/)?1:0;case"captcha":return t.toString().match(/^\d{6}$/)?1:0;case"password":return t.toString().match(/^\S{6,16}$/)?1:0;case"bankcard":return t.toString().match(/^\d{16,19}$/)?1:0;case"idcard":return t.toString().match(/^\d{15,18}$/)?1:0}},Adaptor:function(e,t){var n;switch(e){case"complexNav":n={supList:[]},t.forEach(function(e,t){1===e.level?(e.subList=[],n.supList.push(e)):n.supList[e.type-1].subList.push(e)})}return n},QueryString:function(e){var t=window.location.search.substr(1).match(new RegExp("(^|&)"+e+"=([^&]*)(&|$)"));return null===t?null:unescape(t[2])},ParamString:function(){var e=window.location.href,t=window.location.search,n=t?e.split(t)[0].substring(e.split(t)[0].lastIndexOf("/")+1):e.split("/")[e.split("/").length-1];return~n.indexOf("#")?n.split("#")[0]:n},Storage:function(e){this.name=e.name,this.version=e.version,this.url=e.url,this.callback=e.callback,localStorage[this.name]&&localStorage[this.name+"_v"]===this.version?this.callback(JSON.parse(localStorage[this.name])):$.ajax({url:this.url,success:function(e){localStorage[this.name]=JSON.stringify(e),localStorage[this.name+"_v"]=this.version,this.callback(e)}.bind(this)})},getPage:function(e){var t=(e.react,e.reactDOMServer,e.req,e.main);return t},setRem:function(){document.documentElement.style.fontSize=window.innerWidth/16+"px"},PageData:{render:function(e){n.setRem(),document.body.style.opacity=1,window.onpopstate=function(){e()}},setData:function(e,t){return e&&!this.getData()?$.ajax({url:e,success:function(e){this.data=e,t(e)}.bind(this)}):t(this.getData()),this},getData:function(){return this.data}}};e.exports=n},function(e,t,n){"use strict";var r=n(1),a=r.createClass({displayName:"Case",getInitialState:function(){return{index:this.props.index,href:this.props.href,backgroundImage:this.props.backgroundImage}},render:function(){return r.createElement("a",{href:this.state.href,style:{backgroundImage:"url("+this.state.backgroundImage+")"}})}}),i=r.createClass({displayName:"Banner",getInitialState:function(){return{index:0,data:this.props.data}},render:function(){var e=[],t=this.state.data;return t.forEach(function(t,n){e.push(r.createElement(a,{index:n,href:t.href,backgroundImage:t.imgSrc}))}),e.push(r.createElement(a,{index:0,href:t[0].href,backgroundImage:t[0].imgSrc})),r.createElement("header",null,r.createElement("div",{className:"container"},e))}});e.exports=i},function(e,t,n){"use strict";var r=n(1),a=r.createClass({displayName:"List1",getInitialState:function(){var e=this.props.option;return{currentIndex:e.currentIndex,index:e.index,href:e.href,text:e.text}},render:function(){var e=this.state;return r.createElement("a",{className:e.currentIndex===e.index?"current":"",href:e.href},r.createElement("i",null),r.createElement("span",null,e.text))}}),i=r.createClass({displayName:"List2",getInitialState:function(){var e=this.props.option;return{href:e.href,text:e.text}},render:function(){var e=this.state;return r.createElement("a",{href:e.href},r.createElement("i",null),r.createElement("span",null,e.text))}}),s=(r.createClass({displayName:"List3",getInitialState:function(){return{}},render:function(){return r.createElement("a",null)}}),r.createClass({displayName:"MenuBar",getClassType:function(e){var t;switch(this.state.type){case 1:t="footer";break;case 2:t="menu_3col_anchor";break;case 3:t="menu_3col"}return t},getListType:function(e,t){var n;switch(this.state.type){case 1:n=r.createElement(a,{option:{currentIndex:this.state.currentIndex,index:t,href:e.href,text:e.text}});break;case 2:n=r.createElement(i,{option:{href:e.href,text:e.text}});break;case 3:}return n},getInitialState:function(){return{currentIndex:this.props.currentIndex,type:this.props.type,option:this.props.option}},render:function(){var e=[],t=this.state.option;return t.forEach(function(t,n){e.push(this.getListType(t,n))}.bind(this)),r.createElement("menu",{className:this.getClassType()},e)}}));e.exports=s},function(e,t,n){"use strict";e.exports={Banner:n(3),Menu:n(4)}},,,function(e,t,n){"use strict";var r=n(1),a=n(2),i=n(5),s=i.Menu,c=r.createClass({displayName:"About",getDefaultProps:function(){return{description:"	喜蓝理财互联网金融平台由杭州喜马拉雅电子商务有限公司负责运营。喜马拉雅作为启蓝控股集团旗下的子公司之一，于2014年初正式成立，其经营团队由投资理财、线上交易及风险控制等业界一流的专业人士组成。\n	公司经营的理财平台于2015年4月先后被评为“中国互联网金融服务年度最具竞争力品牌”和“中国互联网金融服务年度最具发展潜力平台”。后于2015年6月，公司被评为“2015最具投资价值互联网金融公司”。公司董事长家族世代经商，2011年入驻上海世博会并获评“最浙江家庭”。喜蓝理财秉持并延续家族诚信经营的商业理念，全力为客户打造安全、稳定、高效的理财体验。",imgSrc:"/images/about.png"}},render:function(){return r.createElement("body",null,r.createElement("header",null),r.createElement("div",{className:"description"},r.createElement("h1",null,"公司简介"),r.createElement("pre",null,r.createElement("p",null,this.props.description)),r.createElement("img",{src:this.props.imgSrc})))}}),o=r.createClass({displayName:"QA",checkMarkup:function(e){return{__html:e}},componentDidMount:function(){this.getDOMNode().onclick=function(){this.status?($(this).removeClass("current"),this.status=0):($("section").removeClass("current"),$(this).addClass("current"),this.status=1)}},render:function(){return r.createElement("section",null,r.createElement("h1",null,this.props.data.q),r.createElement("pre",null,r.createElement("p",{dangerouslySetInnerHTML:this.checkMarkup(this.props.data.a)})))}}),u=r.createClass({displayName:"Help",render:function(){var e=[],t=this.props.data;return t.forEach(function(t,n){e.push(r.createElement(o,{data:t,ref:"q"+(n+1)}))}),r.createElement("body",null,e)}}),l=r.createClass({displayName:"List",componentDidMount:function(){var e=this.props.data.name,t=this.props.data.value,n=document.body;this.getDOMNode().onclick=function(){"string"==typeof t?$.ajax({url:t,success:function(t){document.title=e,a.QueryString("index")||window.history.pushState({},document.title,"?index="+this.props.index),r.render(r.createElement(u,{data:t.data}),n)}.bind(this)}):(r.render(r.createElement(t,null),n),document.title=e,a.QueryString("index")||window.history.pushState({},document.title,"?index="+this.props.index))}.bind(this)},render:function(){return r.createElement("h1",null,this.props.data.name)}}),h=r.createClass({displayName:"Suggestion",render:function(){return r.createElement("body",null)}}),d=r.createClass({displayName:"Contact",render:function(){return r.createElement("body",null)}}),p=r.createClass({displayName:"Page",getDefaultProps:function(){return{setting:[{name:"关于喜蓝理财",value:c},{name:"常见问题",value:"/api/gethelp"},{name:"意见反馈",value:h},{name:"联系客服",value:d}]}},componentDidMount:function(){a.QueryString("index")&&this.refs["more"+a.QueryString("index")].getDOMNode().click()},render:function(){var e=[],t=this.props.setting;return t.forEach(function(t,n){e.push(r.createElement(l,{data:t,index:n+1,ref:"more"+(n+1)}))}),r.createElement("body",null,e,r.createElement(s,{type:1,option:[{href:"/",text:"首页"},{href:"/product",text:"理财产品"},{href:"/account",text:"我的账户"},{href:"/more",text:"更多"}],currentIndex:3}))}}),m=function f(){a.PageData.setData(null,function(){document.title="更多",document.body.style.backgroundColor="rgb(244, 244, 244)",r.render(r.createElement(p,null),document.body)}).render(f)};e.exports={main:p,init:m}}]);