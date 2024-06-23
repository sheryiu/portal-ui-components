import{a as v}from"./chunk-IR3B7YQY.js";import{Ac as l,B as y,H as j,L as u,Sb as g,e as o,ec as I,f as w,g as s,h as d,ka as c,zb as S,zc as k}from"./chunk-JYSKNKNK.js";import{b as f}from"./chunk-6RDLFHTQ.js";import{a as m}from"./chunk-CWTPBX7D.js";var B=(()=>{let t=class t{constructor(){this.data=u(v),this.router=u(S),this.mainListFilter$$=c({}),this.mainListSort$$=c({armorSetId:"asc"}),this.create=e=>{if(e?.name==null||e?.name.en==null&&e?.name.jp==null)return s(()=>new Error("Name is required"));if(!e?.position)return s(()=>new Error("Position is required"));if(!e?.armorSetId)return s(()=>new Error("Armor Set ID is required"));let r=new Date;return o(this.data.armors.add(m({id:g(),createdAt:r,updatedAt:r},e)))},this.update=(e,r)=>o(this.data.armors.update(e,m({updatedAt:new Date},r))),this.remove=e=>o(this.data.armors.delete(e))}list(e,r){return o(f(()=>{if(this.data.isServer)return[];let n;if(e?.name!=null?n=this.data.armors.filter(a=>!!(a.name?.en?.toLowerCase()?.includes(e.name.toLowerCase())||a.name?.jp?.toLowerCase()?.includes(e.name.toLowerCase()))):e?.armorSetId!=null?n=this.data.armors.where("armorSetId").equals(e.armorSetId):n=this.data.armors.toCollection(),r&&Object.values(r).filter(a=>a=="asc"||a=="desc").length>0){let a=Object.entries(r).filter(([p,h])=>h=="asc"||h=="desc")[0][0];return r[a]==="desc"?n.reverse().sortBy(a):n.sortBy(a)}else return n.toArray()}))}count(){return this.data.isServer?w(0):o(this.data.armors.count())}getOne(e){return o(f(()=>{if(!this.data.isServer)return this.data.armors.get(e)}))}getSuggestions(e){return e.pipe(y(r=>this.list().pipe(d(n=>new I(n,{includeScore:!0,includeMatches:!0,keys:["name.jp","name.en"]}).search(r)))),d(r=>r.map(({item:n,score:a,matches:p})=>({title:L(n,p),category:"Armor",score:a,onClick:()=>this.router.navigate(["mhw","armor",n.id])}))))}};t.\u0275fac=function(r){return new(r||t)},t.\u0275prov=j({token:t,factory:t.\u0275fac,providedIn:"root"});let i=t;return i})();function L(i,t=[]){let C=t.some(r=>r.key==="name.jp")&&i.name?.jp?l(i.name.jp,t.find(r=>r.key==="name.jp")?.indices):void 0,e=t.some(r=>r.key==="name.en")&&i.name?.en?l(i.name.en,t.find(r=>r.key==="name.en")?.indices):void 0;return[C,e].filter(k).join(" / ")}export{B as a};