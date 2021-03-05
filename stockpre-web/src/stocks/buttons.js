import React from 'react'

import {apiStockAction} from './lookup'

export function ActionButton (props) {
    const {ticker, isTracking, predict, handleActionBackend} = props

    const handleClick = (event) => {
        event.preventDefault()
        apiStockAction(ticker, predict, handleActionBackend)
    }
    const display = isTracking === true ? 'Remove' : 'Add'
    return predict === true ? <button onClick={handleClick}>Get Prediction</button> : <button onClick={handleClick}> {display} </button>
}