import{a as H}from"./chunk-B3AA72KM.js";import{a as E}from"./chunk-6KPNOCOP.js";import"./chunk-55AHLOIA.js";import{Aa as d,Ac as Se,B as R,Ba as c,Bd as Oe,Cc as ve,Cd as Ie,D as b,Dd as Re,Ea as T,Ed as je,Fa as g,Fd as Pe,Ga as s,Gd as Qe,Ha as z,Hd as ze,Ia as J,Ja as q,Jb as ie,Ka as G,Kb as re,L as u,La as h,Lb as F,Mb as ae,N as _,Nb as oe,Oa as Y,Ob as ne,Oc as ye,Pa as x,Pc as Te,Qa as K,Qb as M,Ra as D,S as C,T as S,Ta as U,Tb as le,Ua as W,Ub as de,Uc as ge,Vb as pe,W as v,Wb as ce,Xb as me,Yb as se,Zb as ue,ab as L,ac as he,ca as l,d as B,db as X,eb as Z,ec as k,i as N,id as xe,jd as De,kc as w,kd as Fe,la as y,lc as fe,ld as ke,mc as be,md as we,na as m,nd as $e,od as Ve,p as A,pd as Ee,qa as n,qd as V,r as O,ra as j,sa as P,ua as Q,ud as He,v as I,vd as Le,wc as _e,wd as Me,xb as ee,xc as Ce,xd as Be,yc as $,yd as Ne,za as o,zb as te,zd as Ae}from"./chunk-JQB2524T.js";import"./chunk-6RDLFHTQ.js";import"./chunk-CWTPBX7D.js";var Ke=e=>({"!text-primary-950 dark:!text-primary-50":e});function Ue(e,t){if(e&1){let i=T();o(0,"form",4),g("ngSubmit",function(){C(i);let a=s();return S(a.onSubmit())}),o(1,"phead-fieldset",5),c(2,"phead-field-def",6)(3,"phead-field-def",7)(4,"phead-field-def",8)(5,"phead-field-def",9)(6,"phead-field-def",10),d(),o(7,"button",11),h(8,"Add"),d()()}if(e&2){let i=s();l(),n("formControl",i.formControl)}}var Je=(()=>{let t=class t extends k{constructor(){super(...arguments),this.service=u(H),this.builder=u(he),this.formControl=this.builder.control(null),this.onSubmit=this.createEffectFn(r=>r.pipe(A(()=>this.formControl.value!=null),I(()=>this.service.create(this.formControl.value).pipe(O(()=>B))),b(()=>this.formControl.reset())))}};t.\u0275fac=(()=>{let r;return function(p){return(r||(r=v(t)))(p||t)}})(),t.\u0275cmp=_({type:t,selectors:[["mhw-drawer-create"]],standalone:!0,features:[y,x],decls:8,vars:6,consts:[["trigger","accordionTrigger"],["pheadSidebarDrawerSection",""],["pheadSidebarDrawerSectionHeader","","pheadHoverable","","role","button","type","button","pheadAccordionTrigger","","opened","",3,"ngClass"],["pheadSidebarDrawerSectionContent",""],["pheadSidebarDrawerSectionContent","",3,"ngSubmit"],[3,"formControl"],["key","name>en","label","English Name","fieldType","string"],["key","name>jp","label","Japanese Name","fieldType","string"],["key","description>en","label","English Description","fieldType","string"],["key","description>jp","label","Japanese Description","fieldType","string"],["key","color","label","Color","fieldType","string"],["pheadHoverable","","role","button","type","submit",1,"rounded-1","mx-1","py-2","text-sm","text-primary-700","dark:text-primary-500"]],template:function(a,p){if(a&1&&(o(0,"div",1)(1,"button",2,0)(3,"i"),h(4,"add"),d(),o(5,"p"),h(6,"Insert New"),d()(),m(7,Ue,9,1,"form",3),d()),a&2){let f=G(2);P("bg-drawer-content",f.isOpened$$()),l(),n("ngClass",D(4,Ke,!f.isOpened$$())),l(6),Q(7,f.isOpened$$()?7:-1)}},dependencies:[E,X,w,V,ke,we,$e,$,_e,Te,ye,ve,se,pe,ce,me,ue]});let e=t;return e})();var We=()=>["color","name"],Xe=e=>[e];function Ze(e,t){e&1&&c(0,"phead-table-header-cell")}function et(e,t){if(e&1){let i=T();o(0,"div",14)(1,"phead-input-field")(2,"input",15),g("input",function(a){C(i);let p=s(3);return S(p.onChangeFilter({name:a.currentTarget.value}))}),d()()()}if(e&2){let i,r=s(3);n("cdkTrapFocusAutoCapture",!0),l(2),n("value",(i=r.filterByName$$())!==null&&i!==void 0?i:"")}}function tt(e,t){if(e&1&&(o(0,"phead-table-header-cell",12),h(1," Name "),m(2,et,3,2,"div",13),d()),e&2){let i=s(2);n("filtered",i.filterByName$$()!=null)}}function it(e,t){if(e&1&&(o(0,"phead-table-cell"),c(1,"div",16),d()),e&2){let i=t.$implicit;l(),j("background-color",i.color)}}function rt(e,t){if(e&1&&(o(0,"phead-table-cell"),h(1),d()),e&2){let i=t.$implicit;l(),Y(" ",i.name==null?null:i.name.jp," / ",i.name==null?null:i.name.en," ")}}function at(e,t){if(e&1&&c(0,"phead-table-row",17),e&2){let i=t.$implicit;n("route",D(2,Xe,i.id))("item",i)}}function ot(e,t){if(e&1&&(o(0,"phead-table",4),m(1,Ze,1,0,"phead-table-header-cell",5)(2,tt,3,1,"phead-table-header-cell",6)(3,it,2,2,"phead-table-cell",7)(4,rt,2,2,"phead-table-cell",7),o(5,"cdk-virtual-scroll-viewport",8)(6,"phead-table-body",9),c(7,"phead-table-header-row"),m(8,at,1,4,"phead-table-row",10),U(9,"async"),o(10,"phead-table-footer-row",11),c(11,"phead-table-simple-footer"),d()()()()),e&2){let i=s();n("columns",K(10,We)),l(),n("pheadTableHeaderCellDef","color"),l(),n("pheadTableHeaderCellDef","name"),l(),n("pheadTableCellDef","color"),l(),n("pheadTableCellDef","name"),l(),n("extraHeight",48*2),l(3),n("cdkVirtualForOf",W(9,8,i.data$))("cdkVirtualForTrackBy",i.trackingFn)}}function nt(e,t){e&1&&c(0,"mhw-drawer-create")}var Ht=(()=>{let t=class t extends k{constructor(){super(...arguments),this.service=u(H),this.router=u(te),this.route=u(ee),this.data$=N({filter:M(this.service.mainListFilter$$),sort:M(this.service.mainListSort$$)}).pipe(R(({filter:r,sort:a})=>this.service.list(r,a))),this.filterByName$$=L(()=>this.service.mainListFilter$$().name),this.sortByRarity$$=L(()=>this.service.mainListSort$$().name),this.onChangeSort=this.createEffectFn(r=>r.pipe(b(([a,p])=>{this.service.mainListSort$$.set({[a]:p})}))),this.onChangeFilter=this.createEffectFn(r=>r.pipe(b(a=>{this.service.mainListFilter$$.set(a)}),b()))}onHeaderClick(){this.router.navigate(["./"],{relativeTo:this.route}),this.scrollViewport?.scrollToOffset(0,"smooth")}trackingFn(r,a){return a.id}};t.\u0275fac=(()=>{let r;return function(p){return(r||(r=v(t)))(p||t)}})(),t.\u0275cmp=_({type:t,selectors:[["app-skill-list"]],viewQuery:function(a,p){if(a&1&&z(F,5),a&2){let f;J(f=q())&&(p.scrollViewport=f.first)}},standalone:!0,features:[y,x],decls:8,vars:0,consts:[["pheadSidebarContainer","","cdkVirtualScrollingElement","","cdkScrollable",""],["pheadSidebarBreadcrumbs",""],["itemHeight","48",3,"columns",4,"pheadSidebarMain"],[4,"pheadSidebarDrawer"],["itemHeight","48",3,"columns"],[4,"pheadTableHeaderCellDef"],[3,"filtered",4,"pheadTableHeaderCellDef"],[4,"pheadTableCellDef"],["itemSize","",3,"extraHeight"],[2,"grid-template-columns","min-content 1fr"],["pheadHoverable","",3,"route","item",4,"cdkVirtualFor","cdkVirtualForOf","cdkVirtualForTrackBy"],[1,"px-4","py-1"],[3,"filtered"],["cdkTrapFocus","",3,"cdkTrapFocusAutoCapture",4,"pheadTableHeaderCellFilter"],["cdkTrapFocus","",3,"cdkTrapFocusAutoCapture"],["type","search","placeholder","Type to search",3,"input","value"],[1,"hexagon-mask","size-6"],["pheadHoverable","",3,"route","item"]],template:function(a,p){a&1&&(o(0,"phead-layered-container")(1,"div",0)(2,"div",1),c(3,"phead-breadcrumbs"),d(),o(4,"phead-sidebar-content"),m(5,ot,12,11,"phead-table",2),o(6,"phead-accordion"),m(7,nt,1,0,"mhw-drawer-create",3),d()()()())},dependencies:[E,w,be,fe,Se,Z,Je,ge,V,De,xe,Ee,Ve,Fe,ze,Me,Qe,Be,je,Re,Ne,He,Ie,Le,Oe,Ae,Pe,$,Ce,ne,re,ie,ae,F,oe,de,le],encapsulation:2});let e=t;return e})();export{Ht as SkillListComponent};