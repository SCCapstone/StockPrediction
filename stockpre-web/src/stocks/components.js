import React, { useState, useEffect } from "react";
import { apiStockLookup, apiPredictionLookup, apiStockAction } from "./lookup";
import { Stock } from "./detail";
import { StockList } from "./list";
import { ActionButton, AddRemoveButton } from "./buttons";
import { authToken } from "../App.js";

import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";

// Shows singe quote and prediction. Routes to detailed view
export function StockLink(props) {
  const {
    stock,
    length,
    didPredictionLookup,
    prediction,
    handleBackendPredictionLookup,
  } = props;
  const [currentPrice, setCurrentPrice] = useState("Loading...");
  const [percentChange, setPercentChange] = useState("Loading...");
  const [currPrediction, setCurrPrediction] = useState(null);
  const classes = useStyles();

  const handleStockLink = (event) => {
    event.preventDefault();
    window.location.href = `/stocks/${stock.ticker.toUpperCase()}`;
  };

  const handleRemove = (event) => {
    event.preventDefault();
    apiStockAction(stock.ticker, false, () => {});
  };

  const update = () => {
    fetch(
      `https://finnhub.io/api/v1/quote?symbol=${stock.ticker}&token=${authToken}`
    ).then((request) => {
      request.json().then((fullfilled_request) => {
        console.log("Filled", fullfilled_request);
        try {
          var _openingPrice = parseFloat(fullfilled_request["o"]);
          var _currentPrice = parseFloat(fullfilled_request["c"]);
          setCurrentPrice(_currentPrice.toFixed(2));
          var _percentChange =
            (100.0 * (_currentPrice - _openingPrice)) / _openingPrice;
          setPercentChange(
            (_percentChange < 0.0 ? "" : "+") + _percentChange.toFixed(2) + "%"
          );
        } catch {
          setCurrentPrice("Loading...");
          setPercentChange("Loading...");
        }
      });
    });
  };

  useEffect(() => {
    if (didPredictionLookup === false && !currPrediction) {
      apiPredictionLookup(stock.ticker, handleBackendPredictionLookup);
    }
    if (prediction && !currPrediction) {
      setCurrPrediction(prediction);
    }
    const interval = setInterval(() => {
      update();
    }, 5000 * length);
    return () => {
      setCurrPrediction(null);
      clearInterval(interval);
    };
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
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="space-evenly"
    >
      <Card className={classes.root}>
        <CardHeader
          className={classes.header}
          title={stock.company_name}
          subheader={stock.ticker}
        />
        <CardContent>
          <Grid
            container
            direction="row"
            alignContent="flex-start"
            justify="space-evenly"
          >
            <Grid item>
              <Typography>Current Price: {currentPrice}</Typography>
              <Typography>Change: {percentChange}</Typography>
            </Grid>
            <Grid item>
              <Button
                className={classes.button}
                variant="contained"
                onClick={handleStockLink}
              >
                Details
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
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
      <br />
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
          className={props.className}
        />
        <PredictionComponent
          ticker={ticker}
          didPredictionLookup={didPredictionLookup}
          prediction={prediction}
          handleBackendPredictionLookup={handleBackendPredictionLookup}
        />
        <Grid container direction="row" alignItems="center" justify="center">
          <AddRemoveButton
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

  return prediction !== null ? (
    <div className="mb-1">
      <p>{}</p>
      <Chip
        label={"Predicted Price: $" + prediction.future_value.toFixed(2)}
        className={classes.prediction}
      />
      <Chip
        label={
          "Range: $" +
          prediction.lower_value.toFixed(2) +
          " to $" +
          prediction.upper_value.toFixed(2)
        }
        className={classes.prediction}
      />
      <Chip
        label={"Date: " + prediction.prediction_date}
        className={classes.prediction}
      />
    </div>
  ) : null;
}

const popularStocks = [
  { ticker: "AAPL", company_name: "Apple Inc." },
  { ticker: "TSLA", company_name: "Tesla, Inc." },
  { ticker: "AMZN", company_name: "Amazon.com, Inc." },
  { ticker: "NFLX", company_name: "Netflix, Inc." },
  { ticker: "MSFT", company_name: "Microsoft Corporation" },
];

export function LandingPageComponent(props) {
  const classes = useStyles();
  return (
    <div>
      <Grid container direction="row" xs={12}>
        <Grid container direction="column" xs={6} alignItems="center">
          <Typography variant="h4" className={classes.h4}>
            Stock Prediction - Home
          </Typography>
          <Typography variant="h6" align="center">
            Welcome to the Stock Prediction home page! Here you are able to
            predict the prices of your favorite stocks on the stock market. To
            begin, simply search a company name or stock ticker and hit enter.
          </Typography>
          <Grid item>
            <Card className={classes.landingRoot}>
              <CardMedia
                className={classes.landingMedia}
                component="img"
                image="https://user-images.githubusercontent.com/65428832/115729365-5ba3b300-a353-11eb-81a9-808eebcce8c2.png"
              />
            </Card>
          </Grid>
          <Typography variant="h6" align="center">
            Once your stock has loaded, you have the option to add it to your
            watchlist. After adding it to your watchlist, you can predict the
            stock's price giving you a 30 day forecast, or you can remove it if
            you are no longer interested.
          </Typography>
          <Grid item>
            <Card className={classes.landingRoot}>
              <CardMedia
                className={classes.landingMedia}
                component="img"
                image="https://user-images.githubusercontent.com/65428832/115729385-5fcfd080-a353-11eb-8099-d263f6492f10.png"
              />
            </Card>
          </Grid>
          <Typography variant="h6" align="center">
            Thanks for using our website, we wish you the best of luck in the
            market!
          </Typography>
        </Grid>
        <Grid container direction="column" xs={6} alignItems="center">
          <Typography variant="h4" className={classes.h4}>
            Popular Stocks
          </Typography>
          <StockList newStocks={popularStocks} {...props}></StockList>
        </Grid>
      </Grid>
      <Typography variant="h4" className={classes.h4} align="center">
        Your Tracked Stocks
      </Typography>
    </div>
  );
}

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(180deg, #FE6B8B 30%, #E8A87C 90%)",
    marginTop: "5px",
    marginBottom: "5px",
    borderRadius: "50px",
    width: 425,
  },
  header: {
    textAlign: "center",
  },
  prediction: {
    background: "linear-gradient(180deg, #FE6B8B 30%, #E8A87C 90%)",
    marginLeft: "5px",
  },
  button: {
    backgroundColor: "white",
    color: "black",
    borderRadius: "50px",
  },
  landingRoot: {
    maxWidth: 550,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    margin: "5px",
  },
  h4: {
    color: "#FE6B8B",
  },
  landingMedia: {
    height: "100%",
    width: "100%",
  },
});
