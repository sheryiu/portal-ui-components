import{Rb as t,Xa as d,vb as e,wb as o}from"./chunk-456UTSJA.js";import"./chunk-C6Q5SG76.js";var a=(()=>{class n{static{this.\u0275fac=function(i){return new(i||n)}}static{this.\u0275cmp=d({type:n,selectors:[["demo-home-content"]],decls:43,vars:0,consts:[[1,"pui-card","rounded-4","px-8","pt-4","pb-12"],[1,"flex","flex-col","gap-6","pt-6"],["href","https://angular.dev/guide/tailwind#automated-setup-with-ng-add",1,"underline","dark:text-primary-300"],[1,"border","rounded-4","overflow-auto","p-4","whitespace-pre","font-mono","font-light","text-base/6","dark:text-neutral-200","select-all"],[1,"border","rounded-4","overflow-auto","p-4","whitespace-pre","font-mono","font-light","text-base/6","dark:text-neutral-200"],[1,"dark:text-neutral-400"],[1,"select-all"]],template:function(i,l){i&1&&(e(0,"div",0)(1,"h1"),t(2,"Home"),o(),e(3,"h2"),t(4,"Installation guide"),o(),e(5,"div",1)(6,"h3"),t(7,"1. Create new Angular project with Tailwind CSS"),o(),e(8,"p"),t(9,"You may select the Tailwind CSS option when creating your project, or follow "),e(10,"a",2),t(11,"this guide"),o(),t(12," to add Tailwind to an existing project."),o(),e(13,"p"),t(14,"Next, install "),e(15,"code"),t(16,"portal-ui-ng"),o(),t(17,":"),o(),e(18,"blockquote",3),t(19,"npm i portal-ui-ng"),o(),e(20,"h3"),t(21,"2. Update style.css"),o(),e(22,"blockquote",3),t(23,`@import "tailwindcss";
@source "../node_modules/portal-ui-ng";
@import 'portal-ui-ng/assets/base/_index.css';
@import 'portal-ui-ng/assets/components/_index.css';
@import 'portal-ui-ng/assets/pages/_index.css'; `),o(),e(24,"h3"),t(25,"3. Update app.config.ts"),o(),e(26,"blockquote",4),t(27,`import { provideAnimations } from '@angular/platform-browser/animations';
import { provideLocalStorage, providePlatformDetector, provideTheme } from 'portal-ui-ng';
export const appConfig: ApplicationConfig = {
\xA0\xA0providers: [
\xA0\xA0\xA0\xA0`),e(28,"i",5),t(29,"... your existing providers"),o(),t(30,`
\xA0\xA0\xA0\xA0provideAnimations(),
\xA0\xA0\xA0\xA0provideTheme(),
\xA0\xA0\xA0\xA0providePlatformDetector(),
\xA0\xA0\xA0\xA0provideLocalStorage(),
\xA0\xA0]
}; `),o(),e(31,"h3"),t(32,"4. Add Material Symbols Rounded font"),o(),e(33,"p"),t(34,"Add the following line to the "),e(35,"code",6),t(36,"HEAD"),o(),t(37," of your "),e(38,"code",6),t(39,"index.html"),o(),t(40," file:"),o(),e(41,"blockquote",4),t(42,'<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"/> '),o()()())},encapsulation:2})}}return n})();export{a as HomeContentComponent};
