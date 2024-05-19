import{a as k}from"./chunk-SMNW4IMW.js";import{a as v}from"./chunk-6KPNOCOP.js";import{$ as he,$a as Ce,Aa as r,Ac as Re,B as de,Ba as b,Bc as Ae,C as le,Cc as Le,D as N,E as me,Ea as D,Fa as c,Ga as p,Hb as ie,I as ce,Ib as Se,Ka as $,L as f,La as u,M as _,Ma as ve,Mc as Ve,N as g,O as pe,Oc as Oe,P as ue,Pa as x,Pc as ze,Ra as V,Rb as De,S as C,T as w,Uc as Ne,Vb as Ee,Vc as U,W as j,Wb as Te,Xb as Fe,Xc as je,Yb as Ie,Z as P,Zb as Me,_ as E,a as ne,ac as He,b as oe,bb as we,ca as m,cb as ye,d as R,da as L,db as Z,ec as F,h as re,ia as fe,id as Pe,jd as Be,kc as I,kd as $e,l as ae,la as T,lc as M,ld as W,ma as _e,md as G,na as y,nd as X,od as Ze,pd as Ye,q as se,qa as h,qd as H,r as z,sa as B,ua as S,v as A,wc as q,xa as ge,xb as Y,xc as ke,ya as xe,yc as K,za as a,zb as be}from"./chunk-JQB2524T.js";import"./chunk-6RDLFHTQ.js";import"./chunk-CWTPBX7D.js";function Xe(n,i){if(n&1){let s=D();a(0,"form",4),c("ngSubmit",function(){C(s);let t=p();return w(t.onSubmit())}),a(1,"phead-fieldset",5),b(2,"phead-field-def",6),r(),a(3,"button",7),u(4,"Set"),r()()}if(n&2){let s=p();m(),h("formControl",s.formControl)}}var qe=(()=>{let i=class i extends F{constructor(){super(),this.service=f(k),this.dialog=f(U),this.todo=E.required(),this.formControl=f(He).nonNullable.control({remindOn:null}),this.onSubmit=this.createEffectFn(e=>e.pipe(A(()=>this.service.update(this.todo()?.id,{input:this.formControl.getRawValue()}).pipe(z(t=>(this.dialog.open({title:"Error",icon:"error",details:t.message,dialogClass:"error-dialog"}),R)))))),we(()=>{this.todo()&&this.formControl.setValue({remindOn:this.todo().remindOn})})}};i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=g({type:i,selectors:[["demo-drawer-remind"]],inputs:{todo:[_.SignalBased,"todo"]},standalone:!0,features:[T,x],decls:7,vars:3,consts:[["trigger","accordionTrigger"],["pheadSidebarDrawerSection",""],["pheadSidebarDrawerSectionHeader","","pheadAccordionTrigger","","pheadHoverable","","opened",""],["pheadSidebarDrawerSectionContent",""],["pheadSidebarDrawerSectionContent","",3,"ngSubmit"],[3,"formControl"],["label","Remind me at","fieldType","date-time","key","remindOn"],["pheadHoverable","","type","submit",1,"rounded-1","mx-1","py-2","text-sm","text-primary-700","dark:text-primary-500"]],template:function(t,o){if(t&1&&(a(0,"div",1)(1,"button",2,0)(3,"i"),u(4,"timer"),r(),u(5," Set Reminder "),r(),y(6,Xe,5,1,"form",3),r()),t&2){let d=$(2);B("bg-drawer-content",d.isOpened$$()),m(6),S(6,d.isOpened$$()?6:-1)}},dependencies:[v,I,H,W,G,X,K,q,ze,Oe,Le,Ie,Ee,Te,Fe,Me]});let n=i;return n})();function Je(n,i){if(n&1){let s=D();a(0,"div",3)(1,"button",4),c("click",function(){C(s);let t=p();return w(t.onRemoveClick())}),u(2,"Delete"),r()()}}var Ke=(()=>{let i=class i extends F{constructor(){super(...arguments),this.service=f(k),this.dialog=f(U),this.router=f(be),this.route=f(Y),this.todo=E.required(),this.onRemoveClick=this.createEffectFn(e=>e.pipe(A(()=>new ne(t=>{let o={title:"Are you sure to remove?",icon:"delete_forever",actions:[{label:"Cancel",onClick:()=>{t.complete(),d.close()}},{label:"Confirm",disabled:!0,color:"red",onClick:()=>{t.next(),t.complete(),d.close()}}],detailsComponent:je,onDetailsComponentAttached:l=>{l.setInput("stringToCheck",this.todo()?.title??"delete"),l.instance.matches$.subscribe(te=>{o.actions.at(1).disabled=!te})}},d=this.dialog.open(o);d.afterClosed$.subscribe({next:()=>t.complete(),complete:()=>t.complete()})})),A(()=>this.service.remove(this.todo()?.id).pipe(z(t=>(this.dialog.open({title:"Error",icon:"error",details:t.message,dialogClass:"error-dialog"}),R)))),N(()=>this.router.navigate(["../"],{relativeTo:this.route,replaceUrl:!0}))))}};i.\u0275fac=(()=>{let e;return function(o){return(e||(e=j(i)))(o||i)}})(),i.\u0275cmp=g({type:i,selectors:[["demo-drawer-remove"]],inputs:{todo:[_.SignalBased,"todo"]},standalone:!0,features:[T,x],decls:7,vars:3,consts:[["trigger","accordionTrigger"],["pheadSidebarDrawerSection",""],["pheadSidebarDrawerSectionHeader","","pheadAccordionTrigger","","pheadHoverable",""],["pheadSidebarDrawerSectionContent",""],["pheadHoverable","","type","submit",1,"rounded-1","mx-1","py-2","text-sm","text-red-700","dark:text-red-500",3,"click"]],template:function(t,o){if(t&1&&(a(0,"div",1)(1,"button",2,0)(3,"i"),u(4,"delete"),r(),u(5," Remove List "),r(),y(6,Je,3,0,"div",3),r()),t&2){let d=$(2);B("bg-drawer-content",d.isOpened$$()),m(6),S(6,d.isOpened$$()?6:-1)}},dependencies:[v,I,H,W,G,X,K,q]});let n=i;return n})();var Q=(()=>{let i=class i{get minRows(){return this._minRows}set minRows(e){this._minRows=ie(e),this._setMinHeight()}get maxRows(){return this._maxRows}set maxRows(e){this._maxRows=ie(e),this._setMaxHeight()}get enabled(){return this._enabled}set enabled(e){this._enabled!==e&&((this._enabled=e)?this.resizeToFitContent(!0):this.reset())}get placeholder(){return this._textareaElement.placeholder}set placeholder(e){this._cachedPlaceholderHeight=void 0,e?this._textareaElement.setAttribute("placeholder",e):this._textareaElement.removeAttribute("placeholder"),this._cacheTextareaPlaceholderHeight()}constructor(e,t,o,d){this._elementRef=e,this._platform=t,this._ngZone=o,this._destroyed=new oe,this._enabled=!0,this._previousMinRows=-1,this._isViewInited=!1,this._handleFocusEvent=l=>{this._hasFocus=l.type==="focus"},this._document=d,this._textareaElement=this._elementRef.nativeElement}_setMinHeight(){let e=this.minRows&&this._cachedLineHeight?`${this.minRows*this._cachedLineHeight}px`:null;e&&(this._textareaElement.style.minHeight=e)}_setMaxHeight(){let e=this.maxRows&&this._cachedLineHeight?`${this.maxRows*this._cachedLineHeight}px`:null;e&&(this._textareaElement.style.maxHeight=e)}ngAfterViewInit(){this._platform.isBrowser&&(this._initialHeight=this._textareaElement.style.height,this.resizeToFitContent(),this._ngZone.runOutsideAngular(()=>{let e=this._getWindow();ae(e,"resize").pipe(se(16),le(this._destroyed)).subscribe(()=>this.resizeToFitContent(!0)),this._textareaElement.addEventListener("focus",this._handleFocusEvent),this._textareaElement.addEventListener("blur",this._handleFocusEvent)}),this._isViewInited=!0,this.resizeToFitContent(!0))}ngOnDestroy(){this._textareaElement.removeEventListener("focus",this._handleFocusEvent),this._textareaElement.removeEventListener("blur",this._handleFocusEvent),this._destroyed.next(),this._destroyed.complete()}_cacheTextareaLineHeight(){if(this._cachedLineHeight)return;let e=this._textareaElement.cloneNode(!1);e.rows=1,e.style.position="absolute",e.style.visibility="hidden",e.style.border="none",e.style.padding="0",e.style.height="",e.style.minHeight="",e.style.maxHeight="",e.style.overflow="hidden",this._textareaElement.parentNode.appendChild(e),this._cachedLineHeight=e.clientHeight,e.remove(),this._setMinHeight(),this._setMaxHeight()}_measureScrollHeight(){let e=this._textareaElement,t=e.style.marginBottom||"",o=this._platform.FIREFOX,d=o&&this._hasFocus,l=o?"cdk-textarea-autosize-measuring-firefox":"cdk-textarea-autosize-measuring";d&&(e.style.marginBottom=`${e.clientHeight}px`),e.classList.add(l);let te=e.scrollHeight-4;return e.classList.remove(l),d&&(e.style.marginBottom=t),te}_cacheTextareaPlaceholderHeight(){if(!this._isViewInited||this._cachedPlaceholderHeight!=null)return;if(!this.placeholder){this._cachedPlaceholderHeight=0;return}let e=this._textareaElement.value;this._textareaElement.value=this._textareaElement.placeholder,this._cachedPlaceholderHeight=this._measureScrollHeight(),this._textareaElement.value=e}ngDoCheck(){this._platform.isBrowser&&this.resizeToFitContent()}resizeToFitContent(e=!1){if(!this._enabled||(this._cacheTextareaLineHeight(),this._cacheTextareaPlaceholderHeight(),!this._cachedLineHeight))return;let t=this._elementRef.nativeElement,o=t.value;if(!e&&this._minRows===this._previousMinRows&&o===this._previousValue)return;let d=this._measureScrollHeight(),l=Math.max(d,this._cachedPlaceholderHeight||0);t.style.height=`${l}px`,this._ngZone.runOutsideAngular(()=>{typeof requestAnimationFrame<"u"?requestAnimationFrame(()=>this._scrollToCaretPosition(t)):setTimeout(()=>this._scrollToCaretPosition(t))}),this._previousValue=o,this._previousMinRows=this._minRows}reset(){this._initialHeight!==void 0&&(this._textareaElement.style.height=this._initialHeight)}_noopInputHandler(){}_getDocument(){return this._document||document}_getWindow(){return this._getDocument().defaultView||window}_scrollToCaretPosition(e){let{selectionStart:t,selectionEnd:o}=e;!this._destroyed.isStopped&&this._hasFocus&&e.setSelectionRange(t,o)}};i.\u0275fac=function(t){return new(t||i)(L(he),L(Se),L(fe),L(ye,8))},i.\u0275dir=ue({type:i,selectors:[["textarea","cdkTextareaAutosize",""]],hostAttrs:["rows","1",1,"cdk-textarea-autosize"],hostBindings:function(t,o){t&1&&c("input",function(){return o._noopInputHandler()})},inputs:{minRows:[_.None,"cdkAutosizeMinRows","minRows"],maxRows:[_.None,"cdkAutosizeMaxRows","maxRows"],enabled:[_.HasDecoratorInputTransform,"cdkTextareaAutosize","enabled",Ce],placeholder:"placeholder"},exportAs:["cdkTextareaAutosize"],standalone:!0,features:[_e]});let n=i;return n})(),ee=(()=>{let i=class i{};i.\u0275fac=function(t){return new(t||i)},i.\u0275mod=pe({type:i}),i.\u0275inj=ce({});let n=i;return n})();var We=(()=>{let i=class i{constructor(){this.addItem=P()}onKeypress(e){if(e.shiftKey==!1&&e.code=="Enter"){e.preventDefault(),this.addItem.emit({description:e.target.value.trim()}),e.target.value="";return}}};i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=g({type:i,selectors:[["demo-item-add"]],outputs:{addItem:"addItem"},standalone:!0,features:[x],decls:5,vars:0,consts:[[1,"flex","items-center","gap-1","py-2"],[1,"icon-5","text-secondary","flex-none","mx-1"],["borderless","",1,"grow"],["cdkTextareaAutosize","","placeholder","New item",3,"keypress"]],template:function(t,o){t&1&&(a(0,"form",0)(1,"i",1),u(2,"add"),r(),a(3,"phead-input-field",2)(4,"textarea",3),c("keypress",function(l){return o.onKeypress(l)}),r()()())},dependencies:[v,M,ee,Q]});let n=i;return n})();var et=n=>({"line-through text-secondary":n}),Ge=(()=>{let i=class i extends F{constructor(){super(...arguments),this.item=E.required(),this.updateItem=P(),this.onKeydown=this.createEffectFn(e=>e.pipe(me(200,void 0,{leading:!1,trailing:!0}),N(t=>{this.updateItem.emit({description:t.target.value})})))}toggleCheckbox(){this.updateItem.emit({isCompleted:!this.item().isCompleted})}};i.\u0275fac=(()=>{let e;return function(o){return(e||(e=j(i)))(o||i)}})(),i.\u0275cmp=g({type:i,selectors:[["demo-item"]],inputs:{item:[_.SignalBased,"item"]},outputs:{updateItem:"updateItem"},standalone:!0,features:[T,x],decls:6,vars:5,consts:[[1,"flex","items-center","gap-1","py-2"],["pheadHoverable","","type","button",1,"rounded-1","p-1",3,"click"],[1,"icon-5","text-secondary","flex-none"],["borderless","",1,"grow",3,"ngClass"],["cdkTextareaAutosize","","placeholder","Item",1,"overflow-hidden",3,"keydown","value"]],template:function(t,o){t&1&&(a(0,"div",0)(1,"button",1),c("click",function(){return o.toggleCheckbox()}),a(2,"i",2),u(3),r()(),a(4,"phead-input-field",3)(5,"textarea",4),c("keydown",function(l){return o.onKeydown(l)}),r()()()),t&2&&(m(3),ve(o.item().isCompleted?"check_box":"check_box_outline_blank"),m(),h("ngClass",V(3,et,o.item().isCompleted)),m(),h("value",o.item().description))},dependencies:[v,Z,I,M,ee,Q]});let n=i;return n})();var tt=(n,i)=>i.id,it=n=>({"font-variation-fill text-primary-800 dark:text-primary-200":n}),nt=n=>({"text-primary-800 dark:text-primary-200":n});function ot(n,i){if(n&1&&(a(0,"i",9),u(1,"timer"),r(),b(2,"phead-time-display",13)),n&2){let s,e,t=p(3);h("ngClass",V(2,nt,!!((s=t.data())!=null&&s.label))),m(2),h("date",(e=t.data())==null?null:e.remindOn)}}function rt(n,i){if(n&1){let s=D();a(0,"demo-item",14),c("updateItem",function(t){let o=C(s).$implicit,d=p(3);return w(d.updateItem(o.id,t))}),r()}if(n&2){let s=i.$implicit;h("item",s)}}function at(n,i){if(n&1){let s=D();a(0,"phead-input-field",6)(1,"input",7),c("input",function(t){C(s);let o=p(2);return w(o.updateTitle(t))}),r()(),a(2,"div",8)(3,"i",9),u(4,"label"),r(),a(5,"phead-input-field",10)(6,"input",7),c("input",function(t){C(s);let o=p(2);return w(o.updateLabel(t))}),r()(),y(7,ot,3,4),r(),b(8,"phead-divider"),a(9,"div",11),ge(10,rt,1,1,"demo-item",null,tt),a(12,"demo-item-add",12),c("addItem",function(t){C(s);let o=p(2);return w(o.addItem(t))}),r()()}if(n&2){let s,e,t,o,d,l=p(2);m(),h("value",(s=l.data())==null?null:s.title),m(2),h("ngClass",V(4,it,!!((e=l.data())!=null&&e.label))),m(3),h("value",(t=l.data())==null?null:t.label),m(),S(7,(o=l.data())!=null&&o.remindOn?7:-1),m(3),xe((d=l.data())==null?null:d.items)}}function st(n,i){if(n&1&&(a(0,"div",5),y(1,at,13,6),r()),n&2){let s=p();m(),S(1,s.data()?1:-1)}}function dt(n,i){if(n&1&&b(0,"demo-drawer-remind",15),n&2){let s=p();h("todo",s.data())}}function lt(n,i){if(n&1&&b(0,"demo-drawer-remove",15),n&2){let s=p();h("todo",s.data())}}var gi=(()=>{let i=class i{constructor(){this.route=f(Y),this.service=f(k),this.todo=this.route.params.pipe(re(e=>e.id),de(e=>this.service.one(e))),this.data=De(this.todo)}addItem(e){this.service.addItem(this.data()?.id,{input:e})}updateItem(e,t){this.service.updateItem(this.data()?.id,e,{input:t})}updateTitle(e){this.service.update(this.data()?.id,{input:{title:e.currentTarget.value}})}updateLabel(e){this.service.update(this.data()?.id,{input:{label:e.currentTarget.value}})}};i.\u0275fac=function(t){return new(t||i)},i.\u0275cmp=g({type:i,selectors:[["demo-todo-detail"]],standalone:!0,features:[x],decls:9,vars:0,consts:[["pheadSidebarContainer",""],["pheadSidebarBreadcrumbs",""],[1,"max-w-screen-3xl"],["class","flex flex-col gap-4 py-6 px-8",4,"pheadSidebarMain"],[3,"todo",4,"pheadSidebarDrawer"],[1,"flex","flex-col","gap-4","py-6","px-8"],["borderless","",1,"text-2xl","font-bold","text-primary-700","dark:text-primary-300"],["type","text",1,"py-2",3,"input","value"],[1,"flex","items-center","gap-1.5","px-2","-mt-3"],[1,"icon-5",3,"ngClass"],["borderless","",1,"text-primary-800","dark:text-primary-200"],[1,"flex","flex-col","px-1"],[3,"addItem"],["format","MMM dd, YYYY HH:mm",3,"date"],[3,"updateItem","item"],[3,"todo"]],template:function(t,o){t&1&&(a(0,"phead-layered-container")(1,"div",0)(2,"div",1),b(3,"phead-breadcrumbs"),r(),a(4,"phead-sidebar-content",2),y(5,st,2,1,"div",3),a(6,"phead-accordion"),y(7,dt,1,1,"demo-drawer-remind",4)(8,lt,1,1,"demo-drawer-remove",4),r()()()())},dependencies:[v,Z,M,Re,Ne,H,Be,Pe,Ye,Ze,$e,Ae,ke,Ke,Ge,We,qe,Ve]});let n=i;return n})();export{gi as TodoDetailComponent};
