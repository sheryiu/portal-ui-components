import{c as A,e as I}from"./chunk-JCB2IDA7.js";import{a as m}from"./chunk-A7X6ERW6.js";import{$ as Y,$a as re,B as f,C as z,L as p,Na as te,O as y,Ob as xe,P as q,Pb as Ee,Q as u,Qa as ie,Qb as Se,S as W,Sb as Ae,T as R,U as O,Ub as Ie,V as F,Vb as Te,W as i,X as n,Xb as ke,Y as _,Ya as h,Yb as De,Za as ne,Zb as U,_ as g,_a as oe,_b as B,a as v,ab as ae,b as k,ba as s,bb as le,ca as S,cb as se,db as pe,e as M,eb as ce,fb as E,ga as J,gb as de,hb as me,i as D,ia as K,ka as Q,la as L,mb as ue,nb as fe,ob as ye,pb as ge,qb as ve,r as $,ra as X,s as N,sb as j,ta as C,tb as P,u as H,ua as Z,ub as Ce,va as w,vb as he,wb as be,xa as ee,y as b,yb as _e}from"./chunk-Q665FWTK.js";var x=(()=>{let t=class t{constructor(){this.appRef=f(X),this.list=new M([]),this.employeeData=f(I),this.isInitialized=!1}createMock(e,r){return{id:m.string.nanoid(),userNumber:String(r).padStart(4,"0"),employeeId:e.id,isEnabled:e.status!=A.INACTIVE&&e.status!=A.TERMINATED&&e.status!=A.RETIRED,permissions:{customer:{canCreate:m.datatype.boolean(),canRead:m.datatype.boolean(),canUpdate:m.datatype.boolean(),canDelete:m.datatype.boolean()},employee:{canCreate:m.datatype.boolean(),canRead:m.datatype.boolean(),canUpdate:m.datatype.boolean(),canDelete:m.datatype.boolean()},inventoryItem:{canCreate:m.datatype.boolean(),canRead:m.datatype.boolean(),canUpdate:m.datatype.boolean(),canDelete:m.datatype.boolean()}},conditions:{location:{isEnabled:m.datatype.boolean(),allowedIps:Array(m.helpers.rangeToNumber(5)).fill(0).map(()=>m.internet.ip()),countries:Array(m.helpers.rangeToNumber(2)).fill(0).map(()=>m.location.country())},timeRange:{isEnabled:m.datatype.boolean(),allowedAfter:m.helpers.maybe(()=>m.helpers.rangeToNumber(23).toString().padStart(2,"0")+"00")??null,allowedBefore:m.helpers.maybe(()=>m.helpers.rangeToNumber(23).toString().padStart(2,"0")+"00")??null}}}}initialize(){this.isInitialized||(this.isInitialized=!0,this.employeeData.getList().pipe(N(e=>e.length>0)).subscribe(e=>{this.list.next(e.map((r,c)=>this.createMock(r,c)))}))}getList(){return this.appRef.isStable.pipe(N(e=>e),$(1e3)).subscribe(()=>{this.initialize()}),this.list}save(e){this.list.next(this.list.value.map(r=>r.id==e.id?e:r))}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=b({token:t,factory:t.\u0275fac,providedIn:"root"});let o=t;return o})();var we=(()=>{let t=class t{constructor(){this.dataService=f(x),this.list=h(this.dataService.getList()),this.id=y(void 0),this.heading=C(()=>this.list()?.find(e=>e.id==this.id())?.userNumber??"--"),this.tabs=y([{label:"Overall",route:["overall"]},{label:"Raw",route:["raw"]}])}onParamsChange(e,r){this.id.set(e.id)}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=b({token:t,factory:t.\u0275fac});let o=t;return o})();var V={type:"object",properties:{canCreate:{type:"boolean",description:"Can Create"},canRead:{type:"boolean",description:"Can Read"},canUpdate:{type:"boolean",description:"Can Update"},canDelete:{type:"boolean",description:"Can Delete"}}},Ne=(()=>{let t=class t{constructor(){this.dataService=f(x),this.list=h(this.dataService.getList()),this.id=y(void 0),this.data=y(void 0),this.fieldConfiguration=y({type:"object",properties:{userNumber:{description:"User number",type:"string"},employeeId:{description:"Employee ID",type:"string"},isEnabled:{description:"Enabled",type:"boolean"},permissions:{description:"Permissions",type:"object",properties:{customer:v({description:"Customer"},V),employee:v({description:"Employee"},V),inventoryItem:v({description:"Inventory Item"},V)}},conditions:{description:"Conditions",type:"object",properties:{location:{description:"Location-Based",type:"object",properties:{isEnabled:{type:"boolean",description:"Enabled"},allowedIps:{type:"array",description:"Allowed IPs",items:{type:"string"}},countries:{type:"array",description:"Countries",items:{type:"string"}}}},timeRange:{description:"Time-Based",type:"object",properties:{isEnabled:{type:"boolean",description:"Enabled"},allowedAfter:{description:"Allowed After (HHmm)",type:"string"},allowedBefore:{description:"Allowed Before (HHmm)",type:"string"}}}}}}}),this.isDirty=y(!1),this.updatedValue=y(void 0),this.controlsConfig=C(()=>this.isDirty()?Ee:xe),w(()=>{this.data.set(structuredClone(this.list()?.find(e=>e.id==this.id())))},{allowSignalWrites:!0})}registerUpdateState(e){this.updateState=e}onStateChange(e){this.isDirty.update(r=>e.isDirty??r)}onValueChange(e){this.updatedValue.set(e)}onControlClick(e,r){switch(e){case"refresh":case"cancel":{this.data.set(structuredClone(this.list()?.find(c=>c.id==this.id()))),this.updateState({isDirty:!1});break}case"save":{let c=this.updatedValue();c&&(this.dataService.save(c),this.updateState({isDirty:!1}));break}}}onParamsChange(e,r){this.id.set(e.id)}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=b({token:t,factory:t.\u0275fac});let o=t;return o})();var Re=(()=>{let t=class t{constructor(){this.heading=y("Access Control Management"),this.tabs=y([])}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=b({token:t,factory:t.\u0275fac});let o=t;return o})();var je=o=>["/user","employee","detail",o],Pe=(o,t,d)=>({"dark:text-red-400":o,"dark:text-orange-400":t,"dark:text-green-400":d}),Oe=(o,t,d,e)=>({"rounded-t-2":o,"rounded-t-none":t,"rounded-b-2":d,"rounded-b-none":e});function Ue(o,t){if(o&1&&(_(0,"div",46),i(1,"a",47)(2,"div",48)(3,"h2",49),s(4),n(),i(5,"p",50)(6,"span",51),s(7),n(),i(8,"span"),s(9," / "),n(),i(10,"span"),s(11),n()(),i(12,"p",52)(13,"i",53),s(14,"label_important"),n(),i(15,"span"),s(16),n()()()()),o&2){let d=t,e=Y();p(),u("hoverableEnabled",d!=null)("routerLink",d!=null?K(7,je,d.id):null),p(3),S(d.name),p(3),S(d.department),p(4),S(d.position),p(2),u("ngClass",Q(9,Pe,d.status==e.employeeStatus.TERMINATED||d.status==e.employeeStatus.INACTIVE||d.status==e.employeeStatus.RETIRED,d.status==e.employeeStatus.ON_LEAVE||d.status==e.employeeStatus.PROBATION,d.status==e.employeeStatus.ACTIVE||d.status==e.employeeStatus.CONTRACT)),p(3),S(d.status)}}function Be(o,t){if(o&1&&(i(0,"pui-input-field",40),_(1,"input",54),i(2,"button",55)(3,"i",56),s(4,"close"),n()()()),o&2){let d=t.$index,e=t.$index,r=t.$count;u("ngClass",L(2,Oe,e===0,e!==0,e===r-1,e!==r-1)),p(),u("formControlName",d)}}function Ve(o,t){o&1&&(i(0,"p",41),s(1,"All IP are allowed"),n())}function Ge(o,t){if(o&1&&(i(0,"pui-input-field",40),_(1,"input",54),i(2,"button",55)(3,"i",56),s(4,"close"),n()()()),o&2){let d=t.$index,e=t.$index,r=t.$count;u("ngClass",L(2,Oe,e===0,e!==0,e===r-1,e!==r-1)),p(),u("formControlName",d)}}function Me(o,t){o&1&&(i(0,"p",41),s(1,"All countries are allowed"),n())}var Fe=(()=>{let t=class t{constructor(){this.dataService=f(x),this.employeeDataService=f(I),this.route=f(te),this.list=h(this.dataService.getList()),this.employeeList=h(this.employeeDataService.getList()),this.id=h(this.route.params.pipe(D(e=>e.id))),this.accessControl=C(()=>this.list()?.find(e=>e.id==this.id())),this.employee=C(()=>this.employeeList()?.find(e=>e.id==this.accessControl()?.employeeId)),this.employeeStatus=A,this.formGroup=f(E).nonNullable.group({isEnabled:[!1],customer:f(E).nonNullable.group({canCreate:[!1],canRead:[!1],canUpdate:[!1],canDelete:[!1]}),employee:f(E).nonNullable.group({canCreate:[!1],canRead:[!1],canUpdate:[!1],canDelete:[!1]}),inventoryItem:f(E).nonNullable.group({canCreate:[!1],canRead:[!1],canUpdate:[!1],canDelete:[!1]}),location:f(E).nonNullable.group({isEnabled:[!1],allowedIps:f(E).nonNullable.array([]),countries:f(E).nonNullable.array([])})}),w(()=>{let e=this.accessControl();e&&Z(()=>{j(this.formGroup.controls.location.controls.allowedIps,e.conditions.location.allowedIps.length),j(this.formGroup.controls.location.controls.countries,e.conditions.location.countries.length),this.formGroup.setValue({isEnabled:e.isEnabled,customer:{canCreate:e.permissions.customer.canCreate,canRead:e.permissions.customer.canRead,canUpdate:e.permissions.customer.canUpdate,canDelete:e.permissions.customer.canDelete},employee:{canCreate:e.permissions.employee.canCreate,canRead:e.permissions.employee.canRead,canUpdate:e.permissions.employee.canUpdate,canDelete:e.permissions.employee.canDelete},inventoryItem:{canCreate:e.permissions.inventoryItem.canCreate,canRead:e.permissions.inventoryItem.canRead,canUpdate:e.permissions.inventoryItem.canUpdate,canDelete:e.permissions.inventoryItem.canDelete},location:{isEnabled:e.conditions.location.isEnabled,allowedIps:e.conditions.location.allowedIps,countries:e.conditions.location.countries}})})},{allowSignalWrites:!0})}onToggleAll(e){let r=this.formGroup.getRawValue()[e];Object.values(r).every(a=>a==!0)?this.formGroup.get(e)?.setValue({canCreate:!1,canRead:!1,canUpdate:!1,canDelete:!1}):this.formGroup.get(e)?.setValue({canCreate:!0,canRead:!0,canUpdate:!0,canDelete:!0})}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=z({type:t,selectors:[["demo-access-control-overall"]],hostAttrs:[1,"contents"],standalone:!0,features:[J],decls:108,vars:20,consts:[[1,"@container","grow"],[1,"pui-card","rounded-4","p-8"],[1,"flex","flex-col","@screen-lg:flex-row","gap-8"],[1,"flex","flex-col","gap-4","@screen-lg:basis-1/4","@screen-lg:sticky","top-8","h-fit"],[1,"flex","flex-row","items-center","gap-2"],[1,"icon-6","font-variation-weight-light","text-neutral-800","dark:text-neutral-200"],[1,"flex","flex-col","gap-1"],[1,"text-sm","text-neutral-800","dark:text-neutral-200"],[1,"text-base"],[1,"flex","flex-col","gap-8","@screen-lg:basis-3/4",3,"formGroup"],[1,"flex","flex-row","items-center","gap-4"],["formControlName","isEnabled",3,"id"],["for","isEnabled",1,"flex","flex-col","gap-1","grow"],[1,"text-base","font-medium"],[1,"text-neutral-700","dark:text-neutral-300","text-sm","font-light"],[1,"flex","flex-col","gap-2"],[1,"flex","flex-row","justify-end","items-center","px-6","gap-4"],["puiTooltip","Create",1,"px-5","py-2"],[1,"icon-6","font-variation-weight-light"],["puiTooltip","Read",1,"px-5","py-2"],["puiTooltip","Update",1,"px-5","py-2"],["puiTooltip","Delete",1,"px-5","py-2"],["puiHoverable","","tabindex","0",1,"relative","rounded-4","before:absolute","before:inset-0","before:pui-card--subtle","before:rounded-4","before:transparency-mask-to-r","before:-z-10","justify-start",3,"click"],["formGroupName","customer",1,"flex","flex-row","items-center","px-6","py-4","gap-4","grow"],[1,"spacer"],["formControlName","canCreate",3,"click","id"],["formControlName","canRead",3,"click","id"],["formControlName","canUpdate",3,"click","id"],["formControlName","canDelete",3,"click","id"],["formGroupName","employee",1,"flex","flex-row","items-center","px-6","py-4","gap-4","grow"],["formGroupName","inventoryItem",1,"flex","flex-row","items-center","px-6","py-4","gap-4","grow"],[1,"relative","rounded-4","before:absolute","before:inset-0","before:pui-card--subtle","before:rounded-4","before:transparency-mask-to-r","before:-z-10","justify-start"],["formGroupName","location",1,"flex","flex-col","px-6","py-4","gap-4","grow"],["formControlName","isEnabled",3,"click","id"],["for","locationIsEnabled",1,"flex","flex-col","gap-1","grow",3,"click"],[1,"grid","grid-cols-1","@screen-md:grid-cols-2","gap-4"],[1,"pui-card--subtle","rounded-4","p-4"],["formArrayName","allowedIps",1,"flex","flex-col","gap-4"],[1,"px-4"],[1,"flex","flex-col"],[1,"py-1","text-base",3,"ngClass"],[1,"text-sm","text-neutral-700","dark:text-neutral-300","px-4"],[1,"self-end","px-1"],["puiBorderedButton","","color","primary",1,"rounded-full","p-2"],[1,"icon-5"],["formArrayName","countries",1,"flex","flex-col","gap-4"],[1,"flex-none","basis-2"],["puiHoverable","",1,"pui-card--subtle","rounded-4","p-8","overflow-hidden",3,"hoverableEnabled","routerLink"],[1,"flex","flex-col","items-center","gap-2"],[1,"w-full","text-center","break-anywhere","whitespace-normal"],[1,"text-sm","text-center"],[1,"text-neutral-700","dark:text-neutral-300"],[1,"text-base","text-center","flex","items-center","gap-1"],[1,"icon-4","font-variation-fill",3,"ngClass"],[3,"formControlName"],["puiBaseButton","",1,"rounded-full","p-2","me-2"],[1,"icon-4"]],template:function(r,c){if(r&1&&(i(0,"div",0)(1,"main",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"i",5),s(6,"key"),n(),i(7,"div",6)(8,"span",7),s(9,"User #"),n(),i(10,"span",8),s(11),n()()(),_(12,"pui-divider"),i(13,"div",4)(14,"i",5),s(15,"badge"),n(),i(16,"div",6)(17,"span",7),s(18,"Employee ID"),n(),i(19,"span",8),s(20),n()()(),q(21,Ue,17,13),n(),i(22,"form",9)(23,"div",10),_(24,"pui-toggle",11),i(25,"label",12)(26,"p",13),s(27,"Enable"),n(),i(28,"p",14),s(29,"Enable this account to login and access system resources"),n()()(),i(30,"div",15)(31,"div",16)(32,"div",17)(33,"i",18),s(34,"add"),n()(),i(35,"div",19)(36,"i",18),s(37,"visibility"),n()(),i(38,"div",20)(39,"i",18),s(40,"edit"),n()(),i(41,"div",21)(42,"i",18),s(43,"delete"),n()()(),i(44,"div",22),g("click",function(){return c.onToggleAll("customer")}),i(45,"div",23)(46,"h3"),s(47,"Customer"),n(),_(48,"div",24),i(49,"pui-toggle",25),g("click",function(l){return l.stopPropagation()}),n(),i(50,"pui-toggle",26),g("click",function(l){return l.stopPropagation()}),n(),i(51,"pui-toggle",27),g("click",function(l){return l.stopPropagation()}),n(),i(52,"pui-toggle",28),g("click",function(l){return l.stopPropagation()}),n()()(),i(53,"div",22),g("click",function(){return c.onToggleAll("employee")}),i(54,"div",29)(55,"h3"),s(56,"Employee"),n(),_(57,"div",24),i(58,"pui-toggle",25),g("click",function(l){return l.stopPropagation()}),n(),i(59,"pui-toggle",26),g("click",function(l){return l.stopPropagation()}),n(),i(60,"pui-toggle",27),g("click",function(l){return l.stopPropagation()}),n(),i(61,"pui-toggle",28),g("click",function(l){return l.stopPropagation()}),n()()(),i(62,"div",22),g("click",function(){return c.onToggleAll("inventoryItem")}),i(63,"div",30)(64,"h3"),s(65,"Inventory Item"),n(),_(66,"div",24),i(67,"pui-toggle",25),g("click",function(l){return l.stopPropagation()}),n(),i(68,"pui-toggle",26),g("click",function(l){return l.stopPropagation()}),n(),i(69,"pui-toggle",27),g("click",function(l){return l.stopPropagation()}),n(),i(70,"pui-toggle",28),g("click",function(l){return l.stopPropagation()}),n()()()(),_(71,"pui-divider"),i(72,"h2"),s(73,"Conditions"),n(),i(74,"div",31)(75,"div",32)(76,"div",10)(77,"pui-toggle",33),g("click",function(l){return l.stopPropagation()}),n(),i(78,"label",34),g("click",function(l){return l.stopPropagation()}),i(79,"h3"),s(80,"Location based permission conditions"),n(),i(81,"p",14),s(82,"Blocks access according to location related metadata"),n()()(),i(83,"div",35)(84,"div",36)(85,"div",37)(86,"h3",38),s(87,"Allowed IP Address"),n(),i(88,"div",39),O(89,Be,5,7,"pui-input-field",40,R,!1,Ve,2,0,"p",41),n(),i(92,"div",42)(93,"button",43)(94,"i",44),s(95,"add"),n()()()()(),i(96,"div",36)(97,"div",45)(98,"h3",38),s(99,"Country"),n(),i(100,"div",39),O(101,Ge,5,7,"pui-input-field",40,R,!1,Me,2,0,"p",41),n(),i(104,"div",42)(105,"button",43)(106,"i",44),s(107,"add"),n()()()()()()()()()()()()),r&2){let a,l,G;p(11),S((a=(a=c.accessControl())==null?null:a.userNumber)!==null&&a!==void 0?a:"----"),p(9),S((l=(l=c.accessControl())==null?null:l.employeeId)!==null&&l!==void 0?l:"----"),p(),W((G=c.employee())?21:-1,G),p(),u("formGroup",c.formGroup),p(2),u("id","isEnabled"),p(25),u("id","customerCanCreate"),p(),u("id","customerCanRead"),p(),u("id","customerCanUpdate"),p(),u("id","customerCanDelete"),p(6),u("id","employeeCanCreate"),p(),u("id","employeeCanRead"),p(),u("id","employeeCanUpdate"),p(),u("id","employeeCanDelete"),p(6),u("id","inventoryItemCanCreate"),p(),u("id","inventoryItemCanRead"),p(),u("id","inventoryItemCanUpdate"),p(),u("id","inventoryItemCanDelete"),p(7),u("id","locationIsEnabled"),p(12),F(c.formGroup.controls.location.controls.allowedIps.controls),p(12),F(c.formGroup.controls.location.controls.countries.controls)}},dependencies:[be,ee,ue,ie,_e,de,ae,ne,oe,re,me,le,ce,se,pe,ve,ge,fe,ye,he,Ce]});let o=t;return o})();var Le=(()=>{let t=class t{constructor(){this.dataService=f(x),this.employeeDataService=f(I),this.rawData=h(this.dataService.getList()),this.employeeList=h(this.employeeDataService.getList()),this.configuration={useVirtualScroll:!0},this.data=C(()=>{let e=this.rawData(),r=this.employeeList();return!e||!r?[]:e.map(c=>k(v({},c),{employee:r.find(a=>a.id==c.employeeId)})).filter(this.filterFn()).toSorted(this.sortFn())}),this.columnsConfig=y([{key:"userNumber",label:"#",isSortedAsc:!0},{key:"employeeName",label:"Employee",path:"employee.name"},{key:"isEnabled",label:"Enabled",fieldConfiguration:{type:"boolean"}}]),this.columnsToDisplay=y(["userNumber","employeeName","isEnabled"]),this.filterConfig=y({type:"object",properties:{isEnabled:{description:"Enabled",type:"boolean"}}}),this.filterValue=y({isEnabled:!0}),this.controlsConfig=y([{id:"refresh",icon:"refresh",label:"Refresh",mode:"low-emphasis"}]),this.sortFn=C(()=>Te(this.columnsConfig())),this.filterFn=C(()=>Ie(this.filterValue(),{isEnabled:(e,r,c)=>c!=null&&e.isEnabled===c}))}routeToDetail(e){return["detail",e.id]}onHeaderCellClick(e,r){this.columnsConfig.update(c=>c.map(a=>a.key==e?k(v({},a),{isSortedAsc:!a.isSortedAsc&&!a.isSortedDesc?!0:!!a.isSortedDesc,isSortedDesc:!!a.isSortedAsc}):k(v({},a),{isSortedAsc:!1,isSortedDesc:!1})))}onFilterChange(e){this.filterValue.set(e)}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=b({token:t,factory:t.\u0275fac});let o=t;return o})();var Gt=[{path:"",data:v({},P({title:"Access Control"})),children:[{path:"detail/:id",component:B,data:v({},P({deps:[x],titleFn:(o,t)=>o.params.pipe(H(d=>t.getList().pipe(D(e=>e.find(r=>r.id==d.id)?.userNumber??"--"))))})),providers:[{provide:U,useClass:we}],children:[{path:"overall",component:Fe},{path:"raw",component:Ae,providers:[{provide:Se,useClass:Ne}]},{path:"**",redirectTo:"overall"}]},{path:"",component:B,providers:[{provide:U,useClass:Re}],children:[{path:"",component:De,providers:[{provide:ke,useClass:Le}]}]}]}];export{Gt as ROUTES};
