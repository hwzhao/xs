webpackJsonp([1],{138:function(t,e,s){"use strict";var n=s(10),a=s(213),o=s(204),r=s.n(o),i=s(207),c=s.n(i),u=s(205),l=s.n(u),h=s(206),d=s.n(h);n.a.use(a.a),e.a=new a.a({routes:[{path:"/",name:"Hello",component:r.a},{path:"/Search",name:"Search",component:c.a},{path:"/Info/:id",name:"Info",component:l.a},{path:"/Read",name:"Read",component:d.a}]})},140:function(t,e,s){s(195);var n=s(2)(s(159),s(208),null,null);t.exports=n.exports},158:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(139),a=s.n(n),o=s(10),r=s(140),i=s.n(r),c=s(138),u=s(137),l=s.n(u),h=s(3);o.a.use(h.a),o.a.filter("cover",function(t){return t?t.replace(/^\/agent\//,""):""});var d=new h.a.Store({state:{searchList:[],read:{id:0,tocId:0,page:1,preContent:"",tocContent:"",nextContent:""}},mutations:{setSearch:function(t,e){t.searchList=e,window.localStorage.setItem("searchList",a()(t.searchList))},setRead:function(t,e){for(var s in e)t.read[s]=e[s];window.localStorage.setItem("read",a()(t.read))}}});o.a.directive("focus",{inserted:function(t){t.focus()}}),o.a.config.productionTip=!0,o.a.prototype.$http=l.a,new o.a({el:"#app",router:c.a,store:d,template:"<App/>",components:{App:i.a}})},159:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app"}},160:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"hello",data:function(){return{msg:"Welcome to Your Vue.js App"}},created:function(){this.$http}}},161:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(0),a=s.n(n);e.default={name:"info",data:function(){return{info:"图书详情",tocs:[],showMenu:!1}},filters:{uMoment:function(t){return a.a.locale("zh-cn"),a()(t).fromNow()}},methods:{goRead:function(){var t={id:this.$route.params.id,tocId:0,tocContent:"",nextContent:"",preContent:""};this.$store.commit("setRead",t),this.$router.push("/Read")}},created:function(){var t=this;this.$http.get("https://xs.htmlbiji.com/index.php",{params:{url:"/book/"+this.$route.params.id}}).then(function(e){t.info=e.data,t.$http.get("https://xs.htmlbiji.com/index.php",{params:{url:"/mix-toc/"+t.$route.params.id}}).then(function(e){t.tocs=e.data.mixToc.chapters})})}}},162:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(16),a=s.n(n),o=s(3);e.default={name:"read",computed:a()({},s.i(o.b)({read:function(t){return t.read}}),{readStyle:function(){return{transform:"translateX(-"+(this.page-1)*this.clientWidth+"px)",transition:this.page>1?"all .3s":"none"}}}),directives:{tocContent:{bind:function(t,e){var s=t.scrollWidth/t.clientWidth;e.value.methods.call(this,s,t.clientWidth)},componentUpdated:function(t,e){var s=t.scrollWidth/t.clientWidth;e.value.methods.call(this,s,t.clientWidth)}}},data:function(){return{page:1,count:1,clientWidth:"",fz:14,lg:1.2,bc:"#123",tocs:[]}},methods:{getCount:function(t,e){this.count=t,this.clientWidth=e},getConent:function(t,e,s){this.$http.get("https://xs.htmlbiji.com/index.php",{params:{chapter:1,url:"/chapter/"+this.tocs[t].link+"?k=2124b73d7e2e1945&t=1468223717"}}).then(function(t){e&&"function"==typeof e&&e(t.data)})}},watch:{page:function(t){0===t?(this.$store.commit("setRead",{preContent:"",tocContent:this.read.preContent,nextContent:this.read.tocContent,tocId:this.read.tocId-1}),this.page=1):t>this.count&&(this.$store.commit("setRead",{preContent:this.read.tocContent,tocContent:this.read.nextContent,nextContent:"",tocId:this.read.tocId+1}),this.page=1),this.$store.commit("setRead",{page:t})},"read.tocId":function(t){if(t>=0){var e=this;this.read.preContent||this.getConent(t-1,function(t){e.$store.commit("setRead",{preContent:t.chapter})},"pre"),this.read.nextContent||this.getConent(t+1,function(t){e.$store.commit("setRead",{nextContent:t.chapter})},"next")}},"read.tocContent":function(t){if(""===t||!t.body){var e=this;e.$store.commit("setRead",{tocContent:{body:"加载中"}}),this.getConent(this.read.tocId,function(t){e.$store.commit("setRead",{tocContent:t.chapter})},"next")}}},created:function(){null===window.localStorage.getItem("read")&&this.$router.push("/Search"),this.$store.commit("setRead",JSON.parse(window.localStorage.getItem("read")));var t=this;this.$http.get("https://xs.htmlbiji.com/index.php",{params:{url:"/mix-toc/"+this.read.id}}).then(function(e){t.tocs=e.data.mixToc.chapters,t.getConent(t.read.tocId,function(e){t.$store.commit("setRead",{tocContent:e.chapter})},"first"),t.page=t.read.page})}}},163:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s(16),a=s.n(n),o=s(3);e.default={name:"search",data:function(){return{query:"",books:[],keywords:[],autoQuert:"",type:0,bColor:["#178df1","#df1717","#36b54e","#febc2a","#fd5d23","#839eb1"]}},computed:a()({},s.i(o.b)({searchList:function(t){return t.searchList}})),methods:{del:function(t){var e=this.searchList;e.splice(t,1),this.$store.commit("setSearch",e)},clear:function(){this.$store.commit("setSearch",[])},search:function(){if(this.query=this.query.replace(/(^\s*)|(\s*$)/g,""),""===this.query)return"";var t=this;this.type=2,this.$http.get("https://xs.htmlbiji.com/index.php",{params:{url:"/book/fuzzy-search/?query="+encodeURI(this.query)+"&start=0&limit=10"}}).then(function(e){if(t.books=e.data.books,-1===t.searchList.indexOf(t.query)){var s=t.searchList;s.push(t.query),t.$store.commit("setSearch",s)}t.type=3}),this.keywords=""},autoClick:function(t){this.autoQuert=t,this.query=t,this.search()}},watch:{query:function(t){if(t=t.replace(/(^\s*)|(\s*$)/g,""),this.books="",t.length&&this.autoQuert!==this.query){var e=this;this.type=1,this.$http.get("https://xs.htmlbiji.com/index.php",{params:{url:"/book/auto-complete?query="+encodeURI(this.query)}}).then(function(t){e.keywords=t.data.keywords})}}},created:function(){null===window.localStorage.getItem("searchList")&&window.localStorage.setItem("searchList","[]"),this.$store.commit("setSearch",JSON.parse(window.localStorage.getItem("searchList"))),this.$route.query.query&&this.$route.query.query.length>0&&(this.query=this.$route.query.query,this.search())}}},195:function(t,e){},196:function(t,e){},197:function(t,e){},198:function(t,e){},199:function(t,e){},202:function(t,e,s){function n(t){return s(a(t))}function a(t){var e=o[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var o={"./af":21,"./af.js":21,"./ar":28,"./ar-dz":22,"./ar-dz.js":22,"./ar-kw":23,"./ar-kw.js":23,"./ar-ly":24,"./ar-ly.js":24,"./ar-ma":25,"./ar-ma.js":25,"./ar-sa":26,"./ar-sa.js":26,"./ar-tn":27,"./ar-tn.js":27,"./ar.js":28,"./az":29,"./az.js":29,"./be":30,"./be.js":30,"./bg":31,"./bg.js":31,"./bn":32,"./bn.js":32,"./bo":33,"./bo.js":33,"./br":34,"./br.js":34,"./bs":35,"./bs.js":35,"./ca":36,"./ca.js":36,"./cs":37,"./cs.js":37,"./cv":38,"./cv.js":38,"./cy":39,"./cy.js":39,"./da":40,"./da.js":40,"./de":43,"./de-at":41,"./de-at.js":41,"./de-ch":42,"./de-ch.js":42,"./de.js":43,"./dv":44,"./dv.js":44,"./el":45,"./el.js":45,"./en-au":46,"./en-au.js":46,"./en-ca":47,"./en-ca.js":47,"./en-gb":48,"./en-gb.js":48,"./en-ie":49,"./en-ie.js":49,"./en-nz":50,"./en-nz.js":50,"./eo":51,"./eo.js":51,"./es":53,"./es-do":52,"./es-do.js":52,"./es.js":53,"./et":54,"./et.js":54,"./eu":55,"./eu.js":55,"./fa":56,"./fa.js":56,"./fi":57,"./fi.js":57,"./fo":58,"./fo.js":58,"./fr":61,"./fr-ca":59,"./fr-ca.js":59,"./fr-ch":60,"./fr-ch.js":60,"./fr.js":61,"./fy":62,"./fy.js":62,"./gd":63,"./gd.js":63,"./gl":64,"./gl.js":64,"./gom-latn":65,"./gom-latn.js":65,"./he":66,"./he.js":66,"./hi":67,"./hi.js":67,"./hr":68,"./hr.js":68,"./hu":69,"./hu.js":69,"./hy-am":70,"./hy-am.js":70,"./id":71,"./id.js":71,"./is":72,"./is.js":72,"./it":73,"./it.js":73,"./ja":74,"./ja.js":74,"./jv":75,"./jv.js":75,"./ka":76,"./ka.js":76,"./kk":77,"./kk.js":77,"./km":78,"./km.js":78,"./kn":79,"./kn.js":79,"./ko":80,"./ko.js":80,"./ky":81,"./ky.js":81,"./lb":82,"./lb.js":82,"./lo":83,"./lo.js":83,"./lt":84,"./lt.js":84,"./lv":85,"./lv.js":85,"./me":86,"./me.js":86,"./mi":87,"./mi.js":87,"./mk":88,"./mk.js":88,"./ml":89,"./ml.js":89,"./mr":90,"./mr.js":90,"./ms":92,"./ms-my":91,"./ms-my.js":91,"./ms.js":92,"./my":93,"./my.js":93,"./nb":94,"./nb.js":94,"./ne":95,"./ne.js":95,"./nl":97,"./nl-be":96,"./nl-be.js":96,"./nl.js":97,"./nn":98,"./nn.js":98,"./pa-in":99,"./pa-in.js":99,"./pl":100,"./pl.js":100,"./pt":102,"./pt-br":101,"./pt-br.js":101,"./pt.js":102,"./ro":103,"./ro.js":103,"./ru":104,"./ru.js":104,"./sd":105,"./sd.js":105,"./se":106,"./se.js":106,"./si":107,"./si.js":107,"./sk":108,"./sk.js":108,"./sl":109,"./sl.js":109,"./sq":110,"./sq.js":110,"./sr":112,"./sr-cyrl":111,"./sr-cyrl.js":111,"./sr.js":112,"./ss":113,"./ss.js":113,"./sv":114,"./sv.js":114,"./sw":115,"./sw.js":115,"./ta":116,"./ta.js":116,"./te":117,"./te.js":117,"./tet":118,"./tet.js":118,"./th":119,"./th.js":119,"./tl-ph":120,"./tl-ph.js":120,"./tlh":121,"./tlh.js":121,"./tr":122,"./tr.js":122,"./tzl":123,"./tzl.js":123,"./tzm":125,"./tzm-latn":124,"./tzm-latn.js":124,"./tzm.js":125,"./uk":126,"./uk.js":126,"./ur":127,"./ur.js":127,"./uz":129,"./uz-latn":128,"./uz-latn.js":128,"./uz.js":129,"./vi":130,"./vi.js":130,"./x-pseudo":131,"./x-pseudo.js":131,"./yo":132,"./yo.js":132,"./zh-cn":133,"./zh-cn.js":133,"./zh-hk":134,"./zh-hk.js":134,"./zh-tw":135,"./zh-tw.js":135};n.keys=function(){return Object.keys(o)},n.resolve=a,t.exports=n,n.id=202},204:function(t,e,s){s(197);var n=s(2)(s(160),s(210),"data-v-5d6db6f2",null);t.exports=n.exports},205:function(t,e,s){s(199);var n=s(2)(s(161),s(212),"data-v-faca72ee",null);t.exports=n.exports},206:function(t,e,s){s(196);var n=s(2)(s(162),s(209),"data-v-444a0771",null);t.exports=n.exports},207:function(t,e,s){s(198);var n=s(2)(s(163),s(211),"data-v-e75b947a",null);t.exports=n.exports},208:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("router-view")],1)},staticRenderFns:[]}},209:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"read-view"},[s("div",{staticClass:"head"},[t._v("\n    "+t._s(t.read.tocContent.title)+"\n  ")]),t._v(" "),s("div",{staticClass:"read-content",style:{"font-size":t.fz+"px"}},[s("article",[s("section",{directives:[{name:"tocContent",rawName:"v-tocContent",value:{methods:t.getCount},expression:"{'methods': getCount}"}],staticClass:"read",style:t.readStyle,domProps:{innerHTML:t._s(t.read.tocContent.body)}})])]),t._v(" "),s("div",{staticClass:"action-view"},[s("div",{staticClass:"left",on:{click:function(e){t.page=t.page-1}}}),t._v(" "),s("div",{staticClass:"center",on:{click:function(e){e.stopPropagation(),t.fz=1.1*t.fz}}}),t._v(" "),s("div",{staticClass:"right",on:{click:function(e){t.page=t.page+1}}})]),t._v(" "),s("div",{staticClass:"count"},[t._v("\n    "+t._s(t.page)+"/ "+t._s(t.count)+"\n  ")])])},staticRenderFns:[]}},210:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"hello"},[s("h1",[t._v(t._s(t.msg))]),t._v(" "),s("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),s("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",[s("li",[s("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("Core Docs")])]),t._v(" "),s("li",[s("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("Forum")])]),t._v(" "),s("li",[s("a",{attrs:{href:"https://gitter.im/vuejs/vue",target:"_blank"}},[t._v("Gitter Chat")])]),t._v(" "),s("li",[s("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("Twitter")])]),t._v(" "),s("br"),t._v(" "),s("li",[s("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("Docs for This Template")])])])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ul",[s("li",[s("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[t._v("vue-router")])]),t._v(" "),s("li",[s("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[t._v("vuex")])]),t._v(" "),s("li",[s("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[t._v("vue-loader")])]),t._v(" "),s("li",[s("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[t._v("awesome-vue")])])])}]}},211:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"xs-search-view"},[s("header",{staticClass:"xs-search after-boeder"},[s("a",{staticClass:"xs-icon xs-icon-back",on:{click:function(e){t.$router.back()}}}),t._v(" "),s("form",{staticClass:"search-form",on:{submit:function(e){e.preventDefault(),t.search(e)}}},[s("div",{staticClass:"search-box"},[s("i",{staticClass:"xs-icon xs-icon-search"}),t._v(" "),s("input",{directives:[{name:"focus",rawName:"v-focus"},{name:"model",rawName:"v-model",value:t.query,expression:"query"}],staticClass:"search-input",attrs:{type:"text",name:"query",placeholder:"搜索图书或作者"},domProps:{value:t.query},on:{input:function(e){e.target.composing||(t.query=e.target.value)}}}),t._v(" "),""!=t.query?s("i",{staticClass:"xs-icon xs-icon-close",on:{click:function(e){t.query="",t.type=0}}}):t._e()])]),t._v(" "),s("a",{staticClass:"search-submit",class:{active:t.query.length},attrs:{name:"button"},on:{click:t.search}},[t._v("搜索")])]),t._v(" "),s("div",{directives:[{name:"show",rawName:"v-show",value:0===t.type,expression:"type === 0"}],staticClass:"history"},[t.searchList.length>0?s("div",{staticClass:"header"},[t._v("\n      搜索历史\n      "),s("span",{on:{click:t.clear}},[t._v("清空")])]):t._e(),t._v(" "),t.searchList.length>0?s("ul",{},t._l(t.searchList,function(e,n){return s("li",{style:{"background-color":t.bColor[n]},on:{click:function(s){t.autoClick(e)}}},[t._v("\n        "+t._s(e)+"\n        "),s("i",{staticClass:"xs-icon xs-icon-close",on:{click:function(e){e.stopPropagation(),t.del(n)}}})])})):t._e(),t._v(" "),0==t.searchList.length?s("div",{},[t._v("\n      赶快搜索好书来看吧\n    ")]):t._e()]),t._v(" "),s("ul",{directives:[{name:"show",rawName:"v-show",value:1===t.type,expression:"type === 1"}],staticClass:"auto after-boeder"},t._l(t.keywords,function(e){return s("li",{staticClass:"after-boeder",on:{click:function(s){t.autoClick(e)}}},[t._v(t._s(e))])})),t._v(" "),2===t.type?s("div",{},[t._v("\n    搜索中。。。。\n  ")]):t._e(),t._v(" "),t.books.length>0?s("ul",{directives:[{name:"show",rawName:"v-show",value:3==t.type,expression:"type== 3"}],staticClass:"books after-boeder"},t._l(t.books,function(e){return e.wordCount>1e3?s("li",{staticClass:"after-boeder",on:{click:function(s){t.$router.push("/Info/"+e._id)}}},[s("img",{attrs:{src:t._f("cover")(e.cover),alt:""}}),t._v(" "),s("div",{},[s("span",{staticClass:"title"},[t._v(t._s(e.title))]),t._v(" "),s("p",[t._v("\n          "+t._s(e.author)+"\n        ")])])]):t._e()})):t._e(),t._v(" "),3===t.type&&0==t.books.length?s("div",{},[t._v("\n    我擦，找不到哎╮(╯▽╰)╭\n  ")]):t._e()])},staticRenderFns:[]}},212:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"info"},[s("header",{staticClass:"header after-boeder"},[s("a",{staticClass:"xs-icon xs-icon-back",on:{click:function(e){t.$router.back()}}}),t._v(" "),s("span",[t._v("图书详情")])]),t._v(" "),s("div",{staticClass:"content"},[s("div",{staticClass:"basic"},[s("img",{staticClass:"cover",attrs:{src:t._f("cover")(t.info.cover),alt:""}}),t._v(" "),s("div",{staticClass:"basic-info"},[s("div",{staticClass:"title"},[t._v(t._s(t.info.title))]),t._v(" "),s("div",{staticClass:"author"},[t._v("作者："),s("span",{on:{click:function(e){t.$router.push("/search?query="+t.info.author)}}},[t._v(" "+t._s(t.info.author)+" ")])]),t._v(" "),s("div",{staticClass:"word"},[t._v("字数："+t._s(t.info.wordCount)+"字   "+t._s(t.info.isSerial?"连载中":"已完结"))]),t._v(" "),s("div",{staticClass:"cate"},[t._v(t._s(t.info.majorCate)+"/ "+t._s(t.info.minorCate))])])]),t._v(" "),s("div",{staticClass:"intro"},[t._v("\r\n      "+t._s(t.info.longIntro)+"\r\n    ")]),t._v(" "),s("div",{staticClass:"menu  before-border after-boeder",on:{click:function(e){t.showMenu=!0}}},[t._m(0),t._v(" "),s("div",{staticClass:"menu-r text-over"},[t._v("\r\n        "+t._s(t._f("uMoment")(t.info.updated))+"  更新"+t._s(t.info.lastChapter)+"\r\n      ")])])]),t._v(" "),s("div",{staticClass:"footer before-border"},[t._m(1),t._v(" "),s("div",{staticClass:"footer-item"},[s("a",{staticClass:"xs-btn",on:{click:t.goRead}},[t._v("开始阅读")])])]),t._v(" "),s("transition",{attrs:{name:"popup"}},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.showMenu,expression:"showMenu"}],staticClass:"popup-view"},[s("div",{staticClass:"tocs"},[s("div",{staticClass:"tocs-header after-boeder"},[t._v("\r\n          目录\r\n        ")]),t._v(" "),s("ul",t._l(t.tocs,function(e,n){return s("li",[t._v(t._s(e.title))])}))])])]),t._v(" "),t.showMenu?s("a",{staticClass:"popup-mask",class:{show:t.showMenu},on:{click:function(e){e.stopPropagation(),t.showMenu=!t.showMenu}}}):t._e()],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"menu-l"},[s("i",{staticClass:"xs-icon xs-icon-mulu"}),t._v("目录\r\n      ")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"footer-item"},[s("a",{staticClass:"xs-btn"},[t._v("加入书架")])])}]}}},[158]);
//# sourceMappingURL=app.e1d9e834286356ef5238.js.map