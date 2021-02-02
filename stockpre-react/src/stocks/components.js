import React, { useState, useEffect } from 'react'

import { apiStockLookup, apiPredictionLookup } from './lookup'
import { Stock } from './detail'
import { StockList } from './list'
import { ActionButton } from './buttons'

//Stock link component, redirects to the stock when clicked
export function StockLink (props) {
  const {stock} = props
  const handleStockLink = (event) => {
    event.preventDefault()
    window.location.href = `/stocks/${stock.ticker}`
  }
  return <div onClick={handleStockLink}>{stock.ticker}</div> 
}

//Wrapper for stock list, handleNewStock is a callback for if a stock is added
//While on stock page, but is not required right now
export function StockListComponent (props) {
  const [newStocks, setNewStocks] = useState([])
  const handleNewStock = (newStock) => {
    let tempNewStocks = [...newStocks]
    tempNewStocks.unshift(newStock)
    setNewStocks(tempNewStocks)
  }
  return <div className={props.className}>
    <StockList newStocks={newStocks} {...props} />
  </div>
}

//Heres the fun stuff
//Handles the entire stock detail page
//probably has alot of room for abstraction
export function StockDetailComponent(props) {
  const {tickerinit} = props //This is dumb, but i cannot find another way to do it. Ticker must be passed by props
  const [didStockLookup, setDidStockLookup] = useState(false) //have we checked to see if the user tracks the stock?
  const [ticker, setTicker] = useState(null) //if we have checked to see if we track the stock,
                                            // set the ticker again, this is done to make sure nothing is rendered before we perform the lookup
  const [isTracking, setIsTracking] = useState(false) //Is the user tracking the stock
  const [hasPrediction, setHasPrediction] = useState(false) //Does the user have a prediction for this stock?
  const [prediction, setPrediction] = useState(null) //What is the actual prediction
  const [didPredictionLookup, setDidPredictionLookup] = useState(false) //Did we do the prediction lookup

  // Used when we make api call to see if we track the stock
  const handleBackendStockLookup = (response, status) => {
    if (status === 200) {
      setTicker(response.ticker)
      setIsTracking(response.is_tracking)
    } else {
      alert('Error finding stock')
    }
  }

  // Used when we see if the stock has a prediction
  const handleBackendPredictionLookup = (response, status) => {
    if (status === 200) {
      setPrediction(response.future_value)
      setHasPrediction(true)
      setDidPredictionLookup(true)
    } else {
      alert('Unable to find prediction')
    }
  }

  // Used when we hit an action button
  const handleActionBackend = (response, status) => {
    //Status 200 means success, but nothing created
    //if we are tracking, hitting the button again would
    //untrack, so set appropriate states
    if (status === 200 && isTracking) {
      setIsTracking(false)
      setHasPrediction(false)
      setPrediction(null)
      //setTicker(response.ticker)
    } 
    //Reverse of above
    else if (status === 200 && !isTracking) {
        setIsTracking(true)
    } 
    // status 201 means something was made, this is the new prediction
    // Also must be tracking to get a prediction
    // Is tracking is likely handled in button as well
    else if (status === 201 && isTracking) {
      setPrediction(response.future_value)
      setHasPrediction(true)
    } else {
      alert('cant add/remove')
    }
  }

  //does stock lookup upon page rendering
  useEffect(() => {
    if (didStockLookup === false) {
      apiStockLookup(tickerinit, handleBackendStockLookup)
      setDidStockLookup(true)
    }

  }, [tickerinit, didStockLookup, setDidStockLookup])
  // Renders the ticker, prediction if it exists, add/remove button, get prediction button if tracking
  return ticker === null ? null :<div> 
    <Stock ticker={ticker} className={props.className} />
    <PredictionComponent ticker={ticker} didPredictionLookup={didPredictionLookup} prediction={prediction} handleBackendPredictionLookup={handleBackendPredictionLookup} />
    <ActionButton ticker={ticker} predict={false} isTracking={isTracking} handleActionBackend={handleActionBackend}/> 
    {isTracking && <ActionButton ticker={ticker} predict={true} isTracking={isTracking} handleActionBackend={handleActionBackend}/>}
  </div>
}

// Basic component for a prediction, has callbacks to handle a backend prediction lookup being performed
function PredictionComponent (props) {
  const {ticker, prediction, didPredictionLookup, handleBackendPredictionLookup} = props
  
  //If we have not done a prediction lookup, do it when page renders
  useEffect(() => {
    if (!didPredictionLookup) {
      apiPredictionLookup(ticker, handleBackendPredictionLookup)
    }
  })
  // Returns the prediction if we have one
  return prediction !== null ? <div>Prediction: {prediction}</div> : null
}