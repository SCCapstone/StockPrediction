(this["webpackJsonpstockpre-web"]=this["webpackJsonpstockpre-web"]||[]).push([[0],{13:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var c=n(0),o=n.n(c),s=n(6),a=n.n(s),r=(n(13),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),c(e),o(e),s(e),a(e)}))}),i=n(8),u=n(1),l=n(3),d=n(2);function j(e,t,n,c){var o;c&&(o=JSON.stringify(c));var s=new XMLHttpRequest,a="http://127.0.0.1:8000/api".concat(t);s.responseType="json";var r=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var o=n[c].trim();if(o.substring(0,e.length+1)===e+"="){t=decodeURIComponent(o.substring(e.length+1));break}}return t}("csrftoken");s.open(e,a),s.setRequestHeader("Content-Type","application/json"),r&&(s.setRequestHeader("X-Requested-With","XMLHttpRequest"),s.setRequestHeader("X-CSRFToken",r)),s.onload=function(){403===s.status&&("Authentication credentials were not provided."===s.response.detail&&-1===window.location.href.indexOf("login")&&(window.location.href="/login?showLoginRequired=true"));n(s.response,s.status)},s.onerror=function(e){n({message:"Request was an error"},400)},s.send(o)}function f(e){var t=e.stock;return Object(u.jsx)("div",{children:t.ticker})}function b(e){var t=Object(c.useState)([]),n=Object(d.a)(t,2),s=n[0],a=n[1],r=Object(c.useState)([]),i=Object(d.a)(r,2),b=i[0],O=i[1],k=Object(c.useState)(!1),h=Object(d.a)(k,2),p=h[0],g=h[1];return Object(c.useEffect)((function(){var t=Object(l.a)(e.newStocks).concat(s);t.length!==b.length&&O(t)}),[e.newStocks,b,s]),Object(c.useEffect)((function(){if(!1===p){j("GET","/stocks/",(function(e,t){200===t&&(a(Object(l.a)(e)),g(!0))}))}}),[s,p,g,e.username]),Object(u.jsx)(o.a.Fragment,{children:null!==b&&b.map((function(e,t){return Object(u.jsx)(f,{stock:e,className:"my-5 py-5 border bg-white text-dark"},"".concat(t,"-{item.id}"))}))})}function O(e){var t=e.ticker,n=e.isTracking,c=e.handleActionBackend,o=!0===n?"Remove":"Add";return Object(u.jsxs)("button",{onClick:function(e){e.preventDefault(),function(e,t){j("POST","/stocks/".concat(e,"/action"),t)}(t,c)},children:[" ",o," "]})}function k(e){var t=e.stock;return Object(u.jsx)("span",{onClick:function(e){window.location.href="/stocks/".concat(t.ticker)},children:t.ticker})}function h(e){console.log("hello");var t=e.ticker,n=Object(c.useState)(!1),o=Object(d.a)(n,2),s=o[0],a=o[1],r=Object(c.useState)(null),i=Object(d.a)(r,2),l=i[0],b=i[1],k=Object(c.useState)(!1),h=Object(d.a)(k,2),p=h[0],g=h[1],v=function(e,t){200===t?b(e):alert("Error finding stock")};return Object(c.useEffect)((function(){!1===s&&(!function(e,t){j("GET","/stocks/".concat(e),t)}(t,v),a(!0))}),[t,s,a]),null===l?null:Object(u.jsxs)("div",{children:[Object(u.jsx)(f,{stock:l,className:e.className}),Object(u.jsx)(O,{ticker:l.ticker,isTracking:p,handleActionBackend:function(e,t){200===t?g(!p):alert("cant add/remove")}})]})}var p=o.a.createElement,g=document.getElementById("stocks-list");g&&a.a.render(p((function(e){var t=Object(c.useState)([]),n=Object(d.a)(t,2),o=n[0];return n[1],Object(u.jsx)("div",{className:e.className,children:Object(u.jsx)(b,Object(i.a)({newStocks:o},e))})}),g.dataset),g);var v=document.getElementById("stocks-search");g&&a.a.render(p((function(e){var t=Object(c.useState)(""),n=Object(d.a)(t,2),o=n[0],s=n[1],a=Object(c.useState)([]),r=Object(d.a)(a,2),i=r[0],f=r[1];return Object(c.useEffect)((function(){!function(e,t){j("POST","/stocks/search",t,{searchTerm:e})}(o,(function(e,t){200===t?f(Object(l.a)(e)):alert("Error finding stock")}))}),[o]),Object(u.jsxs)("div",{children:[Object(u.jsx)("input",{type:"text",placeholder:"Search",value:o,onChange:function(e){s(e.target.value)}}),""!==o&&Object(u.jsx)("ul",{children:i.map((function(e,t){return Object(u.jsx)("li",{children:Object(u.jsx)(k,{stock:e},"".concat(t,"-{item.id}"))})}))})]})}),v.dataset),v),document.querySelectorAll(".stock-detail").forEach((function(e){a.a.render(p(h,e.dataset),e)})),r()}},[[15,1,2]]]);
//# sourceMappingURL=main.800be14c.chunk.js.map