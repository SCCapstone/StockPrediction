import React from 'react'

//Simple component all it does is display the ticker for a stock
export function Stock(props) {
    const {ticker} = props
    return <div>{ticker}
    </div>
}