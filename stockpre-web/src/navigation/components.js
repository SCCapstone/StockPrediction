import React from "react";
import { Row, Col } from "react-bootstrap";
import { StockSearchComponent } from "./search";

// Max and Ahmed Material UI
import { AppBar, IconButton, Toolbar, List, ListItem, ListItemText, makeStyles, Container, useScrollTrigger, Link, Zoom, Fab } from "@material-ui/core";
import { HomeRounded, KeyboardArrowUpRounded } from "@material-ui/icons";
import { PropTypes } from "prop-types";
import Papa from "papaparse";
import fs from "fs";

const navLinks = [
  { title: "Profile", path: "/profile" },
  { title: "Logout", path: "/logout" },
]

const useStyles = makeStyles((theme) => ({
  colorScheme: {
    background: "linear-gradient(180deg, #FE6B8B 30%, #E8A87C 90%)"
  },
  navDisplayFlex: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  navbarDisplayFlex: {
    display: "flex",
    justifyContent: "space-between"
  },
  linkText: {
    marginTop: "5px",
    textDecoration: "none",
    textTransform: "none",
    color: "white",
    "&:hover": {
      color: "white",
      textDecoration: "none"
    }
  },
  scrollTop: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2)
  },
  toolbar: {
    marginBottom: "5px"
  }
}));

export const HeaderComponent = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Toolbar id="back-to-top-anchor"/>
      <ElevationScroll {...props}>
        <AppBar className={classes.colorScheme}>
          <Toolbar className={classes.toolbar} id="back-to-top-anchor">
            <Container maxWidth="xl" className={classes.navbarDisplayFlex}>
              <IconButton href="/" className={classes.linkText} edge="start" color="inherit" aria-label="home">
                <HomeRounded fontSize="large"/>
              </IconButton>
              <StockSearchComponent/>
              <List component="nav" aria-labelledby="main navigation" className={classes.navDisplayFlex}>
                {navLinks.map(({ title, path }) => (
                  <Link href={path} key={title} className={classes.linkText} underline="always">
                    <ListItem button>
                      <ListItemText primary={title}/>
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Container>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <ScrollTop {...props}>
        <Fab className={classes.colorScheme} size="small" aria-label="scroll back to top">
          <KeyboardArrowUpRounded/>
        </Fab>
      </ScrollTop>
      <br/>
    </React.Fragment>
  );
}

function ElevationScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0
  });
  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

function ScrollTop(props) {
  const { children, window } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  });
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector("#back-to-top-anchor");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center"});
    }
  };
  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.scrollTop}>
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

// Working code
export function StockLink(props) {
  const { stock } = props;
  const handleStockLink = (event) => {
    event.preventDefault();
    window.location.href = `/stocks/${stock.ticker}`;
  };
  return <span onClick={handleStockLink}>{stock.ticker} </span>;
}

export function NavigationComponent(props) {
  return (
    <Container>
      <Row className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <Col>
          {" "}
          <StockSearchComponent />{" "}
        </Col>
        <Col>
          {" "}
          <HomeLink />{" "}
        </Col>
        <Col>
          {" "}
          <ProfileLink />{" "}
        </Col>
      </Row>
    </Container>
  );
}

function HomeLink(props) {
  const handleHomeLink = (event) => {
    event.preventDefault();
    window.location.href = "/";
  };
  return <span onClick={handleHomeLink}>Home</span>;
}

function ProfileLink(props) {
  const handleProfileLink = (event) => {
    event.preventDefault();
    window.location.href = "/profile";
  };
  return <span onClick={handleProfileLink}>Profile</span>;
}
