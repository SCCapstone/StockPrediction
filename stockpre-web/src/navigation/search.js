import React, { useState, useEffect } from "react";

import { StockLink } from "./components";
import { apiStockSearch } from "./lookup";

export function StockSearchComponent(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(true);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const handleSearchTermLookup = (response, status) => {
      if (status === 200) {
        setSearchResults([...response]);
      } else {
        alert("Error finding stock");
      }
    };
    apiStockSearch(searchTerm, handleSearchTermLookup);
  }, [searchTerm]);

  return (
    <form className="d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
      <div
        className="input-group"
        onBlur={() => {
          setShowResults(false);
        }}
      >
        <input
          type="text"
          className="form-control bg-light border-0 small z-index:10"
          placeholder="Search tickers"
          value={searchTerm}
          onChange={handleSearchTermChange}
          onFocus={() => setShowResults(true)}
          // onBlur={() => setShowResults(false)}
        />
        {searchTerm !== "" && showResults && (
          <ul className="position-absolute mt-5 border border-light">
            {searchResults.map((item) => (
              <li key={item.id}>
                <StockLink stock={item} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
