(this["webpackJsonpstockpre-web"]=this["webpackJsonpstockpre-web"]||[]).push([[0],{17:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n.n(c),o=n(10),r=n.n(o),s=(n(17),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,25)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,o=t.getLCP,r=t.getTTFB;n(e),c(e),i(e),o(e),r(e)}))}),a=(n(18),n(1)),u=n(12),l=n(4),d=n(2);function j(e,t,n,c){var i;c&&(i=JSON.stringify(c));var o=new XMLHttpRequest,r="http://127.0.0.1:8000/api".concat(t);o.responseType="json";var s=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var i=n[c].trim();if(i.substring(0,e.length+1)===e+"="){t=decodeURIComponent(i.substring(e.length+1));break}}return t}("csrftoken");o.open(e,r),o.setRequestHeader("Content-Type","application/json"),s&&(o.setRequestHeader("X-Requested-With","XMLHttpRequest"),o.setRequestHeader("X-CSRFToken",s)),o.onload=function(){403===o.status&&("Authentication credentials were not provided."===o.response.detail&&-1===window.location.href.indexOf("login")&&(window.location.href="/login?showLoginRequired=true"));n(o.response,o.status)},o.onerror=function(e){n({message:"Request was an error"},400)},o.send(i)}function b(e){var t=e.ticker;return Object(a.jsx)("div",{children:t})}function f(e){var t=Object(c.useState)([]),n=Object(d.a)(t,2),i=n[0],o=n[1],r=Object(c.useState)([]),s=Object(d.a)(r,2),u=s[0],b=s[1],f=Object(c.useState)(!1),O=Object(d.a)(f,2),h=O[0],p=O[1];return Object(c.useEffect)((function(){var t=Object(l.a)(e.newStocks).concat(i);t.length!==u.length&&b(t)}),[e.newStocks,u,i]),Object(c.useEffect)((function(){if(!1===h){j("POST","/stocks/",(function(e,t){200===t&&(o(Object(l.a)(e)),p(!0))}))}}),[i,h,p]),Object(a.jsxs)("div",{children:["List will turn into list of widgets, prediction next to each ticker",null!==u&&u.map((function(e,t){return Object(a.jsx)(k,{stock:e},t)}))]})}function O(e){var t=e.ticker,n=e.isTracking,c=e.predict,i=e.handleActionBackend,o=function(e){e.preventDefault(),function(e,t,n){t?j("POST","/prediction/create",n,{ticker:e}):j("POST","/stocks/".concat(e,"/action"),n)}(t,c,i)},r=!0===n?"Remove":"Add";return!0===c?Object(a.jsx)("button",{onClick:o,children:"Get Prediction"}):Object(a.jsxs)("button",{onClick:o,children:[" ",r," "]})}function k(e){var t=e.stock;return Object(a.jsx)("div",{onClick:function(e){e.preventDefault(),window.location.href="/stocks/".concat(t.ticker)},children:t.ticker})}function h(e){var t=e.tickerinit,n=Object(c.useState)(!1),i=Object(d.a)(n,2),o=i[0],r=i[1],s=Object(c.useState)(null),u=Object(d.a)(s,2),l=u[0],f=u[1],k=Object(c.useState)(!1),h=Object(d.a)(k,2),v=h[0],x=h[1],g=Object(c.useState)(!1),w=Object(d.a)(g,2),S=(w[0],w[1]),m=Object(c.useState)(null),T=Object(d.a)(m,2),P=T[0],C=T[1],E=Object(c.useState)(!1),L=Object(d.a)(E,2),R=L[0],q=L[1],y=function(e,t){200===t?(f(e.ticker),x(e.tracked_by)):alert("Error finding stock")},B=function(e,t){200===t&&v?(x(!1),S(!1),C(null)):200!==t||v?201===t&&v?(C(e.future_value),S(!0)):alert("cant add/remove"):x(!0)};return Object(c.useEffect)((function(){!1===o&&(!function(e,t){console.log(e),j("GET","/stocks/".concat(e),t)}(t,y),r(!0))}),[t,o,r]),null===l?null:Object(a.jsxs)("div",{children:[Object(a.jsx)(b,{ticker:l,className:e.className}),Object(a.jsx)(p,{ticker:l,didPredictionLookup:R,prediction:P,handleBackendPredictionLookup:function(e,t){200===t?(C(e.future_value),S(!0),q(!0)):(console.log(t),alert("Unable to find prediction"))}}),Object(a.jsx)(O,{ticker:l,predict:!1,isTracking:v,handleActionBackend:B}),v&&Object(a.jsx)(O,{ticker:l,predict:!0,isTracking:v,handleActionBackend:B})]})}function p(e){var t=e.ticker,n=e.prediction,i=e.didPredictionLookup,o=e.handleBackendPredictionLookup;return Object(c.useEffect)((function(){null===n||i||(console.log(t),function(e,t){j("POST","/prediction/",t,{ticker:e})}(t,o))})),null!==n?Object(a.jsxs)("div",{children:["Prediction: ",n]}):null}var v=n(22),x=n(23),g=n(24);function w(e){var t=e.stock;return Object(a.jsxs)("span",{onClick:function(e){e.preventDefault(),window.location.href="/stocks/".concat(t.ticker)},children:[t.ticker," "]})}function S(e){return Object(a.jsx)("span",{onClick:function(e){e.preventDefault(),window.location.href="/"},children:"HomeLink"})}function m(e){return Object(a.jsx)("span",{children:"ProfileLink *useless right now*"})}function T(e){var t=Object(c.useState)(""),n=Object(d.a)(t,2),i=n[0],o=n[1],r=Object(c.useState)([]),s=Object(d.a)(r,2),u=s[0],b=s[1];return Object(c.useEffect)((function(){!function(e,t){j("POST","/stocks/search",t,{searchTerm:e})}(i,(function(e,t){200===t?b(Object(l.a)(e)):alert("Error finding stock")}))}),[i]),Object(a.jsxs)("div",{children:["Need To not have list push rest of page around, will be able to search company names",Object(a.jsx)("input",{type:"text",placeholder:"Search tickers",value:i,onChange:function(e){o(e.target.value)}}),""!==i&&Object(a.jsx)("ul",{children:u.map((function(e,t){return Object(a.jsx)("li",{children:Object(a.jsx)(w,{stock:e},e.id)})}))})]})}var P=i.a.createElement,C=document.getElementById("stocks-list");C&&r.a.render(P((function(e){var t=Object(c.useState)([]),n=Object(d.a)(t,2),i=n[0];return n[1],Object(a.jsx)("div",{className:e.className,children:Object(a.jsx)(f,Object(u.a)({newStocks:i},e))})}),C.dataset),C);var E=document.getElementById("navbar");E&&r.a.render(P((function(e){return Object(a.jsx)(v.a,{children:Object(a.jsxs)(x.a,{children:[Object(a.jsxs)(g.a,{children:[" ",Object(a.jsx)(T,{})," "]}),Object(a.jsxs)(g.a,{children:[" ",Object(a.jsx)(S,{})," "]}),Object(a.jsxs)(g.a,{children:[" ",Object(a.jsx)(m,{}),"  "]})]})})}),E.dataset),E),document.querySelectorAll(".stock-detail").forEach((function(e){r.a.render(P(h,e.dataset),e)})),s()}},[[20,1,2]]]);
//# sourceMappingURL=main.5293b78d.chunk.js.map