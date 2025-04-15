import{b as L}from"./chunk-ULV7EL5F.js";import{c as T,d as y,e as D,g as b,h as E,j as v,k as A,l as g,m as S,n as I,o as k,p as l,q as d}from"./chunk-3A2BC3ZT.js";import"./chunk-5KUQE4MU.js";import{Ba as n,N as m,fa as C}from"./chunk-UIJII52E.js";import{$ as o,Da as i,fa as f,q as u,uc as a}from"./chunk-O5WS6LKQ.js";import{a as s}from"./chunk-EQDQRRRY.js";var c=(()=>{class e{constructor(){this.id=i(void 0),this.heading=a(()=>this.id()??"--"),this.tabs=i([{label:"Raw",route:["raw"]}]),this.routeToFullContent=a(()=>["../","media",{outlets:{primary:["detail",this.id()],peek:null}}])}onParamsChange(t,r){this.id.set(t.id)}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=o({token:e,factory:e.\u0275fac})}}return e})();var F=(()=>{class e{constructor(){this.id=i(void 0),this.isDirty=i(!1),this.updatedValue=i(void 0),this.data=i(void 0),this.fieldConfiguration=i({type:"object",properties:{}}),this.controlsConfig=a(()=>this.isDirty()?y:T)}registerUpdateState(t){this.updateState=t}onStateChange(t){this.isDirty.update(r=>t.isDirty??r)}onValueChange(t){this.updatedValue.set(t)}onControlClick(t,r){switch(t){case"refresh":break;case"cancel":{this.updateState({isDirty:!1});break}case"save":{this.updateState({isDirty:!1});break}}}onParamsChange(t,r){this.id.set(t.id)}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=o({token:e,factory:e.\u0275fac})}}return e})();var O=(()=>{class e{constructor(){this.heading=i("Media"),this.tabs=i([{label:"Files",route:["file"]},{label:"Raw",route:["raw"]},{label:"Local",route:["local"],hidden:!0}])}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=o({token:e,factory:e.\u0275fac})}}return e})();var w=(()=>{class e{constructor(){this.dataService=f(L),this.screenWidth=f(C),this.rawData=m(this.dataService.getList()),this.configuration={id:"media-table",useVirtualScroll:!0},this.data=a(()=>(this.rawData()??[]).toSorted(this.sortFn()).filter(this.filterFn())),this.columnsConfig=i([{key:"filename",label:"Filename"},{key:"sizeBytes",label:"Size (Bytes)"},{key:"type",label:"Type"},{key:"createdAt",label:"Created At",fieldConfiguration:{type:"date-time"}},{key:"lastModifiedAt",label:"Last Modified At",fieldConfiguration:{type:"date-time"}}]),this.columnsToDisplay=i({default:["filename","sizeBytes"],768:["filename","sizeBytes","createdAt"],1280:["filename","sizeBytes","type","createdAt","lastModifiedAt"]}),this.controlsConfig=i(g),this.filterConfig=i({type:"object",properties:{}}),this.filterValue=i({}),this.sortFn=a(()=>A(this.columnsConfig())),this.filterFn=a(()=>v(this.filterValue(),{}))}routeToDetail(t){return this.screenWidth.above().sm()?["../../","media",{outlets:{peek:[t.id]}}]:["../","detail",t.id]}onHeaderCellClick(t,r){this.columnsConfig.update(N=>k(N,t))}onFilterChange(t){this.filterValue.set(t)}onControlClick(t,r){switch(t){case"add":break;case"refresh":break}}static{this.\u0275fac=function(r){return new(r||e)}}static{this.\u0275prov=o({token:e,factory:e.\u0275fac})}}return e})();var R=[{path:"raw",component:b,providers:[{provide:D,useClass:F}]},{path:"**",redirectTo:"raw"}],ae=[{path:"",data:s({},n({title:"Media"})),children:[{path:"detail/:id",component:d,data:s({},n({titleFn:e=>e.params.pipe(u(p=>p.id))})),providers:[{provide:l,useClass:c}],children:R},{path:"",component:d,providers:[{provide:l,useClass:O},{provide:E,useClass:c}],children:[{path:":id",outlet:"peek",component:d,data:s({},n({titleFn:e=>e.params.pipe(u(p=>p.id))})),providers:[{provide:l,useClass:c}],children:R},{path:"file",children:[{path:":folderId",loadComponent:()=>import("./chunk-GURSYZXB.js").then(e=>e.MediaManagerComponent)},{path:"**",redirectTo:"null"}]},{path:"raw",component:I,providers:[{provide:S,useClass:w}]},{path:"**",redirectTo:"file"}]}]}];export{ae as ROUTES};
