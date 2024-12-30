import{a as c,b as g,c as d,e as l}from"./chunk-JCB2IDA7.js";import{a as P}from"./chunk-A7X6ERW6.js";import{B as n,Mb as S,Nb as k,O as i,Ob as V,Pb as I,Qb as y,Sb as f,Ub as R,Vb as L,Wb as w,Xb as F,Ya as h,Yb as N,Zb as b,_b as E,a as u,b as D,i as A,ib as j,ta as p,tb as C,u as O,va as T,y as o}from"./chunk-Q665FWTK.js";var x=(()=>{let e=class e{constructor(){this.dataService=n(l),this.list=h(this.dataService.getList()),this.id=i(void 0),this.heading=p(()=>this.list()?.find(t=>t.id==this.id())?.name??"--"),this.tabs=i([])}onParamsChange(t,r){this.id.set(t.id)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=o({token:e,factory:e.\u0275fac});let a=e;return a})();var U=(()=>{let e=class e{constructor(){this.dataService=n(l),this.list=h(this.dataService.getList()),this.id=i(void 0),this.data=i(void 0),this.fieldConfiguration=i({type:"object",properties:{name:{type:"string",description:"Name"},email:{type:"string",description:"Email"},phone:{type:"string",description:"Phone"},department:{type:"string",description:"Department",enum:Object.values(c)},position:{type:"string",description:"Position",enum:Object.values(g)},dateOfJoining:{type:"date-time",description:"Date of Joining"},dateOfLeaving:{type:"date-time",description:"Date of Leaving"},status:{type:"string",description:"Status",enum:Object.values(d)}}}),this.isDirty=i(!1),this.updatedValue=i(void 0),this.controlsConfig=p(()=>this.isDirty()?I:V),T(()=>{this.data.set(structuredClone(this.list()?.find(t=>t.id==this.id())))},{allowSignalWrites:!0})}registerUpdateState(t){this.updateState=t}onStateChange(t){this.isDirty.update(r=>t.isDirty??r)}onValueChange(t){this.updatedValue.set(t)}onControlClick(t,r){switch(t){case"refresh":case"cancel":{this.data.set(structuredClone(this.list()?.find(s=>s.id==this.id()))),this.updateState({isDirty:!1});break}case"save":{let s=this.updatedValue();s&&(this.dataService.save(s),this.updateState({isDirty:!1}));break}}}onParamsChange(t,r){this.id.set(t.id)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=o({token:e,factory:e.\u0275fac});let a=e;return a})();var B=(()=>{let e=class e{constructor(){this.heading=i("Employees"),this.tabs=i([])}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=o({token:e,factory:e.\u0275fac});let a=e;return a})();var J=(()=>{let e=class e{constructor(){this.dataService=n(l),this.configuration={content:f},this.data=i(null),this.fieldConfiguration=i({type:"object",properties:{name:{type:"string",description:"Name"},email:{type:"string",description:"Email"},phone:{type:"string",description:"Phone"},department:{type:"string",description:"Department",enum:Object.values(c)},position:{type:"string",description:"Position",enum:Object.values(g)},dateOfJoining:{type:"date-time",description:"Date of Joining"},dateOfLeaving:{type:"date-time",description:"Date of Leaving"},status:{type:"string",description:"Status",enum:Object.values(d)}}}),this.controlsConfig=i([{id:"cancel",label:"Cancel",icon:"close",mode:"low-emphasis"},{id:"save",label:"Save",icon:"save"}]),this.updatedValue=i(void 0),this.heading=i("Add Employee")}registerUpdateState(t){this.updateState=t,this.updateState({isDirty:!0})}onValueChange(t){this.updatedValue.set(t)}onControlClick(t,r){switch(t){case"cancel":{this.data.set({}),this.overlayRef.close();break}case"save":{let s=this.updatedValue();s&&(s=Object.assign(s,{id:P.string.nanoid()}),this.dataService.add(s),this.overlayRef.close());break}}}onActionDrawerInit(t){this.overlayRef=t}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=o({token:e,factory:e.\u0275fac});let a=e;return a})();var Y=(()=>{let e=class e{constructor(){this.overlayData=n(j,{optional:!0}),this.configuration={content:f},this.heading=i("Filter Employee"),this.data=i(this.overlayData?.filter??{}),this.fieldConfiguration=i({type:"object",properties:{department:{type:"string",description:"Department",enum:[""].concat(Object.values(c))},status:{type:"string",description:"Status",enum:[""].concat(Object.values(d))}}}),this.controlsConfig=i([{id:"cancel",label:"Cancel",icon:"close"},{id:"apply",label:"Apply",icon:"filter_alt"}]),this.updatedValue=i(void 0)}onActionDrawerInit(t){this.overlayRef=t}registerUpdateState(t){this.updateState=t,this.updateState({isDirty:!0})}onValueChange(t){this.updatedValue.set(t)}onControlClick(t,r){switch(t){case"cancel":{this.overlayRef.close();break}case"apply":{let s=this.updatedValue();s&&(this.overlayData?.onFilterApply?.(s),this.overlayRef.close());break}}}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=o({token:e,factory:e.\u0275fac});let a=e;return a})();var _=(()=>{let e=class e{constructor(){this.dataService=n(l),this.actionDrawer=n(k),this.rawData=h(this.dataService.getList()),this.configuration={useVirtualScroll:!0},this.data=p(()=>(this.rawData()??[]).filter(this.filterFn()).toSorted(this.sortFn())),this.columnsConfig=i([{key:"name",label:"Name"},{key:"email",label:"Email"},{key:"phone",label:"Phone"},{key:"department",label:"Department"},{key:"position",label:"Position"},{key:"status",label:"Status"}]),this.columnsToDisplay=i(["name","email","phone","department","position","status"]),this.filterConfig=i({type:"object",properties:{department:{type:"string",description:"Department",enum:[""].concat(Object.values(c))},status:{type:"string",description:"Status",enum:[""].concat(Object.values(d))}}}),this.filterValue=i({}),this.controlsConfig=i([{id:"filter",label:"Advance Filters",icon:"filter_alt"},...w]),this.sortFn=p(()=>L(this.columnsConfig())),this.filterFn=p(()=>R(this.filterValue(),{department:(t,r,s)=>!!s&&t.department==s,status:(t,r,s)=>!!s&&t.status==s}))}routeToDetail(t){return["detail",t.id]}onHeaderCellClick(t,r){this.columnsConfig.update(s=>s.map(m=>m.key==t?D(u({},m),{isSortedAsc:!m.isSortedAsc&&!m.isSortedDesc?!0:!!m.isSortedDesc,isSortedDesc:!!m.isSortedAsc}):D(u({},m),{isSortedAsc:!1,isSortedDesc:!1})))}onFilterChange(t){this.filterValue.set(t)}onControlClick(t,r){switch(t){case"add":{this.actionDrawer.open(J,{providers:[{provide:y,useExisting:S}]});break}case"filter":{this.actionDrawer.open(Y,{overlayData:{filter:this.filterValue(),onFilterApply:s=>this.filterValue.set(s)},providers:[{provide:y,useExisting:S}]});break}}}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=o({token:e,factory:e.\u0275fac});let a=e;return a})();var Ft=[{path:"",data:u({},C({title:"Employee"})),children:[{path:"detail/:id",component:E,data:u({},C({deps:[l],titleFn:(a,e)=>a.params.pipe(O(q=>e.getList().pipe(A(t=>t.find(r=>r.id==q.id)?.name??"--"))))})),providers:[{provide:b,useClass:x}],children:[{path:"",component:f,providers:[{provide:y,useClass:U}]}]},{path:"",component:E,providers:[{provide:b,useClass:B}],children:[{path:"",component:N,providers:[{provide:F,useClass:_}]}]}]}];export{Ft as ROUTES};
