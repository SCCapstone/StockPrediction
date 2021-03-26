import React, { useState, useEffect } from "react";

import { apiStockLookup, apiPredictionLookup } from "./lookup";
import { Stock } from "./detail";
import { StockList } from "./list";
import { ActionButton } from "./buttons";

import { authToken } from '../App.js';
let updaterID;
// Shows singe quote and prediction. Routes to detailed view
export function StockLink(props) {
  const { 
    stock,
    length,
    didPredictionLookup,
    prediction,
    handleBackendPredictionLookup } = props;
  const [currentPrice, setCurrentPrice] = useState(1.0);
  const [openingPrice, setOpeningPrice] = useState(1.0);
  const [percentChange, setPercentChange] = useState(0.0);
  const [currPrediction, setCurrPrediction] = useState(null);
  const [delayState, setDelayState] = useState(false);

  const handleStockLink = (event) => {
    event.preventDefault();
    window.location.href = `/stocks/${stock.ticker.toUpperCase()}`;
  };

  const update = async () => {
    const fullfilled_request = await(await (fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${authToken}`))).json();
    console.log("Filled", fullfilled_request);
    setOpeningPrice(fullfilled_request['o']);
    setCurrentPrice(fullfilled_request['c']);
    setPercentChange((currentPrice - openingPrice) / openingPrice);
  };

  useEffect(() => {
    if (didPredictionLookup === false && !currPrediction) {
		  apiPredictionLookup(stock.ticker, handleBackendPredictionLookup);
		};
    if (prediction && !currPrediction) {
      setCurrPrediction(prediction);
    }
    const interval = setInterval(() => {
      update();
    }, 2000 * length);
    return () => {
      setCurrPrediction(null);
      clearInterval(interval);
    }
  }, [didPredictionLookup, handleBackendPredictionLookup, prediction]);
  
  return (
    <div onClick={handleStockLink} className="border m-3 p-3">
      <h5>{stock.ticker}</h5>
      <h6>{stock.company_name}</h6> 
      <div onClick={handleStockLink}>
        {currentPrice.toFixed(2)} ({percentChange >= 0 && <span>+</span>}{(percentChange * 100).toFixed(2)}%)
      </div>
    </div>
  );
}

export function StockListComponent(props) {
  const [newStocks, setNewStocks] = useState([]);
  const handleNewStock = (newStock) => {
    let tempNewStocks = [...newStocks];
    tempNewStocks.unshift(newStock);
    setNewStocks(tempNewStocks);
  };
  return (
    <div className={props.className}>
      <StockList newStocks={newStocks} {...props} />
    </div>
  );
}

export function StockDetailComponent(props) {
  const { tickerinit } = props;
  const [didStockLookup, setDidStockLookup] = useState(false);
  const [ticker, setTicker] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [hasPrediction, setHasPrediction] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [didPredictionLookup, setDidPredictionLookup] = useState(false);

  const handleBackendStockLookup = (response, status) => {
    if (status === 200) {
      setTicker(response.ticker);
      setIsTracking(response.is_tracking);
    } else {
      alert("Error finding stock");
    }
  };

  const handleBackendPredictionLookup = (response, status) => {
    if (status === 200) {
      const responsePrediction = response.prediction;
      const newPrediction =
        responsePrediction !== null
          ? {
              future_value: responsePrediction.future_value,
              upper_value: responsePrediction.upper_value,
              lower_value: responsePrediction.lower_value,
              prediction_date: response.prediction_date,
            }
          : null;
      setPrediction(newPrediction);
      setHasPrediction(true);
      setDidPredictionLookup(true);
    } else {
      alert("Unable to find prediction");
    }
  };

  const handleActionBackend = (response, status) => {
    if (status === 200 && isTracking) {
      setIsTracking(false);
      setHasPrediction(false);
      setPrediction(null);
      setTicker(response.ticker);
    } else if (status === 200 && !isTracking) {
      setIsTracking(true);
    } else if (status === 201 && isTracking) {
      //console.log("New pred", response);
      const prediction = response.prediction;
      const newPrediction = {
        future_value: prediction.future_value,
        upper_value: prediction.upper_value,
        lower_value: prediction.lower_value,
        prediction_date: response.prediction_date,
      };
      setPrediction(newPrediction);
      setHasPrediction(true);
    } else {
      alert("cant add/remove, status:", status);
    }
  };

  useEffect(() => {
    if (didStockLookup === false) {
      apiStockLookup(tickerinit, handleBackendStockLookup);
      setDidStockLookup(true);
    }
  }, [tickerinit, didStockLookup, setDidStockLookup]);
  return ticker === null ? null : (
    <div>
      <Stock
        symbol={ticker}
        didPredictionLookup={didPredictionLookup}
        prediction={prediction}
        handleBackendPredictionLookup={handleBackendPredictionLookup} 
        className={props.className} />
      <PredictionComponent
        ticker={ticker}
        didPredictionLookup={didPredictionLookup}
        prediction={prediction}
        handleBackendPredictionLookup={handleBackendPredictionLookup}
      />
      <ActionButton
        ticker={ticker}
        predict={false}
        isTracking={isTracking}
        handleActionBackend={handleActionBackend}
      />
      {isTracking && (
        <ActionButton
          ticker={ticker}
          predict={true}
          isTracking={isTracking}
          handleActionBackend={handleActionBackend}
        />
      )}
    </div>
  );
}

function PredictionComponent(props) {
  const {
    ticker,
    prediction,
    didPredictionLookup,
    handleBackendPredictionLookup,
  } = props;

  useEffect(() => {
    if (!didPredictionLookup) {
      apiPredictionLookup(ticker, handleBackendPredictionLookup);
    }
  });

  return prediction !== null ? (
    <div>
      Prediction: {prediction.future_value.toFixed(2)} Range: {prediction.lower_value.toFixed(2)} -{" "}
      {prediction.upper_value.toFixed(2)} on {prediction.prediction_date}
    </div>
  ) : null;
}
