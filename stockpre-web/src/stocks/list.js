import React, { useEffect, useState } from "react";

import { apiStockList } from "./lookup";

import { StockLink } from "./components";

export function StockList(props) {
  const [stocksInit, setStocksInit] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [stocksDidSet, setStocksDidSet] = useState(false);

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
        }
      };
      apiStockList(handleStockListLookup);
    }
  }, [stocksInit, stocksDidSet, setStocksDidSet]);

  return (
    <div>
      List will turn into list of widgets, prediction next to each ticker
      {stocks !== null &&
        stocks.map((item, index) => <StockLink key={index} stock={item} />)}
    </div>
  );
}
