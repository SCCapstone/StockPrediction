import React, { useState, useEffect } from 'react'

import { StockLink } from './components'
import {apiStockSearch } from './lookup'

// Search bar component
export function StockSearchComponent (props) {
    const [searchTerm, setSearchTerm] = useState("") // State for what the current search term in the search bar is
    const [searchResults, setSearchResults] = useState([]) // State for what the current search results are

    //Callback for when search term changes
    const handleSearchTermChange = (event) => {
      setSearchTerm(event.target.value)
    }
    const searchStock = (event) => {
      window.location.href = `/stocks/${searchTerm.toUpperCase()}`
    }
  
    //Called when anything changes on this component, ie handles lookup for when you modify the search term
    useEffect(() => {
      const handleSearchTermLookup = (response, status) => {
        if (status === 200) {
          setSearchResults([...response])
        } else {
          alert('Error finding stock')
        }
      }
      apiStockSearch(searchTerm, handleSearchTermLookup)
    }, [searchTerm])
    
    // Input for search, as well as list of search results, all of which are links respectively, rendering
    // If the search term in not nothing, so nothing renders if you dont type stuff in
    return <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
      <div className="input-group">
      <input list="stocks" type="text" className="form-control bg-light border-0 small" placeholder="Search tickers" value={searchTerm} onChange={handleSearchTermChange} />
      <div className="input-group-append">
                  <button className="btn btn-primary" type="button" onClick={searchStock}>
                    <i className="fas fa-search fa-sm">Search</i>
                  </button></div>
      {searchTerm !== "" && <datalist className="navbar-nav" id="stocks">
        {searchResults.map( (item, index) => (
          <option key={index} value={item}/>
        ))}
      </datalist>
      }
      </div>
    </form>
  }