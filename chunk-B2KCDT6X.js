import{a as L}from"./chunk-KWDMJ6XI.js";import{$c as U,Aa as r,Ba as y,Ea as _,Fa as u,Fc as V,Ga as l,Ic as k,Jc as I,Ka as h,Kc as B,La as a,Lc as M,Ma as w,Mc as F,N as C,Pa as g,S as s,T as m,ab as E,ca as c,ka as S,kc as T,na as x,pd as $,qd as G,sa as f,va as v,vd as O,wd as P,xa as D,xd as H,ya as b,za as n}from"./chunk-R6PKS6RY.js";import"./chunk-CWTPBX7D.js";function j(e,i){if(e&1&&(n(0,"div"),a(1),r()),e&2){let t=i.$implicit;f("text-secondary",!t),c(),w(t||"Pick a fruit")}}function N(e,i){if(e&1){let t=_();n(0,"button",14),u("click",function(){let o=s(t).$implicit;l();let p=h(1);return m(p.selectValue(o))}),a(1),r()}if(e&2){let t=i.$implicit;c(),w(t)}}function A(e,i){if(e&1){let t=_();n(0,"pui-search-dropdown",12,0),u("searchUpdate",function(o){s(t);let p=l(2);return m(p.onSearch(o))}),D(2,N,2,1,"button",13,v),r()}if(e&2){let t=l(2);c(2),b(t.filtered())}}function J(e,i){if(e&1&&(n(0,"div"),a(1),r()),e&2){let t=i.$implicit;f("text-secondary",!t),c(),w(t||"Pick a fruit")}}function K(e,i){if(e&1){let t=_();n(0,"button",14),u("click",function(){let o=s(t).$implicit;l();let p=h(1);return m(p.selectValue(o))}),a(1),r()}if(e&2){let t=i.$implicit;c(),w(t)}}function q(e,i){if(e&1){let t=_();n(0,"pui-search-dropdown",12,0),u("searchUpdate",function(o){s(t);let p=l(2);return m(p.onSearch(o))}),D(2,K,2,1,"button",13,v),r()}if(e&2){let t=l(2);c(2),b(t.filtered())}}function z(e,i){e&1&&(n(0,"div",5)(1,"h1",6),a(2,"Dropdown"),r(),n(3,"h3"),a(4,"Basic Dropdown"),r(),n(5,"p"),a(6,"TODO"),r(),n(7,"h3"),a(8,"Searchable Dropdown"),r(),n(9,"div",7)(10,"div",8)(11,"p"),a(12,"Normal:"),r(),n(13,"pui-dropdown"),x(14,j,2,3,"div",9)(15,A,4,0,"pui-search-dropdown",10),r(),n(16,"p"),a(17,"Disabled:"),r(),n(18,"pui-dropdown",11),x(19,J,2,3,"div",9)(20,q,4,0,"pui-search-dropdown",10),r()()()())}var te=(()=>{let i=class i{constructor(){this.data=["Apple","Banana","Cherry","Durian","Eggplant","Feijoa","Grape","Huckleberry","Indian GooseberryIndian GooseberryIndian GooseberryIndian Gooseberry","Jackfruit","Kiwi","Lemon","Mango","Nectarine","Olive","Pineapple"],this.search=S(""),this.filtered=E(()=>this.data.filter(d=>d.toLowerCase().includes(this.search().toLowerCase())))}onSearch(d){this.search.set(d)}};i.\u0275fac=function(o){return new(o||i)},i.\u0275cmp=C({type:i,selectors:[["demo-demo-dropdown"]],standalone:!0,features:[g],decls:6,vars:0,consts:[["dropdown",""],["puiSidebarContainer",""],["puiSidebarBreadcrumbs",""],[1,"max-w-screen-lg"],["class","flex flex-col py-6 px-8 gap-4",4,"puiSidebarMain"],[1,"flex","flex-col","py-6","px-8","gap-4"],[1,"text-primary-700","dark:text-primary-300"],[1,"w-full","px-8","py-6","rounded-2","border"],[1,"flex","flex-col","gap-4","items-start"],[3,"text-secondary",4,"puiDropdownTrigger"],[3,"searchUpdate",4,"puiDropdownOverlay"],["disabled",""],[3,"searchUpdate"],["puiHoverable","",1,"flex-none","justify-start","text-start","py-2","px-4","border-b","last:border-b-0"],["puiHoverable","",1,"flex-none","justify-start","text-start","py-2","px-4","border-b","last:border-b-0",3,"click"]],template:function(o,p){o&1&&(n(0,"pui-layered-container")(1,"div",1)(2,"div",2),y(3,"pui-breadcrumbs"),r(),n(4,"pui-sidebar-content",3),x(5,z,21,0,"div",4),r()()())},dependencies:[L,T,V,U,H,G,$,P,O,F,B,k,I,M]});let e=i;return e})();export{te as DemoDropdownComponent};
