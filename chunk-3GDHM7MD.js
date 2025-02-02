import{a as p}from"./chunk-XZ6YCZWA.js";import{c as g,d as I,e as D,g as T,k as w,m as A,n as E,o as L,p as h,q as f}from"./chunk-AYVR6FRK.js";import"./chunk-5KUQE4MU.js";import{I as l,ua as d}from"./chunk-OTGN347X.js";import{$ as o,Ab as v,Bb as C,Ca as r,Tb as S,db as y,fa as s,q as u,rc as n,uc as b}from"./chunk-I76RA5B3.js";import{a as m}from"./chunk-EQDQRRRY.js";var F=(()=>{class t{constructor(){this.dataService=s(p),this.list=l(this.dataService.getList()),this.id=r(void 0),this.heading=n(()=>{let e=this.list()?.find(i=>i.id==this.id())?.location;return e?`${e.aisle.toUpperCase()}${e.row} - ${e.layer}`:"--"}),this.tabs=r([{label:"Raw",route:["./"]}])}onParamsChange(e,i){this.id.set(e.id)}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275prov=o({token:t,factory:t.\u0275fac})}}return t})();var R=(()=>{class t{constructor(){this.dataService=s(p),this.list=l(this.dataService.getList()),this.id=r(void 0),this.data=r(void 0),this.fieldConfiguration=r({type:"object",properties:{location:{type:"object",description:"Shelf Location",properties:{aisle:{type:"string",description:"Aisle"},row:{type:"number",description:"Row"},layer:{type:"number",description:"Layer"}}},maxCapacity:{type:"number",description:"Maximum Capacity (grams)"},isAllowFragileItems:{type:"boolean",description:"Allows Fragile Items Inside"},dimensions:{type:"object",description:"Dimension",properties:{width:{type:"number",description:"Width (millimeters)"},depth:{type:"number",description:"Depth (millimeters)"},height:{type:"number",description:"Height (millimeters)"}}}}}),this.isDirty=r(!1),this.updatedValue=r(void 0),this.controlsConfig=n(()=>this.isDirty()?I:g),b(()=>{this.data.set(structuredClone(this.list()?.find(e=>e.id==this.id())))})}registerUpdateState(e){this.updateState=e}onStateChange(e){this.isDirty.update(i=>e.isDirty??i)}onValueChange(e){this.updatedValue.set(e)}onControlClick(e,i){switch(e){case"refresh":case"cancel":{this.data.set(structuredClone(this.list()?.find(a=>a.id==this.id()))),this.updateState({isDirty:!1});break}case"save":{let a=this.updatedValue();a&&(this.dataService.save(a),this.updateState({isDirty:!1}));break}}}onParamsChange(e,i){this.id.set(e.id)}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275prov=o({token:t,factory:t.\u0275fac})}}return t})();var j=(()=>{class t{constructor(){this.heading=r("Warehouse Shelves"),this.tabs=r([{label:"Map",route:["map"]},{label:"Data",route:["data"]}])}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275prov=o({token:t,factory:t.\u0275fac})}}return t})();var k=(()=>{class t{static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275cmp=y({type:t,selectors:[["demo-inventory-shelf-map"]],decls:2,vars:0,template:function(i,a){i&1&&(v(0,"p"),S(1,"inventory-shelf-map works!"),C())},encapsulation:2})}}return t})();var x=(()=>{class t{constructor(){this.dataService=s(p),this.rawData=l(this.dataService.getList()),this.configuration={useVirtualScroll:!0},this.data=n(()=>(this.rawData()??[]).toSorted(this.sortFn())),this.columnsConfig=r([{key:"aisle",path:"location.aisle",label:"Aisle"},{key:"row",path:"location.row",label:"Row"},{key:"layer",path:"location.layer",label:"Layer"},{key:"maxCapacity",label:"Maximum Capacity (g)",fieldConfiguration:{type:"number"}},{key:"isAllowFragileItems",label:"Allows Fragile",fieldConfiguration:{type:"boolean"}}]),this.columnsToDisplay=r(["aisle","row","layer","maxCapacity","isAllowFragileItems"]),this.controlsConfig=r([{id:"refresh",label:"Refresh",icon:"refresh",mode:"low-emphasis"}]),this.sortFn=n(()=>w(this.columnsConfig()))}onHeaderCellClick(e,i){this.columnsConfig.update(a=>L(a,e))}routeToDetail(e){return["../","detail",e.id]}static{this.\u0275fac=function(i){return new(i||t)}}static{this.\u0275prov=o({token:t,factory:t.\u0275fac})}}return t})();var ct=[{path:"",data:m({},d({title:"Shelf"})),children:[{path:"detail/:id",component:f,data:m({},d({titleFn:t=>t.params.pipe(u(O=>O.id))})),providers:[{provide:h,useClass:F}],children:[{path:"",component:T,providers:[{provide:D,useClass:R}]}]},{path:"",component:f,providers:[{provide:h,useClass:j}],children:[{path:"map",component:k},{path:"data",component:E,providers:[{provide:A,useClass:x}]},{path:"**",redirectTo:"map"}]}]}];export{ct as ROUTES};
