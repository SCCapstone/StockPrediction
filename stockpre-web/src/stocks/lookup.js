import { backendlookup } from "../lookup";

export function apiStockLookup(ticker, callback) {
  backendlookup("GET", `/stocks/${ticker}`, callback);
}

export function apiStockList(callback) {
  const endpoint = "/stocks/";
  backendlookup("POST", endpoint, callback);
}

export function apiStockAction(ticker, predict, callback) {
  if (predict) {
    backendlookup("POST", `/prediction/create`, callback, { ticker: ticker });
  } else {
    backendlookup("POST", `/stocks/${ticker}/action`, callback);
  }
}

export function apiPredictionLookup(ticker, callback) {
  backendlookup("POST", `/prediction/`, callback, { ticker: ticker });
}
