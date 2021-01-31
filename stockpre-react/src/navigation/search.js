import React, { useState, useEffect } from 'react'

import { StockLink } from './components'
import {apiStockSearch } from './lookup'

export function StockSearchComponent (props) {
    const [searchTerm, setSearchTerm] = useState("")
    const [searchResults, setSearchResults] = useState([])
    const handleSearchTermChange = (event) => {
      setSearchTerm(event.target.value)
    }
  
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
  
    return <div>Need To not have list push rest of page around, will be able to search company names
      <input type="text" placeholder="Search tickers" value={searchTerm} onChange={handleSearchTermChange} />
      {searchTerm !== "" && <ul>
        {searchResults.map( (item, index) => (
          <li><StockLink stock={item} key={item.id} /></li>
        ))}
      </ul>}
    </div>
  }