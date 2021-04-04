import { fade, InputBase, makeStyles, TextField } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { useState, useEffect } from "react";

import { apiStockSearch } from "./lookup";

export function StockSearchComponent(props) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState(undefined);
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchTermChange = (event, value) => {
    if (event && event.type === 'change') {
      console.log("TYPED: ", event.target.value)
      setSearchTerm(event.target.value);
    } else {
      console.log("AUTO SEARCH: ", value);
      setSearchTerm(value);
    }
    console.log("SEARCHTERM: ", searchTerm);
  };

  const handleSearchSubmit = (event) => {
    console.log("SEARCH SUBMIT: ", event);
    console.log(searchTerm);
    event.preventDefault();
    window.location.href = `/stocks/${searchTerm.toUpperCase()}`
  };

  const handleSearchTermLookup = (response, status) => {
    if (status === 200) {
      setSearchResults([...response]);
      console.log("SEARCH RESULTS: ", searchResults);
    } else if (status === 403) {
      alert("Unauthorized, must login to access");
    } else {
      alert("Error finding stock, status:", status);
    }
  };

  useEffect(() => {
    apiStockSearch(searchTerm, handleSearchTermLookup);
  }, [searchTerm]);

  return (
    <form onSubmit={handleSearchSubmit}>
      <Autocomplete 
        id="demo" 
        value={searchTerm}
        freeSolo
        options={searchResults.map((option) => option.ticker)}
        getOptionLabel={option => option}
        getOptionSelected={(option, value) => option === value.ticker}
        onChange={handleSearchTermChange} 
        onInputChange={(event) => handleSearchTermChange(event, undefined)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Ticker"
            margin="normal"
            variant="outlined"
          /> 
        )}
      />
    </form>
  );
}

const testList = [
  { ticker: "AAPL" },
  { ticker: "AMZN" },
  { ticker: "TSLA" },
  { ticker: "MSFT" },
  { ticker: "FORD" },
  { ticker: "GE" },
  { ticker: "SMSG" },
  { ticker: "UAVS" },
]

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: "50px",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "50%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0,2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    padding: theme.spacing(3, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));
