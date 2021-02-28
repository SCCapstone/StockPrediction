import React from 'react'
import { StockSearchComponent } from './search'

//Wrapper component for a link to a stock
export function WelcomeMsg(props) {
  return (
    <div className="d-sm-flex align-items-center justify-content-between mb-4 text-center">
      <span className="h3 mb-0 text-gray-800 mt-5 ml-5">Welcome to Stock Prediction Home Page</span>
    </div>
  )
}
export function StockLink(props) {
  const { stock } = props
  // Handler for when you click the component, sends you to the url
  const handleStockLink = (event) => {
    event.preventDefault()
    window.location.href = `/stocks/${stock.ticker}`
  }
  return (
    <a href={`"/stocks/${stock.ticker}"`} onClick={handleStockLink}>{stock.ticker} </a>
  )
}

// Wrapper for whole navbar component, using react-bootstrap components
export function NavigationComponent(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white topbar mb-4 static-top shadow">
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <i className="fa fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <HomeLink className="nav-link"/>
                </li>
              </ul>
              <StockSearchComponent/>
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <ProfileLink className="nav-link"/>
                </li>
              </ul>
          </div>
        </nav>
  )
}

// Same as stock link, but just to home page, could be combined, just passing in other info to 'props' for direction
function HomeLink(props) {
  const handleHomeLink = (event) => {
    event.preventDefault()
    window.location.href = '/'
  }
  return (
    <a href={`"/"`} onClick={handleHomeLink}>
      Stock Prediction Home
    </a>
  )
}

function ProfileLink(props) {
  return (
    <span>
      Profile
    </span>
  )
}