import{a as m,b as z,d as ke}from"./chunk-EIQCALGI.js";import"./chunk-HUQQFLCT.js";import{a as Ie}from"./chunk-KCMED6EJ.js";import{$ as se,$b as q,B as p,C as N,Hb as ve,L as d,Mb as Ce,Na as j,Nb as xe,O as l,Oa as de,Ob as M,P as ee,Pb as B,Q as S,Qa as pe,Qb as _,R as te,Ra as ce,S as ie,Sb as L,T as ne,Tb as Se,U as re,Ub as be,V as ae,Vb as Ee,W as o,X as a,Xb as W,Y as u,Ya as f,Yb as U,Zb as De,_b as H,a as R,aa as oe,ba as s,ca as g,da as A,ea as T,fa as le,ga as F,i as C,ia as K,ja as J,kb as me,mb as ue,ob as fe,pb as he,ta as c,tb as V,u as G,va as O,wb as ye,x as Z,xa as P,xb as ge,y}from"./chunk-REEGPD33.js";var we=(()=>{let t=class t{constructor(){this.dataService=p(m),this.list=f(this.dataService.getList()),this.id=l(void 0),this.index=l(void 0),this.data=l(void 0),this.fieldConfiguration=l({type:"object",properties:{line1:{type:"string",description:"Line 1"},line2:{type:"string",description:"Line 2"},city:{type:"string",description:"City"},state:{type:"string",description:"State"},postalCode:{type:"string",description:"Postal Code"},country:{type:"string",description:"Country"}}}),this.isDirty=l(!1),this.updatedValue=l(void 0),this.controlsConfig=c(()=>this.isDirty()?B:M),O(()=>{this.data.set(structuredClone(this.list()?.find(e=>e.id==this.id())?.savedAddresses.at(Number(this.index()))))},{allowSignalWrites:!0})}registerUpdateState(e){this.updateState=e}onStateChange(e){this.isDirty.update(r=>e.isDirty??r)}onValueChange(e){this.updatedValue.set(e)}onControlClick(e,r){switch(e){case"refresh":case"cancel":{this.data.set(structuredClone(this.list()?.find(n=>n.id==this.id())?.savedAddresses.at(Number(this.index())))),this.updateState({isDirty:!1});break}case"save":{let n=this.updatedValue();n&&(this.dataService.updateAddress(this.id(),Number(this.index()),n),this.updateState({isDirty:!1}));break}}}onParamsChange(e,r){this.id.set(e.id),this.index.set(e.index)}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=y({token:t,factory:t.\u0275fac});let i=t;return i})();var Oe=i=>["./",i],Pe=i=>({"border-primary-300 dark:border-primary-700 bg-hover":i});function je(i,t){if(i&1&&(o(0,"a",4,0)(2,"div",5)(3,"span",6),s(4),a(),o(5,"span",6),s(6),a(),o(7,"span",7),s(8),a()()()),i&2){let h=t.$implicit,e=t.$index,r=oe(1);S("routerLink",K(6,Oe,e))("ngClass",K(8,Pe,r.isActive)),d(4),A(" ",h.line1," "),d(2),A(" ",h.line2," "),d(2),T("",h.city,", ",h.state,"")}}var Ae=(()=>{let t=class t{constructor(){this.dataService=p(m),this.route=p(j),this.list=f(this.dataService.getList()),this.id=f(this.route.params.pipe(C(e=>e.id))),this.data=c(()=>this.list()?.find(e=>e.id==this.id())?.savedAddresses??[])}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=N({type:t,selectors:[["demo-customer-address"]],hostAttrs:[1,"contents"],standalone:!0,features:[F],decls:6,vars:0,consts:[["active","routerLinkActive"],[1,"flex","flex-row","gap-8","grow"],[1,"pui-card","rounded-4","basis-80","shrink-0","grow-0","p-4","h-fit","max-h-[calc(100svh_-_8.5rem)]","overflow-y-auto","sticky","top-26"],[1,"flex","flex-col","gap-4"],["routerLinkActive","","puiHoverable","",1,"rounded-3","pui-card--subtle","border","p-4","text-start","justify-start",3,"routerLink","ngClass"],[1,"flex","flex-col"],[1,"text-base","truncate"],[1,"text-sm","truncate","font-medium","text-neutral-800","dark:text-neutral-200"]],template:function(r,n){r&1&&(o(0,"div",1)(1,"div",2)(2,"div",3),re(3,je,9,10,"a",4,ne),a()(),u(5,"router-outlet"),a()),r&2&&(d(3),ae(n.data()))},dependencies:[ve,ue,pe,ce,P,de]});let i=t;return i})();var Y=(()=>{let t=class t{constructor(){this.dataService=p(m),this.list=f(this.dataService.getList()),this.id=l(""),this.heading=c(()=>this.list()?.find(e=>e.id==this.id())?.name??"--"),this.tabs=l([{label:"Info",route:["info"]},{label:"Addresses",route:["address"]},{label:"Raw",route:["raw"]}]),this.routeToFullContent=c(()=>["/","user","customer",{outlets:{primary:["detail",this.id()],peek:null}}])}onParamsChange(e,r){this.id.set(e.id)}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=y({token:t,factory:t.\u0275fac});let i=t;return i})();var Te=(()=>{let t=class t{constructor(){this.dataService=p(m),this.list=f(this.dataService.getList()),this.id=l(void 0),this.data=l(void 0),this.fieldConfiguration=l({type:"object",properties:{name:{type:"string",description:"Name"},username:{type:"string",description:"Username"},email:{type:"string",description:"Email"},phone:{type:"string",description:"Phone"},address:{type:"object",description:"Address",properties:{line1:{type:"string",description:"Line 1"},line2:{type:"string",description:"Line 2"},city:{type:"string",description:"City"},state:{type:"string",description:"State"},postalCode:{type:"string",description:"Postal Code"},country:{type:"string",description:"Country"}}},savedAddresses:{type:"array",description:"Saved Address",items:{type:"object",properties:{line1:{type:"string",description:"Line 1"},line2:{type:"string",description:"Line 2"},city:{type:"string",description:"City"},state:{type:"string",description:"State"},postalCode:{type:"string",description:"Postal Code"},country:{type:"string",description:"Country"}}}},registeredSince:{type:"date-time",description:"Registered Since"}}}),this.isDirty=l(!1),this.updatedValue=l(void 0),this.controlsConfig=c(()=>this.isDirty()?B:M),O(()=>{this.data.set(structuredClone(this.list()?.find(e=>e.id==this.id())))},{allowSignalWrites:!0})}registerUpdateState(e){this.updateState=e}onStateChange(e){this.isDirty.update(r=>e.isDirty??r)}onValueChange(e){this.updatedValue.set(e)}onControlClick(e,r){switch(e){case"refresh":case"cancel":{this.data.set(structuredClone(this.list()?.find(n=>n.id==this.id()))),this.updateState({isDirty:!1});break}case"save":{let n=this.updatedValue();n&&(this.dataService.save(n),this.updateState({isDirty:!1}));break}}}onParamsChange(e,r){this.id.set(e.id)}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=y({token:t,factory:t.\u0275fac});let i=t;return i})();var Ve=(i,t)=>({"bg-emerald-300 dark:bg-emerald-800":i,"border-emerald-300/70 dark:border-emerald-800/70":t}),Me=(i,t)=>({"bg-amber-300 dark:bg-amber-800":i,"border-amber-300/70 dark:border-amber-800/70":t});function Be(i,t){if(i&1&&(o(0,"span",29),s(1),a(),o(2,"span",29),s(3),a(),o(4,"span",29),s(5),a(),o(6,"span",29),s(7),a()),i&2){let h,e,r,n,v=se();d(),g((h=v.customer())==null||h.address==null?null:h.address.line1),d(2),g((e=v.customer())==null||e.address==null?null:e.address.line2),d(2),T("",(r=v.customer())==null||r.address==null?null:r.address.city,", ",(r=v.customer())==null||r.address==null?null:r.address.state,""),d(2),T("",(n=v.customer())==null||n.address==null?null:n.address.country," ",(n=v.customer())==null||n.address==null?null:n.address.postalCode,"")}}function We(i,t){i&1&&(o(0,"span",29),s(1,"----"),a())}var _e=(()=>{let t=class t{constructor(){this.dataService=p(m),this.inventoryItemService=p(ke),this.route=p(j),this.list=f(this.dataService.getList()),this.id=f(this.route.params.pipe(C(e=>e.id))),this.allInventoryItems=f(this.inventoryItemService.getList()),this.customer=c(()=>this.list()?.find(e=>e.id==this.id())),this.inventoryItems=c(()=>this.allInventoryItems()?.filter(e=>e.belongsTo==this.customer()?.id)??[]),this.awaitingPaymentsCount=c(()=>this.inventoryItems()?.filter(e=>e.status==z.OPEN).length),this.repackageCount=c(()=>this.inventoryItems()?.filter(e=>e.status==z.REPACKAGING).length),this.data=c(()=>this.inventoryItems().slice(0,5)),this.columnsConfig=l([{key:"netWeight",label:"Net Weight (g)",fieldConfiguration:{type:"number"}},{key:"grossWeight",label:"Gross Weight (g)",fieldConfiguration:{type:"number"}},{key:"isContainFragile",label:"Fragile",fieldConfiguration:{type:"boolean"}},{key:"status",label:"Status"},{key:"arrivedAt",label:"Arrived",isAlignEnd:!0,isSortedDesc:!0,fieldConfiguration:{type:"date-time",format:"yyyy-MM-dd HH:mm"}}]),this.columnsToDisplay=l({default:["netWeight","status"],768:["netWeight","status","arrivedAt"],1280:["netWeight","grossWeight","isContainFragile","status","arrivedAt"]}),this.controlsConfig=l([])}routeToDetail(e){return["/","inventory","item","detail",e.id]}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=N({type:t,selectors:[["demo-customer-info"]],hostAttrs:[1,"contents"],standalone:!0,features:[le([{provide:W,useExisting:Z(()=>t)}]),F],decls:96,vars:23,consts:[[1,"@container","grow"],[1,"pui-card","rounded-4","p-8"],[1,"grid","@screen-md:grid-cols-3","gap-8"],[1,"pui-card--subtle","rounded-4","p-8","overflow-hidden","@screen-md:col-span-2"],[1,"flex","flex-col","sm:flex-row","gap-4","items-stretch","h-full","overflow-x-auto"],[1,"rounded-3","flex-1","border","dark:bg-blue-800","flex","flex-col","p-4","transition-colors"],[1,"dark:text-blue-200"],[1,"spacer"],[1,"text-2xl","font-bold","self-end","text-end","tabular-nums"],[1,"rounded-3","flex-1","border","dark:bg-emerald-800","flex","flex-col","p-4","transition-colors",3,"ngClass"],[1,"dark:text-emerald-200"],[1,"rounded-3","flex-1","border","flex","flex-col","p-4","transition-colors",3,"ngClass"],[1,"text-amber-700","dark:text-amber-200"],[1,"pui-card--subtle","rounded-4","p-8","overflow-hidden"],[1,"flex","flex-col","items-center","gap-2"],[1,"p-4","rounded-full","bg-neutral-500","shadow-md","shadow-neutral-500","transition-colors"],[1,"icon-10","font-variation-fill"],[1,"w-full","text-center","break-anywhere","whitespace-normal"],[1,"text-sm","text-center","text-neutral-800","dark:text-neutral-200","before:content-['#']"],[1,"text-base","text-center"],[3,"date","format"],[1,"pui-card--subtle","rounded-4","p-8","overflow-hidden","@screen-md:col-span-2","flex","flex-col"],[1,"flex","flex-row","justify-end","items-center"],["puiBorderedButton","","color","primary",1,"rounded-full","px-4","py-2"],[1,"flex","flex-col","pt-6","gap-4"],[1,"flex","flex-row","items-center","gap-2"],[1,"icon-6","font-variation-weight-light","text-neutral-800","dark:text-neutral-200"],[1,"flex","flex-col","gap-1"],[1,"text-sm","text-neutral-800","dark:text-neutral-200"],[1,"text-base"],[1,"text-base","break-anywhere"]],template:function(r,n){if(r&1&&(o(0,"div",0)(1,"main",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"div",5)(6,"h3",6),s(7,"Completed"),u(8,"br"),s(9,"Sales"),a(),u(10,"div",7),o(11,"span",8),s(12,"$2,000"),a()(),o(13,"div",9)(14,"h3",10),s(15,"Awaiting"),u(16,"br"),s(17,"Payments"),a(),u(18,"div",7),o(19,"span",8),s(20),a()(),o(21,"div",11)(22,"h3",12),s(23,"Repackage"),u(24,"br"),s(25,"Requests"),a(),u(26,"div",7),o(27,"span",8),s(28),a()()()(),o(29,"div",13)(30,"div",14)(31,"div",15)(32,"i",16),s(33),a()(),o(34,"h2",17),s(35),a(),o(36,"span",18),s(37),a(),o(38,"span",19),s(39,"Joined since "),u(40,"pui-time-display",20),a()()(),o(41,"div",21)(42,"h3"),s(43,"Recent Inventory"),a(),u(44,"pui-table-content"),o(45,"div",22)(46,"button",23),s(47),a()()(),o(48,"div",13)(49,"h3"),s(50,"Detailed information"),a(),o(51,"div",24)(52,"div",25)(53,"i",26),s(54,"person"),a(),o(55,"div",27)(56,"span",28),s(57,"Fullname"),a(),o(58,"span",29),s(59),a()()(),u(60,"pui-divider"),o(61,"div",25)(62,"i",26),s(63,"person"),a(),o(64,"div",27)(65,"span",28),s(66,"Username"),a(),o(67,"span",30),s(68),a()()(),u(69,"pui-divider"),o(70,"div",25)(71,"i",26),s(72,"phone"),a(),o(73,"div",27)(74,"span",28),s(75,"Phone number"),a(),o(76,"span",30),s(77),a()()(),u(78,"pui-divider"),o(79,"div",25)(80,"i",26),s(81,"email"),a(),o(82,"div",27)(83,"span",28),s(84,"Email address"),a(),o(85,"span",30),s(86),a()()(),u(87,"pui-divider"),o(88,"div",25)(89,"i",26),s(90,"location_on"),a(),o(91,"div",27)(92,"span",28),s(93,"Main address"),a(),ee(94,Be,8,6)(95,We,2,0,"span",29),a()()()()()()()),r&2){let v,$,b,E,Q,D,I,k,w,X;d(13),S("ngClass",J(17,Ve,n.awaitingPaymentsCount()>0,n.awaitingPaymentsCount()==0)),d(7),g(n.awaitingPaymentsCount()),d(),S("ngClass",J(20,Me,n.repackageCount()>0,n.repackageCount()==0)),d(7),g(n.repackageCount()),d(3),te("--color-neutral-500",(v=n.customer())==null||v.profile==null?null:v.profile.color),d(2),g(($=n.customer())==null||$.profile==null?null:$.profile.icon),d(2),g((b=(b=n.customer())==null?null:b.username)!==null&&b!==void 0?b:"---"),d(2),g((E=(E=n.customer())==null?null:E.id)!==null&&E!==void 0?E:"----"),d(3),S("date",(Q=n.customer())==null?null:Q.registeredSince)("format","dd MMM yyyy"),d(7),A(" View all (",n.inventoryItems().length,") "),d(12),g((D=(D=n.customer())==null?null:D.name)!==null&&D!==void 0?D:"----"),d(9),g((I=(I=n.customer())==null?null:I.username)!==null&&I!==void 0?I:"----"),d(9),g((k=(k=n.customer())==null?null:k.phone)!==null&&k!==void 0?k:"----"),d(9),g((w=(w=n.customer())==null?null:w.email)!==null&&w!==void 0?w:"----"),d(8),ie((X=n.customer())!=null&&X.address?94:95)}},dependencies:[ge,ye,U,he,fe,P],styles:["demo-customer-info .pui-table-content main{background-color:transparent;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow);-webkit-backdrop-filter:none;backdrop-filter:none;padding-left:0;padding-right:0}"]});let i=t;return i})();var Le=(()=>{let t=class t{constructor(){this.heading=l("Customers"),this.tabs=l([])}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=y({token:t,factory:t.\u0275fac});let i=t;return i})();var Re=(()=>{let t=class t{constructor(){this.dataService=p(m),this.configuration={content:L},this.data=l(null),this.fieldConfiguration=l({type:"object",properties:{name:{type:"string",description:"Name"},username:{type:"string",description:"Username"},email:{type:"string",description:"Email"},phone:{type:"string",description:"Phone"},address:{type:"object",description:"Address",properties:{line1:{type:"string",description:"Line 1"},line2:{type:"string",description:"Line 2"},city:{type:"string",description:"City"},state:{type:"string",description:"State"},postalCode:{type:"string",description:"Postal Code"},country:{type:"string",description:"Country"}}},savedAddresses:{type:"array",description:"Saved Addresses",items:{type:"object",description:"Address",properties:{line1:{type:"string",description:"Line 1"},line2:{type:"string",description:"Line 2"},city:{type:"string",description:"City"},state:{type:"string",description:"State"},postalCode:{type:"string",description:"Postal Code"},country:{type:"string",description:"Country"}}}},registeredSince:{type:"date-time",description:"Registered Since"}}}),this.controlsConfig=l([{id:"cancel",label:"Cancel",icon:"close",mode:"low-emphasis"},{id:"save",label:"Save",icon:"save"}]),this.updatedValue=l(void 0),this.heading=l("Add Customer")}registerUpdateState(e){this.updateState=e,this.updateState({isDirty:!0})}onValueChange(e){this.updatedValue.set(e)}onControlClick(e,r){switch(e){case"cancel":{this.data.set({}),this.overlayRef.close();break}case"save":{let n=this.updatedValue();n&&(n=Object.assign(n,{id:Ie.string.nanoid()}),this.dataService.add(n),this.overlayRef.close());break}}}onActionDrawerInit(e){this.overlayRef=e}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=y({token:t,factory:t.\u0275fac});let i=t;return i})();var Ne=(()=>{let t=class t{constructor(){this.dataService=p(m),this.actionDrawer=p(xe),this.screenWidth=p(me),this.rawData=f(this.dataService.getList()),this.configuration={useVirtualScroll:!0},this.data=c(()=>(this.rawData()??[]).filter(this.filterFn()).toSorted(this.sortFn())),this.columnsConfig=l([{key:"name",label:"Name"},{key:"username",label:"Username"},{key:"email",label:"Email"},{key:"phone",label:"Phone"},{key:"line2",path:"address.line2",label:"Address (Line 2)"},{key:"registeredSince",label:"Registered",isAlignEnd:!0,isSortedDesc:!0,fieldConfiguration:{type:"date-time",format:"yyyy-MM-dd HH:mm"}}]),this.columnsToDisplay=l({default:["name","phone"],768:["name","email","phone","registeredSince"],1536:["name","username","email","phone","line2","registeredSince"]}),this.filterConfig=l({type:"object",properties:{name:{type:"string",description:"Name"},id:{type:"string",description:"ID"}}}),this.filterValue=l({}),this.sortFn=c(()=>Ee(this.columnsConfig())),this.filterFn=c(()=>be(this.filterValue(),{id:(e,r,n)=>!!n&&e.id.toLowerCase().includes(n.toLowerCase()),name:(e,r,n)=>!!n&&(e.username.toLowerCase().includes(n.toLowerCase())||e.name.toLowerCase().includes(n.toLowerCase()))}))}routeToDetail(e){return this.screenWidth.above().sm()?["/user","customer",{outlets:{peek:[e.id]}}]:["/user","customer","detail",e.id]}onHeaderCellClick(e,r){this.columnsConfig.update(n=>De(n,e))}onFilterChange(e){this.filterValue.set(e)}onControlClick(e,r){switch(e){case"add":{this.actionDrawer.open(Re,{providers:[{provide:_,useExisting:Ce}]});break}}}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=y({token:t,factory:t.\u0275fac});let i=t;return i})();var Fe=[{path:"info",component:_e},{path:"address",component:Ae,children:[{path:":index",component:L,providers:[{provide:_,useClass:we}]}]},{path:"raw",component:L,providers:[{provide:_,useClass:Te}]},{path:"**",redirectTo:"info"}],Xt=[{path:"",data:R({},V({title:"Customer"})),children:[{path:"detail/:id",component:q,data:R({},V({deps:[m],titleFn:(i,t)=>i.params.pipe(G(h=>t.getList().pipe(C(e=>e.find(r=>r.id==h.id)?.name??"--"))))})),providers:[{provide:H,useClass:Y}],children:Fe},{path:"",component:q,providers:[{provide:H,useClass:Le},{provide:Se,useClass:Y}],children:[{path:":id",outlet:"peek",component:q,data:R({},V({deps:[m],titleFn:(i,t)=>i.params.pipe(G(h=>t.getList().pipe(C(e=>e.find(r=>r.id==h.id)?.name??"--"))))})),providers:[{provide:H,useClass:Y}],children:Fe},{path:"",component:U,providers:[{provide:W,useClass:Ne}]}]}]}];export{Xt as ROUTES};