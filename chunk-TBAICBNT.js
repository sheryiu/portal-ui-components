import{a as L}from"./chunk-SMNW4IMW.js";import{a as C}from"./chunk-6KPNOCOP.js";import{Aa as i,Ab as X,Ac as ce,B as I,Ba as c,Bb as Z,Bc as se,Cc as fe,D as _,Ea as D,Fa as w,Ga as s,Jc as ue,Ka as E,Kc as ve,L as f,La as n,Lc as xe,M as V,Ma as O,Mc as Ce,N as v,Na as z,Oc as he,Pa as x,Pc as ge,Qb as ee,Ra as F,Rb as te,S,T as b,Ta as G,Uc as _e,Vb as ie,Vc as Se,W as R,Wa as J,Wb as oe,Xb as re,Yb as ne,Zb as ae,_ as Y,ac as de,ca as d,d as B,db as K,ec as le,gb as Q,id as be,jd as ye,kc as M,kd as Te,la as j,ld as De,md as we,na as u,nd as Ee,od as Fe,pd as Me,qa as p,qd as A,r as H,sa as P,ua as h,v as N,va as q,w as $,wc as me,xa as y,xb as U,xc as pe,ya as T,yc as k,za as o,zb as W}from"./chunk-JQB2524T.js";import"./chunk-6RDLFHTQ.js";import"./chunk-CWTPBX7D.js";function Be(e,t){if(e&1){let a=D();o(0,"form",4),w("ngSubmit",function(){S(a);let r=s();return b(r.onSubmit())}),o(1,"phead-fieldset",5),c(2,"phead-field-def",6)(3,"phead-field-def",7),i(),o(4,"button",8),n(5,"Add"),i()()}if(e&2){let a=s();d(),p("formControl",a.formControl)}}var Le=(()=>{let t=class t extends le{constructor(){super(...arguments),this.service=f(L),this.dialog=f(Se),this.router=f(W),this.route=f(U),this.formControl=f(de).nonNullable.control({title:"",label:null}),this.onSubmit=this.createEffectFn(l=>l.pipe(_(()=>this.formControl.disable()),N(()=>this.service.create({input:this.formControl.getRawValue()}).pipe(H(r=>(this.dialog.open({title:"Error",icon:"error",details:r.message,dialogClass:"error-dialog"}),B)),$(()=>this.formControl.enable()),_(r=>this.router.navigate([r],{relativeTo:this.route})),_(()=>this.formControl.reset())))))}};t.\u0275fac=(()=>{let l;return function(m){return(l||(l=R(t)))(m||t)}})(),t.\u0275cmp=v({type:t,selectors:[["demo-drawer-add"]],standalone:!0,features:[j,x],decls:7,vars:3,consts:[["trigger","accordionTrigger"],["pheadSidebarDrawerSection",""],["pheadSidebarDrawerSectionHeader","","pheadAccordionTrigger","","pheadHoverable","","opened",""],["pheadSidebarDrawerSectionContent",""],["pheadSidebarDrawerSectionContent","",3,"ngSubmit"],[3,"formControl"],["key","title","fieldType","string","label","To-Do Name"],["key","label","fieldType","string","label","Label"],["pheadHoverable","","type","submit",1,"rounded-1","mx-1","py-2","text-sm","text-primary-700","dark:text-primary-500"]],template:function(r,m){if(r&1&&(o(0,"div",1)(1,"button",2,0)(3,"i"),n(4,"add"),i(),n(5," New List "),i(),u(6,Be,6,1,"form",3),i()),r&2){let g=E(2);P("bg-drawer-content",g.isOpened$$()),d(6),h(6,g.isOpened$$()?6:-1)}},dependencies:[C,M,A,De,we,Ee,k,me,ge,he,fe,ne,ie,oe,re,ae]});let e=t;return e})();var He=e=>[e],Ne=e=>({"border-black/50 dark:border-white/50 dark:bg-primary-800/20":e}),$e=e=>({"line-through text-secondary":e});function Ie(e,t){if(e&1&&(o(0,"div",7),n(1),i()),e&2){let a=t.$implicit;p("ngClass",F(2,$e,a.isCompleted)),d(),O(a.description)}}function Ve(e,t){e&1&&(o(0,"div",5)(1,"i",8),n(2,"add"),i(),n(3," Add some items"),i())}function Re(e,t){if(e&1&&(o(0,"div",6)(1,"i",8),n(2,"label"),i(),n(3),i()),e&2){let a=s();d(3),z(" ",a.todo().label," ")}}function Ye(e,t){if(e&1&&(o(0,"div",6)(1,"i",8),n(2,"timer"),i(),c(3,"phead-time-display",9),i()),e&2){let a=s();d(3),p("date",a.todo().remindOn)}}var Oe=(()=>{let t=class t{constructor(){this.todo=Y.required()}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=v({type:t,selectors:[["demo-todo-card"]],inputs:{todo:[V.SignalBased,"todo"]},standalone:!0,features:[x],decls:11,vars:14,consts:[["active","routerLinkActive"],["pheadHoverable","","routerLinkActive","",1,"border","rounded-2","flex-col","justify-start","items-start","transition-colors",3,"routerLink","ngClass"],[1,"w-full","truncate","px-4","pt-4","pb-2","text-xl","font-bold","text-primary-800","dark:text-primary-200"],[1,"flex","flex-col","px-4","pb-4","pt-2","gap-1","w-full"],[1,"truncate"],[1,"text-sm","text-secondary","flex","items-center","gap-1"],[1,"flex","gap-1","px-4","text-primary-800","dark:text-primary-200","pb-4"],[1,"truncate",3,"ngClass"],[1,"icon-4"],["format","MMM dd, YYYY HH:mm",3,"date"]],template:function(r,m){if(r&1&&(o(0,"div",1,0)(2,"span",2),n(3),i(),o(4,"div",3),y(5,Ie,2,4,"div",4,q,!1,Ve,4,0,"div",5),G(8,"slice"),i(),u(9,Re,4,1,"div",6)(10,Ye,4,1,"div",6),i()),r&2){let g=E(1);p("routerLink",F(10,He,m.todo().id))("ngClass",F(12,Ne,g.isActive)),d(3),O(m.todo().title),d(2),T(J(8,6,m.todo().items,0,6)),d(4),h(9,m.todo().label?9:-1),d(),h(10,m.todo().remindOn?10:-1)}},dependencies:[C,K,M,Q,X,Z,Ce]});let e=t;return e})();var je=(e,t)=>t.id;function Pe(e,t){e&1&&(o(0,"div",12)(1,"i",13),n(2,"timelapse"),i(),n(3," Incomplete "),i())}function qe(e,t){e&1&&(o(0,"div",12)(1,"i",13),n(2,"done_all"),i(),n(3," All "),i())}function ze(e,t){if(e&1&&c(0,"demo-todo-card",14),e&2){let a=t.$implicit;p("todo",a)}}function Ge(e,t){if(e&1){let a=D();o(0,"div",5)(1,"h1",6),n(2,"TO-DO"),i(),o(3,"div",7)(4,"phead-segmented-options",8),w("valueChange",function(r){S(a);let m=s();return b(m.filter.set(r))}),u(5,Pe,4,0,"div",9)(6,qe,4,0,"div",9),i(),c(7,"div",10),i(),c(8,"phead-divider"),o(9,"div",11),y(10,ze,1,1,"demo-todo-card",null,je),i()()}if(e&2){let a=s();d(4),p("value",a.filter()),d(),p("pheadOption","incomplete"),d(),p("pheadOption","all"),d(4),T(a.list())}}function Je(e,t){e&1&&c(0,"demo-drawer-add")}var bt=(()=>{let t=class t{constructor(){this.service=f(L),this.filter=this.service.mainFilter,this.filter$=ee(this.filter),this.list=te(this.filter$.pipe(I(l=>this.service.list(l))))}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=v({type:t,selectors:[["demo-todo-list"]],standalone:!0,features:[x],decls:8,vars:0,consts:[["pheadSidebarContainer",""],["pheadSidebarBreadcrumbs",""],[1,"max-w-screen-3xl"],["class","flex flex-col gap-4 py-6 px-8",4,"pheadSidebarMain"],[4,"pheadSidebarDrawer"],[1,"flex","flex-col","gap-4","py-6","px-8"],[1,"text-primary-700","dark:text-primary-300"],[1,"flex"],["color","primary",1,"grow",3,"valueChange","value"],["class","flex items-center gap-0.5 py-0.5",4,"pheadOption"],[1,"grow"],[1,"grid","gap-4",2,"grid-template-columns","repeat(auto-fill, minmax(20rem, 1fr))","grid-template-rows","masonry"],[1,"flex","items-center","gap-0.5","py-0.5"],[1,"icon-4"],[3,"todo"]],template:function(r,m){r&1&&(o(0,"phead-layered-container")(1,"div",0)(2,"div",1),c(3,"phead-breadcrumbs"),i(),o(4,"phead-sidebar-content",2),u(5,Ge,12,3,"div",3),o(6,"phead-accordion"),u(7,Je,1,0,"demo-drawer-add",4),i()()()())},dependencies:[C,ce,_e,A,ye,be,Me,Fe,Te,se,Oe,k,pe,Le,xe,ve,ue]});let e=t;return e})();export{bt as TodoListComponent};
