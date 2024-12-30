import{a as dt,b as mt}from"./chunk-IRUCGYAE.js";import"./chunk-JCB2IDA7.js";import"./chunk-A7X6ERW6.js";import{$ as A,B as v,C as w,I as U,L as p,Na as it,P as X,Pa as st,Q as u,Qa as at,Rb as lt,S as Z,T as Y,U as g,V as _,W as m,X as d,Y as z,Ya as R,_ as T,a as J,b as K,ba as f,ca as D,da as j,ga as C,i as B,ia as tt,ja as I,ma as et,mb as ct,na as x,nb as pt,oa as h,pa as nt,ta as O,xa as ot,ya as F,za as rt}from"./chunk-Q665FWTK.js";var Ct=Math.pow(10,8)*24*60*60*1e3,qt=-Ct;var It=3600;var ut=It*24,Qt=ut*7,Ot=ut*365.2425,Ft=Ot/12,Vt=Ft*3,P=Symbol.for("constructDateFrom");function l(e,t){return typeof e=="function"?e(t):e&&typeof e=="object"&&P in e?e[P](t):e instanceof Date?new e.constructor(t):new Date(t)}function a(e,t){return l(t||e,e)}function E(e,t,n){let o=a(e,n?.in);return isNaN(t)?l(n?.in||e,NaN):(t&&o.setDate(o.getDate()+t),o)}function W(e,t,n){let o=a(e,n?.in);if(isNaN(t))return l(n?.in||e,NaN);if(!t)return o;let r=o.getDate(),i=l(n?.in||e,o.getTime());i.setMonth(o.getMonth()+t+1,0);let s=i.getDate();return r>=s?i:(o.setFullYear(i.getFullYear(),i.getMonth(),r),o)}function ft(e,t,n){let{years:o=0,months:r=0,weeks:i=0,days:s=0,hours:c=0,minutes:y=0,seconds:L=0}=t,k=a(e,n?.in),S=r||o?W(k,r+o*12):k,$=s||i?E(S,s+i*7):S,V=y+c*60,Tt=(L+V*60)*1e3;return l(n?.in||e,+$+Tt)}function xt(e,t){let n=a(e,t?.in).getDay();return n===0||n===6}var Et={};function N(){return Et}function ht(e,t){let n=N(),o=t?.weekStartsOn??t?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,r=a(e,t?.in),i=r.getDay(),s=(i<o?7:0)+i-o;return r.setDate(r.getDate()-s),r.setHours(0,0,0,0),r}function H(e,...t){let n=l.bind(null,e||t.find(o=>typeof o=="object"));return t.map(n)}function q(e,t){let n=a(e,t?.in);return n.setHours(0,0,0,0),n}function Q(e,t,n){let[o,r]=H(n?.in,e,t);return+q(o)==+q(r)}function yt(e,t){let n=a(e,t?.in),o=n.getMonth();return n.setFullYear(n.getFullYear(),o+1,0),n.setHours(23,59,59,999),n}function Dt(e,t){let[n,o]=H(e,t.start,t.end);return{start:n,end:o}}function vt(e,t){let{start:n,end:o}=Dt(t?.in,e),r=+n>+o,i=r?+n:+o,s=r?o:n;s.setHours(0,0,0,0);let c=t?.step??1;if(!c)return[];c<0&&(c=-c,r=!r);let y=[];for(;+s<=i;)y.push(l(n,s)),s.setDate(s.getDate()+c),s.setHours(0,0,0,0);return r?y.reverse():y}function gt(e,t){let n=a(e,t?.in);return n.setDate(1),n.setHours(0,0,0,0),n}function _t(e,t){let n=N(),o=t?.weekStartsOn??t?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,r=a(e,t?.in),i=r.getDay(),s=(i<o?-7:0)+6-(i-o);return r.setDate(r.getDate()+s),r.setHours(23,59,59,999),r}function Mt(e,t){return a(e,t?.in).getDate()}function M(e,t){return a(e,t?.in).getMonth()}function b(e,t){return a(e,t?.in).getFullYear()}function bt(e,t,n){return E(e,-t,n)}function kt(e,t,n){return W(e,-t,n)}function St(e,t,n){let{years:o=0,months:r=0,weeks:i=0,days:s=0,hours:c=0,minutes:y=0,seconds:L=0}=t,k=kt(e,r+o*12,n),S=bt(k,s+i*7,n),$=y+c*60,G=(L+$*60)*1e3;return l(n?.in||e,+S-G)}var Nt=(e,t)=>t.id,Ht=e=>["../../","detail",e];function Lt(e,t){if(e&1&&(m(0,"a",1)(1,"span",2),f(2),x(3,"date"),d(),m(4,"span",3),f(5),d()()),e&2){let n=t.$implicit;u("routerLink",tt(6,Ht,n.id)),p(2),D(h(3,3,n.startsFrom,"HH:mm")),p(3),D(n.label)}}var wt=(()=>{let t=class t{constructor(){this.events=U.required()}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=w({type:t,selectors:[["demo-calendar-events"]],hostAttrs:[1,"contents"],inputs:{events:[1,"events"]},standalone:!0,features:[C],decls:3,vars:0,consts:[[1,"flex","flex-col","gap-0.5","py-1","overflow-hidden","w-full"],["type","button","puiBaseButton","",1,"justify-start","text-start","text-sm","ps-1","pe-2","py-0.5","gap-1",3,"routerLink"],[1,"tabular-nums","dark:text-neutral-400","font-medium"],[1,"truncate"]],template:function(r,i){r&1&&(m(0,"div",0),g(1,Lt,6,8,"a",1,Nt),d()),r&2&&(p(),_(i.events()))},dependencies:[pt,F,at]});let e=t;return e})();var $t=(e,t)=>({"grid-rows-[min-content_repeat(6,1fr)]":e,"grid-rows-[min-content_repeat(5,1fr)]":t}),Bt=(e,t)=>({"border-r":e,"dark:text-red-400":t}),Yt=(e,t)=>({"border-b":e,"border-r":t}),zt=(e,t,n,o,r)=>({"dark:text-neutral-400":e,"font-black opacity-20":t,"font-medium opacity-10":n,"dark:text-primary-50 before:rounded-full before:-top-2 before:-bottom-2 before:-left-6 before:-right-6 before:absolute before:-z-10 before:bg-primary-700":o,"dark:text-red-400":r});function At(e,t){if(e&1&&(m(0,"div",5),f(1),x(2,"date"),d()),e&2){let n=t.$implicit,o=t.$index,r=t.$count;u("ngClass",I(5,Bt,o!==r-1,n.isWeekend)),p(),D(h(2,2,n.date,"EE"))}}function jt(e,t){if(e&1&&(m(0,"span",12),f(1),x(2,"date"),d(),z(3,"br"),f(4),x(5,"date")),e&2){let n=A().$implicit;p(),D(h(2,2,n.date,"MMM")),p(3),j("",h(5,5,n.date,"dd")," ")}}function Rt(e,t){if(e&1&&(f(0),x(1,"date")),e&2){let n=A().$implicit;j(" ",h(1,1,n.date,"dd")," ")}}function Pt(e,t){if(e&1&&(m(0,"div",6)(1,"span",10),X(2,jt,6,8)(3,Rt,2,4),d(),z(4,"demo-calendar-events",11),d()),e&2){let n=t.$implicit,o=t.$index,r=t.$count;u("ngClass",I(4,Yt,o<r-7,o%7!=6)),p(),u("ngClass",et(7,zt,(n.isLastMonth||n.isNextMonth)&&!n.isToday,!n.isLastMonth&&!n.isNextMonth,n.isLastMonth||n.isNextMonth,n.isToday,n.isWeekend)),p(),Z(n.isStartOfMonth?2:3),p(2),u("events",n.events)}}var un=(()=>{let t=class t{constructor(){this.route=v(it),this.router=v(st),this.timestamp=R(this.route.params.pipe(B(o=>o.timestamp),B(o=>Number(o)))),this.dataService=v(dt),this.rawData=R(this.dataService.getList()),this.listService=v(mt),this.selectedTime=O(()=>{let o=this.timestamp();return o!=null&&o!=-1?new Date(o):o==-1?new Date(this.listService.storedSelectedTime):new Date}),this.daysVisible=O(()=>{let o=this.selectedTime();if(o==null)return[];let r=new Date,i=ht(gt(o),{weekStartsOn:0}),s=_t(yt(o),{weekStartsOn:0});return vt({start:i,end:s}).map(c=>({date:c,isLastMonth:M(c)<M(o)?!0:b(c)<b(c),isNextMonth:M(c)>M(o)?!0:b(c)>b(c),isStartOfMonth:Mt(c)==1,isToday:Q(c,r),isWeekend:xt(c)}))}),this.daysWithData=O(()=>{let o=this.daysVisible(),r=this.rawData()??[];return o.map(i=>K(J({},i),{events:r.filter(s=>Q(s.startsFrom,i.date)).sort((s,c)=>s.startsFrom.getTime()-c.startsFrom.getTime())}))})}onNextMonthClick(){let o=this.selectedTime(),r=ft(o,{months:1});this.listService.updateSelectedTime(r),this.router.navigate(["../",r.getTime()],{relativeTo:this.route})}onLastMonthClick(){let o=this.selectedTime(),r=St(o,{months:1});this.listService.updateSelectedTime(r),this.router.navigate(["../",r.getTime()],{relativeTo:this.route})}onTodayClick(){let o=new Date;this.listService.updateSelectedTime(o),this.router.navigate(["../",o.getTime()],{relativeTo:this.route})}};t.\u0275fac=function(r){return new(r||t)},t.\u0275cmp=w({type:t,selectors:[["demo-employee-calendar-monthly"]],hostAttrs:[1,"contents"],standalone:!0,features:[C],decls:15,vars:15,consts:[[1,"@container","grow","flex","flex-col"],[1,"pui-card","rounded-4","h-full","grow","overflow-hidden","flex","flex-col"],[1,"rounded-t-4","px-8","pt-6","pb-12","bg-gradient-to-br","from-primary-800/20","to-primary-900/20"],[1,"text-xl","font-display"],[1,"grow","-mt-6","bg-neutral-800","rounded-t-4","border-t","grid","grid-cols-7",3,"ngClass"],[1,"text-center","pt-2","pb-1","uppercase","font-bold","text-base/none",3,"ngClass"],["puiHoverable","",1,"flex","flex-col","items-center","justify-start","gap-1.5","relative",3,"ngClass"],["id","lastMonth","label","Last month","mode","low-emphasis","icon","arrow_back",3,"click","weight"],["id","today","label","Today","mode","auto","icon","today",3,"click","weight"],["id","nextMonth","label","Next month","mode","low-emphasis","icon","arrow_forward",3,"click","weight"],[1,"mt-2","text-[36px]/none","@screen-md:text-[48px]/none","@screen-xl:text-[64px]/none","@screen-2xl:text-[78px]/none","text-end","absolute","z-0","-bottom-2","-right-1","whitespace-nowrap","font-display","pointer-events-none","select-none",3,"ngClass"],[3,"events"],[1,"text-[24px]/none","@screen-md:text-[32px]/none","@screen-xl:text-[40px]/none","@screen-2xl:text-[54px]/none"]],template:function(r,i){r&1&&(m(0,"div",0)(1,"main",1)(2,"div",2)(3,"span",3),f(4),x(5,"date"),d()(),m(6,"div",4),g(7,At,3,8,"div",5,Y),x(9,"slice"),g(10,Pt,5,13,"div",6,Y),d()()(),m(12,"pui-layout-control",7),T("click",function(){return i.onLastMonthClick()}),d(),m(13,"pui-layout-control",8),T("click",function(){return i.onTodayClick()}),d(),m(14,"pui-layout-control",9),T("click",function(){return i.onNextMonthClick()}),d()),r&2&&(p(4),D(h(5,5,i.selectedTime(),"MMMM yyyy")),p(2),u("ngClass",I(12,$t,i.daysWithData().length>35,i.daysWithData().length<=35)),p(),_(nt(9,8,i.daysWithData(),0,7)),p(3),_(i.daysWithData()),p(2),u("weight",-100),p(),u("weight",0),p(),u("weight",100))},dependencies:[lt,ct,F,ot,wt,rt]});let e=t;return e})();export{un as EmployeeCalendarMonthlyComponent};
