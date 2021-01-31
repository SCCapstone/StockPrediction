import React, { useState, useEffect } from 'react'

import { apiStockLookup, apiPredictionLookup } from './lookup'
import { Stock } from './detail'
import { StockList } from './list'
import { ActionButton } from './buttons'

export function StockLink (props) {
  const {stock} = props
  const handleStockLink = (event) => {
    event.preventDefault()
    window.location.href = `/stocks/${stock.ticker}`
  }
  return <div onClick={handleStockLink}>{stock.ticker}</div> 
}

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

export function StockDetailComponent(props) {
  const {tickerinit} = props
  const [didStockLookup, setDidStockLookup] = useState(false)
  const [ticker, setTicker] = useState(null)
  const [isTracking, setIsTracking] = useState(false)
  const [hasPrediction, setHasPrediction] = useState(false)
  const [prediction, setPrediction] = useState(null)
  const [didPredictionLookup, setDidPredictionLookup] = useState(false)

  const handleBackendStockLookup = (response, status) => {
    if (status === 200) {
      setTicker(response.ticker)
      setIsTracking(response.is_tracking)
    } else {
      alert('Error finding stock')
    }
  }

  const handleBackendPredictionLookup = (response, status) => {
    if (status === 200) {
      setPrediction(response.future_value)
      setHasPrediction(true)
      setDidPredictionLookup(true)
    } else {
      alert('Unable to find prediction')
    }
  }

  const handleActionBackend = (response, status) => {
    if (status === 200 && isTracking) {
      setIsTracking(false)
      setHasPrediction(false)
      setPrediction(null)
      //setTicker(response.ticker)
    } else if (status === 200 && !isTracking) {
        setIsTracking(true)
    } else if (status === 201 && isTracking) {
      setPrediction(response.future_value)
      setHasPrediction(true)
    } else {
      alert('cant add/remove')
    }
  }

  useEffect(() => {
    if (didStockLookup === false) {
      apiStockLookup(tickerinit, handleBackendStockLookup)
      setDidStockLookup(true)
    }

  }, [tickerinit, didStockLookup, setDidStockLookup])
  return ticker === null ? null :<div> 
    <Stock ticker={ticker} className={props.className} />
    <PredictionComponent ticker={ticker} didPredictionLookup={didPredictionLookup} prediction={prediction} handleBackendPredictionLookup={handleBackendPredictionLookup} />
    <ActionButton ticker={ticker} predict={false} isTracking={isTracking} handleActionBackend={handleActionBackend}/> 
    {isTracking && <ActionButton ticker={ticker} predict={true} isTracking={isTracking} handleActionBackend={handleActionBackend}/>}
  </div>
}

function PredictionComponent (props) {
  const {ticker, prediction, didPredictionLookup, handleBackendPredictionLookup} = props
  
  useEffect(() => {
    if (!didPredictionLookup) {
      apiPredictionLookup(ticker, handleBackendPredictionLookup)
    }
  })

  return prediction !== null ? <div>Prediction: {prediction}</div> : null
}