(this["webpackJsonpstockpre-web"]=this["webpackJsonpstockpre-web"]||[]).push([[0],{17:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var c=n(1),i=n.n(c),r=n(10),o=n.n(r),a=(n(17),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,25)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),c(e),i(e),r(e),o(e)}))}),s=(n(18),n(0)),d=n(12),u=n(4),l=n(2);function j(e,t,n,c){var i;c&&(i=JSON.stringify(c));var r=new XMLHttpRequest,o="http://127.0.0.1:8000/api".concat(t);r.responseType="json";var a=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var i=n[c].trim();if(i.substring(0,e.length+1)===e+"="){t=decodeURIComponent(i.substring(e.length+1));break}}return t}("csrftoken");r.open(e,o),r.setRequestHeader("Content-Type","application/json"),a&&(r.setRequestHeader("X-Requested-With","XMLHttpRequest"),r.setRequestHeader("X-CSRFToken",a)),r.onload=function(){403===r.status&&("Authentication credentials were not provided."===r.response.detail&&-1===window.location.href.indexOf("login")&&(window.location.href="/login?showLoginRequired=true"));n(r.response,r.status)},r.onerror=function(e){n({message:"Request was an error"},400)},r.send(i)}function b(e){var t=e.ticker;return console.log(t),Object(c.useEffect)((function(){var e=document.createElement("script");e.type="text/javascript",e.src="https://s3.tradingview.com/tv.js";var n=document.createElement("script");return n.type="text/javascript",n.innerHTML='new TradingView.widget({\n        "autosize": true,\n        "symbol": "'.concat(t,'",\n        "interval": "D",\n        "timezone": "Etc/UTC",\n        "theme": "light",\n        "style": "1",\n        "locale": "en",\n        "toolbar_bg": "#f1f3f6",\n        "enable_publishing": false,\n        "hide_top_toolbar": true,\n        "hide_legend": true,\n        "save_image": false,\n        "container_id": "tradingview_29472"\n        });'),document.body.appendChild(e).appendChild(n),function(){document.body.removeChild(n),document.body.removeChild(e)}})),Object(s.jsxs)("div",{class:"tradingview-widget-container",style:{padding:"40px"},children:[Object(s.jsx)("div",{id:"tradingview_29472"}),Object(s.jsxs)("div",{class:"tradingview-widget-copyright",children:[Object(s.jsx)("a",{href:"https://www.tradingview.com/symbols/".concat(t,"/"),rel:"noopener",target:"_blank",children:Object(s.jsxs)("span",{class:"blue-text",children:[t," Chart"]})})," by TradingView"]})]})}function f(e){var t=Object(c.useState)([]),n=Object(l.a)(t,2),i=n[0],r=n[1],o=Object(c.useState)([]),a=Object(l.a)(o,2),d=a[0],b=a[1],f=Object(c.useState)(!1),h=Object(l.a)(f,2),p=h[0],v=h[1];return Object(c.useEffect)((function(){var t=Object(u.a)(e.newStocks).concat(i);t.length!==d.length&&b(t)}),[e.newStocks,d,i]),Object(c.useEffect)((function(){if(!1===p){j("POST","/stocks/",(function(e,t){200===t&&(r(Object(u.a)(e)),v(!0))}))}}),[i,p,v]),Object(s.jsxs)("div",{children:["List will turn into list of widgets, prediction next to each ticker",null!==d&&d.map((function(e,t){return Object(s.jsx)(O,{stock:e},t)}))]})}function h(e){var t=e.ticker,n=e.isTracking,c=e.predict,i=e.handleActionBackend,r=function(e){e.preventDefault(),function(e,t,n){t?j("POST","/prediction/create",n,{ticker:e}):j("POST","/stocks/".concat(e,"/action"),n)}(t,c,i)},o=!0===n?"Remove":"Add";return!0===c?Object(s.jsx)("button",{onClick:r,children:"Get Prediction"}):Object(s.jsxs)("button",{onClick:r,children:[" ",o," "]})}function O(e){var t=e.stock;return Object(c.useEffect)((function(){var e=document.createElement("script");return e.type="text/javascript",e.src="https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js",e.async=!0,e.innerHTML='{\n      "symbol": "NASDAQ:'.concat(t.ticker,'",\n      "width": 350,\n      "colorTheme": "light",\n      "isTransparent": false,\n      "locale": "en"\n    }'),document.body.appendChild(e),function(){document.body.removeChild(e)}})),Object(s.jsx)("div",{onClick:function(e){e.preventDefault(),window.location.href="/stocks/".concat(t.ticker)},children:Object(s.jsx)("div",{class:"tradingview-widget-container",children:Object(s.jsx)("div",{class:"tradingview-widget-container__widget"})})})}function p(e){var t=e.tickerinit,n=Object(c.useState)(!1),i=Object(l.a)(n,2),r=i[0],o=i[1],a=Object(c.useState)(null),d=Object(l.a)(a,2),u=d[0],f=d[1],O=Object(c.useState)(!1),p=Object(l.a)(O,2),k=p[0],g=p[1],m=Object(c.useState)(!1),w=Object(l.a)(m,2),x=(w[0],w[1]),S=Object(c.useState)(null),y=Object(l.a)(S,2),T=y[0],C=y[1],E=Object(c.useState)(!1),_=Object(l.a)(E,2),L=_[0],P=_[1],R=function(e,t){200===t?(f(e.ticker),g(e.is_tracking)):alert("Error finding stock")},q=function(e,t){200===t&&k?(g(!1),x(!1),C(null)):200!==t||k?201===t&&k?(C(e.future_value),x(!0)):alert("cant add/remove"):g(!0)};return Object(c.useEffect)((function(){!1===r&&(!function(e,t){console.log(e),j("GET","/stocks/".concat(e),t)}(t,R),o(!0))}),[t,r,o]),null===u?null:Object(s.jsxs)("div",{children:[Object(s.jsx)(b,{ticker:u,className:e.className}),Object(s.jsx)(v,{ticker:u,didPredictionLookup:L,prediction:T,handleBackendPredictionLookup:function(e,t){200===t?(C(e.future_value),x(!0),P(!0)):alert("Unable to find prediction")}}),Object(s.jsx)(h,{ticker:u,predict:!1,isTracking:k,handleActionBackend:q}),k&&Object(s.jsx)(h,{ticker:u,predict:!0,isTracking:k,handleActionBackend:q})]})}function v(e){var t=e.ticker,n=e.prediction,i=e.didPredictionLookup,r=e.handleBackendPredictionLookup;return Object(c.useEffect)((function(){i||function(e,t){j("POST","/prediction/",t,{ticker:e})}(t,r)})),null!==n?Object(s.jsxs)("div",{children:["Prediction: ",n]}):null}var k=n(22),g=n(23),m=n(24);function w(e){var t=e.stock;return Object(s.jsxs)("span",{onClick:function(e){e.preventDefault(),window.location.href="/stocks/".concat(t.ticker)},children:[t.ticker," "]})}function x(e){return Object(s.jsx)("span",{onClick:function(e){e.preventDefault(),window.location.href="/"},children:"HomeLink"})}function S(e){return Object(s.jsx)("span",{children:"ProfileLink *useless right now*"})}function y(e){var t=Object(c.useState)(""),n=Object(l.a)(t,2),i=n[0],r=n[1],o=Object(c.useState)([]),a=Object(l.a)(o,2),d=a[0],b=a[1];return Object(c.useEffect)((function(){!function(e,t){j("POST","/stocks/search",t,{searchTerm:e})}(i,(function(e,t){200===t?b(Object(u.a)(e)):alert("Error finding stock")}))}),[i]),Object(s.jsxs)("div",{children:["Need To not have list push rest of page around, will be able to search company names",Object(s.jsx)("input",{type:"text",placeholder:"Search tickers",value:i,onChange:function(e){r(e.target.value)}}),""!==i&&Object(s.jsx)("ul",{children:d.map((function(e,t){return Object(s.jsx)("li",{children:Object(s.jsx)(w,{stock:e},e.id)})}))})]})}var T=i.a.createElement,C=document.getElementById("stocks-list");C&&o.a.render(T((function(e){var t=Object(c.useState)([]),n=Object(l.a)(t,2),i=n[0];return n[1],Object(s.jsx)("div",{className:e.className,children:Object(s.jsx)(f,Object(d.a)({newStocks:i},e))})}),C.dataset),C);var E=document.getElementById("navbar");E&&o.a.render(T((function(e){return Object(s.jsx)(k.a,{children:Object(s.jsxs)(g.a,{children:[Object(s.jsxs)(m.a,{children:[" ",Object(s.jsx)(y,{})," "]}),Object(s.jsxs)(m.a,{children:[" ",Object(s.jsx)(x,{})," "]}),Object(s.jsxs)(m.a,{children:[" ",Object(s.jsx)(S,{}),"  "]})]})})}),E.dataset),E),document.querySelectorAll(".stock-detail").forEach((function(e){o.a.render(T(p,e.dataset),e)})),a()}},[[20,1,2]]]);
//# sourceMappingURL=main.08f6c4d4.chunk.js.map