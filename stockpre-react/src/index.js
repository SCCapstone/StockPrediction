import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';

import { StockDetailComponent, StockListComponent } from './stocks'
import { NavigationComponent } from './navigation'

// This stuff creates new elements and attatches them to the javascript (React) code, as well as links them to the webpage
// Probably dont need to do anything here
const e = React.createElement

const stocksListEl = document.getElementById('stocks-list')
if (stocksListEl) {
  ReactDOM.render(e(StockListComponent, stocksListEl.dataset), stocksListEl)
}

const navigationEl = document.getElementById('navbar')
if (navigationEl) {
  ReactDOM.render(e(NavigationComponent, navigationEl.dataset), navigationEl)
}

const stockDetailElements = document.querySelectorAll(".stock-detail")
stockDetailElements.forEach(container => {
  ReactDOM.render(
    e(StockDetailComponent, container.dataset),
    container);
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
