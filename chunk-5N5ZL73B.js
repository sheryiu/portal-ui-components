import{c as S,e as A}from"./chunk-UR6FENV6.js";import{c as we,d as De,e as Ie,g as Ne,j as Oe,k as Re,m as Ve,n as Fe,o as Le,p as G,q as M}from"./chunk-AX7JXOBJ.js";import{a as p}from"./chunk-5KUQE4MU.js";import{$ as ve,A as re,Ca as xe,Ea as Ee,Ha as Se,Ia as Ae,J as B,Ja as Te,Ka as ke,M as _,N as ae,O as le,P as se,T as ce,V as pe,W as de,X as me,Y as ue,Z as E,_ as fe,b as ne,ia as P,ra as ye,sa as ge,ta as _e,wa as Ce,x as oe,xa as be,ya as U,za as he}from"./chunk-3PWRGTCN.js";import{$ as C,Ab as F,Bb as L,Cb as t,Da as v,Db as o,Eb as y,Gb as X,Jb as m,K as Y,Kb as Z,N as O,Ra as s,Ub as w,Vb as a,W as J,Wb as x,cc as ee,ec as te,fa as u,fb as K,fc as j,g as q,mb as R,oa as T,pa as k,q as I,tb as Q,uc as g,vb as d,wc as ie,xc as N,yb as W,zb as V}from"./chunk-O5WS6LKQ.js";import{a as h,b as z}from"./chunk-EQDQRRRY.js";var b=(()=>{class i{constructor(){this.appRef=u(Q),this.list=new q([]),this.employeeData=u(A),this.isInitialized=!1}createMock(e,n){return{id:p.string.nanoid(),userNumber:String(n).padStart(4,"0"),employeeId:e.id,isEnabled:e.status!=S.INACTIVE&&e.status!=S.TERMINATED&&e.status!=S.RETIRED,permissions:{customer:{canCreate:p.datatype.boolean(),canRead:p.datatype.boolean(),canUpdate:p.datatype.boolean(),canDelete:p.datatype.boolean()},employee:{canCreate:p.datatype.boolean(),canRead:p.datatype.boolean(),canUpdate:p.datatype.boolean(),canDelete:p.datatype.boolean()},inventoryItem:{canCreate:p.datatype.boolean(),canRead:p.datatype.boolean(),canUpdate:p.datatype.boolean(),canDelete:p.datatype.boolean()}},conditions:{location:{isEnabled:p.datatype.boolean(),allowedIps:Array(p.helpers.rangeToNumber(5)).fill(0).map(()=>p.internet.ip()),countries:Array(p.helpers.rangeToNumber(2)).fill(0).map(()=>p.location.country())},timeRange:{isEnabled:p.datatype.boolean(),allowedAfter:p.helpers.maybe(()=>p.helpers.rangeToNumber(23).toString().padStart(2,"0")+"00")??null,allowedBefore:p.helpers.maybe(()=>p.helpers.rangeToNumber(23).toString().padStart(2,"0")+"00")??null}}}}initialize(){this.isInitialized||(this.isInitialized=!0,this.employeeData.getList().pipe(O(e=>e.length>0)).subscribe(e=>{this.list.next(e.map((n,r)=>this.createMock(n,r)))}))}getList(){return this.appRef.isStable.pipe(O(e=>e),Y(1e3)).subscribe(()=>{this.initialize()}),this.list}save(e){this.list.next(this.list.value.map(n=>n.id==e.id?e:n))}static{this.\u0275fac=function(n){return new(n||i)}}static{this.\u0275prov=C({token:i,factory:i.\u0275fac,providedIn:"root"})}}return i})();var je=(()=>{class i{constructor(){this.dataService=u(b),this.list=_(this.dataService.getList()),this.id=v(void 0),this.heading=g(()=>this.list()?.find(e=>e.id==this.id())?.userNumber??"--"),this.tabs=v([{label:"Overall",route:["overall"]},{label:"Raw",route:["raw"]}])}onParamsChange(e,n){this.id.set(e.id)}static{this.\u0275fac=function(n){return new(n||i)}}static{this.\u0275prov=C({token:i,factory:i.\u0275fac})}}return i})();var $={type:"object",properties:{canCreate:{type:"boolean",description:"Can Create"},canRead:{type:"boolean",description:"Can Read"},canUpdate:{type:"boolean",description:"Can Update"},canDelete:{type:"boolean",description:"Can Delete"}}},Be=(()=>{class i{constructor(){this.dataService=u(b),this.list=_(this.dataService.getList()),this.id=v(void 0),this.data=v(void 0),this.fieldConfiguration=v({type:"object",properties:{userNumber:{description:"User number",type:"string"},employeeId:{description:"Employee ID",type:"string"},isEnabled:{description:"Enabled",type:"boolean"},permissions:{description:"Permissions",type:"object",properties:{customer:h({description:"Customer"},$),employee:h({description:"Employee"},$),inventoryItem:h({description:"Inventory Item"},$)}},conditions:{description:"Conditions",type:"object",properties:{location:{description:"Location-Based",type:"object",properties:{isEnabled:{type:"boolean",description:"Enabled"},allowedIps:{type:"array",description:"Allowed IPs",items:{type:"string"}},countries:{type:"array",description:"Countries",items:{type:"string"}}}},timeRange:{description:"Time-Based",type:"object",properties:{isEnabled:{type:"boolean",description:"Enabled"},allowedAfter:{description:"Allowed After (HHmm)",type:"string"},allowedBefore:{description:"Allowed Before (HHmm)",type:"string"}}}}}}}),this.isDirty=v(!1),this.updatedValue=v(void 0),this.controlsConfig=g(()=>this.isDirty()?De:we),N(()=>{this.data.set(B(this.list()?.find(e=>e.id==this.id())))})}registerUpdateState(e){this.updateState=e}onStateChange(e){this.isDirty.update(n=>e.isDirty??n)}onValueChange(e){this.updatedValue.set(e)}onControlClick(e,n){switch(e){case"refresh":case"cancel":{this.data.set(B(this.list()?.find(r=>r.id==this.id()))),this.updateState({isDirty:!1});break}case"save":{let r=this.updatedValue();r&&(this.dataService.save(r),this.updateState({isDirty:!1}));break}}}onParamsChange(e,n){this.id.set(e.id)}static{this.\u0275fac=function(n){return new(n||i)}}static{this.\u0275prov=C({token:i,factory:i.\u0275fac})}}return i})();var Pe=(()=>{class i{constructor(){this.heading=v("Access Control Management"),this.tabs=v([])}static{this.\u0275fac=function(n){return new(n||i)}}static{this.\u0275prov=C({token:i,factory:i.\u0275fac})}}return i})();var $e=i=>["/user","employee","detail",i],He=(i,f,e)=>({"dark:text-red-400":i,"dark:text-orange-400":f,"dark:text-green-400":e}),Ue=(i,f,e,n)=>({"rounded-t-2":i,"rounded-t-none":f,"rounded-b-2":e,"rounded-b-none":n});function ze(i,f){if(i&1&&(y(0,"div",50),t(1,"a",51)(2,"div",52)(3,"h2",53),a(4),o(),t(5,"p",54)(6,"span",55),a(7),o(),t(8,"span"),a(9," / "),o(),t(10,"span"),a(11),o()(),t(12,"p",56)(13,"i",57),a(14,"label_important"),o(),t(15,"span"),a(16),o()()()()),i&2){let e=f,n=Z();s(),d("hoverableEnabled",e!=null)("routerLink",e!=null?ee(7,$e,e.id):null),s(3),x(e.name),s(3),x(e.department),s(4),x(e.position),s(2),d("ngClass",te(9,He,e.status==n.employeeStatus.TERMINATED||e.status==n.employeeStatus.INACTIVE||e.status==n.employeeStatus.RETIRED,e.status==n.employeeStatus.ON_LEAVE||e.status==n.employeeStatus.PROBATION,e.status==n.employeeStatus.ACTIVE||e.status==n.employeeStatus.CONTRACT)),s(3),x(e.status)}}function qe(i,f){if(i&1&&(t(0,"div"),a(1),o()),i&2){let e=f.$implicit;s(),x(e)}}function Ye(i,f){if(i&1){let e=X();t(0,"pui-base-dropdown-overlay",null,0)(2,"button",58),m("click",function(){T(e);let r=w(1);return k(r.selectValue("administrator"))}),a(3,"Administrator"),o(),t(4,"button",58),m("click",function(){T(e);let r=w(1);return k(r.selectValue("manager"))}),a(5,"Manager"),o(),t(6,"button",58),m("click",function(){T(e);let r=w(1);return k(r.selectValue("employee"))}),a(7,"Employee"),o(),t(8,"button",58),m("click",function(){T(e);let r=w(1);return k(r.selectValue("temp"))}),a(9,"Temporary Member"),o()()}}function Je(i,f){if(i&1&&(t(0,"pui-input-field",44),y(1,"input",59),t(2,"button",60)(3,"i",61),a(4,"close"),o()()()),i&2){let e=f.$index,n=f.$index,r=f.$count;d("ngClass",j(2,Ue,n===0,n!==0,n===r-1,n!==r-1)),s(),d("formControlName",e)}}function Ke(i,f){i&1&&(t(0,"p",45),a(1,"All IP are allowed"),o())}function Qe(i,f){if(i&1&&(t(0,"pui-input-field",44),y(1,"input",59),t(2,"button",60)(3,"i",61),a(4,"close"),o()()()),i&2){let e=f.$index,n=f.$index,r=f.$count;d("ngClass",j(2,Ue,n===0,n!==0,n===r-1,n!==r-1)),s(),d("formControlName",e)}}function We(i,f){i&1&&(t(0,"p",45),a(1,"All countries are allowed"),o())}var Ge=(()=>{class i{constructor(){this.dataService=u(b),this.employeeDataService=u(A),this.route=u(oe),this.list=_(this.dataService.getList()),this.employeeList=_(this.employeeDataService.getList()),this.id=_(this.route.params.pipe(I(e=>e.id))),this.accessControl=g(()=>this.list()?.find(e=>e.id==this.id())),this.employee=g(()=>this.employeeList()?.find(e=>e.id==this.accessControl()?.employeeId)),this.employeeStatus=S,this.formGroup=u(E).nonNullable.group({isEnabled:[!1],customer:u(E).nonNullable.group({canCreate:[!1],canRead:[!1],canUpdate:[!1],canDelete:[!1]}),employee:u(E).nonNullable.group({canCreate:[!1],canRead:[!1],canUpdate:[!1],canDelete:[!1]}),inventoryItem:u(E).nonNullable.group({canCreate:[!1],canRead:[!1],canUpdate:[!1],canDelete:[!1]}),location:u(E).nonNullable.group({isEnabled:[!1],allowedIps:u(E).nonNullable.array([]),countries:u(E).nonNullable.array([])})}),N(()=>{let e=this.accessControl();e&&ie(()=>{P(this.formGroup.controls.location.controls.allowedIps,e.conditions.location.allowedIps.length),P(this.formGroup.controls.location.controls.countries,e.conditions.location.countries.length),this.formGroup.setValue({isEnabled:e.isEnabled,customer:{canCreate:e.permissions.customer.canCreate,canRead:e.permissions.customer.canRead,canUpdate:e.permissions.customer.canUpdate,canDelete:e.permissions.customer.canDelete},employee:{canCreate:e.permissions.employee.canCreate,canRead:e.permissions.employee.canRead,canUpdate:e.permissions.employee.canUpdate,canDelete:e.permissions.employee.canDelete},inventoryItem:{canCreate:e.permissions.inventoryItem.canCreate,canRead:e.permissions.inventoryItem.canRead,canUpdate:e.permissions.inventoryItem.canUpdate,canDelete:e.permissions.inventoryItem.canDelete},location:{isEnabled:e.conditions.location.isEnabled,allowedIps:e.conditions.location.allowedIps,countries:e.conditions.location.countries}})})})}onToggleAll(e){let n=this.formGroup.getRawValue()[e];Object.values(n).every(c=>c==!0)?this.formGroup.get(e)?.setValue({canCreate:!1,canRead:!1,canUpdate:!1,canDelete:!1}):this.formGroup.get(e)?.setValue({canCreate:!0,canRead:!0,canUpdate:!0,canDelete:!0})}static{this.\u0275fac=function(n){return new(n||i)}}static{this.\u0275cmp=K({type:i,selectors:[["demo-access-control-overall"]],hostAttrs:[1,"contents"],decls:116,vars:20,consts:[["dropdown",""],[1,"@container","grow"],[1,"pui-card","rounded-4","p-8"],[1,"flex","flex-col","@screen-lg:flex-row","gap-8"],[1,"flex","flex-col","gap-4","@screen-lg:basis-1/4","@screen-lg:sticky","top-8","h-fit"],[1,"flex","flex-row","items-center","gap-2"],[1,"icon-6","font-variation-weight-light","text-neutral-800","dark:text-neutral-200"],[1,"flex","flex-col","gap-1"],[1,"text-sm","text-neutral-800","dark:text-neutral-200"],[1,"text-base"],[1,"flex","flex-col","gap-8","@screen-lg:basis-3/4",3,"formGroup"],[1,"flex","flex-row","items-center","gap-4"],["formControlName","isEnabled",3,"id"],["for","isEnabled",1,"flex","flex-col","gap-1","grow"],[1,"text-base","font-medium"],[1,"text-neutral-700","dark:text-neutral-300","text-sm","font-light"],[1,"min-w-40"],[4,"puiDropdownTrigger"],[4,"puiDropdownOverlay"],[1,"flex","flex-col","gap-2"],[1,"flex","flex-row","justify-end","items-center","px-6","gap-4"],["puiTooltip","Create",1,"px-5","py-2"],[1,"icon-6","font-variation-weight-light"],["puiTooltip","Read",1,"px-5","py-2"],["puiTooltip","Update",1,"px-5","py-2"],["puiTooltip","Delete",1,"px-5","py-2"],["puiHoverable","","tabindex","0",1,"relative","rounded-4","before:absolute","before:inset-0","before:pui-card--subtle","before:rounded-4","before:transparency-mask-to-r","before:-z-10","justify-start",3,"click"],["formGroupName","customer",1,"flex","flex-row","items-center","px-6","py-4","gap-4","grow"],[1,"spacer"],["formControlName","canCreate",3,"click","id"],["formControlName","canRead",3,"click","id"],["formControlName","canUpdate",3,"click","id"],["formControlName","canDelete",3,"click","id"],["formGroupName","employee",1,"flex","flex-row","items-center","px-6","py-4","gap-4","grow"],["formGroupName","inventoryItem",1,"flex","flex-row","items-center","px-6","py-4","gap-4","grow"],[1,"relative","rounded-4","before:absolute","before:inset-0","before:pui-card--subtle","before:rounded-4","before:transparency-mask-to-r","before:-z-10","justify-start"],["formGroupName","location",1,"flex","flex-col","px-6","py-4","gap-4","grow"],["formControlName","isEnabled",3,"click","id"],["for","locationIsEnabled",1,"flex","flex-col","gap-1","grow",3,"click"],[1,"grid","grid-cols-1","@screen-md:grid-cols-2","gap-4"],[1,"pui-card--subtle","rounded-4","p-4"],["formArrayName","allowedIps",1,"flex","flex-col","gap-4"],[1,"px-4"],[1,"flex","flex-col"],[1,"py-1","text-base",3,"ngClass"],[1,"text-sm","text-neutral-700","dark:text-neutral-300","px-4"],[1,"self-end","px-1"],["puiBorderedButton","","color","primary",1,"rounded-full","p-2"],[1,"icon-5"],["formArrayName","countries",1,"flex","flex-col","gap-4"],[1,"flex-none","basis-2"],["puiHoverable","",1,"pui-card--subtle","rounded-4","p-8","overflow-hidden",3,"hoverableEnabled","routerLink"],[1,"flex","flex-col","items-center","gap-2"],[1,"w-full","text-center","break-anywhere","whitespace-normal"],[1,"text-sm","text-center"],[1,"text-neutral-700","dark:text-neutral-300"],[1,"text-base","text-center","flex","items-center","gap-1"],[1,"icon-4","font-variation-fill",3,"ngClass"],["puiBaseButton","",3,"click"],[3,"formControlName"],["puiBaseButton","",1,"rounded-full","p-2","me-2"],[1,"icon-4"]],template:function(n,r){if(n&1&&(t(0,"div",1)(1,"main",2)(2,"div",3)(3,"div",4)(4,"div",5)(5,"i",6),a(6,"key"),o(),t(7,"div",7)(8,"span",8),a(9,"User #"),o(),t(10,"span",9),a(11),o()()(),y(12,"pui-divider"),t(13,"div",5)(14,"i",6),a(15,"badge"),o(),t(16,"div",7)(17,"span",8),a(18,"Employee ID"),o(),t(19,"span",9),a(20),o()()(),R(21,ze,17,13),o(),t(22,"form",10)(23,"div",11),y(24,"pui-toggle",12),t(25,"label",13)(26,"p",14),a(27,"Enable"),o(),t(28,"p",15),a(29,"Enable this account to login and access system resources"),o()()(),y(30,"pui-divider"),t(31,"div",11)(32,"label",13)(33,"p",14),a(34,"Access Level"),o()(),t(35,"pui-dropdown",16),R(36,qe,2,1,"div",17)(37,Ye,10,0,"pui-base-dropdown-overlay",18),o()(),t(38,"div",19)(39,"div",20)(40,"div",21)(41,"i",22),a(42,"add"),o()(),t(43,"div",23)(44,"i",22),a(45,"visibility"),o()(),t(46,"div",24)(47,"i",22),a(48,"edit"),o()(),t(49,"div",25)(50,"i",22),a(51,"delete"),o()()(),t(52,"div",26),m("click",function(){return r.onToggleAll("customer")}),t(53,"div",27)(54,"h3"),a(55,"Customer"),o(),y(56,"div",28),t(57,"pui-toggle",29),m("click",function(l){return l.stopPropagation()}),o(),t(58,"pui-toggle",30),m("click",function(l){return l.stopPropagation()}),o(),t(59,"pui-toggle",31),m("click",function(l){return l.stopPropagation()}),o(),t(60,"pui-toggle",32),m("click",function(l){return l.stopPropagation()}),o()()(),t(61,"div",26),m("click",function(){return r.onToggleAll("employee")}),t(62,"div",33)(63,"h3"),a(64,"Employee"),o(),y(65,"div",28),t(66,"pui-toggle",29),m("click",function(l){return l.stopPropagation()}),o(),t(67,"pui-toggle",30),m("click",function(l){return l.stopPropagation()}),o(),t(68,"pui-toggle",31),m("click",function(l){return l.stopPropagation()}),o(),t(69,"pui-toggle",32),m("click",function(l){return l.stopPropagation()}),o()()(),t(70,"div",26),m("click",function(){return r.onToggleAll("inventoryItem")}),t(71,"div",34)(72,"h3"),a(73,"Inventory Item"),o(),y(74,"div",28),t(75,"pui-toggle",29),m("click",function(l){return l.stopPropagation()}),o(),t(76,"pui-toggle",30),m("click",function(l){return l.stopPropagation()}),o(),t(77,"pui-toggle",31),m("click",function(l){return l.stopPropagation()}),o(),t(78,"pui-toggle",32),m("click",function(l){return l.stopPropagation()}),o()()()(),y(79,"pui-divider"),t(80,"h2"),a(81,"Conditions"),o(),t(82,"div",35)(83,"div",36)(84,"div",11)(85,"pui-toggle",37),m("click",function(l){return l.stopPropagation()}),o(),t(86,"label",38),m("click",function(l){return l.stopPropagation()}),t(87,"h3"),a(88,"Location based permission conditions"),o(),t(89,"p",15),a(90,"Blocks access according to location related metadata"),o()()(),t(91,"div",39)(92,"div",40)(93,"div",41)(94,"h3",42),a(95,"Allowed IP Address"),o(),t(96,"div",43),F(97,Je,5,7,"pui-input-field",44,V,!1,Ke,2,0,"p",45),o(),t(100,"div",46)(101,"button",47)(102,"i",48),a(103,"add"),o()()()()(),t(104,"div",40)(105,"div",49)(106,"h3",42),a(107,"Country"),o(),t(108,"div",43),F(109,Qe,5,7,"pui-input-field",44,V,!1,We,2,0,"p",45),o(),t(112,"div",46)(113,"button",47)(114,"i",48),a(115,"add"),o()()()()()()()()()()()()),n&2){let c,l,H;s(11),x((c=(c=r.accessControl())==null?null:c.userNumber)!==null&&c!==void 0?c:"----"),s(9),x((l=(l=r.accessControl())==null?null:l.employeeId)!==null&&l!==void 0?l:"----"),s(),W((H=r.employee())?21:-1,H),s(),d("formGroup",r.formGroup),s(2),d("id","isEnabled"),s(33),d("id","customerCanCreate"),s(),d("id","customerCanRead"),s(),d("id","customerCanUpdate"),s(),d("id","customerCanDelete"),s(6),d("id","employeeCanCreate"),s(),d("id","employeeCanRead"),s(),d("id","employeeCanUpdate"),s(),d("id","employeeCanDelete"),s(6),d("id","inventoryItemCanCreate"),s(),d("id","inventoryItemCanRead"),s(),d("id","inventoryItemCanUpdate"),s(),d("id","inventoryItemCanDelete"),s(7),d("id","locationIsEnabled"),s(12),L(r.formGroup.controls.location.controls.allowedIps.controls),s(12),L(r.formGroup.controls.location.controls.countries.controls)}},dependencies:[xe,ne,ye,re,Ee,fe,ce,ae,le,se,ve,pe,ue,de,me,be,Ce,ge,_e,he,Te,Se,Ae,ke],encapsulation:2})}}return i})();var Me=(()=>{class i{constructor(){this.dataService=u(b),this.employeeDataService=u(A),this.rawData=_(this.dataService.getList()),this.employeeList=_(this.employeeDataService.getList()),this.configuration={useVirtualScroll:!0},this.data=g(()=>{let e=this.rawData(),n=this.employeeList();return!e||!n?[]:e.map(r=>z(h({},r),{employee:n.find(c=>c.id==r.employeeId)})).filter(this.filterFn()).toSorted(this.sortFn())}),this.columnsConfig=v([{key:"userNumber",label:"#",isSortedAsc:!0},{key:"employeeName",label:"Employee",path:"employee.name"},{key:"isEnabled",label:"Enabled",fieldConfiguration:{type:"boolean"}}]),this.columnsToDisplay=v(["userNumber","employeeName","isEnabled"]),this.filterConfig=v({type:"object",properties:{isEnabled:{description:"Enabled",type:"boolean"}}}),this.filterValue=v({isEnabled:!0}),this.controlsConfig=v([{id:"refresh",icon:"refresh",label:"Refresh",mode:"low-emphasis"}]),this.sortFn=g(()=>Re(this.columnsConfig())),this.filterFn=g(()=>Oe(this.filterValue(),{isEnabled:(e,n,r)=>r!=null&&e.isEnabled===r}))}routeToDetail(e){return["detail",e.id]}onHeaderCellClick(e,n){this.columnsConfig.update(r=>Le(r,e))}onFilterChange(e){this.filterValue.set(e)}static{this.\u0275fac=function(n){return new(n||i)}}static{this.\u0275prov=C({token:i,factory:i.\u0275fac})}}return i})();var ei=[{path:"",data:h({},U({title:"Access Control"})),children:[{path:"detail/:id",component:M,data:h({},U({deps:[b],titleFn:(i,f)=>i.params.pipe(J(e=>f.getList().pipe(I(n=>n.find(r=>r.id==e.id)?.userNumber??"--"))))})),providers:[{provide:G,useClass:je}],children:[{path:"overall",component:Ge},{path:"raw",component:Ne,providers:[{provide:Ie,useClass:Be}]},{path:"**",redirectTo:"overall"}]},{path:"",component:M,providers:[{provide:G,useClass:Pe}],children:[{path:"",component:Fe,providers:[{provide:Ve,useClass:Me}]}]}]}];export{ei as ROUTES};
