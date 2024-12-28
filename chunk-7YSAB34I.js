import{c as A,e as I}from"./chunk-ZG6HPPGR.js";import{a as m}from"./chunk-BB5YHCCR.js";import{$ as Y,$a as se,B as f,C as z,Ka as te,L as p,Lb as xe,Mb as Ee,Na as ie,Nb as Se,O as y,P as W,Pb as ke,Q as u,S as q,Sb as Ae,T as R,Tb as Ie,U as O,Ub as U,V as F,Va as h,Vb as B,W as i,Wa as ne,X as n,Xa as oe,Y as b,Ya as re,Za as ae,_ as g,_a as le,a as v,ab as ce,b as T,ba as c,bb as pe,ca as S,cb as E,db as de,e as M,eb as me,ga as J,i as w,ia as K,jb as ue,ka as Q,kb as fe,la as L,lb as ye,mb as ge,nb as ve,pa as X,pb as j,qb as P,r as $,ra as _,rb as he,s as N,sa as Z,sb as Ce,ta as k,tb as be,u as H,va as ee,vb as _e,y as C}from"./chunk-RX6RE7T5.js";var x=(()=>{let t=class t{constructor(){this.appRef=f(X),this.list=new M([]),this.employeeData=f(I),this.isInitialized=!1}createMock(e,o){return{id:m.string.nanoid(),userNumber:String(o).padStart(4,"0"),employeeId:e.id,isEnabled:e.status!=A.INACTIVE&&e.status!=A.TERMINATED&&e.status!=A.RETIRED,permissions:{customer:{canCreate:m.datatype.boolean(),canRead:m.datatype.boolean(),canUpdate:m.datatype.boolean(),canDelete:m.datatype.boolean()},employee:{canCreate:m.datatype.boolean(),canRead:m.datatype.boolean(),canUpdate:m.datatype.boolean(),canDelete:m.datatype.boolean()},inventoryItem:{canCreate:m.datatype.boolean(),canRead:m.datatype.boolean(),canUpdate:m.datatype.boolean(),canDelete:m.datatype.boolean()}},conditions:{location:{isEnabled:m.datatype.boolean(),allowedIps:Array(m.helpers.rangeToNumber(5)).fill(0).map(()=>m.internet.ip()),countries:Array(m.helpers.rangeToNumber(2)).fill(0).map(()=>m.location.country())},timeRange:{isEnabled:m.datatype.boolean(),allowedAfter:m.helpers.maybe(()=>m.helpers.rangeToNumber(23).toString().padStart(2,"0")+"00")??null,allowedBefore:m.helpers.maybe(()=>m.helpers.rangeToNumber(23).toString().padStart(2,"0")+"00")??null}}}}initialize(){this.isInitialized||(this.isInitialized=!0,this.employeeData.getList().pipe(N(e=>e.length>0)).subscribe(e=>{this.list.next(e.map((o,l)=>this.createMock(o,l)))}))}getList(){return this.appRef.isStable.pipe(N(e=>e),$(1e3)).subscribe(()=>{this.initialize()}),this.list}save(e){this.list.next(this.list.value.map(o=>o.id==e.id?e:o))}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=C({token:t,factory:t.\u0275fac,providedIn:"root"});let r=t;return r})();var De=(()=>{let t=class t{constructor(){this.dataService=f(x),this.list=h(this.dataService.getList()),this.id=y(void 0),this.heading=_(()=>this.list()?.find(e=>e.id==this.id())?.userNumber??"--"),this.tabs=y([{label:"Overall",route:["overall"]},{label:"Raw",route:["raw"]}])}onParamsChange(e,o){this.id.set(e.id)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=C({token:t,factory:t.\u0275fac});let r=t;return r})();var V={type:"object",properties:{canCreate:{type:"boolean",description:"Can Create"},canRead:{type:"boolean",description:"Can Read"},canUpdate:{type:"boolean",description:"Can Update"},canDelete:{type:"boolean",description:"Can Delete"}}},Te=(()=>{let t=class t{constructor(){this.dataService=f(x),this.list=h(this.dataService.getList()),this.id=y(void 0),this.data=y(void 0),this.fieldConfiguration=y({type:"object",properties:{userNumber:{description:"User number",type:"string"},employeeId:{description:"Employee ID",type:"string"},isEnabled:{description:"Enabled",type:"boolean"},permissions:{description:"Permissions",type:"object",properties:{customer:v({description:"Customer"},V),employee:v({description:"Employee"},V),inventoryItem:v({description:"Inventory Item"},V)}},conditions:{description:"Conditions",type:"object",properties:{location:{description:"Location-Based",type:"object",properties:{isEnabled:{type:"boolean",description:"Enabled"},allowedIps:{type:"array",description:"Allowed IPs",items:{type:"string"}},countries:{type:"array",description:"Countries",items:{type:"string"}}}},timeRange:{description:"Time-Based",type:"object",properties:{isEnabled:{type:"boolean",description:"Enabled"},allowedAfter:{description:"Allowed After (HHmm)",type:"string"},allowedBefore:{description:"Allowed Before (HHmm)",type:"string"}}}}}}}),this.isDirty=y(!1),this.updatedValue=y(void 0),this.controlsConfig=_(()=>this.isDirty()?Ee:xe),k(()=>{this.data.set(structuredClone(this.list()?.find(e=>e.id==this.id())))},{allowSignalWrites:!0})}registerUpdateState(e){this.updateState=e}onStateChange(e){this.isDirty.update(o=>e.isDirty??o)}onValueChange(e){this.updatedValue.set(e)}onControlClick(e,o){switch(e){case"refresh":case"cancel":{this.data.set(structuredClone(this.list()?.find(l=>l.id==this.id()))),this.updateState({isDirty:!1});break}case"save":{let l=this.updatedValue();l&&(this.dataService.save(l),this.updateState({isDirty:!1}));break}}}onParamsChange(e,o){this.id.set(e.id)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=C({token:t,factory:t.\u0275fac});let r=t;return r})();var we=(()=>{let t=class t{constructor(){this.heading=y("Access Control Management"),this.tabs=y([])}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=C({token:t,factory:t.\u0275fac});let r=t;return r})();var Fe=r=>["/user","employee","detail",r],Le=(r,t,d)=>({"dark:text-red-400":r,"dark:text-orange-400":t,"dark:text-green-400":d}),Ne=(r,t,d,e)=>({"rounded-t-2":r,"rounded-t-none":t,"rounded-b-2":d,"rounded-b-none":e});function je(r,t){if(r&1&&(b(0,"div",46),i(1,"a",47)(2,"div",48)(3,"h2",49),c(4),n(),i(5,"p",50)(6,"span",51),c(7),n(),i(8,"span"),c(9," / "),n(),i(10,"span"),c(11),n()(),i(12,"p",52)(13,"i",53),c(14,"label_important"),n(),i(15,"span"),c(16),n()()()()),r&2){let d=t,e=Y();p(),u("hoverableEnabled",d!=null)("routerLink",d!=null?K(7,Fe,d.id):null),p(3),S(d.name),p(3),S(d.department),p(4),S(d.position),p(2),u("ngClass",Q(9,Le,d.status==e.employeeStatus.TERMINATED||d.status==e.employeeStatus.INACTIVE||d.status==e.employeeStatus.RETIRED,d.status==e.employeeStatus.ON_LEAVE||d.status==e.employeeStatus.PROBATION,d.status==e.employeeStatus.ACTIVE||d.status==e.employeeStatus.CONTRACT)),p(3),S(d.status)}}function Pe(r,t){if(r&1&&(i(0,"pui-input-field",40),b(1,"input",54),i(2,"button",55)(3,"i",56),c(4,"close"),n()()()),r&2){let d=t.$index,e=t.$index,o=t.$count;u("ngClass",L(2,Ne,e===0,e!==0,e===o-1,e!==o-1)),p(),u("formControlName",d)}}function Ue(r,t){r&1&&(i(0,"p",41),c(1,"All IP are allowed"),n())}function Be(r,t){if(r&1&&(i(0,"pui-input-field",40),b(1,"input",54),i(2,"button",55)(3,"i",56),c(4,"close"),n()()()),r&2){let d=t.$index,e=t.$index,o=t.$count;u("ngClass",L(2,Ne,e===0,e!==0,e===o-1,e!==o-1)),p(),u("formControlName",d)}}function Ve(r,t){r&1&&(i(0,"p",41),c(1,"All countries are allowed"),n())}var Re=(()=>{let t=class t{constructor(){this.dataService=f(x),this.employeeDataService=f(I),this.route=f(te),this.list=h(this.dataService.getList()),this.employeeList=h(this.employeeDataService.getList()),this.id=h(this.route.params.pipe(w(e=>e.id))),this.accessControl=_(()=>this.list()?.find(e=>e.id==this.id())),this.employee=_(()=>this.employeeList()?.find(e=>e.id==this.accessControl()?.employeeId)),this.employeeStatus=A,this.formGroup=f(E).nonNullable.group({isEnabled:[!1],customer:f(E).nonNullable.group({canCreate:[!1],canRead:[!1],canUpdate:[!1],canDelete:[!1]}),employee:f(E).nonNullable.group({canCreate:[!1],canRead:[!1],canUpdate:[!1],canDelete:[!1]}),inventoryItem:f(E).nonNullable.group({canCreate:[!1],canRead:[!1],canUpdate:[!1],canDelete:[!1]}),location:f(E).nonNullable.group({isEnabled:[!1],allowedIps:f(E).nonNullable.array([]),countries:f(E).nonNullable.array([])})}),k(()=>{let e=this.accessControl();e&&Z(()=>{j(this.formGroup.controls.location.controls.allowedIps,e.conditions.location.allowedIps.length),j(this.formGroup.controls.location.controls.countries,e.conditions.location.countries.length),this.formGroup.setValue({isEnabled:e.isEnabled,customer:{canCreate:e.permissions.customer.canCreate,canRead:e.permissions.customer.canRead,canUpdate:e.permissions.customer.canUpdate,canDelete:e.permissions.customer.canDelete},employee:{canCreate:e.permissions.employee.canCreate,canRead:e.permissions.employee.canRead,canUpdate:e.permissions.employee.canUpdate,canDelete:e.permissions.employee.canDelete},inventoryItem:{canCreate:e.permissions.inventoryItem.canCreate,canRead:e.permissions.inventoryItem.canRead,canUpdate:e.permissions.inventoryItem.canUpdate,canDelete:e.permissions.inventoryItem.canDelete},location:{isEnabled:e.conditions.location.isEnabled,allowedIps:e.conditions.location.allowedIps,countries:e.conditions.location.countries}})})},{allowSignalWrites:!0})}onToggleAll(e){let o=this.formGroup.getRawValue()[e];Object.values(o).every(a=>a==!0)?this.formGroup.get(e)?.setValue({canCreate:!1,canRead:!1,canUpdate:!1,canDelete:!1}):this.formGroup.get(e)?.setValue({canCreate:!0,canRead:!0,canUpdate:!0,canDelete:!0})}};t.\u0275fac=function(o){return new(o||t)},t.\u0275cmp=z({type:t,selectors:[["demo-access-control-overall"]],hostAttrs:[1,"contents"],standalone:!0,features:[J],decls:108,vars:20,consts:[[1,"@container","grow"],[1,"pui-card","rounded-4","p-8"],[1,"flex","flex-col","@screen-lg:flex-row","gap-8"],[1,"flex","flex-col","gap-4","@screen-lg:basis-1/4","@screen-lg:sticky","top-8","h-fit"],[1,"flex","flex-row","items-center","gap-2"],[1,"icon-6","font-variation-weight-light","text-neutral-800","dark:text-neutral-200"],[1,"flex","flex-col","gap-1"],[1,"text-sm","text-neutral-800","dark:text-neutral-200"],[1,"text-base"],[1,"flex","flex-col","gap-8","@screen-lg:basis-3/4",3,"formGroup"],[1,"flex","flex-row","items-center","gap-4"],["formControlName","isEnabled",3,"id"],["for","isEnabled",1,"flex","flex-col","gap-1","grow"],[1,"text-base","font-medium"],[1,"text-neutral-700","dark:text-neutral-300","text-sm","font-light"],[1,"flex","flex-col","gap-2"],[1,"flex","flex-row","justify-end","items-center","px-6","gap-4"],["puiTooltip","Create",1,"px-5","py-2"],[1,"icon-6","font-variation-weight-light"],["puiTooltip","Read",1,"px-5","py-2"],["puiTooltip","Update",1,"px-5","py-2"],["puiTooltip","Delete",1,"px-5","py-2"],["puiHoverable","","tabindex","0",1,"relative","rounded-4","before:absolute","before:inset-0","before:pui-card--subtle","before:rounded-4","before:transparency-mask-to-r","before:-z-10","justify-start",3,"click"],["formGroupName","customer",1,"flex","flex-row","items-center","px-6","py-4","gap-4","grow"],[1,"spacer"],["formControlName","canCreate",3,"click","id"],["formControlName","canRead",3,"click","id"],["formControlName","canUpdate",3,"click","id"],["formControlName","canDelete",3,"click","id"],["formGroupName","employee",1,"flex","flex-row","items-center","px-6","py-4","gap-4","grow"],["formGroupName","inventoryItem",1,"flex","flex-row","items-center","px-6","py-4","gap-4","grow"],[1,"relative","rounded-4","before:absolute","before:inset-0","before:pui-card--subtle","before:rounded-4","before:transparency-mask-to-r","before:-z-10","justify-start"],["formGroupName","location",1,"flex","flex-col","px-6","py-4","gap-4","grow"],["formControlName","isEnabled",3,"click","id"],["for","locationIsEnabled",1,"flex","flex-col","gap-1","grow",3,"click"],[1,"grid","grid-cols-1","@screen-md:grid-cols-2","gap-4"],[1,"pui-card--subtle","rounded-4","p-4"],["formArrayName","allowedIps",1,"flex","flex-col","gap-4"],[1,"px-4"],[1,"flex","flex-col"],[1,"py-1","text-base",3,"ngClass"],[1,"text-sm","text-neutral-700","dark:text-neutral-300","px-4"],[1,"self-end","px-1"],["puiBorderedButton","","color","primary",1,"rounded-full","p-2"],[1,"icon-5"],["formArrayName","countries",1,"flex","flex-col","gap-4"],[1,"flex-none","basis-2"],["puiHoverable","",1,"pui-card--subtle","rounded-4","p-8","overflow-hidden",3,"hoverableEnabled","routerLink"],[1,"flex","flex-col","items-center","gap-2"],[1,"w-full","text-center","break-anywhere","whitespace-normal"],[1,"text-sm","text-center"],[1,"text-neutral-700","dark:text-neutral-300"],[1,"text-base","text-center","flex","items-center","gap-1"],[1,"icon-4","font-variation-fill",3,"ngClass"],[3,"formControlName"],["puiBaseButton","",1,"rounded-full","p-2","me-2"],[1,"icon-4"]],template:function(o,l){if(o&1&&(i(0,"div",0)(1,"main",1)(2,"div",2)(3,"div",3)(4,"div",4)(5,"i",5),c(6,"key"),n(),i(7,"div",6)(8,"span",7),c(9,"User #"),n(),i(10,"span",8),c(11),n()()(),b(12,"pui-divider"),i(13,"div",4)(14,"i",5),c(15,"badge"),n(),i(16,"div",6)(17,"span",7),c(18,"Employee ID"),n(),i(19,"span",8),c(20),n()()(),W(21,je,17,13),n(),i(22,"form",9)(23,"div",10),b(24,"pui-toggle",11),i(25,"label",12)(26,"p",13),c(27,"Enable"),n(),i(28,"p",14),c(29,"Enable this account to login and access system resources"),n()()(),i(30,"div",15)(31,"div",16)(32,"div",17)(33,"i",18),c(34,"add"),n()(),i(35,"div",19)(36,"i",18),c(37,"visibility"),n()(),i(38,"div",20)(39,"i",18),c(40,"edit"),n()(),i(41,"div",21)(42,"i",18),c(43,"delete"),n()()(),i(44,"div",22),g("click",function(){return l.onToggleAll("customer")}),i(45,"div",23)(46,"h3"),c(47,"Customer"),n(),b(48,"div",24),i(49,"pui-toggle",25),g("click",function(s){return s.stopPropagation()}),n(),i(50,"pui-toggle",26),g("click",function(s){return s.stopPropagation()}),n(),i(51,"pui-toggle",27),g("click",function(s){return s.stopPropagation()}),n(),i(52,"pui-toggle",28),g("click",function(s){return s.stopPropagation()}),n()()(),i(53,"div",22),g("click",function(){return l.onToggleAll("employee")}),i(54,"div",29)(55,"h3"),c(56,"Employee"),n(),b(57,"div",24),i(58,"pui-toggle",25),g("click",function(s){return s.stopPropagation()}),n(),i(59,"pui-toggle",26),g("click",function(s){return s.stopPropagation()}),n(),i(60,"pui-toggle",27),g("click",function(s){return s.stopPropagation()}),n(),i(61,"pui-toggle",28),g("click",function(s){return s.stopPropagation()}),n()()(),i(62,"div",22),g("click",function(){return l.onToggleAll("inventoryItem")}),i(63,"div",30)(64,"h3"),c(65,"Inventory Item"),n(),b(66,"div",24),i(67,"pui-toggle",25),g("click",function(s){return s.stopPropagation()}),n(),i(68,"pui-toggle",26),g("click",function(s){return s.stopPropagation()}),n(),i(69,"pui-toggle",27),g("click",function(s){return s.stopPropagation()}),n(),i(70,"pui-toggle",28),g("click",function(s){return s.stopPropagation()}),n()()()(),b(71,"pui-divider"),i(72,"h2"),c(73,"Conditions"),n(),i(74,"div",31)(75,"div",32)(76,"div",10)(77,"pui-toggle",33),g("click",function(s){return s.stopPropagation()}),n(),i(78,"label",34),g("click",function(s){return s.stopPropagation()}),i(79,"h3"),c(80,"Location based permission conditions"),n(),i(81,"p",14),c(82,"Blocks access according to location related metadata"),n()()(),i(83,"div",35)(84,"div",36)(85,"div",37)(86,"h3",38),c(87,"Allowed IP Address"),n(),i(88,"div",39),O(89,Pe,5,7,"pui-input-field",40,R,!1,Ue,2,0,"p",41),n(),i(92,"div",42)(93,"button",43)(94,"i",44),c(95,"add"),n()()()()(),i(96,"div",36)(97,"div",45)(98,"h3",38),c(99,"Country"),n(),i(100,"div",39),O(101,Be,5,7,"pui-input-field",40,R,!1,Ve,2,0,"p",41),n(),i(104,"div",42)(105,"button",43)(106,"i",44),c(107,"add"),n()()()()()()()()()()()()),o&2){let a,s,G;p(11),S((a=(a=l.accessControl())==null?null:a.userNumber)!==null&&a!==void 0?a:"----"),p(9),S((s=(s=l.accessControl())==null?null:s.employeeId)!==null&&s!==void 0?s:"----"),p(),q((G=l.employee())?21:-1,G),p(),u("formGroup",l.formGroup),p(2),u("id","isEnabled"),p(25),u("id","customerCanCreate"),p(),u("id","customerCanRead"),p(),u("id","customerCanUpdate"),p(),u("id","customerCanDelete"),p(6),u("id","employeeCanCreate"),p(),u("id","employeeCanRead"),p(),u("id","employeeCanUpdate"),p(),u("id","employeeCanDelete"),p(6),u("id","inventoryItemCanCreate"),p(),u("id","inventoryItemCanRead"),p(),u("id","inventoryItemCanUpdate"),p(),u("id","inventoryItemCanDelete"),p(7),u("id","locationIsEnabled"),p(12),F(l.formGroup.controls.location.controls.allowedIps.controls),p(12),F(l.formGroup.controls.location.controls.countries.controls)}},dependencies:[be,ee,ue,ie,_e,de,ae,ne,oe,re,me,le,pe,se,ce,ve,ge,fe,ye,Ce,he]});let r=t;return r})();var Oe=(()=>{let t=class t{constructor(){this.dataService=f(x),this.employeeDataService=f(I),this.rawData=h(this.dataService.getList()),this.employeeList=h(this.employeeDataService.getList()),this.configuration={useVirtualScroll:!0},this.data=y([]),this.columnsConfig=y([{key:"userNumber",label:"#",isSortedAsc:!0},{key:"employeeName",label:"Employee",path:"employee.name"},{key:"isEnabled",label:"Enabled",fieldConfiguration:{type:"boolean"}}]),this.columnsToDisplay=y(["userNumber","employeeName","isEnabled"]),this.filterConfig=y({type:"object",properties:{isEnabled:{description:"Enabled",type:"boolean"}}}),this.filterValue=y({isEnabled:!0}),this.controlsConfig=y([{id:"refresh",icon:"refresh",label:"Refresh",mode:"low-emphasis"}]),this.sortFn=_(()=>{let e=this.columnsConfig().find(l=>l.isSortedAsc||l.isSortedDesc);if(!e)return()=>0;let o=e.isSortedDesc?-1:1;return(l,a)=>{switch(e.key){case"employeeName":return l.employee?.name>a.employee?.name?o:l.employee?.name<a.employee?.name?-1*o:0;default:return l[e.key]>a[e.key]?o:l[e.key]<a[e.key]?-1*o:0}}}),this.filterFn=_(()=>{let e=this.filterValue(),o=Object.values(e??{}).some(l=>typeof l=="string"?!!l:l!=null);return l=>!(o&&e.isEnabled!=null&&e.isEnabled!=l.isEnabled)}),k(()=>{let e=this.rawData(),o=this.employeeList();!e||!o||this.data.set(e.map(l=>T(v({},l),{employee:o.find(a=>a.id==l.employeeId)})).filter(this.filterFn()).sort(this.sortFn()))},{allowSignalWrites:!0})}routeToDetail(e){return["detail",e.id]}onHeaderCellClick(e,o){this.columnsConfig.update(l=>l.map(a=>a.key==e?T(v({},a),{isSortedAsc:!a.isSortedAsc&&!a.isSortedDesc?!0:!!a.isSortedDesc,isSortedDesc:!!a.isSortedAsc}):T(v({},a),{isSortedAsc:!1,isSortedDesc:!1})))}onFilterChange(e){this.filterValue.set(e)}};t.\u0275fac=function(o){return new(o||t)},t.\u0275prov=C({token:t,factory:t.\u0275fac});let r=t;return r})();var Ut=[{path:"",data:v({},P({title:"Access Control"})),children:[{path:"detail/:id",component:B,data:v({},P({deps:[x],titleFn:(r,t)=>r.params.pipe(H(d=>t.getList().pipe(w(e=>e.find(o=>o.id==d.id)?.userNumber??"--"))))})),providers:[{provide:U,useClass:De}],children:[{path:"overall",component:Re},{path:"raw",component:ke,providers:[{provide:Se,useClass:Te}]},{path:"**",redirectTo:"overall"}]},{path:"",component:B,providers:[{provide:U,useClass:we}],children:[{path:"",component:Ie,providers:[{provide:Ae,useClass:Oe}]}]}]}];export{Ut as ROUTES};
