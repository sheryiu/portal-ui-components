import{a as L}from"./chunk-55AHLOIA.js";import{B as k,H as y,L as u,Sb as v,dc as w,e as a,f as h,h as d,ka as c,uc as g,vc as m,zb as j}from"./chunk-JQB2524T.js";import{b as f}from"./chunk-6RDLFHTQ.js";import{a as l}from"./chunk-CWTPBX7D.js";var M=(()=>{let i=class i{constructor(){this.data=u(L),this.router=u(j),this.mainListFilter$$=c({}),this.mainListSort$$=c({name:"desc"}),this.create=t=>{let e=new Date;return a(this.data.skills.add(l({id:v(),createdAt:e,updatedAt:e},t)))},this.update=(t,e)=>a(this.data.skills.update(t,l({updatedAt:new Date},e))),this.remove=t=>a(this.data.skills.delete(t)),this.addLevel=(t,e)=>a(this.data.skills.where("id").equals(t).modify(r=>{r.levels??=[],r.levels.push(e)}))}list(t,e){return a(f(()=>{if(this.data.isServer)return[];let r;if(t?.name!=null){let n=t.name.toLowerCase();r=this.data.skills.filter(o=>!!(o.name?.en?.toLowerCase().includes(n)||o.name?.jp?.toLowerCase().includes(n)))}else r=this.data.skills.toCollection();if(e&&Object.values(e).filter(n=>n=="asc"||n=="desc").length>0){let n=Object.entries(e).filter(([o,p])=>p=="asc"||p=="desc")[0][0];return e[n]==="desc"?r.reverse().sortBy(n):r.sortBy(n)}else return r.toArray()}))}count(){return this.data.isServer?h(0):a(this.data.skills.count())}getOne(t){return a(f(()=>{if(!this.data.isServer)return this.data.skills.get(t)}))}getSuggestions(t){return t.pipe(k(e=>this.list().pipe(d(r=>new w(r,{includeScore:!0,includeMatches:!0,keys:["name.jp","name.en"]}).search(e)))),d(e=>e.map(({item:r,score:n,matches:o})=>({title:C(r,o),category:"Skill",score:n,onClick:()=>this.router.navigate(["mhw","skill",r.id])}))))}};i.\u0275fac=function(e){return new(e||i)},i.\u0275prov=y({token:i,factory:i.\u0275fac,providedIn:"root"});let s=i;return s})();function C(s,i=[]){let S=i.some(e=>e.key==="name.jp")&&s.name?.jp?m(s.name.jp,i.find(e=>e.key==="name.jp")?.indices):void 0,t=i.some(e=>e.key==="name.en")&&s.name?.en?m(s.name.en,i.find(e=>e.key==="name.en")?.indices):void 0;return[S,t].filter(g).join(" / ")}export{M as a};
