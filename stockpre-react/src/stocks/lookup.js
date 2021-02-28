import {backendlookup} from '../lookup'

//Handles lookup for a ticker, takes ticker into url
//Connects to stock_detail_api_view
//Used for detail view mostly
export function apiStockLookup(ticker, callback) {
    console.log(ticker)
    backendlookup("GET", `/stocks/${ticker}`, callback)
} 

//Handles generation of stock list
//Connects to stock_list_api_view
//Used for home page view
export function apiStockList(callback) {
    const endpoint = '/stocks/'
    backendlookup("POST", endpoint, callback)
}

//Handles action being performed on stock; adding/removing or getting prediction
//takes ticker into url if adding/removing, takes ticker into request data if predicting
//connects to stocks_action_api_view or prediction_create_api_view
//Used for adding AND removing a stock, as well as prediction GENERATION
export function apiStockAction(ticker, predict, callback) {
    if (predict) {
        backendlookup("POST", `/prediction/create`, callback, {"ticker": ticker})
    } else {
        backendlookup("POST", `/stocks/${ticker}/action`, callback)
    }
}

//Used ONLY for retrieving a prediction/seeing if one already exists
//takes ticker into request data
//connects to prediction_detail_api_view
export function apiPredictionLookup(ticker, callback) {
    backendlookup("POST", `/prediction/`, callback, {"ticker": ticker})
}