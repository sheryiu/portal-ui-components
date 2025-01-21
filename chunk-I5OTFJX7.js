import{a as T,b as M,c as y}from"./chunk-B7GDWNMV.js";import{a as $}from"./chunk-OJI2NXHT.js";import{a as Ve}from"./chunk-3QIQJWOX.js";import{a as J}from"./chunk-5KUQE4MU.js";import{a as N,b as P,c as xe,d as De,e as W,f as ke,g as H,k as we,m as B,n as U,o as Ae,p as z,q as K}from"./chunk-WYSIOAGY.js";import{Da as ve,J as f,Ka as ye,La as _e,Ma as Ce,Na as Ie,Oa as ge,Pa as be,Qa as Se,Ra as Te,Ta as Ee,ea as de,la as me,oa as pe,qa as ue,ta as fe,v as se,va as Q,y as ce,za as he}from"./chunk-GGOHXMJP.js";import{Bb as j,Cb as S,Nb as l,Ob as C,Pb as G,Ra as c,Vb as ae,Wb as re,Xb as Y,_a as s,aa as h,ga as m,jb as g,ka as ie,nb as p,q as L,qb as x,sb as ne,tb as oe,ua as V,ub as o,va as R,vb as a,vc as u,wb as b,xc as le,yb as F}from"./chunk-NC3QZFGA.js";import{a as E,b as q}from"./chunk-EQDQRRRY.js";var Re=(()=>{let e=class e{constructor(){this.dataService=m(y),this.list=f(this.dataService.getList()),this.id=s(void 0),this.heading=u(()=>this.list()?.find(i=>i.id==this.id())?.id??"--"),this.tabs=s([{label:"Info",route:["info"]},{label:"Raw",route:["raw"]}])}onParamsChange(i,r){this.id.set(i.id)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=h({token:e,factory:e.\u0275fac});let t=e;return t})();var je=(()=>{let e=class e{constructor(){this.dataService=m(y),this.list=f(this.dataService.getList()),this.id=s(void 0),this.data=s(void 0),this.fieldConfiguration=s({type:"object",properties:{netWeight:{type:"number",description:"Net Weight (grams)"},grossWeight:{type:"number",description:"Gross Weight (grams)"},isContainFragile:{type:"boolean",description:"Contains Fragile Contents"},arrivedAt:{type:"date-time",description:"Arrival Time"},belongsTo:{type:"string",description:"User"},status:{type:"string",enum:Object.values(T),description:"Status"},contents:{type:"array",description:"Content",items:{type:"object",properties:{id:{type:"string",description:"ID"},description:{type:"string",description:"Description"},isbn:{type:"string",description:"ISBN"},type:{type:"string",description:"Type",enum:Object.values(M)},quantity:{type:"number",description:"Quantity"},totalPrice:{type:"number",description:"Total Price ($)"}}}}}}),this.isDirty=s(!1),this.updatedValue=s(void 0),this.controlsConfig=u(()=>this.isDirty()?De:xe),le(()=>{this.data.set(structuredClone(this.list()?.find(i=>i.id==this.id())))},{allowSignalWrites:!0})}registerUpdateState(i){this.updateState=i}onStateChange(i){this.isDirty.update(r=>i.isDirty??r)}onValueChange(i){this.updatedValue.set(i)}onControlClick(i,r){switch(i){case"refresh":case"cancel":{this.data.set(structuredClone(this.list()?.find(n=>n.id==this.id()))),this.updateState({isDirty:!1});break}case"save":{let n=this.updatedValue();n&&(this.dataService.save(n),this.updateState({isDirty:!1}));break}}}onParamsChange(i,r){this.id.set(i.id)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=h({token:e,factory:e.\u0275fac});let t=e;return t})();var Oe=(()=>{let e=class e{constructor(){this.dataService=m($),this.overlayData=m(me),this.configuration={content:U,useVirtualScroll:!1},this.data=f(this.dataService.getList(),{initialValue:[]}),this.columnsConfig=s([{key:"name",label:"Name",fieldConfiguration:{type:"string"}},{key:"phone",label:"Phone",fieldConfiguration:{type:"string"}}]),this.columnsToDisplay=s(["name","phone"]),this.selectionMode=s("single"),this.selectedItems=s(this.overlayData.initialValue),this.controlsConfig=u(()=>[{id:"select",label:this.selectedItems().size==0?"Select":`Select ${this.selectedItems().values().next().value.name}`,isDisabled:this.selectedItems().size==0}]),this.heading=s("Pick customer")}onControlClick(i,r){i=="select"&&(this.overlayData?.onSave(this.selectedItems().values().next().value),this.overlayRef.close())}compareFn(i,r){return i.id==r.id}onTableRowClick(i){this.selectedItems.set(new Set([i]))}onActionDrawerInit(i){this.overlayRef=i}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=h({token:e,factory:e.\u0275fac});let t=e;return t})();var We=(t,e)=>e.id,He=t=>["/user","customer","detail",t],Be=t=>["/inventory","shelf","detail",t],Ue=()=>["description","isbn","quantity","totalPrice"];function $e(t,e){if(t&1){let d=F();b(0,"div",20),o(1,"button",21),j("click",function(){V(d);let r=S();return R(r.onUpdateCustomerClick())}),o(2,"span"),l(3,"Update"),a()()}}function Me(t,e){t&1&&(o(0,"i",18),l(1,"check"),a())}function qe(t,e){t&1&&(o(0,"i",19),l(1,"close"),a())}function Ge(t,e){t&1&&(o(0,"span",15),l(1,"----"),a())}function Ye(t,e){t&1&&(o(0,"pui-table-header-cell"),l(1,"Item"),a())}function Qe(t,e){t&1&&(o(0,"pui-table-header-cell"),l(1,"ISBN"),a())}function ze(t,e){t&1&&(o(0,"pui-table-header-cell"),l(1,"Quantity"),a())}function Ke(t,e){t&1&&(o(0,"pui-table-header-cell"),l(1,"Total Price"),a())}function Je(t,e){if(t&1&&(o(0,"pui-table-cell")(1,"span",27),l(2),a()()),t&2){let d=e.$implicit;c(2),C(d.description)}}function Xe(t,e){if(t&1&&(o(0,"pui-table-cell")(1,"span",27),l(2),a()()),t&2){let d=e.$implicit;c(2),C(d.isbn)}}function Ze(t,e){if(t&1&&(o(0,"pui-table-cell"),l(1," x "),o(2,"span",27),l(3),a()()),t&2){let d=e.$implicit;c(3),C(d.quantity)}}function et(t,e){if(t&1&&(o(0,"pui-table-cell",28),l(1," $ "),o(2,"span",27),l(3),a()()),t&2){let d=e.$implicit;c(3),C(d.totalPrice)}}function tt(t,e){if(t&1&&b(0,"pui-table-row",26),t&2){let d=e.$implicit;p("item",d)}}function it(t,e){if(t&1&&(b(0,"pui-divider"),o(1,"h2"),l(2,"Contents"),a(),o(3,"pui-table",22),g(4,Ye,2,0,"pui-table-header-cell",23)(5,Qe,2,0,"pui-table-header-cell",23)(6,ze,2,0,"pui-table-header-cell",23)(7,Ke,2,0,"pui-table-header-cell",23)(8,Je,3,1,"pui-table-cell",24)(9,Xe,3,1,"pui-table-cell",24)(10,Ze,4,1,"pui-table-cell",24)(11,et,4,1,"pui-table-cell",25),o(12,"pui-table-body"),b(13,"pui-table-header-row"),ne(14,tt,1,1,"pui-table-row",26,We),a()()),t&2){let d=S();c(3),p("itemHeight",48)("columns",re(10,Ue)),c(),p("puiTableHeaderCellDef","description"),c(),p("puiTableHeaderCellDef","isbn"),c(),p("puiTableHeaderCellDef","quantity"),c(),p("puiTableHeaderCellDef","totalPrice"),c(),p("puiTableCellDef","description"),c(),p("puiTableCellDef","isbn"),c(),p("puiTableCellDef","quantity"),c(),p("puiTableCellDef","totalPrice"),c(3),oe(d.inventoryItem().contents)}}function nt(t,e){if(t&1){let d=F();o(0,"pui-layout-control",30),j("click",function(){V(d);let r=S(2);return R(r.onCancelClick())}),a(),o(1,"pui-layout-control",31),j("click",function(){V(d);let r=S(2);return R(r.onSaveClick())}),a()}}function ot(t,e){if(t&1){let d=F();o(0,"pui-layout-control",32),j("click",function(){V(d);let r=S(2);return R(r.onEditClick())}),a()}}function at(t,e){if(t&1&&g(0,nt,2,0)(1,ot,1,0,"pui-layout-control",29),t&2){let d=S();x(d.isEditing()?0:1)}}var Le=(()=>{let e=class e{constructor(){this.dataService=m(y),this.customerDataService=m($),this.inventoryShelfService=m(Ve),this.route=m(se),this.actionDrawer=m(P),this.list=f(this.dataService.getList()),this.customerList=f(this.customerDataService.getList()),this.inventoryShelfList=f(this.inventoryShelfService.getList()),this.id=f(this.route.params.pipe(L(i=>i.id))),this.inventoryItem=u(()=>this.list()?.find(i=>i.id==this.id())),this.customer=u(()=>this.customerList()?.find(i=>i.id==this.inventoryItem()?.belongsTo)),this.shelf=u(()=>this.inventoryShelfList()?.find(i=>i.id==this.inventoryItem()?.locatedIn)),this.showEditButton=u(()=>[T.OPEN,T.REPACKAGING].includes(this.inventoryItem()?.status)),this.isEditing=s(!1),this.updatedValues=s({})}onEditClick(){this.isEditing.set(!0),this.updatedValues.set({customer:null})}onCancelClick(){this.isEditing.set(!1),this.updatedValues.set({customer:null})}onSaveClick(){this.dataService.save(q(E({},this.inventoryItem()),{belongsTo:this.updatedValues().customer?.id??this.inventoryItem().belongsTo})),this.isEditing.set(!1),this.updatedValues.set({customer:null})}onUpdateCustomerClick(){this.actionDrawer.open(Oe,{providers:[{provide:B,useExisting:N}],overlayData:{initialValue:new Set([this.updatedValues().customer??this.customer()].filter(de)),onSave:i=>{this.updatedValues.update(r=>q(E({},r),{customer:i}))}}})}};e.\u0275fac=function(r){return new(r||e)},e.\u0275cmp=ie({type:e,selectors:[["demo-inventory-item-info"]],hostAttrs:[1,"contents"],standalone:!0,features:[ae],decls:54,vars:22,consts:[[1,"@container","grow"],[1,"pui-card","rounded-4","p-8","flex","flex-col","gap-8"],[1,"grid","@screen-md:grid-cols-3","gap-8"],[1,"pui-card--subtle","rounded-4","px-8","py-4","overflow-hidden","flex","flex-col","justify-center"],[1,"text-neutral-700","dark:text-neutral-300"],[1,"text-md"],["puiHoverable","",1,"pui-card--subtle","rounded-4","px-8","py-4","overflow-hidden","justify-start","text-start",3,"hoverableEnabled","routerLink"],[1,"flex","flex-row","gap-2","justify-start","items-center","w-full"],[1,"icon-6","text-neutral-700","dark:text-neutral-300"],[1,"flex","flex-col"],["puiHoverable","",1,"pui-card--subtle","rounded-4","px-8","py-4","overflow-hidden","justify-start",3,"hoverableEnabled","routerLink"],[1,"flex","flex-row","gap-2","justify-start","items-center"],[1,"text-md","uppercase"],[1,"grid","items-center","grid-cols-[min-content_minmax(0,1fr)]","gap-x-4","gap-y-3"],[1,"col-start-1","text-base","font-medium","whitespace-nowrap","text-neutral-700","dark:text-neutral-300"],[1,"col-start-2","text-md"],[3,"date","format"],[3,"date","mode"],[1,"icon-5","text-green-600","dark:text-green-400"],[1,"icon-5","text-red-600","dark:text-red-400"],[1,"spacer"],["puiBorderedButton","","color","primary",1,"rounded-full","px-4","py-2",3,"click"],[3,"itemHeight","columns"],[4,"puiTableHeaderCellDef"],[4,"puiTableCellDef"],["class","tabular-nums",4,"puiTableCellDef"],[3,"item"],[1,"truncate"],[1,"tabular-nums"],["id","edit","icon","edit","label","Edit","mode","auto"],["id","cancel","icon","close","label","Cancel","mode","low-emphasis",3,"click"],["id","save","icon","save","label","Save","mode","auto",3,"click"],["id","edit","icon","edit","label","Edit","mode","auto",3,"click"]],template:function(r,n){if(r&1&&(o(0,"div",0)(1,"main",1)(2,"div",2)(3,"div",3)(4,"h4",4),l(5,"Status"),a(),o(6,"p",5),l(7),a()(),o(8,"a",6)(9,"div",7)(10,"i",8),l(11,"person"),a(),o(12,"div",9)(13,"h4",4),l(14,"Customer"),a(),o(15,"p",5),l(16),a()(),g(17,$e,4,0),a()(),o(18,"a",10)(19,"div",11)(20,"i",8),l(21,"shelves"),a(),o(22,"div",9)(23,"h4",4),l(24,"Shelf"),a(),o(25,"p",12),l(26),a()()()()(),o(27,"div",13)(28,"span",14),l(29,"ID"),a(),o(30,"span",15),l(31),a(),o(32,"span",14),l(33,"Arrived at"),a(),o(34,"span",15),b(35,"pui-time-display",16),l(36," ("),b(37,"pui-time-display",17),l(38," ago ) "),a(),o(39,"span",14),l(40,"Net weight"),a(),o(41,"span",15),l(42),a(),o(43,"span",14),l(44,"Gross weight"),a(),o(45,"span",15),l(46),a(),o(47,"span",14),l(48,"Fragile"),a(),g(49,Me,2,0,"i",18)(50,qe,2,0,"i",19)(51,Ge,2,0,"span",15),a(),g(52,it,16,11),a()(),g(53,at,2,1)),r&2){let I,X,v,Z,_,k,ee,te,w,A,O;c(7),C((I=(I=n.inventoryItem())==null?null:I.status)!==null&&I!==void 0?I:"--"),c(),p("hoverableEnabled",!n.isEditing()&&n.customer()!=null)("routerLink",!n.isEditing()&&n.customer()?Y(18,He,(X=n.customer())==null?null:X.id):null),c(8),C((v=(v=(v=n.updatedValues().customer)==null?null:v.name)!==null&&v!==void 0?v:(v=n.customer())==null?null:v.name)!==null&&v!==void 0?v:"--"),c(),x(n.isEditing()?17:-1),c(),p("hoverableEnabled",!n.isEditing()&&n.shelf()!=null)("routerLink",!n.isEditing()&&n.shelf()?Y(20,Be,(Z=n.shelf())==null?null:Z.id):null),c(8),C(n.shelf()?((_=n.shelf())==null||_.location==null?null:_.location.aisle)+((_=n.shelf())==null||_.location==null?null:_.location.row)+" - "+((_=n.shelf())==null||_.location==null?null:_.location.layer):"--"),c(5),C((k=(k=n.inventoryItem())==null?null:k.id)!==null&&k!==void 0?k:"---"),c(4),p("date",(ee=n.inventoryItem())==null?null:ee.arrivedAt)("format","yyyy-MM-dd HH:mm"),c(2),p("date",(te=n.inventoryItem())==null?null:te.arrivedAt)("mode","timeAgo"),c(5),G("",(w=(w=n.inventoryItem())==null?null:w.netWeight)!==null&&w!==void 0?w:"---"," g"),c(4),G("",(A=(A=n.inventoryItem())==null?null:A.grossWeight)!==null&&A!==void 0?A:"---"," g"),c(3),x(((O=n.inventoryItem())==null?null:O.isContainFragile)===!0?49:((O=n.inventoryItem())==null?null:O.isContainFragile)===!1?50:51),c(3),x(n.inventoryItem()?52:-1),c(),x(n.showEditButton()?53:-1)}},dependencies:[pe,ce,ke,ve,he,Ee,Ce,Ie,Te,Se,ge,ye,be,_e,fe,ue]});let t=e;return t})();var Fe=(()=>{let e=class e{constructor(){this.heading=s("Inventory Items"),this.tabs=s([])}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=h({token:e,factory:e.\u0275fac});let t=e;return t})();var Ne=(()=>{let e=class e{constructor(){this.dataService=m(y),this.configuration={content:H},this.data=s(null),this.fieldConfiguration=s({type:"object",properties:{netWeight:{type:"number",description:"Net Weight (grams)"},grossWeight:{type:"number",description:"Gross Weight (grams)"},isContainFragile:{type:"boolean",description:"Contains Fragile Contents"},arrivedAt:{type:"date-time",description:"Arrival Time"},belongsTo:{type:"string",description:"User"},status:{type:"string",enum:Object.values(T),description:"Status"},contents:{type:"array",description:"Content",items:{type:"object",properties:{description:{type:"string",description:"Description"},isbn:{type:"string",description:"ISBN"},type:{type:"string",description:"Type",enum:Object.values(M)},quantity:{type:"number",description:"Quantity"},totalPrice:{type:"number",description:"Total Price ($)"}}}}}}),this.controlsConfig=s([{id:"cancel",label:"Cancel",icon:"close",mode:"low-emphasis"},{id:"save",label:"Save",icon:"save"}]),this.updatedValue=s(void 0),this.heading=s("Add Item")}registerUpdateState(i){this.updateState=i,this.updateState({isDirty:!0})}onValueChange(i){this.updatedValue.set(i)}onControlClick(i,r){switch(i){case"cancel":{this.data.set({}),this.overlayRef.close();break}case"save":{let n=this.updatedValue();n&&(n=Object.assign(n,{id:J.string.nanoid(),contents:n.contents.map(I=>Object.assign(I,{id:J.string.nanoid(12)}))}),this.dataService.add(n),this.overlayRef.close());break}}}onActionDrawerInit(i){this.overlayRef=i}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=h({token:e,factory:e.\u0275fac});let t=e;return t})();var Pe=(()=>{let e=class e{constructor(){this.dataService=m(y),this.actionDrawer=m(P),this.rawData=f(this.dataService.getList()),this.configuration={useVirtualScroll:!0},this.data=u(()=>(this.rawData()??[]).toSorted(this.sortFn())),this.columnsConfig=s([{key:"belongsTo",label:"Customer"},{key:"netWeight",label:"Net Weight (g)",fieldConfiguration:{type:"number"}},{key:"grossWeight",label:"Gross Weight (g)",fieldConfiguration:{type:"number"}},{key:"isContainFragile",label:"Fragile",fieldConfiguration:{type:"boolean"}},{key:"status",label:"Status"},{key:"arrivedAt",label:"Arrived",isAlignEnd:!0,isSortedDesc:!0,fieldConfiguration:{type:"date-time",format:"yyyy-MM-dd HH:mm"}}]),this.columnsToDisplay=s({default:["belongsTo","status"],768:["belongsTo","netWeight","status","arrivedAt"],1280:["belongsTo","netWeight","grossWeight","isContainFragile","status","arrivedAt"]}),this.filterValue=s({}),this.sortFn=u(()=>we(this.columnsConfig()))}routeToDetail(i){return["detail",i.id]}onHeaderCellClick(i,r){this.columnsConfig.update(n=>Ae(n,i))}onControlClick(i,r){switch(i){case"add":{this.actionDrawer.open(Ne,{providers:[{provide:W,useExisting:N}]});break}}}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=h({token:e,factory:e.\u0275fac});let t=e;return t})();var fi=[{path:"",data:E({},Q({title:"Item"})),children:[{path:"detail/:id",component:K,data:E({},Q({titleFn:t=>t.params.pipe(L(e=>e.id))})),providers:[{provide:z,useClass:Re}],children:[{path:"info",component:Le},{path:"raw",component:H,providers:[{provide:W,useClass:je}]},{path:"**",redirectTo:"info"}]},{path:"",component:K,providers:[{provide:z,useClass:Fe}],children:[{path:"",component:U,providers:[{provide:B,useClass:Pe}]}]}]}];export{fi as ROUTES};
