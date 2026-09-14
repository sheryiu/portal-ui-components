import {h as bE,ai as zc,W as WD,aj as Qc}from'./main-KVQ3QDFX.js';var a=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)};}static{this.\u0275cmp=bE({type:n,selectors:[["demo-home-content"]],decls:43,vars:0,consts:[[1,"pui-card","rounded-4","px-8","pt-4","pb-12"],[1,"flex","flex-col","gap-6","pt-6"],["href","https://angular.dev/guide/tailwind#automated-setup-with-ng-add",1,"underline","dark:text-primary-300"],[1,"border","rounded-4","overflow-auto","p-4","whitespace-pre","font-mono","font-light","text-base/6","dark:text-neutral-200","select-all"],[1,"border","rounded-4","overflow-auto","p-4","whitespace-pre","font-mono","font-light","text-base/6","dark:text-neutral-200"],[1,"dark:text-neutral-400"],[1,"select-all"]],template:function(i,l){i&1&&(zc(0,"div",0)(1,"h1"),WD(2,"Home"),Qc(),zc(3,"h2"),WD(4,"Installation guide"),Qc(),zc(5,"div",1)(6,"h3"),WD(7,"1. Create new Angular project with Tailwind CSS"),Qc(),zc(8,"p"),WD(9,"You may select the Tailwind CSS option when creating your project, or follow "),zc(10,"a",2),WD(11,"this guide"),Qc(),WD(12," to add Tailwind to an existing project."),Qc(),zc(13,"p"),WD(14,"Next, install "),zc(15,"code"),WD(16,"portal-ui-ng"),Qc(),WD(17,":"),Qc(),zc(18,"blockquote",3),WD(19,"npm i portal-ui-ng"),Qc(),zc(20,"h3"),WD(21,"2. Update style.css"),Qc(),zc(22,"blockquote",3),WD(23,`@import "tailwindcss";
@source "../node_modules/portal-ui-ng";
@import 'portal-ui-ng/assets/base/_index.css';
@import 'portal-ui-ng/assets/components/_index.css';
@import 'portal-ui-ng/assets/pages/_index.css'; `),Qc(),zc(24,"h3"),WD(25,"3. Update app.config.ts"),Qc(),zc(26,"blockquote",4),WD(27,`import { provideLocalStorage, providePlatformDetector, provideTheme } from 'portal-ui-ng';
export const appConfig: ApplicationConfig = {
\xA0\xA0providers: [
\xA0\xA0\xA0\xA0`),zc(28,"i",5),WD(29,"... your existing providers"),Qc(),WD(30,`
\xA0\xA0\xA0\xA0provideRouter(
\xA0\xA0\xA0\xA0\xA0\xA0YOUR_ROUTES,
\xA0\xA0\xA0\xA0\xA0\xA0withRouterConfig({ paramsInheritanceStrategy: 'always' }),
\xA0\xA0\xA0\xA0),
\xA0\xA0\xA0\xA0provideTheme(),
\xA0\xA0\xA0\xA0providePlatformDetector(),
\xA0\xA0\xA0\xA0provideLocalStorage(),
\xA0\xA0]
}; `),Qc(),zc(31,"h3"),WD(32,"4. Add Material Symbols Rounded font"),Qc(),zc(33,"p"),WD(34,"Add the following line to the "),zc(35,"code",6),WD(36,"HEAD"),Qc(),WD(37," of your "),zc(38,"code",6),WD(39,"index.html"),Qc(),WD(40," file:"),Qc(),zc(41,"blockquote",4),WD(42,'<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/> '),Qc()()());},encapsulation:2});}}return n})();
export{a as HomeContentComponent};