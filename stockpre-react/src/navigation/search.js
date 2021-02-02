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
    return <div>Need To not have list push rest of page around, will be able to search company names
      <input type="text" placeholder="Search tickers" value={searchTerm} onChange={handleSearchTermChange} />
      {searchTerm !== "" && <ul>
        {searchResults.map( (item, index) => (
          <li><StockLink stock={item} key={item.id} /></li>
        ))}
      </ul>}
    </div>
  }