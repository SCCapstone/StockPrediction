(this["webpackJsonpstockpre-web"]=this["webpackJsonpstockpre-web"]||[]).push([[0],{13:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),i=n(5),r=n.n(i),o=(n(13),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,17)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,r=t.getTTFB;n(e),c(e),a(e),i(e),r(e)}))}),s=(n(14),n(0)),l=n(8),d=n(3),u=n(2);function b(e,t,n,c){var a;c&&(a=JSON.stringify(c));var i=new XMLHttpRequest,r="http://127.0.0.1:8000/api".concat(t);i.responseType="json";var o=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split(";"),c=0;c<n.length;c++){var a=n[c].trim();if(a.substring(0,e.length+1)===e+"="){t=decodeURIComponent(a.substring(e.length+1));break}}return t}("csrftoken");i.open(e,r),i.setRequestHeader("Content-Type","application/json"),o&&(i.setRequestHeader("X-Requested-With","XMLHttpRequest"),i.setRequestHeader("X-CSRFToken",o)),i.onload=function(){403===i.status&&("Authentication credentials were not provided."===i.response.detail&&-1===window.location.href.indexOf("login")&&(window.location.href="/login?showLoginRequired=true"));n(i.response,i.status)},i.onerror=function(e){n({message:"Request was an error"},400)},i.send(a)}function j(e){var t=e.ticker;return console.log(t),Object(c.useEffect)((function(){var e=document.createElement("script");e.type="text/javascript",e.src="https://s3.tradingview.com/tv.js";var n=document.createElement("script");return n.type="text/javascript",n.innerHTML='new TradingView.widget({\n        "autosize": true,\n        "symbol": "'.concat(t,'",\n        "interval": "D",\n        "timezone": "Etc/UTC",\n        "theme": "light",\n        "style": "1",\n        "locale": "en",\n        "toolbar_bg": "#f1f3f6",\n        "enable_publishing": false,\n        "hide_top_toolbar": true,\n        "hide_legend": true,\n        "save_image": false,\n        "container_id": "tradingview_29472"\n        });'),e.appendChild(n),document.body.appendChild(e),function(){try{e.removeChild(n),document.body.removeChild(e)}catch(t){}}}),[]),Object(s.jsxs)("div",{class:"tradingview-widget-container",style:{padding:"40px"},children:[Object(s.jsx)("div",{id:"tradingview_29472"}),Object(s.jsxs)("div",{class:"tradingview-widget-copyright",children:[Object(s.jsx)("a",{href:"https://www.tradingview.com/symbols/".concat(t,"/"),rel:"noopener",target:"_blank",children:Object(s.jsxs)("span",{class:"blue-text",children:[t," Chart"]})})," by TradingView"]})]})}function f(e){var t=Object(c.useState)([]),n=Object(u.a)(t,2),a=n[0],i=n[1],r=Object(c.useState)([]),o=Object(u.a)(r,2),l=o[0],j=o[1],f=Object(c.useState)(!1),m=Object(u.a)(f,2),h=m[0],v=m[1];return Object(c.useEffect)((function(){var t=Object(d.a)(e.newStocks).concat(a);t.length!==l.length&&j(t)}),[e.newStocks,l,a]),Object(c.useEffect)((function(){if(!1===h){b("POST","/stocks/",(function(e,t){200===t&&(i(Object(d.a)(e)),v(!0))}))}}),[a,h,v]),Object(s.jsxs)("div",{children:["Predictions and Proper Routing to be added",null!==l&&l.map((function(e,t){return Object(s.jsx)(p,{stock:e},t)}))]})}function m(e){var t=e.ticker,n=e.isTracking,c=e.predict,a=e.handleActionBackend,i=function(e){e.preventDefault(),function(e,t,n){t?b("POST","/prediction/create",n,{ticker:e}):b("POST","/stocks/".concat(e,"/action"),n)}(t,c,a)},r=!0===n?"Remove":"Add";return!0===c?Object(s.jsx)("button",{className:"btn btn-primary mr-3",onClick:i,children:"Get Prediction"}):Object(s.jsxs)("button",{className:"btn btn-danger",onClick:i,children:[" ",r," "]})}function p(e){var t=e.stock;return Object(c.useEffect)((function(){var e=document.createElement("script");return e.type="text/javascript",e.src="https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js",e.async=!0,e.innerHTML='{\n      "symbol": "NASDAQ:'.concat(t.ticker,'",\n      "width": 350,\n      "colorTheme": "light",\n      "isTransparent": false,\n      "locale": "en"\n    }'),document.body.appendChild(e),function(){try{document.body.removeChild(e)}catch(t){console.log("Failed")}}})),Object(s.jsx)("div",{onClick:function(e){e.preventDefault(),window.location.href="/stocks/".concat(t.ticker)},children:Object(s.jsx)("div",{class:"tradingview-widget-container",children:Object(s.jsx)("div",{class:"tradingview-widget-container__widget"})})})}function h(e){var t=e.tickerinit,n=Object(c.useState)(!1),a=Object(u.a)(n,2),i=a[0],r=a[1],o=Object(c.useState)(null),l=Object(u.a)(o,2),d=l[0],f=l[1],p=Object(c.useState)(!1),h=Object(u.a)(p,2),O=h[0],g=h[1],k=Object(c.useState)(!1),x=Object(u.a)(k,2),w=(x[0],x[1]),y=Object(c.useState)(null),S=Object(u.a)(y,2),N=S[0],T=S[1],C=Object(c.useState)(!1),E=Object(u.a)(C,2),P=E[0],_=E[1],R=function(e,t){200===t?(f(e.ticker),g(e.is_tracking)):alert("Error finding stock")},L=function(e,t){200===t&&O?(g(!1),w(!1),T(null)):200!==t||O?201===t&&O?(T(e.future_value),w(!0)):alert("cant add/remove"):g(!0)};return Object(c.useEffect)((function(){!1===i&&(!function(e,t){console.log(e),b("GET","/stocks/".concat(e),t)}(t,R),r(!0))}),[t,i,r]),null===d?null:Object(s.jsxs)("div",{children:[Object(s.jsx)(j,{ticker:d,className:e.className}),Object(s.jsx)(v,{ticker:d,didPredictionLookup:P,prediction:N,handleBackendPredictionLookup:function(e,t){200===t?(T(e.future_value),w(!0),_(!0)):alert("Unable to find prediction")}}),Object(s.jsx)(m,{ticker:d,predict:!1,isTracking:O,handleActionBackend:L}),O&&Object(s.jsx)(m,{ticker:d,predict:!0,isTracking:O,handleActionBackend:L})]})}function v(e){var t=e.ticker,n=e.prediction,a=e.didPredictionLookup,i=e.handleBackendPredictionLookup;return Object(c.useEffect)((function(){a||function(e,t){b("POST","/prediction/",t,{ticker:e})}(t,i)})),null!==n?Object(s.jsxs)("div",{children:["Prediction: ",n]}):null}function O(e){return Object(s.jsx)("a",{href:'"/"',onClick:function(e){e.preventDefault(),window.location.href="/"},children:"Stock Prediction Home"})}function g(e){return Object(s.jsx)("span",{children:"Profile"})}function k(e){var t=Object(c.useState)(""),n=Object(u.a)(t,2),a=n[0],i=n[1],r=Object(c.useState)([]),o=Object(u.a)(r,2),l=o[0],j=o[1];return Object(c.useEffect)((function(){!function(e,t){b("POST","/stocks/search",t,{searchTerm:e})}(a,(function(e,t){200===t?j(Object(d.a)(e)):alert("Error finding stock")}))}),[a]),Object(s.jsx)("form",{className:"d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search",children:Object(s.jsxs)("div",{className:"input-group",children:[Object(s.jsx)("input",{list:"stocks",type:"text",className:"form-control bg-light border-0 small",placeholder:"Search tickers",value:a,onChange:function(e){i(e.target.value)}}),Object(s.jsx)("div",{className:"input-group-append",children:Object(s.jsx)("button",{className:"btn btn-primary",type:"button",onClick:function(e){window.location.href="/stocks/".concat(a.toUpperCase())},children:Object(s.jsx)("i",{className:"fas fa-search fa-sm",children:"Search"})})}),""!==a&&Object(s.jsx)("datalist",{className:"navbar-nav",id:"stocks",children:l.map((function(e,t){return Object(s.jsx)("option",{value:e},t)}))})]})})}var x=a.a.createElement,w=document.getElementById("stocks-list");w&&r.a.render(x((function(e){var t=Object(c.useState)([]),n=Object(u.a)(t,2),a=n[0];return n[1],Object(s.jsx)("div",{className:e.className,children:Object(s.jsx)(f,Object(l.a)({newStocks:a},e))})}),w.dataset),w);var y=document.getElementById("navbar");y&&r.a.render(x((function(e){return Object(s.jsxs)("nav",{className:"navbar navbar-expand-lg navbar-light bg-white topbar mb-4 static-top shadow",children:[Object(s.jsx)("button",{id:"sidebarToggleTop",className:"btn btn-link d-md-none rounded-circle mr-3","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",children:Object(s.jsx)("i",{className:"fa fa-bars"})}),Object(s.jsxs)("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent",children:[Object(s.jsx)("ul",{className:"navbar-nav mr-auto",children:Object(s.jsx)("li",{className:"nav-item",children:Object(s.jsx)(O,{className:"nav-link"})})}),Object(s.jsx)(k,{}),Object(s.jsx)("ul",{className:"navbar-nav mr-auto",children:Object(s.jsx)("li",{className:"nav-item",children:Object(s.jsx)(g,{className:"nav-link"})})})]})]})}),y.dataset),y),document.querySelectorAll(".stock-detail").forEach((function(e){r.a.render(x(h,e.dataset),e)}));var S=document.getElementById("welcome");S&&r.a.render(x((function(e){return Object(s.jsx)("div",{className:"d-sm-flex align-items-center justify-content-between mb-4 text-center",children:Object(s.jsx)("span",{className:"h3 mb-0 text-gray-800 mt-5 ml-5",children:"Welcome to Stock Prediction Home Page"})})}),S.dataset),S),o()}},[[16,1,2]]]);
//# sourceMappingURL=main.b4150848.chunk.js.map