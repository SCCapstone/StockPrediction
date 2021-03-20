import { backendlookup } from '../lookup'

export function apiStockSearch(searchTerm, callback) {
    const endpoint = '/stocks/search'
    backendlookup("POST", endpoint, callback, {"searchTerm": searchTerm})
}