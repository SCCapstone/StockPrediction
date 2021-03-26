import React, { useEffect, useState } from "react";

import { apiStockList } from "./lookup";

import { StockLink } from "./components";

export function StockList(props) {
  const [stocksInit, setStocksInit] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [stocksDidSet, setStocksDidSet] = useState(false);
  const [hasPrediction, setHasPrediction] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [didPredictionLookup, setDidPredictionLookup] = useState(false);

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

  useEffect(() => {
    const final = [...props.newStocks].concat(stocksInit);
    if (final.length !== stocks.length) {
      setStocks(final);
    }
  }, [props.newStocks, stocks, stocksInit]);

  useEffect(() => {
    if (stocksDidSet === false) {
      const handleStockListLookup = (response, status) => {
        if (status === 200) {
          setStocksInit([...response]);
          setStocksDidSet(true);
        } else {
          alert("Error, status:", status);
        }
      };
      apiStockList(handleStockListLookup);
    }
  }, [stocksInit, stocksDidSet, setStocksDidSet]);

  return (
    <div>
      {stocks !== null &&
        stocks.map((item, index) => <StockLink 
          key={index}
          stock={item}
          length={stocks.length}
          didPredictionLookup={didPredictionLookup}
          prediction={prediction}
          handleBackendPredictionLookup={handleBackendPredictionLookup}/>
        )
      }
    </div>
  );
}
