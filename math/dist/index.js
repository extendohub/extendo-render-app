(()=>{var __webpack_modules__={262:(e,t,r)=>{const{mathjax:a}=r(833);const{TeX:s}=r(857);const{CHTML:_}=r(402);const{liteAdaptor:o}=r(723);const{RegisterHTMLHandler:l}=r(936);const{AllPackages:u}=r(901);e.exports=async({render:e})=>{const t=await e.getContent({},"utf8");const r=o();l(r);const u=new s({});const n=new _({fontURL:"https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2"});const c=a.document("",{InputJax:u,OutputJax:n});const i=t.startsWith("$$")||t.startsWith("\\[");const p=trimContent(t);const m=c.convert(p,{display:i});const d=r.outerHTML(m);const x=r.textContent(n.styleSheet(c));return{html:d,styles:x}};function trimContent(e){if(e.startsWith("$$")||e.startsWith("\\(")||e.startsWith("\\["))return e.slice(2,-2);if(e.startsWith("$"))return e.slice(1,-1);return e}},723:module=>{module.exports=eval("require")("mathjax-full/js/adaptors/liteAdaptor.js")},936:module=>{module.exports=eval("require")("mathjax-full/js/handlers/html.js")},857:module=>{module.exports=eval("require")("mathjax-full/js/input/tex.js")},901:module=>{module.exports=eval("require")("mathjax-full/js/input/tex/AllPackages.js")},833:module=>{module.exports=eval("require")("mathjax-full/js/mathjax.js")},402:module=>{module.exports=eval("require")("mathjax-full/js/output/chtml.js")}};var __webpack_module_cache__={};function __nccwpck_require__(e){var t=__webpack_module_cache__[e];if(t!==undefined){return t.exports}var r=__webpack_module_cache__[e]={exports:{}};var a=true;try{__webpack_modules__[e](r,r.exports,__nccwpck_require__);a=false}finally{if(a)delete __webpack_module_cache__[e]}return r.exports}if(typeof __nccwpck_require__!=="undefined")__nccwpck_require__.ab=__dirname+"/";var __webpack_exports__=__nccwpck_require__(262);module.exports=__webpack_exports__})();