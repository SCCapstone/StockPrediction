(this["webpackJsonpstockpre-web"]=this["webpackJsonpstockpre-web"]||[]).push([[0],{17:function(e,t,n){},26:function(e,t,n){"use strict";n.r(t);var c=n(0),o=n.n(c),s=n(8),r=n.n(s),i=(n(17),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,27)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),c(e),o(e),s(e),r(e)}))}),a=n(12),u=n(2),l=n(4),d=n(3);function j(e,t,n,c){var o;c&&(o=JSON.stringify(c));var s=new XMLHttpRequest,r="http://127.0.0.1:8000/api".concat(t);s.responseType="json";var i=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var o=n[c].trim();if(o.substring(0,e.length+1)===e+"="){t=decodeURIComponent(o.substring(e.length+1));break}}return t}("csrftoken");s.open(e,r),s.setRequestHeader("Content-Type","application/json"),i&&(s.setRequestHeader("X-Requested-With","XMLHttpRequest"),s.setRequestHeader("X-CSRFToken",i)),s.onload=function(){403===s.status&&("Authentication credentials were not provided."===s.response.detail&&-1===window.location.href.indexOf("login")&&(window.location.href="/login?showLoginRequired=true"));n(s.response,s.status)},s.onerror=function(e){n({message:"Request was an error"},400)},s.send(o)}function f(e){var t=e.stock;return Object(u.jsx)("div",{children:t.ticker})}n(19),n(22);function b(e){var t=Object(c.useState)([]),n=Object(d.a)(t,2),o=n[0],s=n[1],r=Object(c.useState)([]),i=Object(d.a)(r,2),a=i[0],f=i[1],b=Object(c.useState)(!1),O=Object(d.a)(b,2),h=O[0],v=O[1];return Object(c.useEffect)((function(){var t=Object(l.a)(e.newStocks).concat(o);t.length!==a.length&&f(t)}),[e.newStocks,a,o]),Object(c.useEffect)((function(){if(!1===h){j("POST","/stocks/",(function(e,t){200===t&&(s(Object(l.a)(e)),v(!0))}))}}),[o,h,v]),Object(u.jsx)("div",{children:null!==a&&a.map((function(e,t){return Object(u.jsx)(k,{stock:e},t)}))})}function O(e){var t=e.ticker,n=e.isTracking,c=e.handleActionBackend,o=!0===n?"Remove":"Add";return Object(u.jsxs)("button",{onClick:function(e){e.preventDefault(),function(e,t){j("POST","/stocks/".concat(e,"/action"),t)}(t,c)},children:[" ",o," "]})}function k(e){var t=e.stock;return Object(u.jsx)("div",{onClick:function(e){window.location.href="/stocks/".concat(t.ticker)},children:t.ticker})}function h(e){var t=e.ticker,n=Object(c.useState)(!1),o=Object(d.a)(n,2),s=o[0],r=o[1],i=Object(c.useState)(null),a=Object(d.a)(i,2),l=a[0],b=a[1],k=function(e,t){200===t?(console.log(e),b(e)):alert("Error finding stock")};return Object(c.useEffect)((function(){!1===s&&(!function(e,t){j("GET","/stocks/".concat(e),t)}(t,k),r(!0))}),[t,s,r]),null===l?null:Object(u.jsxs)("div",{children:[Object(u.jsx)(f,{stock:l,className:e.className}),Object(u.jsx)(O,{ticker:l.ticker,isTracking:l.is_tracking,handleActionBackend:function(e,t){200===t?b(e):alert("cant add/remove")}})]})}var v=o.a.createElement,p=document.getElementById("stocks-list");p&&r.a.render(v((function(e){var t=Object(c.useState)([]),n=Object(d.a)(t,2),o=n[0];return n[1],Object(u.jsx)("div",{className:e.className,children:Object(u.jsx)(b,Object(a.a)({newStocks:o},e))})}),p.dataset),p);var g=document.getElementById("stocks-search");g&&r.a.render(v((function(e){var t=Object(c.useState)(""),n=Object(d.a)(t,2),o=n[0],s=n[1],r=Object(c.useState)([]),i=Object(d.a)(r,2),a=i[0],f=i[1];return Object(c.useEffect)((function(){!function(e,t){j("POST","/stocks/search",t,{searchTerm:e})}(o,(function(e,t){200===t?f(Object(l.a)(e)):alert("Error finding stock")}))}),[o]),Object(u.jsxs)("div",{children:[Object(u.jsx)("input",{type:"text",placeholder:"Search",value:o,onChange:function(e){s(e.target.value)}}),""!==o&&Object(u.jsx)("ul",{children:a.map((function(e,t){return Object(u.jsx)("li",{children:Object(u.jsx)(k,{stock:e},"".concat(t,"-{item.id}"))})}))})]})}),g.dataset),g),document.querySelectorAll(".stock-detail").forEach((function(e){r.a.render(v(h,e.dataset),e)})),i()}},[[26,1,2]]]);
//# sourceMappingURL=main.412c4f34.chunk.js.map