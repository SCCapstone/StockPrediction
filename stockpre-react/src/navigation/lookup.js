import { backendlookup } from '../lookup'

// Handles api lookup for search bar, takes in the searchTerm as request data,
// Endpoint is /stocks/search -> connects to stock_search_api_view in /stocks/api/views.py
export function apiStockSearch(searchTerm, callback) {
    const endpoint = '/stocks/search'
    backendlookup("POST", endpoint, callback, {"searchTerm": searchTerm})
}