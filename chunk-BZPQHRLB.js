import{a as f}from"./chunk-ZQIFEHJN.js";import{e as d}from"./chunk-CO5I3WTS.js";import{a as e}from"./chunk-5KUQE4MU.js";import{A as o,Ba as u,b as p,g as m,p as c,q as n,x as h}from"./chunk-GUQJNJBT.js";var a=function(i){return i.INFO="Info",i.WARN="Warn",i.ERROR="Error",i.DEBUG="Debug",i}(a||{});var k=(()=>{let r=class r{constructor(){this.appRef=o(u),this.list=new p([]),this.employeeData=o(d),this.customerData=o(f),this.isInitialized=!1}createMock(t,s){return{id:e.string.nanoid(),timestamp:e.date.recent({days:20}),level:e.helpers.maybe(()=>e.helpers.arrayElement([a.DEBUG,a.INFO]),{probability:.8})??e.helpers.arrayElement([a.ERROR,a.WARN]),message:e.git.commitMessage(),context:e.helpers.arrayElement(["access-control","customer","employee-calendar-event","employee","inventory-item","inventory-shelf"]),employeeId:t?.id??null,customerId:s?.id??null,ipAddress:e.helpers.maybe(()=>e.internet.ip())??null,detail:""}}initialize(){this.isInitialized||(this.isInitialized=!0,m([this.employeeData.getList().pipe(n(t=>t.length>0)),this.customerData.getList().pipe(n(t=>t.length>0))]).subscribe(([t,s])=>{this.list.next(Array(500).fill(0).map((y,b)=>{let l=e.datatype.boolean(.7);return this.createMock(l?void 0:e.helpers.arrayElement(t),l?e.helpers.arrayElement(s):void 0)}))}))}getList(){return this.appRef.isStable.pipe(n(t=>t),c(1e3)).subscribe(()=>{this.initialize()}),this.list}};r.\u0275fac=function(s){return new(s||r)},r.\u0275prov=h({token:r,factory:r.\u0275fac,providedIn:"root"});let i=r;return i})();export{a,k as b};
