(function(e){function t(t){for(var n,s,o=t[0],c=t[1],u=t[2],d=0,f=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(a,s)&&a[s]&&f.push(a[s][0]),a[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);l&&l(t);while(f.length)f.shift()();return r.push.apply(r,u||[]),i()}function i(){for(var e,t=0;t<r.length;t++){for(var i=r[t],n=!0,o=1;o<i.length;o++){var c=i[o];0!==a[c]&&(n=!1)}n&&(r.splice(t--,1),e=s(s.s=i[0]))}return e}var n={},a={app:0},r=[];function s(t){if(n[t])return n[t].exports;var i=n[t]={i:t,l:!1,exports:{}};return e[t].call(i.exports,i,i.exports,s),i.l=!0,i.exports}s.m=e,s.c=n,s.d=function(e,t,i){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(s.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)s.d(i,n,function(t){return e[t]}.bind(null,n));return i},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var l=c;r.push([0,"chunk-vendors"]),i()})({0:function(e,t,i){e.exports=i("56d7")},2395:function(e,t,i){},"56d7":function(e,t,i){"use strict";i.r(t);i("e260"),i("e6cf"),i("cca6"),i("a79d");var n=i("2b0e"),a=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{attrs:{id:"app"}},[i("tree"),i("div",{staticClass:"verse"},[e._v(" "+e._s(e.question)+" ")]),e._m(0),i("div",{class:["btn",e.isTouch?"touch":"start"],on:{touchstart:function(t){return t.preventDefault(),e.begin(t)},touchend:function(t){return t.preventDefault(),e.end(t)}}},[e._v(e._s(e.isTouch?"松开停止录音":"按住录音"))])],1)},r=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("ul",{staticClass:"fenshu"},[i("li",[i("span",[e._v("准确度分:")]),e._v("0")]),i("li",[i("span",[e._v("整体印象分：")]),e._v("0")]),i("li",[i("span",[e._v("流畅度分：")]),e._v("0")]),i("li",[i("span",[e._v("完整度分：")]),e._v("0")]),i("li",[i("span",[e._v("声韵分：")]),e._v("0")]),i("li",[i("span",[e._v("调型分：")]),e._v("0")]),i("li",[i("span",[e._v("总分：")]),e._v("0")])])}],s=(i("96cf"),i("1da1"));i("ac1f"),i("466d");function o(){var e=document.cookie,t="";if(e){var i=e.match(/userid=([^;$]+)/);i&&i[1]&&(t=i[1])}return t}var c=window.sessionStorage;function u(e,t){var i=0;try{c.setItem(e,JSON.stringify(t)),i=1}catch(n){console.error("客户端数据缓存错误")}return i}function l(e){var t=null;try{t=c.getItem(e),t=JSON.parse(t)}catch(i){console.error("获取客户端数据缓存错误")}return t}i("1276"),i("d3b7");var d=i("ade3"),f=i("bc3a"),p=i.n(f),h=function(e){var t=e.url,i=e.data,n=void 0===i?{}:i,a=e.method,r=void 0===a?"GET":a,s="get"===r.toLocaleLowerCase()?"params":"data";return new Promise((function(e,i){p()(Object(d["a"])({method:r,url:t},s,n)).then((function(t){console.log(t,"res"),0===t.data.status||"ok"===t.data.message?e(t.data):(console.log("请求失败"),i(t.data))})).catch((function(e){console.log(e)}))}))},v=h,g=!1,m=g?"/api":"https://miniapp.ionantha.tech",b=function(){return v({url:"".concat(m,"/api/getSignature"),data:{url:location.href.split("#")[0]},method:"POST"})},w=function(e){return v({url:"".concat(m,"/file/file_upload"),data:e})},y=(i("99af"),i("d4ec")),_=i("bee2"),O=function(){function e(){Object(y["a"])(this,e),this.ele=document.createElement("aside"),this.ele.classList.add("toast"),this.content=document.createElement("div"),this.content.classList.add("message-wrapper"),this.ele.appendChild(this.content),document.body.appendChild(this.ele),this.bind()}return Object(_["a"])(e,[{key:"confirm",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var i,n,a,r,s,o,c,u;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:i=t.content,n=void 0===i?"":i,a=t.ok,r=void 0===a?function(){}:a,s=t.cancel,o=void 0===s?function(){}:s,c=t.notice,u=void 0!==c&&c,this.ele.classList.add("visible"),this.content.innerHTML="<p>".concat(n,'</p><footer class="confirm-footer border-top">').concat(u?"":'<div data-type="close">取消</div>','<div data-type="ok" class="ok">确定<div></footer>'),this.ok=r,this.cancel=o;case 5:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"bind",value:function(){var e=this;this.content.addEventListener("click",(function(t){var i=t.target,n=void 0===i?{}:i;"ok"===n.dataset["type"]&&e.ok(),"close"===n.dataset["type"]&&(e.cancel(),e.hide())}))}},{key:"alert",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;this.ele.className="toast alert";var n=setTimeout((function(){e.ele.classList.add("visible"),clearTimeout(n)}),50);this.content.innerHTML="<p>".concat(t,"</p>");var a=setTimeout((function(){e.feadOut(),clearTimeout(a)}),i)}},{key:"feadOut",value:function(){var e=this;this.ele.classList.remove("visible");var t=setTimeout((function(){e.ele.className="toast",clearTimeout(t)}),200)}},{key:"hide",value:function(){this.ele.classList.remove("visible")}},{key:"loadingShow",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"正在加载...",i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e5;this.ele.classList.add("visible"),this.ele.classList.add("load"),this.content.innerHTML="<p>".concat(t,"</p>");var n=setTimeout((function(){e.feadOut(),clearTimeout(n)}),i)}},{key:"loadingHide",value:function(){this.feadOut()}}]),e}(),T=new O,k=(i("a4d3"),i("e01a"),i("9911"),function(){function e(){var t=this,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(y["a"])(this,e);var n=i.sharpCallback,a=void 0===n?function(){}:n,r=i.jsApiList,o=void 0===r?["onMenuShareTimeline","updateTimelineShareData","updateAppMessageShareData","onMenuShareAppMessage","startRecord","stopRecord","playVoice","stopVoice","onVoicePlayEnd","uploadVoice"]:r,c=i.hideMenuItems,u=void 0===c?[]:c;this.sharpCallback=a,this.hideMenuItems=u;var l=navigator.userAgent.toLowerCase();if(l.match(/MicroMessenger/i)){var d=document.createElement("script");d.src="https://res2.wx.qq.com/open/js/jweixin-1.4.0.js",document.body.appendChild(d),d.onload=Object(s["a"])(regeneratorRuntime.mark((function e(){var i,n,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return i=window.wx,e.next=3,b();case 3:n=e.sent,n&&0===n.status&&(a=Object.assign(n.data,{debug:!1,jsApiList:o}),i.config(a),t.ready());case 5:case"end":return e.stop()}}),e)})))}}return Object(_["a"])(e,[{key:"ready",value:function(e){var t=this,i=window.wx,n=window.seo||{},a=n.title,r=void 0===a?document.title:a,s=n.link,o=void 0===s?window.location.href:s,c=n.description,u=void 0===c?"语音评测demo":c,l=n.imgUrl,d=void 0===l?"":l,f={title:r,link:o,desc:u,imgUrl:d};e&&Object.assign(f,e),f.success=function(){t.sharpCallback()},i&&i.ready((function(){/iPhone|iPad|iPod/i.test(navigator.userAgent)?(i.updateTimelineShareData(f),i.updateAppMessageShareData(f)):(i.onMenuShareTimeline(f),i.onMenuShareAppMessage(f)),t.hideMenuItems.length&&i.hideMenuItems({menuList:t.hideMenuItems})}))}}]),e}()),j=k,x=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"home-tree"},[e._m(0),e._m(1),i("div",{staticClass:"bg-flower"},[i("figure",{class:{"bg-f1":!0,active:e.isActive}},[i("img",{attrs:{src:"https://static.vr0101.com/images/topic/feihualing/home/bg/tree/1-1.png",alt:""}})]),i("figure",{class:{"bg-f2":!0,active:e.isActive}},[i("img",{attrs:{src:"https://static.vr0101.com/images/topic/feihualing/home/bg/tree/1-2.png",alt:""}})]),i("figure",{class:{"bg-f3":!0,active:e.isActive}},[i("img",{attrs:{src:"https://static.vr0101.com/images/topic/feihualing/home/bg/tree/1-3.png",alt:""}})]),i("figure",{class:{"bg-f4":!0,active:e.isActive}},[i("img",{attrs:{src:"https://static.vr0101.com/images/topic/feihualing/home/bg/tree/1-4.png",alt:""}})]),i("figure",{class:{"bg-f5":!0,active:e.isActive}},[i("img",{attrs:{src:"https://static.vr0101.com/images/topic/feihualing/home/bg/tree/1-5.png",alt:""}})]),i("figure",{class:{"bg-f6":!0,active:e.isActive}},[i("img",{attrs:{src:"https://static.vr0101.com/images/topic/feihualing/home/bg/tree/1-2.png",alt:""}})]),i("figure",{class:{"bg-f7":!0,active:e.isActive}},[i("img",{attrs:{src:"https://static.vr0101.com/images/topic/feihualing/home/bg/tree/1-1.png",alt:""}})]),i("figure",{class:{"bg-f8":!0,active:e.isActive}},[i("img",{attrs:{src:"https://static.vr0101.com/images/topic/feihualing/home/bg/tree/1-3.png",alt:""}})]),i("figure",{class:{"bg-f9":!0,active:e.isActive}},[i("img",{attrs:{src:"https://static.vr0101.com/images/topic/feihualing/home/bg/tree/1-5.png",alt:""}})]),i("figure",{class:{"bg-f10":!0,active:e.isActive}},[i("img",{attrs:{src:"https://static.vr0101.com/images/topic/feihualing/home/bg/tree/1-4.png",alt:""}})])])])},S=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("figure",{staticClass:"left-tree"},[i("img",{attrs:{src:"https://static.vr0101.com/images/topic/feihualing/home/bg/tree/left.png",alt:""}})])},function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("figure",{staticClass:"right-tree"},[i("img",{attrs:{src:"https://static.vr0101.com/images/topic/feihualing/home/bg/tree/right.png",alt:""}})])}],M={data:function(){return{isActive:!0}}},A=M,L=(i("d385"),i("2877")),R=Object(L["a"])(A,x,S,!1,null,null,null),C=R.exports,P={name:"App",components:{tree:C},data:function(){return{serverId:"",isTouch:!1,localId:"",start:"",question:"今天天气怎么样"}},created:function(){this.getUid=o(),this.Sharp=new j},mounted:function(){this.panduan()},methods:{panduan:function(){var e=l("allowRecord");e||window.wx.startRecord({success:function(){window.wx.stopRecord({success:function(e){u("allowRecord","true")}})},cancel:function(){this.panduan()}})},begin:function(){this.start=(new Date).getTime();var e=setTimeout((function(){window.wx.startRecord({success:function(){this.isTouch=!0,clearTimeout(e)},cancel:function(){alert("拒绝授权")}})}),300)},end:function(){var e=this,t=(new Date).getTime();t-this.start<300||(this.isTouch=!1,window.wx.stopRecord({success:function(t){var i=t.localId;e.uploadVoice(i)},fail:function(){alert("录音失败")}}))},onVoiceRecordEnd:function(){var e=this;window.wx.onVoiceRecordEnd({complete:function(t){var i=t.localId;e.uploadVoice(i),e.status="录音"}})},uploadVoice:function(e){T.loadingShow("正在上传..."),window.wx.uploadVoice({localId:e,isShowProgressTips:1,success:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var i,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return T.loadingShow("正在解析..."),i=t.serverId,e.next=4,w({media_id:i});case 4:n=e.sent,0===n.status?T.toast("成功"):T.alert("解析失败");case 6:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),error:function(){alert("上传失败")}})}}},E=P,I=(i("7c55"),Object(L["a"])(E,a,r,!1,null,null,null)),V=I.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(V)}}).$mount("#app")},"7c55":function(e,t,i){"use strict";var n=i("2395"),a=i.n(n);a.a},d385:function(e,t,i){"use strict";var n=i("edc3"),a=i.n(n);a.a},edc3:function(e,t,i){}});