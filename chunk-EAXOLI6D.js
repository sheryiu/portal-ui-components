import{a as l}from"./chunk-DAPK3ECT.js";import"./chunk-CU6QVRXA.js";import{B as m,Ec as o,_c as a,h as i}from"./chunk-YDDNSWLY.js";import"./chunk-6RDLFHTQ.js";import{a as e}from"./chunk-CWTPBX7D.js";var A=[{path:"",loadComponent:()=>import("./chunk-ME3MPHIP.js").then(t=>t.ArmorListComponent),data:e(e({},o({title:"Armor"})),a("full")),children:[{path:":armorId",loadComponent:()=>import("./chunk-CL4YQC42.js").then(t=>t.ArmorDetailComponent),data:e(e({},o({deps:[l],titleFn:(t,n)=>t.paramMap.pipe(i(r=>r.get("armorId")),m(r=>n.getOne(r)),i(r=>Object.values(r?.name??{}).find(p=>p!=null)??"---"))})),a("half")),children:[{path:"edit",loadComponent:()=>import("./chunk-4J2ZHIJR.js").then(t=>t.ArmorDetailEditComponent),data:e(e({},o({title:"Edit"})),a("full"))},{path:"skill",data:e({},o({title:"Skill"})),loadChildren:()=>import("./chunk-ZM772APS.js").then(t=>t.SKILL_DETAIL_ROUTES)},{path:"armor-set",data:e({},o({title:"Armor Set"})),loadChildren:()=>import("./chunk-FEEDGQGF.js").then(t=>t.ARMOR_SET_ROUTES)}]}]}];export{A as ROUTES};