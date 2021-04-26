import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
//import App from './App';
import reportWebVitals from "./reportWebVitals";

import "bootstrap/dist/css/bootstrap.min.css";

import { StockDetailComponent, StockListComponent } from "./stocks";
import { NavigationComponent, HeaderComponent, TestCsvComponent } from "./navigation";

const e = React.createElement;

const stocksListEl = document.getElementById("stocks-list");
if (stocksListEl) {
  ReactDOM.render(e(StockListComponent, stocksListEl.dataset), stocksListEl);
}

const navigationEl = document.getElementById("navbar");
if (navigationEl) {
  ReactDOM.render(e(NavigationComponent, navigationEl.dataset), navigationEl);
}

const stockDetailElements = document.querySelectorAll(".stock-detail");
stockDetailElements.forEach((container) => {
  ReactDOM.render(e(StockDetailComponent, container.dataset), container);
});

// Max material UI

const testEl = document.getElementById("test");
if (testEl) {
  ReactDOM.render(e(HeaderComponent, testEl.dataset), testEl)
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
