(this["webpackJsonpstockpre-web"]=this["webpackJsonpstockpre-web"]||[]).push([[0],{17:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n.n(c),o=n(10),r=n.n(o),a=(n(17),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,25)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,o=t.getLCP,r=t.getTTFB;n(e),c(e),i(e),o(e),r(e)}))}),s=(n(18),n(1)),u=n(12),d=n(4),l=n(2);function j(e,t,n,c){var i;c&&(i=JSON.stringify(c));var o=new XMLHttpRequest,r="".concat("https://afternoon-anchorage-50870.herokuapp.com/api").concat(t);o.responseType="json";var a=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var i=n[c].trim();if(i.substring(0,e.length+1)===e+"="){t=decodeURIComponent(i.substring(e.length+1));break}}return t}("csrftoken");o.open(e,r),o.setRequestHeader("Content-Type","application/json"),a&&(o.setRequestHeader("X-Requested-With","XMLHttpRequest"),o.setRequestHeader("X-CSRFToken",a)),o.onload=function(){403===o.status&&("Authentication credentials were not provided."===o.response.detail&&-1===window.location.href.indexOf("login")&&(window.location.href="/login?showLoginRequired=true"));n(o.response,o.status)},o.onerror=function(e){n({message:"Request was an error"},400)},o.send(i)}function b(e){var t=e.ticker;return console.log(t),Object(s.jsx)("div",{children:t})}function f(e){var t=Object(c.useState)([]),n=Object(l.a)(t,2),i=n[0],o=n[1],r=Object(c.useState)([]),a=Object(l.a)(r,2),u=a[0],b=a[1],f=Object(c.useState)(!1),O=Object(l.a)(f,2),h=O[0],p=O[1];return Object(c.useEffect)((function(){var t=Object(d.a)(e.newStocks).concat(i);t.length!==u.length&&b(t)}),[e.newStocks,u,i]),Object(c.useEffect)((function(){if(!1===h){j("POST","/stocks/",(function(e,t){200===t&&(o(Object(d.a)(e)),p(!0))}))}}),[i,h,p]),Object(s.jsxs)("div",{children:["List will turn into list of widgets, prediction next to each ticker",null!==u&&u.map((function(e,t){return Object(s.jsx)(k,{stock:e},t)}))]})}function O(e){var t=e.ticker,n=e.isTracking,c=e.predict,i=e.handleActionBackend,o=function(e){e.preventDefault(),function(e,t,n){t?j("POST","/prediction/create",n,{ticker:e}):j("POST","/stocks/".concat(e,"/action"),n)}(t,c,i)},r=!0===n?"Remove":"Add";return!0===c?Object(s.jsx)("button",{onClick:o,children:"Get Prediction"}):Object(s.jsxs)("button",{onClick:o,children:[" ",r," "]})}function k(e){var t=e.stock;return Object(c.useEffect)((function(){var e=document.createElement("script");return e.type="text/javascript",e.src="https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js",e.async=!0,e.innerHTML='{\n      "symbol": "NASDAQ:'.concat(t.ticker,'",\n      "width": 350,\n      "colorTheme": "light",\n      "isTransparent": false,\n      "locale": "en"\n    }'),document.body.appendChild(e),function(){document.body.removeChild(e)}})),Object(s.jsx)("div",{onClick:function(e){e.preventDefault(),window.location.href="/stocks/".concat(t.ticker)},class:"tradingview-widget-container",children:Object(s.jsx)("div",{class:"tradingview-widget-container__widget"})})}function h(e){var t=e.tickerinit,n=Object(c.useState)(!1),i=Object(l.a)(n,2),o=i[0],r=i[1],a=Object(c.useState)(null),u=Object(l.a)(a,2),d=u[0],f=u[1],k=Object(c.useState)(!1),h=Object(l.a)(k,2),v=h[0],g=h[1],x=Object(c.useState)(!1),m=Object(l.a)(x,2),w=(m[0],m[1]),S=Object(c.useState)(null),T=Object(l.a)(S,2),C=T[0],E=T[1],P=Object(c.useState)(!1),y=Object(l.a)(P,2),L=y[0],R=y[1],q=function(e,t){200===t?(f(e.ticker),g(e.is_tracking)):alert("Error finding stock")},A=function(e,t){200===t&&v?(g(!1),w(!1),E(null)):200!==t||v?201===t&&v?(E(e.future_value),w(!0)):alert("cant add/remove"):g(!0)};return Object(c.useEffect)((function(){!1===o&&(!function(e,t){console.log(e),j("GET","/stocks/".concat(e),t)}(t,q),r(!0))}),[t,o,r]),null===d?null:Object(s.jsxs)("div",{children:[Object(s.jsx)(b,{ticker:d,className:e.className}),Object(s.jsx)(p,{ticker:d,didPredictionLookup:L,prediction:C,handleBackendPredictionLookup:function(e,t){200===t?(E(e.future_value),w(!0),R(!0)):alert("Unable to find prediction")}}),Object(s.jsx)(O,{ticker:d,predict:!1,isTracking:v,handleActionBackend:A}),v&&Object(s.jsx)(O,{ticker:d,predict:!0,isTracking:v,handleActionBackend:A})]})}function p(e){var t=e.ticker,n=e.prediction,i=e.didPredictionLookup,o=e.handleBackendPredictionLookup;return Object(c.useEffect)((function(){i||function(e,t){j("POST","/prediction/",t,{ticker:e})}(t,o)})),null!==n?Object(s.jsxs)("div",{children:["Prediction: ",n]}):null}var v=n(22),g=n(23),x=n(24);function m(e){var t=e.stock;return Object(s.jsxs)("span",{onClick:function(e){e.preventDefault(),window.location.href="/stocks/".concat(t.ticker)},children:[t.ticker," "]})}function w(e){return Object(s.jsx)("span",{onClick:function(e){e.preventDefault(),window.location.href="/"},children:"HomeLink"})}function S(e){return Object(s.jsx)("span",{children:"ProfileLink *useless right now*"})}function T(e){var t=Object(c.useState)(""),n=Object(l.a)(t,2),i=n[0],o=n[1],r=Object(c.useState)([]),a=Object(l.a)(r,2),u=a[0],b=a[1];return Object(c.useEffect)((function(){!function(e,t){j("POST","/stocks/search",t,{searchTerm:e})}(i,(function(e,t){200===t?b(Object(d.a)(e)):alert("Error finding stock")}))}),[i]),Object(s.jsxs)("div",{children:["Need To not have list push rest of page around, will be able to search company names",Object(s.jsx)("input",{type:"text",placeholder:"Search tickers",value:i,onChange:function(e){o(e.target.value)}}),""!==i&&Object(s.jsx)("ul",{children:u.map((function(e,t){return Object(s.jsx)("li",{children:Object(s.jsx)(m,{stock:e},e.id)})}))})]})}var C=i.a.createElement,E=document.getElementById("stocks-list");E&&r.a.render(C((function(e){var t=Object(c.useState)([]),n=Object(l.a)(t,2),i=n[0];return n[1],Object(s.jsx)("div",{className:e.className,children:Object(s.jsx)(f,Object(u.a)({newStocks:i},e))})}),E.dataset),E);var P=document.getElementById("navbar");P&&r.a.render(C((function(e){return Object(s.jsx)(v.a,{children:Object(s.jsxs)(g.a,{children:[Object(s.jsxs)(x.a,{children:[" ",Object(s.jsx)(T,{})," "]}),Object(s.jsxs)(x.a,{children:[" ",Object(s.jsx)(w,{})," "]}),Object(s.jsxs)(x.a,{children:[" ",Object(s.jsx)(S,{}),"  "]})]})})}),P.dataset),P),document.querySelectorAll(".stock-detail").forEach((function(e){r.a.render(C(h,e.dataset),e)})),a()}},[[20,1,2]]]);
//# sourceMappingURL=main.72baca62.chunk.js.map