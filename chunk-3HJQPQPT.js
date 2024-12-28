import{a as q,b as T,c as G,d as _}from"./chunk-XCL4AJKV.js";import{a as ke}from"./chunk-N3UYAXEE.js";import{a as X}from"./chunk-BB5YHCCR.js";import{$ as S,Ab as Ie,B as p,Bb as be,C as ie,Cb as ge,Db as Se,E as R,Eb as Te,F as j,Jb as W,Ka as le,Kb as H,L as c,Lb as De,Mb as xe,Na as se,Nb as B,O as l,Ob as Ee,P as g,Pb as U,Q as u,S as x,Sb as $,Tb as M,U as ne,Ub as K,V as oe,Va as h,Vb as J,W as r,X as a,Y as E,Z as N,_ as O,a as I,b as D,ba as s,ca as b,da as Y,fb as ce,ga as re,ha as ae,i as F,ia as Q,jb as de,lb as me,mb as pe,ob as ue,qb as z,ra as f,ta as P,tb as fe,ub as he,wb as ve,xb as ye,y as v,yb as _e,zb as Ce}from"./chunk-RX6RE7T5.js";var we=(()=>{let e=class e{constructor(){this.dataService=p(_),this.list=h(this.dataService.getList()),this.id=l(void 0),this.heading=f(()=>this.list()?.find(i=>i.id==this.id())?.id??"--"),this.tabs=l([{label:"Info",route:["info"]},{label:"Raw",route:["raw"]}])}onParamsChange(i,o){this.id.set(i.id)}};e.\u0275fac=function(o){return new(o||e)},e.\u0275prov=v({token:e,factory:e.\u0275fac});let t=e;return t})();var Ae=(()=>{let e=class e{constructor(){this.dataService=p(_),this.list=h(this.dataService.getList()),this.id=l(void 0),this.data=l(void 0),this.fieldConfiguration=l({type:"object",properties:{netWeight:{type:"number",description:"Net Weight (grams)"},grossWeight:{type:"number",description:"Gross Weight (grams)"},isContainFragile:{type:"boolean",description:"Contains Fragile Contents"},arrivedAt:{type:"date-time",description:"Arrival Time"},belongsTo:{type:"string",description:"User"},status:{type:"string",enum:Object.values(T),description:"Status"},contents:{type:"array",description:"Content",items:{type:"object",properties:{id:{type:"string",description:"ID"},description:{type:"string",description:"Description"},isbn:{type:"string",description:"ISBN"},type:{type:"string",description:"Type",enum:Object.values(G)},quantity:{type:"number",description:"Quantity"},totalPrice:{type:"number",description:"Total Price ($)"}}}}}}),this.isDirty=l(!1),this.updatedValue=l(void 0),this.controlsConfig=f(()=>this.isDirty()?xe:De),P(()=>{this.data.set(structuredClone(this.list()?.find(i=>i.id==this.id())))},{allowSignalWrites:!0})}registerUpdateState(i){this.updateState=i}onStateChange(i){this.isDirty.update(o=>i.isDirty??o)}onValueChange(i){this.updatedValue.set(i)}onControlClick(i,o){switch(i){case"refresh":case"cancel":{this.data.set(structuredClone(this.list()?.find(n=>n.id==this.id()))),this.updateState({isDirty:!1});break}case"save":{let n=this.updatedValue();n&&(this.dataService.save(n),this.updateState({isDirty:!1}));break}}}onParamsChange(i,o){this.id.set(i.id)}};e.\u0275fac=function(o){return new(o||e)},e.\u0275prov=v({token:e,factory:e.\u0275fac});let t=e;return t})();var Ve=(()=>{let e=class e{constructor(){this.dataService=p(q),this.overlayData=p(ce),this.configuration={content:M,useVirtualScroll:!1},this.data=h(this.dataService.getList(),{initialValue:[]}),this.columnsConfig=l([{key:"name",label:"Name",fieldConfiguration:{type:"string"}},{key:"phone",label:"Phone",fieldConfiguration:{type:"string"}}]),this.columnsToDisplay=l(["name","phone"]),this.selectionMode=l("single"),this.selectedItems=l(this.overlayData.initialValue),this.controlsConfig=f(()=>[{id:"select",label:this.selectedItems().size==0?"Select":`Select ${this.selectedItems().values().next().value.name}`,isDisabled:this.selectedItems().size==0}]),this.heading=l("Pick customer")}onControlClick(i,o){i=="select"&&(this.overlayData?.onSave(this.selectedItems().values().next().value),this.overlayRef.close())}compareFn(i,o){return i.id==o.id}onTableRowClick(i){this.selectedItems.set(new Set([i]))}onActionDrawerInit(i){this.overlayRef=i}};e.\u0275fac=function(o){return new(o||e)},e.\u0275prov=v({token:e,factory:e.\u0275fac});let t=e;return t})();var Fe=(t,e)=>e.id,Ne=t=>["/user","customer","detail",t],Pe=t=>["/inventory","shelf","detail",t],We=()=>["description","isbn","quantity","totalPrice"];function He(t,e){if(t&1){let d=N();E(0,"div",19),r(1,"button",20),O("click",function(){R(d);let o=S();return j(o.onUpdateCustomerClick())}),r(2,"span"),s(3,"Update"),a()()}}function Be(t,e){t&1&&(r(0,"i",17),s(1,"check"),a())}function Ue(t,e){t&1&&(r(0,"i",18),s(1,"close"),a())}function $e(t,e){t&1&&(r(0,"span",15),s(1,"----"),a())}function Me(t,e){t&1&&(r(0,"pui-table-header-cell"),s(1,"Item"),a())}function qe(t,e){t&1&&(r(0,"pui-table-header-cell"),s(1,"ISBN"),a())}function Ge(t,e){t&1&&(r(0,"pui-table-header-cell"),s(1,"Quantity"),a())}function Ye(t,e){t&1&&(r(0,"pui-table-header-cell"),s(1,"Total Price"),a())}function Qe(t,e){if(t&1&&(r(0,"pui-table-cell")(1,"span",26),s(2),a()()),t&2){let d=e.$implicit;c(2),b(d.description)}}function ze(t,e){if(t&1&&(r(0,"pui-table-cell")(1,"span",26),s(2),a()()),t&2){let d=e.$implicit;c(2),b(d.isbn)}}function Ke(t,e){if(t&1&&(r(0,"pui-table-cell"),s(1," x "),r(2,"span",26),s(3),a()()),t&2){let d=e.$implicit;c(3),b(d.quantity)}}function Je(t,e){if(t&1&&(r(0,"pui-table-cell",27),s(1," $ "),r(2,"span",26),s(3),a()()),t&2){let d=e.$implicit;c(3),b(d.totalPrice)}}function Xe(t,e){if(t&1&&E(0,"pui-table-row",25),t&2){let d=e.$implicit;u("item",d)}}function Ze(t,e){if(t&1&&(E(0,"pui-divider"),r(1,"h2"),s(2,"Contents"),a(),r(3,"pui-table",21),g(4,Me,2,0,"pui-table-header-cell",22)(5,qe,2,0,"pui-table-header-cell",22)(6,Ge,2,0,"pui-table-header-cell",22)(7,Ye,2,0,"pui-table-header-cell",22)(8,Qe,3,1,"pui-table-cell",23)(9,ze,3,1,"pui-table-cell",23)(10,Ke,4,1,"pui-table-cell",23)(11,Je,4,1,"pui-table-cell",24),r(12,"pui-table-body"),E(13,"pui-table-header-row"),ne(14,Xe,1,1,"pui-table-row",25,Fe),a()()),t&2){let d=S();c(3),u("itemHeight",48)("columns",ae(10,We)),c(),u("puiTableHeaderCellDef","description"),c(),u("puiTableHeaderCellDef","isbn"),c(),u("puiTableHeaderCellDef","quantity"),c(),u("puiTableHeaderCellDef","totalPrice"),c(),u("puiTableCellDef","description"),c(),u("puiTableCellDef","isbn"),c(),u("puiTableCellDef","quantity"),c(),u("puiTableCellDef","totalPrice"),c(3),oe(d.inventoryItem().contents)}}function et(t,e){if(t&1){let d=N();r(0,"pui-layout-control",29),O("click",function(){R(d);let o=S(2);return j(o.onCancelClick())}),a(),r(1,"pui-layout-control",30),O("click",function(){R(d);let o=S(2);return j(o.onSaveClick())}),a()}}function tt(t,e){if(t&1){let d=N();r(0,"pui-layout-control",31),O("click",function(){R(d);let o=S(2);return j(o.onEditClick())}),a()}}function it(t,e){if(t&1&&g(0,et,2,0)(1,tt,1,0,"pui-layout-control",28),t&2){let d=S();x(d.isEditing()?0:1)}}var Re=(()=>{let e=class e{constructor(){this.dataService=p(_),this.customerDataService=p(q),this.inventoryShelfService=p(ke),this.route=p(le),this.actionDrawer=p(H),this.list=h(this.dataService.getList()),this.customerList=h(this.customerDataService.getList()),this.inventoryShelfList=h(this.inventoryShelfService.getList()),this.id=h(this.route.params.pipe(F(i=>i.id))),this.inventoryItem=f(()=>this.list()?.find(i=>i.id==this.id())),this.customer=f(()=>this.customerList()?.find(i=>i.id==this.inventoryItem()?.belongsTo)),this.shelf=f(()=>this.inventoryShelfList()?.find(i=>i.id==this.inventoryItem()?.locatedIn)),this.showEditButton=f(()=>[T.OPEN,T.REPACKAGING].includes(this.inventoryItem()?.status)),this.isEditing=l(!1),this.updatedValues=l({})}onEditClick(){this.isEditing.set(!0),this.updatedValues.set({customer:null})}onCancelClick(){this.isEditing.set(!1),this.updatedValues.set({customer:null})}onSaveClick(){this.dataService.save(D(I({},this.inventoryItem()),{belongsTo:this.updatedValues().customer?.id??this.inventoryItem().belongsTo})),this.isEditing.set(!1),this.updatedValues.set({customer:null})}onUpdateCustomerClick(){this.actionDrawer.open(Ve,{providers:[{provide:$,useExisting:W}],overlayData:{initialValue:new Set([this.updatedValues().customer??this.customer()].filter(ue)),onSave:i=>{this.updatedValues.update(o=>D(I({},o),{customer:i}))}}})}};e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=ie({type:e,selectors:[["demo-inventory-item-info"]],hostAttrs:[1,"contents"],standalone:!0,features:[re],decls:50,vars:20,consts:[[1,"@container","grow"],[1,"pui-card","rounded-4","p-8","flex","flex-col","gap-8"],[1,"grid","@screen-md:grid-cols-3","gap-8"],[1,"pui-card--subtle","rounded-4","px-8","py-4","overflow-hidden","flex","flex-col","justify-center"],[1,"text-neutral-700","dark:text-neutral-300"],[1,"text-md"],["puiHoverable","",1,"pui-card--subtle","rounded-4","px-8","py-4","overflow-hidden","justify-start","text-start",3,"hoverableEnabled","routerLink"],[1,"flex","flex-row","gap-2","justify-start","items-center","w-full"],[1,"icon-6","text-neutral-700","dark:text-neutral-300"],[1,"flex","flex-col"],["puiHoverable","",1,"pui-card--subtle","rounded-4","px-8","py-4","overflow-hidden","justify-start",3,"hoverableEnabled","routerLink"],[1,"flex","flex-row","gap-2","justify-start","items-center"],[1,"text-md","uppercase"],[1,"grid","items-center","grid-cols-[min-content_minmax(0,1fr)]","gap-x-4","gap-y-3"],[1,"col-start-1","text-base","font-medium","whitespace-nowrap","text-neutral-700","dark:text-neutral-300"],[1,"col-start-2","text-md"],[1,"col-start-2","text-md",3,"date","format"],[1,"icon-5","text-green-600","dark:text-green-400"],[1,"icon-5","text-red-600","dark:text-red-400"],[1,"spacer"],["puiBorderedButton","","color","primary",1,"rounded-full","px-4","py-2",3,"click"],[3,"itemHeight","columns"],[4,"puiTableHeaderCellDef"],[4,"puiTableCellDef"],["class","tabular-nums",4,"puiTableCellDef"],[3,"item"],[1,"truncate"],[1,"tabular-nums"],["id","edit","icon","edit","label","Edit","mode","auto"],["id","cancel","icon","close","label","Cancel","mode","low-emphasis",3,"click"],["id","save","icon","save","label","Save","mode","auto",3,"click"],["id","edit","icon","edit","label","Edit","mode","auto",3,"click"]],template:function(o,n){if(o&1&&(r(0,"div",0)(1,"main",1)(2,"div",2)(3,"div",3)(4,"h4",4),s(5,"Status"),a(),r(6,"p",5),s(7),a()(),r(8,"a",6)(9,"div",7)(10,"i",8),s(11,"person"),a(),r(12,"div",9)(13,"h4",4),s(14,"Customer"),a(),r(15,"p",5),s(16),a()(),g(17,He,4,0),a()(),r(18,"a",10)(19,"div",11)(20,"i",8),s(21,"shelves"),a(),r(22,"div",9)(23,"h4",4),s(24,"Shelf"),a(),r(25,"p",12),s(26),a()()()()(),r(27,"div",13)(28,"span",14),s(29,"ID"),a(),r(30,"span",15),s(31),a(),r(32,"span",14),s(33,"Arrived at"),a(),E(34,"pui-time-display",16),r(35,"span",14),s(36,"Net weight"),a(),r(37,"span",15),s(38),a(),r(39,"span",14),s(40,"Gross weight"),a(),r(41,"span",15),s(42),a(),r(43,"span",14),s(44,"Fragile"),a(),g(45,Be,2,0,"i",17)(46,Ue,2,0,"i",18)(47,$e,2,0,"span",15),a(),g(48,Ze,16,11),a()(),g(49,it,2,1)),o&2){let m,Z,y,ee,C,w,te,A,V,L;c(7),b((m=(m=n.inventoryItem())==null?null:m.status)!==null&&m!==void 0?m:"--"),c(),u("hoverableEnabled",!n.isEditing()&&n.customer()!=null)("routerLink",!n.isEditing()&&n.customer()?Q(16,Ne,(Z=n.customer())==null?null:Z.id):null),c(8),b((y=(y=(y=n.updatedValues().customer)==null?null:y.name)!==null&&y!==void 0?y:(y=n.customer())==null?null:y.name)!==null&&y!==void 0?y:"--"),c(),x(n.isEditing()?17:-1),c(),u("hoverableEnabled",!n.isEditing()&&n.shelf()!=null)("routerLink",!n.isEditing()&&n.shelf()?Q(18,Pe,(ee=n.shelf())==null?null:ee.id):null),c(8),b(n.shelf()?((C=n.shelf())==null||C.location==null?null:C.location.aisle)+((C=n.shelf())==null||C.location==null?null:C.location.row)+" - "+((C=n.shelf())==null||C.location==null?null:C.location.layer):"--"),c(5),b((w=(w=n.inventoryItem())==null?null:w.id)!==null&&w!==void 0?w:"---"),c(3),u("date",(te=n.inventoryItem())==null?null:te.arrivedAt)("format","yyyy-MM-dd HH:mm"),c(4),Y("",(A=(A=n.inventoryItem())==null?null:A.netWeight)!==null&&A!==void 0?A:"---"," g"),c(4),Y("",(V=(V=n.inventoryItem())==null?null:V.grossWeight)!==null&&V!==void 0?V:"---"," g"),c(3),x(((L=n.inventoryItem())==null?null:L.isContainFragile)===!0?45:((L=n.inventoryItem())==null?null:L.isContainFragile)===!1?46:47),c(3),x(n.inventoryItem()?48:-1),c(),x(n.showEditButton()?49:-1)}},dependencies:[de,se,Ee,he,fe,Te,_e,Ce,Se,ge,Ie,ve,be,ye,pe,me]});let t=e;return t})();var je=(()=>{let e=class e{constructor(){this.heading=l("Inventory Items"),this.tabs=l([])}};e.\u0275fac=function(o){return new(o||e)},e.\u0275prov=v({token:e,factory:e.\u0275fac});let t=e;return t})();var Oe=(()=>{let e=class e{constructor(){this.dataService=p(_),this.configuration={content:U},this.data=l(null),this.fieldConfiguration=l({type:"object",properties:{netWeight:{type:"number",description:"Net Weight (grams)"},grossWeight:{type:"number",description:"Gross Weight (grams)"},isContainFragile:{type:"boolean",description:"Contains Fragile Contents"},arrivedAt:{type:"date-time",description:"Arrival Time"},belongsTo:{type:"string",description:"User"},status:{type:"string",enum:Object.values(T),description:"Status"},contents:{type:"array",description:"Content",items:{type:"object",properties:{description:{type:"string",description:"Description"},isbn:{type:"string",description:"ISBN"},type:{type:"string",description:"Type",enum:Object.values(G)},quantity:{type:"number",description:"Quantity"},totalPrice:{type:"number",description:"Total Price ($)"}}}}}}),this.controlsConfig=l([{id:"cancel",label:"Cancel",icon:"close",mode:"low-emphasis"},{id:"save",label:"Save",icon:"save"}]),this.updatedValue=l(void 0),this.heading=l("Add Item")}registerUpdateState(i){this.updateState=i,this.updateState({isDirty:!0})}onValueChange(i){this.updatedValue.set(i)}onControlClick(i,o){switch(i){case"cancel":{this.data.set({}),this.overlayRef.close();break}case"save":{let n=this.updatedValue();n&&(n=Object.assign(n,{id:X.string.nanoid(),contents:n.contents.map(m=>Object.assign(m,{id:X.string.nanoid(12)}))}),this.dataService.add(n),this.overlayRef.close());break}}}onActionDrawerInit(i){this.overlayRef=i}};e.\u0275fac=function(o){return new(o||e)},e.\u0275prov=v({token:e,factory:e.\u0275fac});let t=e;return t})();var Le=(()=>{let e=class e{constructor(){this.dataService=p(_),this.actionDrawer=p(H),this.rawData=h(this.dataService.getList()),this.configuration={useVirtualScroll:!0},this.data=l([]),this.columnsConfig=l([{key:"belongsTo",label:"Customer"},{key:"netWeight",label:"Net Weight (g)",fieldConfiguration:{type:"number"}},{key:"grossWeight",label:"Gross Weight (g)",fieldConfiguration:{type:"number"}},{key:"isContainFragile",label:"Fragile",fieldConfiguration:{type:"boolean"}},{key:"status",label:"Status"},{key:"arrivedAt",label:"Arrived",isAlignEnd:!0,isSortedDesc:!0,fieldConfiguration:{type:"date-time",format:"yyyy-MM-dd HH:mm"}}]),this.columnsToDisplay=l({default:["belongsTo","status"],768:["belongsTo","netWeight","status","arrivedAt"],1280:["belongsTo","netWeight","grossWeight","isContainFragile","status","arrivedAt"]}),this.filterValue=l({}),this.sortFn=f(()=>{let i=this.columnsConfig().find(n=>n.isSortedAsc||n.isSortedDesc);if(!i)return()=>0;let o=i.isSortedDesc?-1:1;return(n,m)=>{switch(i.key){case"arrivedAt":return(n.arrivedAt.getTime()-m.arrivedAt.getTime())*o;default:return n[i.key]>m[i.key]?o:n[i.key]<m[i.key]?-1*o:0}}}),this.filterFn=f(()=>{let i=this.filterValue(),o=Object.values(i??{}).some(n=>typeof n=="string"?!!n:n!=null);return n=>!0}),P(()=>{let i=this.rawData();i&&this.data.set(i.filter(this.filterFn()).sort(this.sortFn()))},{allowSignalWrites:!0})}routeToDetail(i){return["detail",i.id]}onHeaderCellClick(i,o){this.columnsConfig.update(n=>n.map(m=>m.key==i?D(I({},m),{isSortedAsc:!m.isSortedAsc&&!m.isSortedDesc?!0:!!m.isSortedDesc,isSortedDesc:!!m.isSortedAsc}):D(I({},m),{isSortedAsc:!1,isSortedDesc:!1})))}onControlClick(i,o){switch(i){case"add":{this.actionDrawer.open(Oe,{providers:[{provide:B,useExisting:W}]});break}}}};e.\u0275fac=function(o){return new(o||e)},e.\u0275prov=v({token:e,factory:e.\u0275fac});let t=e;return t})();var ai=[{path:"",data:I({},z({title:"Item"})),children:[{path:"detail/:id",component:J,data:I({},z({titleFn:t=>t.params.pipe(F(e=>e.id))})),providers:[{provide:K,useClass:we}],children:[{path:"info",component:Re},{path:"raw",component:U,providers:[{provide:B,useClass:Ae}]},{path:"**",redirectTo:"info"}]},{path:"",component:J,providers:[{provide:K,useClass:je}],children:[{path:"",component:M,providers:[{provide:$,useClass:Le}]}]}]}];export{ai as ROUTES};
