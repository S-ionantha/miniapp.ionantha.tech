(function(e){function t(t){for(var r,s,o=t[0],c=t[1],l=t[2],d=0,v=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&v.push(i[s][0]),i[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);u&&u(t);while(v.length)v.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==i[c]&&(r=!1)}r&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},i={app:0},a=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=c;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"020b":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAHCAYAAAA4R3wZAAABaklEQVQYGY3Bvy8DURwA8O+7997dtXVo78r5lU5NDAQpozCQmA02q9FqMGjEZDX5ByxiskkMujQSItJSpCaKVJQ6r3fv3r17/Ak+HwT/cLG2Rk99fyIK2SSORDk4Oq4Rtb9P69VS4uotZCuHhxL+KAAExSKqPDz0pHQxzON3d0A3xsrcH5SauisUChi97G7Pdiq3c9L7KCszUYu+wiEsWRLcEdP7ChdajWZBxrERUsbAydatbqc0EIsTwhufC+3S07JkwZJup54VF65UkIL7RxQy1kOy6bBr0AHONMe20neGnmBvnh6TzjtPMj+iqMVyscdyGBEgGAOAAAsrlWx6mEdC9E3l2umZ/E8UQ/1sY+ebwOj4gfEhpbquLRoq0IltckSkrllUmn0ZvyPQd8sPzml/poqVBrSXhlvFIiClFLpc3XS7HTIPWpAlCfqKNGmTlPlDHetV+KJ5U7psxK7LpjMZ2rZbIr++x38Bs6GyEOHoI4kAAAAASUVORK5CYII="},"04b3":function(e,t){e.exports="data:image/png;base64,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"},"0d2f":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAMAAAAMCGV4AAAA9lBMVEUAAAD/wqbLCTbRGjbkmY3VMTuZJynSHzfqlIfgiIDZmoDPEjW6ECycIyvTJjnKFy3REzfOKDrgiIHDDjXEDS6rHCvUKjqtIS2kKSy9KT/QJEHbamvXVlHSWVvQbWzeamDjhobIgIC1O0DXeHCfIirMIz3YSEizGiq7HC/bY13YU1CsO0HVNz6tHivUSE/YTU2qMkSmLTbWPk3PPUuqLj3KR0G5P0vTOEnTSE6+UknOXmPefHTPT1vVPkrXV1Xae32jJS7cdXPKXGHEHDDKamrec2jbXlvge3TOYmy4VmWtR1O2RFPbZVngg3DdZV6xDiPjoaHqlX9sjEj0AAAAUnRSTlMAAb68Ir6+vRQIBcHAv729vK0rv76+vLy5r6uBgWxOSTEeGBDEv769vLq5ubS0sa+opJyalpSSkoqJiISEgHh2b21pZGBdVFFJREQxKykmJBsMtjK5vQAAALBJREFUCNc9j1USwlAUQ5/UoF60hTru7u4u+98MTF/h/iVzMjcBAMDHwdZ8CMKDt7lhdDduKKPOECEU03ccIahMnle+jrqgiF42JBYjxGPTD/jXukbTWJF41YqGiUpBwkk2PqJg8ECblmnMKnF1/w6AyLFJJ9mYIGc50sDpyHIplSiGGnAzQUikGXF8j5CANdBTDMOk+zYghnuaVEUxV9+CX23N7LXaqyf4z/Ku54sHPzaREGY5N/ncAAAAAElFTkSuQmCC"},2395:function(e,t,n){},"3d78":function(e,t,n){e.exports=n.p+"img/left.884df25a.png"},"3e9d":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAMAAABlXnzoAAAA2FBMVEUAAACqbVvODSfWiobPDyzSHDjimonQEC/RFjPgj3/QGCnRGjbQFyzSHzvefHzmnYzijXzeZ2C+pZZ6VkLRTl3OU1Q2KBvbTknXQT3SGynYJzLMHCrRKTnmcmTTKTbPHzXgWlTfQlfdbF7WNTrulYfijH3cYV3XbV/MGCfZR0vSP1XjTFDTPkHgXF7MRVThgXDAmYbmZGbVWVvgj4HhhXTXV23fXV3VlYbXWlTkrZndXnV3cFfZV0vhoY6XgG7VPznXZV1KRjDlrZrYm4filpbrmpRaIRncno0ZGr4YAAAASHRSTlMABOAL19QS3Ngz2dDV0GlPOyYZGRgPCeLf39PTzczBu7a1tLOyr62rq6mlpZiVkZCJh4eCf355dHRwb21qX1hVR0VEQj0mHx3XLuUTAAAAkElEQVQI1zXO1Q6EMBCF4U6NFlicdXd3d9/3f6MtEP67L5NMDopzx/07QWlkq+Ou7UKMrM8nGJdXs1sY6XF6jbCgy0PzTBB8r/Ne0WRazbmsPwj8ZzuvG4age87VFX6dnGlkmFaVyd9dpUCZ8kBCRG7XdUyFhluOIiCQiwYTFJcslMTf1nEznMp0mOeRMAjgD2FRC4zOaJmjAAAAAElFTkSuQmCC"},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("tree"),r("div",{staticClass:"start-taste-left"},[r("textarea",{directives:[{name:"model",rawName:"v-model",value:e.question,expression:"question"}],staticClass:"ipt",attrs:{placeholder:"请输入评测文本"},domProps:{value:e.question},on:{input:function(t){t.target.composing||(e.question=t.target.value)}}})]),r("div",{class:["time-box",e.isTouch?"active":""]},[e._m(0),e._m(1)]),r("div",{class:["btn",e.isTouch?"touch":"start"],on:{touchstart:function(t){return t.preventDefault(),e.begin(t)},touchend:function(t){return t.preventDefault(),e.end(t)}}},[e._v(e._s(e.isTouch?"松开停止":"按住录音"))]),r("div",{directives:[{name:"show",rawName:"v-show",value:e.resultShow,expression:"resultShow"}],staticClass:"rule-bg"},[r("div",{staticClass:"rule"},[r("div",{staticClass:"rule-info"},[r("p",{staticClass:"info-title"},[e._v("挑战结果")]),r("p",[e._v("准确度分："),r("span",{staticClass:"accuracy_score"},[e._v(e._s(e.accuracy_score))])]),r("p",[e._v("整体印象分："),r("span",{staticClass:"emotion_score"},[e._v(e._s(e.emotion_score))])]),r("p",[e._v("流畅度分："),r("span",{staticClass:"fluency_score"},[e._v(e._s(e.fluency_score))])]),r("p",[e._v("完整度分："),r("span",{staticClass:"integrity_score"},[e._v(e._s(e.integrity_score))])]),r("p",[e._v("声韵分："),r("span",{staticClass:"phone_score"},[e._v(e._s(e.phone_score))])]),r("p",[e._v("调型分："),r("span",{staticClass:"tone_score"},[e._v(e._s(e.tone_score))])]),r("p",[e._v("总分："),r("span",{staticClass:"total_score"},[e._v(e._s(e.total_score))])]),r("div",{staticClass:"right"},[r("p",{staticClass:"info-title"},[e._v("发音准确率")]),r("p",{staticClass:"result",domProps:{innerHTML:e._s(e.resultStr)}})])]),r("figure",{staticClass:"rule-close",on:{click:function(t){e.resultShow=!1}}},[r("img",{attrs:{src:n("04b3"),alt:""}})])])])],1)},a=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticClass:"start-taste-line"},[n("hr",{staticClass:"hr hr1"}),n("hr",{staticClass:"hr hr2"}),n("hr",{staticClass:"hr hr3"}),n("hr",{staticClass:"hr hr4"}),n("hr",{staticClass:"hr hr5"}),n("hr",{staticClass:"hr hr6"}),n("hr",{staticClass:"hr hr7"}),n("hr",{staticClass:"hr hr8"}),n("hr",{staticClass:"hr hr9"}),n("hr",{staticClass:"hr hr10"})])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("span",{staticClass:"total-time"},[n("span",{staticClass:"used-time"},[e._v("00: 00")]),e._v(" / 01: 00")])}],s=(n("4160"),n("45fc"),n("159b"),n("96cf"),n("1da1"));n("ac1f"),n("466d");function o(){var e=document.cookie,t="";if(e){var n=e.match(/userid=([^;$]+)/);n&&n[1]&&(t=n[1])}return t}var c=window.localStorage;function l(e,t){var n=0;try{c.setItem(e,JSON.stringify(t)),n=1}catch(r){console.error("客户端数据缓存错误")}return n}function u(e){var t=null;try{t=c.getItem(e),t=JSON.parse(t)}catch(n){console.error("获取客户端数据缓存错误")}return t}n("1276"),n("d3b7");var d=n("ade3"),v=n("bc3a"),f=n.n(v),A=(n("99af"),n("d4ec")),h=n("bee2"),p=function(){function e(){Object(A["a"])(this,e),this.ele=document.createElement("aside"),this.ele.classList.add("toast"),this.content=document.createElement("div"),this.content.classList.add("message-wrapper"),this.ele.appendChild(this.content),document.body.appendChild(this.ele),this.bind()}return Object(h["a"])(e,[{key:"confirm",value:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){var n,r,i,a,s,o,c,l;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=t.content,r=void 0===n?"":n,i=t.ok,a=void 0===i?function(){}:i,s=t.cancel,o=void 0===s?function(){}:s,c=t.notice,l=void 0!==c&&c,this.ele.classList.add("visible"),this.content.innerHTML="<p>".concat(r,'</p><footer class="confirm-footer border-top">').concat(l?"":'<div data-type="close">取消</div>','<div data-type="ok" class="ok">确定<div></footer>'),this.ok=a,this.cancel=o;case 5:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"bind",value:function(){var e=this;this.content.addEventListener("click",(function(t){var n=t.target,r=void 0===n?{}:n;"ok"===r.dataset["type"]&&e.ok(),"close"===r.dataset["type"]&&(e.cancel(),e.hide())}))}},{key:"alert",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3;this.ele.className="toast alert";var r=setTimeout((function(){e.ele.classList.add("visible"),clearTimeout(r)}),50);this.content.innerHTML="<p>".concat(t,"</p>");var i=setTimeout((function(){e.feadOut(),clearTimeout(i)}),n)}},{key:"feadOut",value:function(){var e=this;this.ele.classList.remove("visible");var t=setTimeout((function(){e.ele.className="toast",clearTimeout(t)}),200)}},{key:"hide",value:function(){this.ele.classList.remove("visible")}},{key:"loadingShow",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"正在加载...",n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e5;this.ele.classList.add("visible"),this.ele.classList.add("load"),this.content.innerHTML="<p>".concat(t,"</p>");var r=setTimeout((function(){e.feadOut(),clearTimeout(r)}),n)}},{key:"loadingHide",value:function(){this.feadOut()}}]),e}(),m=new p,w=function(e){var t=e.url,n=e.data,r=void 0===n?{}:n,i=e.method,a=void 0===i?"GET":i,s="get"===a.toLocaleLowerCase()?"params":"data";return new Promise((function(e,n){f()(Object(d["a"])({method:a,url:t},s,r)).then((function(t){t.data?e(t.data):(m.alert("请求失败"),n(t.data))})).catch((function(e){console.log(e)}))}))},g=w,b=!1,y=b?"/api":"https://miniapp.ionantha.tech",T=function(){return g({url:"".concat(y,"/api/getSignature"),data:{url:location.href.split("#")[0]},method:"POST"})},S=function(e){return g({url:"".concat(y,"/file/file_upload"),data:e})},O=(n("a4d3"),n("e01a"),n("9911"),function(){function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};Object(A["a"])(this,e);var r=n.sharpCallback,i=void 0===r?function(){}:r,a=n.jsApiList,o=void 0===a?["onMenuShareTimeline","updateTimelineShareData","updateAppMessageShareData","onMenuShareAppMessage","startRecord","stopRecord","playVoice","stopVoice","onVoicePlayEnd","uploadVoice"]:a,c=n.hideMenuItems,l=void 0===c?[]:c;this.sharpCallback=i,this.hideMenuItems=l;var u=navigator.userAgent.toLowerCase();if(u.match(/MicroMessenger/i)){var d=document.createElement("script");d.src="https://res2.wx.qq.com/open/js/jweixin-1.4.0.js",document.body.appendChild(d),d.onload=Object(s["a"])(regeneratorRuntime.mark((function e(){var n,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=window.wx,e.next=3,T();case 3:r=e.sent,r&&0===r.status&&(i=Object.assign(r.data,{debug:!1,jsApiList:o}),n.config(i),t.ready());case 5:case"end":return e.stop()}}),e)})))}}return Object(h["a"])(e,[{key:"ready",value:function(e){var t=this,n=window.wx,r=window.seo||{},i=r.title,a=void 0===i?document.title:i,s=r.link,o=void 0===s?window.location.href:s,c=r.description,l=void 0===c?"你的发音标准么？快来测测吧~":c,u=r.imgUrl,d=void 0===u?"":u,v={title:a,link:o,desc:l,imgUrl:d};e&&Object.assign(v,e),v.success=function(){t.sharpCallback()},n&&n.ready((function(){/iPhone|iPad|iPod/i.test(navigator.userAgent)?(n.updateTimelineShareData(v),n.updateAppMessageShareData(v)):(n.onMenuShareTimeline(v),n.onMenuShareAppMessage(v)),t.hideMenuItems.length&&n.hideMenuItems({menuList:t.hideMenuItems})}))}}]),e}()),j=O,C=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"home-tree"},[e._m(0),e._m(1),r("div",{staticClass:"bg-flower"},[r("figure",{class:{"bg-f1":!0,active:e.isActive}},[r("img",{attrs:{src:n("93bb"),alt:""}})]),r("figure",{class:{"bg-f2":!0,active:e.isActive}},[r("img",{attrs:{src:n("020b"),alt:""}})]),r("figure",{class:{"bg-f3":!0,active:e.isActive}},[r("img",{attrs:{src:n("3e9d"),alt:""}})]),r("figure",{class:{"bg-f4":!0,active:e.isActive}},[r("img",{attrs:{src:n("5a02"),alt:""}})]),r("figure",{class:{"bg-f5":!0,active:e.isActive}},[r("img",{attrs:{src:n("0d2f"),alt:""}})]),r("figure",{class:{"bg-f6":!0,active:e.isActive}},[r("img",{attrs:{src:n("020b"),alt:""}})]),r("figure",{class:{"bg-f7":!0,active:e.isActive}},[r("img",{attrs:{src:n("93bb"),alt:""}})]),r("figure",{class:{"bg-f8":!0,active:e.isActive}},[r("img",{attrs:{src:n("3e9d"),alt:""}})]),r("figure",{class:{"bg-f9":!0,active:e.isActive}},[r("img",{attrs:{src:n("0d2f"),alt:""}})]),r("figure",{class:{"bg-f10":!0,active:e.isActive}},[r("img",{attrs:{src:n("5a02"),alt:""}})])])])},M=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("figure",{staticClass:"left-tree"},[r("img",{attrs:{src:n("3d78"),alt:""}})])},function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("figure",{staticClass:"right-tree"},[r("img",{attrs:{src:n("802c"),alt:""}})])}],x={data:function(){return{isActive:!0}}},L=x,R=(n("d385"),n("2877")),V=Object(R["a"])(L,C,M,!1,null,null,null),k=V.exports,P={name:"App",components:{tree:k},data:function(){return{serverId:"",isTouch:!1,localId:"",start:"",question:"秦时明月汉时关，万里长征人未还。但使龙城飞将在，不教胡马度阴山。",accuracy_score:0,emotion_score:0,fluency_score:0,integrity_score:0,phone_score:0,tone_score:0,total_score:0,resultStr:"",resultShow:!1}},created:function(){this.getUid=o(),this.Sharp=new j},mounted:function(){this.panduan()},methods:{panduan:function(){var e=u("allowRecord");e||window.wx&&window.wx.startRecord({success:function(){window.wx&&window.wx.stopRecord({success:function(e){l("allowRecord","true")}})},cancel:function(){this.panduan()}})},begin:function(){this.isTouch=!0,this.start=(new Date).getTime();var e=setTimeout((function(){window.wx&&window.wx.startRecord({success:function(){clearTimeout(e)},cancel:function(){m.alert("拒绝授权")}})}),300)},end:function(){var e=this,t=(new Date).getTime();t-this.start<300||(this.isTouch=!1,window.wx&&window.wx.stopRecord({success:function(t){var n=t.localId;e.uploadVoice(n)},fail:function(){m.alert("录音失败")}}))},onVoiceRecordEnd:function(){var e=this;window.wx&&window.wx.onVoiceRecordEnd({complete:function(t){var n=t.localId;e.uploadVoice(n)}})},uploadVoice:function(e){var t=this;m.loadingShow("正在上传..."),window.wx.uploadVoice({localId:e,isShowProgressTips:1,success:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(n){var r,i,a,s,o,c,l,u,d,v,f,A,h,p,w,g,b,y,T,O,j,C,M,x,L,R,V,k,P,z,q,E,D,U,K,X,F,_,G,Z,H;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return m.loadingShow("正在解析..."),r=n.serverId,t.serverId=r,e.next=5,S({media_id:r,text:t.question});case 5:i=e.sent,"error"===i?m.alert("解析失败"):(m.alert("解析成功"),t.accuracy_score=null===i||void 0===i||null===(a=i.xml_result)||void 0===a||null===(s=a.read_sentence)||void 0===s||null===(o=s.rec_paper)||void 0===o||null===(c=o.read_sentence)||void 0===c?void 0:c.accuracy_score,t.emotion_score=null===i||void 0===i||null===(l=i.xml_result)||void 0===l||null===(u=l.read_sentence)||void 0===u||null===(d=u.rec_paper)||void 0===d||null===(v=d.read_sentence)||void 0===v?void 0:v.emotion_score,t.fluency_score=null===i||void 0===i||null===(f=i.xml_result)||void 0===f||null===(A=f.read_sentence)||void 0===A||null===(h=A.rec_paper)||void 0===h||null===(p=h.read_sentence)||void 0===p?void 0:p.fluency_score,t.integrity_score=null===i||void 0===i||null===(w=i.xml_result)||void 0===w||null===(g=w.read_sentence)||void 0===g||null===(b=g.rec_paper)||void 0===b||null===(y=b.read_sentence)||void 0===y?void 0:y.integrity_score,t.phone_score=null===i||void 0===i||null===(T=i.xml_result)||void 0===T||null===(O=T.read_sentence)||void 0===O||null===(j=O.rec_paper)||void 0===j||null===(C=j.read_sentence)||void 0===C?void 0:C.phone_score,t.tone_score=null===i||void 0===i||null===(M=i.xml_result)||void 0===M||null===(x=M.read_sentence)||void 0===x||null===(L=x.rec_paper)||void 0===L||null===(R=L.read_sentence)||void 0===R?void 0:R.tone_score,t.total_score=null===i||void 0===i||null===(V=i.xml_result)||void 0===V||null===(k=V.read_sentence)||void 0===k||null===(P=k.rec_paper)||void 0===P||null===(z=P.read_sentence)||void 0===z?void 0:z.total_score,Z=(null===i||void 0===i||null===(q=i.xml_result)||void 0===q||null===(E=q.read_sentence)||void 0===E||null===(D=E.rec_paper)||void 0===D||null===(U=D.read_sentence)||void 0===U||null===(K=U.sentence)||void 0===K?void 0:K.word)||(null===i||void 0===i||null===(X=i.xml_result)||void 0===X||null===(F=X.read_sentence)||void 0===F||null===(_=F.rec_paper)||void 0===_||null===(G=_.read_sentence)||void 0===G?void 0:G.sentence)||[],H="",Z.forEach((function(e){if(null===e||void 0===e?void 0:e.word)e.word.forEach((function(e){var t,n=!1;(null===(t=e.syll)||void 0===t?void 0:t.phone)?n=e.syll.phone.some((function(e){return 0!=(null===e||void 0===e?void 0:e.perr_msg)})):e.syll.forEach((function(e){Array.isArray(null===e||void 0===e?void 0:e.phone)&&(n=e.phone.some((function(e){return 0!=(null===e||void 0===e?void 0:e.perr_msg)})))})),H+=n?'<span class="err">'.concat(e.content,"</span>"):e.content}));else if(null===e||void 0===e?void 0:e.syll){var t,n=!1;(null===(t=e.syll)||void 0===t?void 0:t.phone)?n=e.syll.phone.some((function(e){return 0!=(null===e||void 0===e?void 0:e.perr_msg)})):e.syll.forEach((function(e){Array.isArray(null===e||void 0===e?void 0:e.phone)&&(n=e.phone.some((function(e){return 0!=(null===e||void 0===e?void 0:e.perr_msg)})))})),H+=n?'<span class="err">'.concat(e.content,"</span>"):e.content}})),t.resultStr=H,t.resultShow=!0);case 7:case"end":return e.stop()}}),e)})));function n(t){return e.apply(this,arguments)}return n}(),error:function(){m.alert("上传失败")}})}}},z=P,q=(n("7c55"),Object(R["a"])(z,i,a,!1,null,null,null)),E=q.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(e){return e(E)}}).$mount("#app")},"5a02":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAMCAMAAABlXnzoAAAAt1BMVEUAAADCg4PTITLcj4LPDSjRGCbQFS7YZGDgdGbXS0nUNj7UKTLbV1LWOTvWPkHPGTDbUUzSXFvULjbdf3LRfnXhj3rWaF/VTk7YaWHYMDraYlvRHjLTZV/aZl3SLDPSPkjkg3TOIjTjgHHehnnMZmLbY1rQP0reUk/TMkHli3bWQUffe3LSX1/VMzrfZ17PT03bPkLbf3LMcGvZU1HRVlzqopPjhnPlno3ecmeuhnnOiX+qnI7hh3geBCx7AAAAPXRSTlMACNIp4N7ZTODe3dvW1dPR0M/MTkoyHBjg4N/d3NXT0c7Nwru5sq2oqKein5+fnp6TjXJrWVVSOi8mGhIRfze3KAAAAHtJREFUCNdNzkUShDAUBFDyY7jLuLv7YPc/FxWKAL171YtuRaZASj9IEgdh1lV4P/c2r1jqTsf60L6EZc1gSQDA0L1nhER7IgzAt7TJ+iucXhlhM9udDlZ/4fh9cAi1XFM9RvVk8tk51DDVxa/5kPOHr43OuJ1P+G3LUQV6jwhszqBq5wAAAABJRU5ErkJggg=="},"7c55":function(e,t,n){"use strict";var r=n("2395"),i=n.n(r);i.a},"802c":function(e,t,n){e.exports=n.p+"img/right.e1393ccf.png"},"93bb":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAALCAYAAACprHcmAAABnklEQVQY02O4PWkS+824OOlrrr6xV628Fl138Zl8uzTLbWd3CTcDOngwo9vyhn/k1HOipudP8xjdPSlgdOuItsOhI/lZ4Vfq69lQFN+f0Bt+0TXoxFlurUfn2Q2unmA3vn6YU//BMTOXnTebik3////PCFd8Z/p0seu5hcWXdSyuXVExuXlByubCOS7jq+cENO/fcPVa9LivRRrF9Ef19VJ3MpLn3wjwun9FxerKZXGLC1dkLO6ckzS+ci0jORbkL7ji/6tWMT9srw69HRt+6aq21e3rMuYXrspaXTnGo/nwgpPHotczWyURihkYGB831dpf1rU7c0lB7+5FZeOLhwUNL+7n1Lx3Sc/6+JOyTAsUp9yurrbYJ2d6dAe75MONkmpXFirqXlrOq3r/rIXt9idtRWooii82dIvtDU8q2K5huX+xlMa9SSqqt/slFR5ucXZa92Jig87/hgYWFKdcLCnhvt/SaXE0Kmr9TDnl2/0yKo8WqGjfPufuNu1JSrQMRiSBPHuzMNd2jarVxEW6NvvnKOoc28inXHuUR08MAATis78xsZftAAAAAElFTkSuQmCC"},d385:function(e,t,n){"use strict";var r=n("edc3"),i=n.n(r);i.a},edc3:function(e,t,n){}});