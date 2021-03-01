import React, { useEffect, useState } from 'react'

import { apiStockList } from './lookup'

import { StockLink } from './components'

//Stock list component
export function StockList(props) {
  const [stocksInit, setStocksInit] = useState([]) //Initial stocks in the list
  const [stocks, setStocks] = useState([]) //The stocks themselves
  const [stocksDidSet, setStocksDidSet] = useState(false) //Have the stocks in the list been set


  //When the states above change, concatenate the old stock list and new stock list
  useEffect(() => {
    const final = [...props.newStocks].concat(stocksInit)
    if (final.length !== stocks.length) {
      setStocks(final)
    }
  }, [props.newStocks, stocks, stocksInit])

  //Handles initial lookup of stocks
  useEffect(() => {
    if (stocksDidSet === false) {
      const handleStockListLookup = (response, status) => {
        if (status === 200) {
          setStocksInit([...response])
          setStocksDidSet(true)
        }
      }
      apiStockList(handleStockListLookup)
    }
  }, [stocksInit, stocksDidSet, setStocksDidSet])
  //If stocks list is not emptpy, render a list of stock links
  return <div>List will turn into list of widgets, prediction next to each ticker
          {stocks !== null && 
            stocks.map( (item, index) => ( 
              <StockLink key={index} stock={item} /> 
            ) ) } 
        </div>
}