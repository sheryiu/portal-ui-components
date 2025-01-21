import{c as I,e as T}from"./chunk-U63UKZPC.js";import{a as m}from"./chunk-5KUQE4MU.js";import{c as _e,d as xe,e as Ee,g as Se,j as Ie,k as Te,m as ke,n as Ae,o as De,p as P,q as U}from"./chunk-WYSIOAGY.js";import{Ea as be,J as C,K as ne,L as oe,M as re,Q as ae,S as le,T as se,U as pe,V as ce,W as E,X as de,Y as me,b as ee,fa as L,oa as ue,pa as fe,qa as ge,ta as ye,ua as ve,v as te,va as j,wa as Ce,y as ie,za as he}from"./chunk-GGOHXMJP.js";import{Bb as y,Cb as Y,L as M,Nb as l,O as w,Ob as S,Ra as s,Vb as J,X as H,Xb as K,Zb as Q,_a as g,_b as F,aa as h,g as $,ga as f,jb as q,ka as z,kc as X,nb as u,q as A,qb as W,rb as N,sb as R,tb as O,ub as i,vb as n,vc as v,wb as b,wc as Z,xc as D}from"./chunk-NC3QZFGA.js";import{a as x,b as G}from"./chunk-EQDQRRRY.js";var _=(()=>{let t=class t{constructor(){this.appRef=f(X),this.list=new $([]),this.employeeData=f(T),this.isInitialized=!1}createMock(e,r){return{id:m.string.nanoid(),userNumber:String(r).padStart(4,"0"),employeeId:e.id,isEnabled:e.status!=I.INACTIVE&&e.status!=I.TERMINATED&&e.status!=I.RETIRED,permissions:{customer:{canCreate:m.datatype.boolean(),canRead:m.datatype.boolean(),canUpdate:m.datatype.boolean(),canDelete:m.datatype.boolean()},employee:{canCreate:m.datatype.boolean(),canRead:m.datatype.boolean(),canUpdate:m.datatype.boolean(),canDelete:m.datatype.boolean()},inventoryItem:{canCreate:m.datatype.boolean(),canRead:m.datatype.boolean(),canUpdate:m.datatype.boolean(),canDelete:m.datatype.boolean()}},conditions:{location:{isEnabled:m.datatype.boolean(),allowedIps:Array(m.helpers.rangeToNumber(5)).fill(0).map(()=>m.internet.ip()),countries:Array(m.helpers.rangeToNumber(2)).fill(0).map(()=>m.location.country())},timeRange:{isEnabled:m.datatype.boolean(),allowedAfter:m.helpers.maybe(()=>m.helpers.rangeToNumber(23).toString().padStart(2,"0")+"00")??null,allowedBefore:m.helpers.maybe(()=>m.helpers.rangeToNumber(23).toString().padStart(2,"0")+"00")??null}}}}initialize(){this.isInitialized||(this.isInitialized=!0,this.employeeData.getList().pipe(w(e=>e.length>0)).subscribe(e=>{this.list.next(e.map((r,c)=>this.createMock(r,c)))}))}getList(){return this.appRef.isStable.pipe(w(e=>e),M(1e3)).subscribe(()=>{this.initialize()}),this.list}save(e){this.list.next(this.list.value.map(r=>r.id==e.id?e:r))}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=h({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})();var we=(()=>{let t=class t{constructor(){this.dataService=f(_),this.list=C(this.dataService.getList()),this.id=g(void 0),this.heading=v(()=>this.list()?.find(e=>e.id==this.id())?.userNumber??"--"),this.tabs=g([{label:"Overall",route:["overall"]},{label:"Raw",route:["raw"]}])}onParamsChange(e,r){this.id.set(e.id)}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=h({token:t,factory:t.\u0275fac});let o=t;return o})();var B={type:"object",properties:{canCreate:{type:"boolean",description:"Can Create"},canRead:{type:"boolean",description:"Can Read"},canUpdate:{type:"boolean",description:"Can Update"},canDelete:{type:"boolean",description:"Can Delete"}}},Ne=(()=>{let t=class t{constructor(){this.dataService=f(_),this.list=C(this.dataService.getList()),this.id=g(void 0),this.data=g(void 0),this.fieldConfiguration=g({type:"object",properties:{userNumber:{description:"User number",type:"string"},employeeId:{description:"Employee ID",type:"string"},isEnabled:{description:"Enabled",type:"boolean"},permissions:{description:"Permissions",type:"object",properties:{customer:x({description:"Customer"},B),employee:x({description:"Employee"},B),inventoryItem:x({description:"Inventory Item"},B)}},conditions:{description:"Conditions",type:"object",properties:{location:{description:"Location-Based",type:"object",properties:{isEnabled:{type:"boolean",description:"Enabled"},allowedIps:{type:"array",description:"Allowed IPs",items:{type:"string"}},countries:{type:"array",description:"Countries",items:{type:"string"}}}},timeRange:{description:"Time-Based",type:"object",properties:{isEnabled:{type:"boolean",description:"Enabled"},allowedAfter:{description:"Allowed After (HHmm)",type:"string"},allowedBefore:{description:"Allowed Before (HHmm)",type:"string"}}}}}}}),this.isDirty=g(!1),this.updatedValue=g(void 0),this.controlsConfig=v(()=>this.isDirty()?xe:_e),D(()=>{this.data.set(structuredClone(this.list()?.find(e=>e.id==this.id())))},{allowSignalWrites:!0})}registerUpdateState(e){this.updateState=e}onStateChange(e){this.isDirty.update(r=>e.isDirty??r)}onValueChange(e){this.updatedValue.set(e)}onControlClick(e,r){switch(e){case"refresh":case"cancel":{this.data.set(structuredClone(this.list()?.find(c=>c.id==this.id()))),this.updateState({isDirty:!1});break}case"save":{let c=this.updatedValue();c&&(this.dataService.save(c),this.updateState({isDirty:!1}));break}}}onParamsChange(e,r){this.id.set(e.id)}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=h({token:t,factory:t.\u0275fac});let o=t;return o})();var Re=(()=>{let t=class t{constructor(){this.heading=g("Access Control Management"),this.tabs=g([])}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=h({token:t,factory:t.\u0275fac});let o=t;return o})();var je=o=>["/user","employee","detail",o],Pe=(o,t,d)=>({"dark:text-red-400":o,"dark:text-orange-400":t,"dark:text-green-400":d}),Oe=(o,t,d,e)=>({"rounded-t-2":o,"rounded-t-none":t,"rounded-b-2":d,"rounded-b-none":e});function Ue(o,t){if(o&1&&(b(0,"div",46),i(1,"a",47)(2,"div",48)(3,"h2",49),l(4),n(),i(5,"p",50)(6,"span",51),l(7),n(),i(8,"span"),l(9," / "),n(),i(10,"span"),l(11),n()(),i(12,"p",52)(13,"i",53),l(14,"label_important"),n(),i(15,"span"),l(16),n()()()()),o&2){let d=t,e=Y();s(),u("hoverableEnabled",d!=null)("routerLink",d!=null?K(7,je,d.id):null),s(3),S(d.name),s(3),S(d.department),s(4),S(d.position),s(2),u("ngClass",Q(9,Pe,d.status==e.employeeStatus.TERMINATED||d.status==e.employeeStatus.INACTIVE||d.status==e.employeeStatus.RETIRED,d.status==e.employeeStatus.ON_LEAVE||d.status==e.employeeStatus.PROBATION,d.status==e.employeeStatus.ACTIVE||d.status==e.employeeStatus.CONTRACT)),s(3),S(d.status)}}function Be(o,t){if(o&1&&(i(0,"pui-input-field",40),b(1,"input",54),i(2,"button",55)(3,"i",56),l(4,"close"),n()()()),o&2){let d=t.$index,e=t.$index,r=t.$count;u("ngClass",F(2,Oe,e===0,e!==0,e===r-1,e!==r-1)),s(),u("formControlName",d)}}function Ve(o,t){o&1&&(i(0,"p",41),l(1,"All IP are allowed"),n())}function Ge(o,t){if(o&1&&(i(0,"pui-input-field",40),b(1,"input",54),i(2,"button",55)(3,"i",56),l(4,"close"),n()()()),o&2){let d=t.$index,e=t.$index,r=t.$count;u("ngClass",F(2,Oe,e===0,e!==0,e===r-1,e!==r-1)),s(),u("formControlName",d)}}function $e(o,t){o&1&&(i(0,"p",41),l(1,"All countries are allowed"),n())}var Fe=(()=>{let t=class t{constructor(){this.dataService=f(_),this.employeeDataService=f(T),this.route=f(te),this.list=C(this.dataService.getList()),this.employeeList=C(this.employeeDataService.getList()),this.id=C(this.route.params.pipe(A(e=>e.id))),this.accessControl=v(()=>this.list()?.find(e=>e.id==this.id())),this.employee=v(()=>this.employeeList()?.find(e=>e.id==this.accessControl()?.employeeId)),this.employeeStatus=I,this.formGroup=f(E).nonNullable.group({isEnabled:[!1],customer:f(E).nonNullable.group({canCreate:[!1],canRead:[!1],canUpdate:[!1],canDelete:[!1]}),employee:f(E).nonNullable.group({canCreate:[!1],canRead:[!1],canUpdate:[!1],canDelete:[!1]}),inventoryItem:f(E).nonNullable.group({canCreate:[!1],canRead:[!1],canUpdate:[!1],canDelete:[!1]}),location:f(E).nonNullable.group({isEnabled:[!1],allowedIps:f(E).nonNullable.array([]),countries:f(E).nonNullable.array([])})}),D(()=>{let e=this.accessControl();e&&Z(()=>{L(this.formGroup.controls.location.controls.allowedIps,e.conditions.location.allowedIps.length),L(this.formGroup.controls.location.controls.countries,e.conditions.location.countries.length),this.formGroup.setValue({isEnabled:e.isEnabled,customer:{canCreate:e.permissions.customer.canCreate,canRead:e.permissions.customer.canRead,canUpdate:e.permissions.customer.canUpdate,canDelete:e.permissions.customer.canDelete},employee:{canCreate:e.permissions.employee.canCreate,canRead:e.permissions.employee.canRead,canUpdate:e.permissions.employee.canUpdate,canDelete:e.permissions.employee.canDelete},inventoryItem:{canCreate:e.permissions.inventoryItem.canCreate,canRead:e.permissions.inventoryItem.canRead,canUpdate:e.permissions.inventoryItem.canUpdate,canDelete:e.permissions.inventoryItem.canDelete},location:{isEnabled:e.conditions.location.isEnabled,allowedIps:e.conditions.location.allowedIps,countries:e.conditions.location.countries}})})},{allowSignalWrites:!0})}onToggleAll(e){let r=this.formGroup.getRawValue()[e];Object.values(r).every(p=>p==!0)?this.formGroup.get(e)?.setValue({canCreate:!1,canRead:!1,canUpdate:!1,canDelete:!1}):this.formGroup.get(e)?.setValue({canCreate:!0,canRead:!0,canUpdate:!0,canDelete:!0})}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=z({type:t,selectors:[["demo-access-control-overall"]],hostAttrs:[1,"contents"],standalone:!0,features:[J],decls:108,vars:20,consts:[[1,"@container","grow"],[1,"pui-card","rounded-4","p-8"],[1,"flex","flex-col","@screen-lg:flex-row","gap-8"],[1,"flex","flex-col","gap-4","@screen-lg:basis-1/4","@screen-lg:sticky","top-8","h-fit"],[1,"flex","flex-row","items-center","gap-2"],[1,"icon-6","font-variation-weight-light","text-neutral-800","dark:text-neutral-200"],[1,"flex","flex-col","gap-1"],[1,"text-sm","text-neutral-800","dark:text-neutral-200"],[1,"text-base"],[1,"flex","flex-col","gap-8","@screen-lg:basis-3/4",3,"formGroup"],[1,"flex","flex-row","items-center","gap-4"],["formControlName","isEnabled",3,"id"],["for","isEnabled",1,"flex","flex-col","gap-1","grow"],[1,"text-base","font-medium"],[1,"text-neutral-700","dark:text-neutral-300","text-sm","font-light"],[1,"flex","flex-col","gap-2"],[1,"flex","flex-row","justify-end","items-center","px-6","gap-4"],["puiTooltip","Create",1,"px-5","py-2"],[1,"icon-6","font-variation-weight-light"],["puiTooltip","Read",1,"px-5","py-2"],["puiTooltip","Update",1,"px-5","py-2"],["puiTooltip","Delete",1,"px-5","py-2"],["puiHoverable","","tabindex","0",1,"relative","rounded-4","before:absolute","before:inset-0","before:pui-card--subtle","before:rounded-4","before:transparency-mask-to-r","before:-z-10","justify-start",3,"click"],["formGroupName","customer",1,"flex","flex-row","items-center","px-6","py-4","gap-4","grow"],[1,"spacer"],["formControlName","canCreate",3,"click","id"],["formControlName","canRead",3,"click","id"],["formControlName","canUpdate",3,"click","id"],["formControlName","canDelete",3,"click","id"],["formGroupName","employee",1,"flex","flex-row","items-center","px-6","py-4","gap-4","grow"],["formGroupName","inventoryItem",1,"flex","flex-row","items-center","px-6","py-4","gap-4","grow"],[1,"relative","rounded-4","before:absolute","before:inset-0","before:pui-card--subtle","before:rounded-4","before:transparency-mask-to-r","before:-z-10","justify-start"],["formGroupName","location",1,"flex","flex-col","px-6","py-4","gap-4","grow"],["formControlName","isEnabled",3,"click","id"],["for","locationIsEnabled",1,"flex","flex-col","gap-1","grow",3,"click"],[1,"grid","grid-cols-1","@screen-md:grid-cols-2","gap-4"],[1,"pui-card--subtle","rounded-4","p-4"],["formArrayName","allowedIps",1,"flex","flex-col","gap-4"],[1,"px-4"],[1,"flex","flex-col"],[1,"py-1","text-base",3,"ngClass"],[1,"text-sm","text-neutral-700","dark:text-neutral-300","px-4"],[1,"self-end","px-1"],["puiBorderedButton","","color","primary",1,"rounded-full","p-2"],[1,"icon-5"],["formArrayName","countries",1,"flex","flex-col","gap-4"],[1,"flex-none","basis-2"],["puiHoverable","",1,"pui-card--subtle","rounded-4","p-8","overflow-hidden",3,"hoverableEnabled","routerLink"],[1,"flex","flex-col","items-center","gap-2"],[1,"w-full","text-center","break-anywhere","whitespace-normal"],[1,"text-sm","text-center"],[1,"text-neutral-700","dark:text-neutral-300"],[1,"text-base","text-center","flex","items-center","gap-1"],[1,"icon-4","font-variation-fill",3,"ngClass"],[3,"formControlName"],["puiBaseButton","",1,"rounded-full","p-2","me-2"],[1,"icon-4"]],template:function(r,c){if(r&1&&(i(0,"div",0)(1,"main",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"i",5),l(6,"key"),n(),i(7,"div",6)(8,"span",7),l(9,"User #"),n(),i(10,"span",8),l(11),n()()(),b(12,"pui-divider"),i(13,"div",4)(14,"i",5),l(15,"badge"),n(),i(16,"div",6)(17,"span",7),l(18,"Employee ID"),n(),i(19,"span",8),l(20),n()()(),q(21,Ue,17,13),n(),i(22,"form",9)(23,"div",10),b(24,"pui-toggle",11),i(25,"label",12)(26,"p",13),l(27,"Enable"),n(),i(28,"p",14),l(29,"Enable this account to login and access system resources"),n()()(),i(30,"div",15)(31,"div",16)(32,"div",17)(33,"i",18),l(34,"add"),n()(),i(35,"div",19)(36,"i",18),l(37,"visibility"),n()(),i(38,"div",20)(39,"i",18),l(40,"edit"),n()(),i(41,"div",21)(42,"i",18),l(43,"delete"),n()()(),i(44,"div",22),y("click",function(){return c.onToggleAll("customer")}),i(45,"div",23)(46,"h3"),l(47,"Customer"),n(),b(48,"div",24),i(49,"pui-toggle",25),y("click",function(a){return a.stopPropagation()}),n(),i(50,"pui-toggle",26),y("click",function(a){return a.stopPropagation()}),n(),i(51,"pui-toggle",27),y("click",function(a){return a.stopPropagation()}),n(),i(52,"pui-toggle",28),y("click",function(a){return a.stopPropagation()}),n()()(),i(53,"div",22),y("click",function(){return c.onToggleAll("employee")}),i(54,"div",29)(55,"h3"),l(56,"Employee"),n(),b(57,"div",24),i(58,"pui-toggle",25),y("click",function(a){return a.stopPropagation()}),n(),i(59,"pui-toggle",26),y("click",function(a){return a.stopPropagation()}),n(),i(60,"pui-toggle",27),y("click",function(a){return a.stopPropagation()}),n(),i(61,"pui-toggle",28),y("click",function(a){return a.stopPropagation()}),n()()(),i(62,"div",22),y("click",function(){return c.onToggleAll("inventoryItem")}),i(63,"div",30)(64,"h3"),l(65,"Inventory Item"),n(),b(66,"div",24),i(67,"pui-toggle",25),y("click",function(a){return a.stopPropagation()}),n(),i(68,"pui-toggle",26),y("click",function(a){return a.stopPropagation()}),n(),i(69,"pui-toggle",27),y("click",function(a){return a.stopPropagation()}),n(),i(70,"pui-toggle",28),y("click",function(a){return a.stopPropagation()}),n()()()(),b(71,"pui-divider"),i(72,"h2"),l(73,"Conditions"),n(),i(74,"div",31)(75,"div",32)(76,"div",10)(77,"pui-toggle",33),y("click",function(a){return a.stopPropagation()}),n(),i(78,"label",34),y("click",function(a){return a.stopPropagation()}),i(79,"h3"),l(80,"Location based permission conditions"),n(),i(81,"p",14),l(82,"Blocks access according to location related metadata"),n()()(),i(83,"div",35)(84,"div",36)(85,"div",37)(86,"h3",38),l(87,"Allowed IP Address"),n(),i(88,"div",39),R(89,Be,5,7,"pui-input-field",40,N,!1,Ve,2,0,"p",41),n(),i(92,"div",42)(93,"button",43)(94,"i",44),l(95,"add"),n()()()()(),i(96,"div",36)(97,"div",45)(98,"h3",38),l(99,"Country"),n(),i(100,"div",39),R(101,Ge,5,7,"pui-input-field",40,N,!1,$e,2,0,"p",41),n(),i(104,"div",42)(105,"button",43)(106,"i",44),l(107,"add"),n()()()()()()()()()()()()),r&2){let p,a,V;s(11),S((p=(p=c.accessControl())==null?null:p.userNumber)!==null&&p!==void 0?p:"----"),s(9),S((a=(a=c.accessControl())==null?null:a.employeeId)!==null&&a!==void 0?a:"----"),s(),W((V=c.employee())?21:-1,V),s(),u("formGroup",c.formGroup),s(2),u("id","isEnabled"),s(25),u("id","customerCanCreate"),s(),u("id","customerCanRead"),s(),u("id","customerCanUpdate"),s(),u("id","customerCanDelete"),s(6),u("id","employeeCanCreate"),s(),u("id","employeeCanRead"),s(),u("id","employeeCanUpdate"),s(),u("id","employeeCanDelete"),s(6),u("id","inventoryItemCanCreate"),s(),u("id","inventoryItemCanRead"),s(),u("id","inventoryItemCanUpdate"),s(),u("id","inventoryItemCanDelete"),s(7),u("id","locationIsEnabled"),s(12),O(c.formGroup.controls.location.controls.allowedIps.controls),s(12),O(c.formGroup.controls.location.controls.countries.controls)}},dependencies:[he,ee,ue,ie,be,de,ae,ne,oe,re,me,le,ce,se,pe,ve,ye,fe,ge,Ce]});let o=t;return o})();var Le=(()=>{let t=class t{constructor(){this.dataService=f(_),this.employeeDataService=f(T),this.rawData=C(this.dataService.getList()),this.employeeList=C(this.employeeDataService.getList()),this.configuration={useVirtualScroll:!0},this.data=v(()=>{let e=this.rawData(),r=this.employeeList();return!e||!r?[]:e.map(c=>G(x({},c),{employee:r.find(p=>p.id==c.employeeId)})).filter(this.filterFn()).toSorted(this.sortFn())}),this.columnsConfig=g([{key:"userNumber",label:"#",isSortedAsc:!0},{key:"employeeName",label:"Employee",path:"employee.name"},{key:"isEnabled",label:"Enabled",fieldConfiguration:{type:"boolean"}}]),this.columnsToDisplay=g(["userNumber","employeeName","isEnabled"]),this.filterConfig=g({type:"object",properties:{isEnabled:{description:"Enabled",type:"boolean"}}}),this.filterValue=g({isEnabled:!0}),this.controlsConfig=g([{id:"refresh",icon:"refresh",label:"Refresh",mode:"low-emphasis"}]),this.sortFn=v(()=>Te(this.columnsConfig())),this.filterFn=v(()=>Ie(this.filterValue(),{isEnabled:(e,r,c)=>c!=null&&e.isEnabled===c}))}routeToDetail(e){return["detail",e.id]}onHeaderCellClick(e,r){this.columnsConfig.update(c=>De(c,e))}onFilterChange(e){this.filterValue.set(e)}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=h({token:t,factory:t.\u0275fac});let o=t;return o})();var Ht=[{path:"",data:x({},j({title:"Access Control"})),children:[{path:"detail/:id",component:U,data:x({},j({deps:[_],titleFn:(o,t)=>o.params.pipe(H(d=>t.getList().pipe(A(e=>e.find(r=>r.id==d.id)?.userNumber??"--"))))})),providers:[{provide:P,useClass:we}],children:[{path:"overall",component:Fe},{path:"raw",component:Se,providers:[{provide:Ee,useClass:Ne}]},{path:"**",redirectTo:"overall"}]},{path:"",component:U,providers:[{provide:P,useClass:Re}],children:[{path:"",component:Ae,providers:[{provide:ke,useClass:Le}]}]}]}];export{Ht as ROUTES};
