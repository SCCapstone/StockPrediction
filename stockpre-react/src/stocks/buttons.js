import React from 'react'

import {apiStockAction} from './lookup'

// Action button component, same component for adding/removing and getting prediction
export function ActionButton (props) {
    const {ticker, isTracking, predict, handleActionBackend} = props

    //Callback to api when button clicked
    const handleClick = (event) => {
        event.preventDefault()
        apiStockAction(ticker, predict, handleActionBackend)
    }
    const display = isTracking === true ? 'Remove' : 'Add' //basic display logic for add or remove, so we can just have one button instead of 2
    // renders prediction button if 'predict' prop has been set, if not render add/remove button
    return predict === true ? <button className="btn btn-primary mr-3" onClick={handleClick}>Get Prediction</button> : <button className="btn btn-danger" onClick={handleClick}> {display} </button>
}