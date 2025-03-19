import{a as u,b as f}from"./chunk-5JRRX2Z6.js";import{a as V}from"./chunk-X342CILX.js";import{e as _}from"./chunk-UR6FENV6.js";import{c as T,e as E,g as I,h as A,j as k,k as w,l as O,m as F,n as j,o as R,p as d,q as h}from"./chunk-NDYGOW5E.js";import"./chunk-5KUQE4MU.js";import{J as v,M as m,ea as L,za as l}from"./chunk-QOLXBZPV.js";import{$ as o,Da as r,fa as a,q as S,uc as n,xc as b}from"./chunk-O5WS6LKQ.js";import{a as c}from"./chunk-EQDQRRRY.js";var y=(()=>{class t{constructor(){this.id=r(void 0),this.heading=n(()=>this.id()??"--"),this.tabs=r([{label:"Raw",route:["raw"]}]),this.routeToFullContent=n(()=>["../","system-log",{outlets:{primary:["detail",this.id()],peek:null}}])}onParamsChange(e,i){this.id.set(e.id)}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275prov=o({token:t,factory:t.\u0275fac})}}return t})();var N=(()=>{class t{constructor(){this.dataService=a(f),this.id=r(void 0),this.rawData=m(this.dataService.getList()),this.isDirty=r(!1),this.updatedValue=r(void 0),this.data=r(void 0),this.fieldConfiguration=r({type:"object",properties:{timestamp:{type:"date-time",description:"Timestamp"},message:{type:"string",description:"Message"},level:{type:"string",description:"Level",enum:Object.values(u)},context:{type:"string",description:"Context"},customerId:{type:"string",description:"Customer ID"},employeeId:{type:"string",description:"Employee ID"},ipAddress:{type:"string",description:"IP Address"},detail:{type:"string",description:"Detail"}}}),this.controlsConfig=r(T),b(()=>{this.data.set(v(this.rawData()?.find(e=>e.id==this.id())))})}registerUpdateState(e){this.updateState=e}onStateChange(e){this.isDirty.update(i=>e.isDirty??i)}onValueChange(e){this.updatedValue.set(e)}onControlClick(e,i){switch(e){case"refresh":{this.data.set(v(this.rawData()?.find(s=>s.id==this.id())));break}}}onParamsChange(e,i){this.id.set(e.id)}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275prov=o({token:t,factory:t.\u0275fac})}}return t})();var P=(()=>{class t{constructor(){this.heading=r("System Log"),this.tabs=r([{label:"Dashboard",route:["dashboard"]},{label:"Raw",route:["raw"]}])}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275prov=o({token:t,factory:t.\u0275fac})}}return t})();var x=(()=>{class t{constructor(){this.screenWidth=a(L),this.dataService=a(f),this.rawData=m(this.dataService.getList()),this.customerDataService=a(V),this.customerData=m(this.customerDataService.getList()),this.employeeDataService=a(_),this.employeeData=m(this.employeeDataService.getList()),this.configuration={id:"system-log-table",useVirtualScroll:!0},this.data=n(()=>{let e=this.rawData()??[],i=this.customerData()??[],s=this.employeeData()??[];return e.toSorted(this.sortFn()).filter(this.filterFn()).map(p=>Object.assign(p,{user:p.customerId?i.find(D=>D.id==p.customerId):p.employeeId?s.find(D=>D.id==p.employeeId):null}))}),this.columnsConfig=r([{key:"timestamp",label:"Timestamp",fieldConfiguration:{type:"date-time",format:"yyyy-MM-dd HH:mm:ss.SSS"},isSortedDesc:!0},{key:"level",label:"Level"},{key:"message",label:"Message"},{key:"user",path:"user.name",label:"User"}]),this.columnsToDisplay=r({default:["timestamp","level","message"],1280:["timestamp","level","message","user"]}),this.controlsConfig=r(O),this.filterConfig=r({type:"object",properties:{id:{type:"string",description:"ID"},level:{type:"string",description:"Level",enum:Object.values(u)},message:{type:"string",description:"Message"},after:{type:"date-time",description:"After"}}}),this.filterValue=r({}),this.sortFn=n(()=>w(this.columnsConfig())),this.filterFn=n(()=>k(this.filterValue(),{id:(e,i,s)=>!!s&&e.id==s,message:(e,i,s)=>!!s&&e.message.includes(s),level:(e,i,s)=>!!s&&e.level==s,after:(e,i,s)=>!!s&&e.timestamp>s}))}routeToDetail(e){return this.screenWidth.above().sm()?["../../","system-log",{outlets:{peek:[e.id]}}]:["../","detail",e.id]}onHeaderCellClick(e,i){this.columnsConfig.update(s=>R(s,e))}onFilterChange(e){this.filterValue.set(e)}onControlClick(e,i){switch(e){case"add":break;case"refresh":break}}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275prov=o({token:t,factory:t.\u0275fac})}}return t})();var M=[{path:"raw",component:I,providers:[{provide:E,useClass:N}]},{path:"**",redirectTo:"raw"}],ge=[{path:"",data:c({},l({title:"System Log"})),children:[{path:"detail/:id",component:h,data:c({},l({titleFn:t=>t.params.pipe(S(g=>g.id))})),providers:[{provide:d,useClass:y}],children:M},{path:"",component:h,providers:[{provide:d,useClass:P},{provide:A,useClass:y}],children:[{path:":id",outlet:"peek",component:h,data:c({},l({titleFn:t=>t.params.pipe(S(g=>g.id))})),providers:[{provide:d,useClass:y}],children:M},{path:"dashboard",loadComponent:()=>import("./chunk-A2USVFXE.js").then(t=>t.SystemLogDashboardComponent)},{path:"raw",component:j,providers:[{provide:F,useClass:x}]},{path:"**",redirectTo:"dashboard"}]}]}];export{ge as ROUTES};
