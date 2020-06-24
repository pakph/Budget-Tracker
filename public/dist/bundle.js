!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(1),e.exports=n(2)},function(e,t){"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/service-worker.js")}));let n,r=[];function o(){let e=r.reduce((e,t)=>e+parseInt(t.value),0);document.querySelector("#total").textContent=e}function a(){let e=document.querySelector("#tbody");e.innerHTML="",r.forEach(t=>{let n=document.createElement("tr");n.innerHTML=`\n      <td>${t.name}</td>\n      <td>${t.value}</td>\n    `,e.appendChild(n)})}function c(){let e=r.slice().reverse(),t=0,o=e.map(e=>{let t=new Date(e.date);return`${t.getMonth()+1}/${t.getDate()}/${t.getFullYear()}`}),a=e.map(e=>(t+=parseInt(e.value),t));n&&n.destroy();let c=document.getElementById("myChart").getContext("2d");n=new Chart(c,{type:"line",data:{labels:o,datasets:[{label:"Total Over Time",fill:!0,backgroundColor:"#6666ff",data:a}]}})}function i(e){let t=document.querySelector("#t-name"),n=document.querySelector("#t-amount"),i=document.querySelector(".form .error");if(""===t.value||""===n.value)return void(i.textContent="Missing Information");i.textContent="";let u={name:t.value,value:n.value,date:(new Date).toISOString()};e||(u.value*=-1),r.unshift(u),c(),a(),o(),fetch("/api/transaction",{method:"POST",body:JSON.stringify(u),headers:{Accept:"application/json, text/plain, */*","Content-Type":"application/json"}}).then(e=>e.json()).then(e=>{e.errors?i.textContent="Missing Information":(t.value="",n.value="")}).catch(e=>{saveRecord(u),t.value="",n.value=""})}fetch("/api/transaction").then(e=>e.json()).then(e=>{r=e,o(),a(),c()}),document.querySelector("#add-btn").onclick=function(){i(!0)},document.querySelector("#sub-btn").onclick=function(){i(!1)}},function(e,t){let n;const r=window.indexedDB.open("budgetApp",1);function o(){const e=n.transaction(["records"],"readwrite").objectStore("records").getAll();e.onsuccess=function(){e.result.length>0&&fetch("/api/transaction/bulk",{method:"POST",body:JSON.stringify(e.result),headers:{Accept:"application/json, text/plain, */*","Content-Type":application/json}}).then(e=>e.json()).then(()=>{n.transaction(["records"],"readwrite").objectStore("records").clear()})}}r.onupgradeneeded=function(e){e.target.result.createObjectStore("records",{autoIncrement:!0})},r.onerror=function(e){console.error("Database error: "+e.target.errorCode)},r.onsuccess=function(e){e.target.result;navigator.onLine&&o()},window.addEventListener("online",o)}]);