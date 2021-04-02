import { fade, InputBase, makeStyles, TextField } from "@material-ui/core";
import { SearchRounded } from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import React, { useState, useEffect } from "react";

import { apiStockSearch } from "./lookup";

export function StockSearchComponent(props) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    if (event.keyCode == 13) {
      console.log(event.target);
      window.location.href = `/stocks/${searchTerm.toUpperCase()}`
    }
  };

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

  // Commented out for testing
  // return (
  //   <form className="d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
  //     <div className="input-group">
  //       <input
  //         type="text"
  //         className="form-control bg-light border-0 small z-index:10"
  //         placeholder="Search tickers"
  //         value={searchTerm}
  //         onChange={handleSearchTermChange}
  //         list="stocks"
  //       />
  //       <button className="button" onClick={handleSearchSumbit}>Search</button>
  //       <datalist id="stocks">
  //         {searchTerm !== "" && searchResults.map((item) => (
  //           <option value={item.ticker}></option>
  //         ))}
  //       </datalist>
  //     </div>
  //   </form>
  // );

  // Autocomplete search (not working right now)
  // return (
  //   <Autocomplete 
  //     id="demo" 
  //     freeSolo 
  //     options={testList.map((option) => option.ticker)}
  //     value={searchTerm}
  //     onChange={handleSearchTermChange} 
  //     renderInput={(params) => (
  //       <TextField {...params} label="Ticker" margin="normal" variant="outlined" onChange={handleSearchTermChange} onKeyDown={handleSearchSubmit}/> )}>
  //   </Autocomplete>
  // );

  // Regular search bar (working)
  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchRounded button/>
      </div>
      <InputBase autoComplete="true" type="text" value={searchTerm} onChange={handleSearchTermChange} onKeyDown={handleSearchSubmit} placeholder="Ticker..." classes={{root: classes.inputRoot, input: classes.inputInput}} inputProps={{ "aria-label": "search" }} list="stocks"/>
    </div>
  )
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
