(this["webpackJsonpstockpre-web"]=this["webpackJsonpstockpre-web"]||[]).push([[0],{17:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var c=n(0),i=n.n(c),r=n(10),o=n.n(r),a=(n(17),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,25)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),c(e),i(e),r(e),o(e)}))}),s=(n(18),n(1)),u=n(12),l=n(4),d=n(2);function j(e,t,n,c){var i;c&&(i=JSON.stringify(c));var r=new XMLHttpRequest,o="".concat("http://127.0.0.1:8000/api").concat(t);r.responseType="json";var a=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var i=n[c].trim();if(i.substring(0,e.length+1)===e+"="){t=decodeURIComponent(i.substring(e.length+1));break}}return t}("csrftoken");r.open(e,o),r.setRequestHeader("Content-Type","application/json"),a&&(r.setRequestHeader("X-Requested-With","XMLHttpRequest"),r.setRequestHeader("X-CSRFToken",a)),r.onload=function(){403===r.status&&("Authentication credentials were not provided."===r.response.detail&&-1===window.location.href.indexOf("login")&&(window.location.href="/login?showLoginRequired=true"));n(r.response,r.status)},r.onerror=function(e){n({message:"Request was an error"},400)},r.send(i)}function b(e){var t=e.ticker;return console.log(t),Object(s.jsx)("div",{children:t})}function f(e){var t=Object(c.useState)([]),n=Object(d.a)(t,2),i=n[0],r=n[1],o=Object(c.useState)([]),a=Object(d.a)(o,2),u=a[0],b=a[1],f=Object(c.useState)(!1),O=Object(d.a)(f,2),k=O[0],p=O[1];return Object(c.useEffect)((function(){var t=Object(l.a)(e.newStocks).concat(i);t.length!==u.length&&b(t)}),[e.newStocks,u,i]),Object(c.useEffect)((function(){if(!1===k){j("POST","/stocks/",(function(e,t){200===t&&(r(Object(l.a)(e)),p(!0))}))}}),[i,k,p]),Object(s.jsx)("div",{children:null!==u&&u.map((function(e,t){return Object(s.jsx)(h,{stock:e},t)}))})}function O(e){var t=e.ticker,n=e.isTracking,c=e.predict,i=e.handleActionBackend,r=function(e){e.preventDefault(),function(e,t,n){t?j("POST","/prediction/create",n,{ticker:e}):j("POST","/stocks/".concat(e,"/action"),n)}(t,c,i)},o=!0===n?"Remove":"Add";return!0===c?Object(s.jsx)("button",{onClick:r,children:"Get Prediction"}):Object(s.jsxs)("button",{onClick:r,children:[" ",o," "]})}function h(e){var t=e.stock;return Object(c.useEffect)((function(){var e=document.createElement("script");return e.type="text/javascript",e.src="https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js",e.async=!0,e.innerHTML='{\n      "symbol": "NASDAQ:'.concat(t.ticker,'",\n      "width": 350,\n      "colorTheme": "light",\n      "isTransparent": false,\n      "locale": "en"\n    }'),document.body.appendChild(e),function(){document.body.removeChild(e)}})),Object(s.jsx)("div",{onClick:function(e){e.preventDefault(),window.location.href="/stocks/".concat(t.ticker)},class:"tradingview-widget-container",children:Object(s.jsx)("div",{class:"tradingview-widget-container__widget"})})}function k(e){var t=e.tickerinit,n=Object(c.useState)(!1),i=Object(d.a)(n,2),r=i[0],o=i[1],a=Object(c.useState)(null),u=Object(d.a)(a,2),l=u[0],f=u[1],h=Object(c.useState)(!1),k=Object(d.a)(h,2),v=k[0],m=k[1],g=Object(c.useState)(!1),x=Object(d.a)(g,2),w=(x[0],x[1]),S=Object(c.useState)(null),T=Object(d.a)(S,2),C=T[0],y=T[1],E=Object(c.useState)(!1),P=Object(d.a)(E,2),N=P[0],R=P[1],q=function(e,t){200===t?(f(e.ticker),m(e.is_tracking)):alert("Error finding stock")},L=function(e,t){200===t&&v?(m(!1),w(!1),y(null)):200!==t||v?201===t&&v?(y(e.future_value),w(!0)):alert("cant add/remove"):m(!0)};return Object(c.useEffect)((function(){!1===r&&(!function(e,t){console.log(e),j("GET","/stocks/".concat(e),t)}(t,q),o(!0))}),[t,r,o]),null===l?null:Object(s.jsxs)("div",{children:[Object(s.jsx)(b,{ticker:l,className:e.className}),Object(s.jsx)(p,{ticker:l,didPredictionLookup:N,prediction:C,handleBackendPredictionLookup:function(e,t){200===t?(y(e.future_value),w(!0),R(!0)):alert("Unable to find prediction")}}),Object(s.jsx)(O,{ticker:l,predict:!1,isTracking:v,handleActionBackend:L}),v&&Object(s.jsx)(O,{ticker:l,predict:!0,isTracking:v,handleActionBackend:L})]})}function p(e){var t=e.ticker,n=e.prediction,i=e.didPredictionLookup,r=e.handleBackendPredictionLookup;return Object(c.useEffect)((function(){i||function(e,t){j("POST","/prediction/",t,{ticker:e})}(t,r)})),null!==n?Object(s.jsxs)("div",{children:["Prediction: ",n]}):null}var v=n(22),m=n(23),g=n(24);function x(e){var t=e.stock;return Object(s.jsxs)("span",{onClick:function(e){e.preventDefault(),window.location.href="/stocks/".concat(t.ticker)},children:[t.ticker," "]})}function w(e){return Object(s.jsx)("span",{onClick:function(e){e.preventDefault(),window.location.href="/"},children:"Home"})}function S(e){return Object(s.jsx)("span",{onClick:function(e){e.preventDefault(),window.location.href="/profile"},children:"Profile"})}function T(e){var t=Object(c.useState)(""),n=Object(d.a)(t,2),i=n[0],r=n[1],o=Object(c.useState)([]),a=Object(d.a)(o,2),u=a[0],b=a[1],f=Object(c.useState)(!0),O=Object(d.a)(f,2),h=O[0],k=O[1];return Object(c.useEffect)((function(){!function(e,t){j("POST","/stocks/search",t,{searchTerm:e})}(i,(function(e,t){200===t?b(Object(l.a)(e)):alert("Error finding stock")}))}),[i]),Object(s.jsx)("form",{className:"d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search",children:Object(s.jsxs)("div",{className:"input-group",onFocus:function(){return k(!0)},children:[Object(s.jsx)("input",{type:"text",className:"form-control bg-light border-0 small z-index:10",placeholder:"Search tickers",value:i,onChange:function(e){r(e.target.value)}}),Object(s.jsx)("div",{className:"position-absolute mt-5 border border-light bg-light",children:""!==i&&h&&Object(s.jsx)("ul",{children:u.map((function(e){return Object(s.jsx)("li",{children:Object(s.jsx)(x,{stock:e})},e.id)}))})})]})})}var C=i.a.createElement,y=document.getElementById("stocks-list");y&&o.a.render(C((function(e){var t=Object(c.useState)([]),n=Object(d.a)(t,2),i=n[0];return n[1],Object(s.jsx)("div",{className:e.className,children:Object(s.jsx)(f,Object(u.a)({newStocks:i},e))})}),y.dataset),y);var E=document.getElementById("navbar");E&&o.a.render(C((function(e){return Object(s.jsx)(v.a,{children:Object(s.jsxs)(m.a,{className:"navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow",children:[Object(s.jsxs)(g.a,{children:[" ",Object(s.jsx)(T,{})," "]}),Object(s.jsxs)(g.a,{children:[" ",Object(s.jsx)(w,{})," "]}),Object(s.jsxs)(g.a,{children:[" ",Object(s.jsx)(S,{})," "]})]})})}),E.dataset),E),document.querySelectorAll(".stock-detail").forEach((function(e){o.a.render(C(k,e.dataset),e)})),a()}},[[20,1,2]]]);
//# sourceMappingURL=main.bf8106df.chunk.js.map