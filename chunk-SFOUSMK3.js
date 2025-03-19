import{Cb as e,Db as t,Vb as n,fb as u}from"./chunk-O5WS6LKQ.js";import"./chunk-EQDQRRRY.js";var s=(()=>{class i{static{this.\u0275fac=function(o){return new(o||i)}}static{this.\u0275cmp=u({type:i,selectors:[["demo-home-content"]],decls:22,vars:0,consts:[[1,"pui-card","rounded-4","px-8","pt-4","pb-12"],[1,"flex","flex-col","gap-6","pt-6"],[1,"border","rounded-4","overflow-auto","p-4","whitespace-pre","font-mono","font-light","text-base/6","dark:text-neutral-200"]],template:function(o,a){o&1&&(e(0,"div",0)(1,"h1"),n(2,"Home"),t(),e(3,"h2"),n(4,"Installation guide"),t(),e(5,"div",1)(6,"h3"),n(7,"1. Install from NPM"),t(),e(8,"blockquote",2),n(9,`npm i portal-ui-ng@^0.1.7
npm install -D tailwindcss@3 postcss autoprefixer @tailwindcss/container-queries
npx tailwindcss init `),t(),e(10,"h3"),n(11,"2. Update tailwind.config.js"),t(),e(12,"blockquote",2),n(13,`/** @type {import('tailwindcss').Config} */
module.exports = {
\xA0\xA0content: [
\xA0\xA0\xA0\xA0"./src/**/*.{html,ts}",
\xA0\xA0],
\xA0\xA0darkMode: "class",
\xA0\xA0safelist: ['dark'],
\xA0\xA0presets: [
\xA0\xA0\xA0\xA0require('portal-ui-ng/assets/tailwind-preset.js'),
\xA0\xA0],
\xA0\xA0theme: {
\xA0\xA0\xA0\xA0extend: {},
\xA0\xA0},
\xA0\xA0plugins: [
\xA0\xA0\xA0\xA0require('@tailwindcss/container-queries'),
\xA0\xA0],
} `),t(),e(14,"h3"),n(15,"3. Update styles.scss"),t(),e(16,"blockquote",2),n(17,`/* You can add global styles to this file, and also import other style files */
@use '@angular/cdk/overlay-prebuilt.css';
@use '@angular/cdk/text-field-prebuilt.css';
@use 'portal-ui-ng/assets/base';
@use 'portal-ui-ng/assets/components';
@use 'portal-ui-ng/assets/pages';
@tailwind base;
@tailwind components;
@tailwind utilities; `),t(),e(18,"h3"),n(19,"4. Update app.config.ts"),t(),e(20,"blockquote",2),n(21,`import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideLocalStorage, providePlatformDetector, provideTheme } from 'portal-ui-ng';
import { routes } from './app.routes';
export const appConfig: ApplicationConfig = {
\xA0\xA0providers: [
\xA0\xA0\xA0\xA0provideZoneChangeDetection({ eventCoalescing: true }),
\xA0\xA0\xA0\xA0provideRouter(routes),
\xA0\xA0\xA0\xA0provideClientHydration(withEventReplay()),
\xA0\xA0\xA0\xA0provideTheme(),
\xA0\xA0\xA0\xA0providePlatformDetector(),
\xA0\xA0\xA0\xA0provideLocalStorage(),
\xA0\xA0]
}; `),t()()())},encapsulation:2})}}return i})();export{s as HomeContentComponent};
