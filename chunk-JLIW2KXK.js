import{a as D}from"./chunk-GET72L3Z.js";import{B as b,Ca as _,Da as f,Ea as s,Ja as S,L as m,M as h,Ma as T,Mc as j,Na as k,Ob as V,Pb as A,R as p,S as u,_ as C,ca as c,h as x,jc as g,ka as v,sa as d,ta as w,va as y,wa as $,xa as r,ya as l}from"./chunk-GGV4OHPW.js";function F(e,t){if(e&1){let n=_();r(0,"button",2),f("click",function(){p(n);let o=s();return u(o.onSelect(null))}),r(1,"span",3),S(2,"---"),l()()}}function U(e,t){if(e&1){let n=_();r(0,"button",2),f("click",function(){let o=p(n).$implicit,a=s(2);return u(a.onSelect(o.id))}),r(1,"span",4),S(2),l()()}if(e&2){let n=t.$implicit;c(2),T("",n.name==null?null:n.name.jp," / ",n.name==null?null:n.name.en,"")}}function E(e,t){if(e&1&&y(0,U,3,2,"button",1,w),e&2){let n=s();$(n.list$$())}}var G=(()=>{let t=class t{constructor(){this.dropdown=m(j,{skipSelf:!0,host:!0}),this.service=m(D),this.canUnset=C(!1),this.list$$=A(V(this.dropdown.searchTerm$$).pipe(b(i=>this.service.list({name:i})),x(i=>i.slice(0,10))))}onSelect(i){this.dropdown.selectValue(i)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=h({type:t,selectors:[["demo-armor-set-search"]],inputs:{canUnset:[1,"canUnset"]},standalone:!0,features:[k],decls:3,vars:2,consts:[[1,"flex","flex-col","overflow-y-auto"],["type","button","puiHoverable","",1,"px-3","py-2","justify-start","border-b","last:border-b-0"],["type","button","puiHoverable","",1,"px-3","py-2","justify-start","border-b","last:border-b-0",3,"click"],[1,"text-start","truncate","text-secondary"],[1,"text-start","truncate"]],template:function(o,a){o&1&&(r(0,"div",0),v(1,F,3,0,"button",1)(2,E,2,0),l()),o&2&&(c(),d(a.canUnset()?1:-1),c(),d(a.list$$?2:-1))},dependencies:[g],encapsulation:2});let e=t;return e})();export{G as a};
