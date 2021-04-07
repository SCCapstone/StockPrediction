import React, { useState, useEffect } from "react";
import { apiStockLookup, apiPredictionLookup } from "./lookup";
import { Stock } from "./detail";
import { StockList } from "./list";
import { ActionButton } from "./buttons";
import { authToken } from '../App.js';

import { Button, Card, CardContent, CardHeader, Chip, Grid, makeStyles, Typography } from '@material-ui/core'

// Shows singe quote and prediction. Routes to detailed view
export function StockLink(props) {
  const { 
    stock,
    length
  } = props;
  const [currentPrice, setCurrentPrice] = useState('---');
  const [percentChange, setPercentChange] = useState('---');
  const [prediction, setPrediction] = useState(null);
  const [currPrediction, setCurrPrediction] = useState(null);
  const [hasPrediction, setHasPrediction] = useState(false);
  const [didPredictionLookup, setDidPredictionLookup] = useState(false);
  const classes = useStyles();
  
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

  const handleStockLink = (event) => {
    event.preventDefault();
    window.location.href = `/stocks/${stock.ticker.toUpperCase()}`;
  };

  const update = () => {
    fetch(`https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${authToken}`).then(request => {
      request.json().then(fullfilled_request => {
        console.log("Filled", fullfilled_request);
        var _openingPrice;
        var _currentPrice;
        try {
          _openingPrice = parseFloat(fullfilled_request['o']);
          _currentPrice = parseFloat(fullfilled_request['c']);
          setCurrentPrice(_currentPrice.toFixed(2));
        } catch {
          // Continue
        }
        setPercentChange((100.0 * (_currentPrice - _openingPrice) / _openingPrice).toFixed(2));
      });
    });
  };

  

  useEffect(() => {
    if (!didPredictionLookup && !currPrediction) {
      apiPredictionLookup(stock.ticker, handleBackendPredictionLookup);
    }
    if (!currPrediction && prediction) {
      setCurrPrediction(prediction);
    }
    const interval = setInterval(() => {
      update();
    }, 5000 * length);
    return () => {
      clearInterval(interval);
    }
  }, [didPredictionLookup, handleBackendPredictionLookup, prediction]);
  
  // Zane's working example
  // return (
  //   <div onClick={handleStockLink} className="border m-3 p-3">
  //     <h5>{stock.ticker}</h5>
  //     <h6>{stock.company_name}</h6> 
  //     <div onClick={handleStockLink}>
  //       {currentPrice.toFixed(2)} ({percentChange >= 0 && <span>+</span>}{(percentChange * 100).toFixed(2)}%)
  //     </div>
  //   </div>
  // );

  // Max testing
  return (
    <Grid container spacing={0} direction="column" alignItems="center" justify="space-evenly">
      <Card className={classes.root}>
        <CardHeader className={classes.header} title={stock.company_name} subheader={stock.ticker}/>
        <CardContent>
          <Grid container direction="row" alignContent="flex-start" justify="space-evenly">
            <Grid item direction="column" alignItems="flex-start" justify="space-evenly">
              <Typography>
                Current Price: { currentPrice } ({ percentChange !== "---" && parseFloat(percentChange) >= 0 && "+" }{ percentChange }%)
              </Typography>
              { hasPrediction && 
                <Typography>
                  Prediction: { currPrediction !== null && currPrediction.future_value } @ { currPrediction !== null && currPrediction.prediction_date }
                </Typography>
              }
            </Grid>
            <Grid item direction="center" alignItems="flex-end" justify="space-evenly">
              <Button className={classes.button} variant="contained" onClick={handleStockLink}>
                Details
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(180deg, #FE6B8B 30%, #E8A87C 90%)',
    marginTop: '5px',
    marginBottom: '5px',
    borderRadius: '50px',
    width: 425
  },
  header: {
    textAlign: 'center'
  },
  prediction: {
    background: 'linear-gradient(180deg, #FE6B8B 30%, #E8A87C 90%)',
    marginLeft: "5px"
  },
  button: {
    backgroundColor: 'white',
    color: 'black'
  }
})

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
      <br/>
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
      <Grid container direction="column" justify="center" alignItems="center">
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
        <Grid container direction="row" alignItems="center" justify="center">
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
        </Grid>
      </Grid>
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
  const classes = useStyles();

  useEffect(() => {
    if (!didPredictionLookup) {
      apiPredictionLookup(ticker, handleBackendPredictionLookup);
    }
  });

  // Zane working code
  // return prediction !== null ? (
  //   <div>
  //     Prediction: {prediction.future_value.toFixed(2)} Range: {prediction.lower_value.toFixed(2)} -{" "}
  //     {prediction.upper_value.toFixed(2)} on {prediction.prediction_date}
  //   </div>
  // ) : null;

  // Max testing
  return prediction !== null ? (
    <div className="mb-1">
      <p>{}</p>
      <Chip label={"Predicted Price: $" + prediction.future_value.toFixed(2)} className={classes.prediction}/>
      <Chip label={"Range: $" + prediction.lower_value.toFixed(2) + " to $" + prediction.upper_value.toFixed(2)} className={classes.prediction}/>
      <Chip label={"Date: " + prediction.prediction_date} className={classes.prediction}/>
    </div>
  ) : null;
}
