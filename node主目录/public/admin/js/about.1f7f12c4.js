(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{f127:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"menu"},[n("Card",{attrs:{bordered:!1}},[n("p",{attrs:{slot:"title"},slot:"title"},[e._v("添加菜单")]),n("Input",{attrs:{type:"text",placeholder:"菜单项名称"},model:{value:e.New_menu.name,callback:function(t){e.$set(e.New_menu,"name",t)},expression:"New_menu.name"}}),n("Input",{attrs:{type:"text",placeholder:"菜单项链接"},model:{value:e.New_menu.url,callback:function(t){e.$set(e.New_menu,"url",t)},expression:"New_menu.url"}}),n("Button",{on:{click:e.New_menu_post}},[e._v("提交")])],1),n("Table",{attrs:{columns:e.table.columns,data:e.table.data}})],1)},l=[],u=(n("7f7f"),{data:function(){return{value1:"1",New_menu:{name:"",url:""},table:{columns:[{title:"名称",key:"Name"},{title:"链接",key:"Url"},{title:"操作",key:"Option",render:function(e,t){return e("div",[e("Button",{props:{type:"primary",size:"small"}},"修改"),e("Button",{props:{type:"error",size:"small"}},"删除")])}}],data:[]}}},methods:{New_menu_post:function(){}},created:function(){this.$http.get("/console/menu/get").then(function(e){e=e.body;var t=0;for(var n in e)this.$set(this.table.data,t,{Name:e[n]["name"],Url:e[n]["url"]}),t++},function(e){alert("请求失败")})}}),r=u,o=n("2877"),s=Object(o["a"])(r,a,l,!1,null,null,null);t["default"]=s.exports}}]);
//# sourceMappingURL=about.1f7f12c4.js.map