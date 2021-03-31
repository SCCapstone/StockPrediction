import React, { useState, useEffect } from "react";

import { apiStockSearch } from "./lookup";

export function StockSearchComponent(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSumbit = (event) => {
    event.preventDefault();
    console.log(event.target);
    window.location.href = `/stocks/${searchTerm.toUpperCase()}`
  }

  useEffect(() => {
    const handleSearchTermLookup = (response, status) => {
      if (status === 200) {
        setSearchResults([...response]);
      } else if (status === 403) {
        alert("Unauthorized, must login to access");
      } else {
        alert("Error finding stock, status:", status);
      }
    };
    apiStockSearch(searchTerm, handleSearchTermLookup);
  }, [searchTerm]);

  return (
    <form className="d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
      <div className="input-group">
        <input
          type="text"
          className="form-control bg-light border-0 small z-index:10"
          placeholder="Search tickers"
          value={searchTerm}
          onChange={handleSearchTermChange}
          list="stocks"
        />
        <button className="button" onClick={handleSearchSumbit}>Search</button>
        <datalist id="stocks">
          {searchTerm !== "" && searchResults.map((item) => (
            <option value={item.ticker}></option>
          ))}
        </datalist>
      </div>
    </form>
  );
}
