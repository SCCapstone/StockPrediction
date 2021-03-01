import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import { StockSearchComponent } from './search'

//Wrapper component for a link to a stock
export function StockLink(props) {
  const { stock } = props
  // Handler for when you click the component, sends you to the url
  const handleStockLink = (event) => {
    event.preventDefault()
    window.location.href = `/stocks/${stock.ticker}`
  }
  return (
    <span onClick={handleStockLink}>{stock.ticker} </span>
  )
}

// Wrapper for whole navbar component, using react-bootstrap components
export function NavigationComponent(props) {
  return (
    <Container>
      <Row>
        <Col> <StockSearchComponent /> </Col>
        <Col> <HomeLink /> </Col>
        <Col> <ProfileLink />  </Col>
      </Row>
    </Container>
  )
}

// Same as stock link, but just to home page, could be combined, just passing in other info to 'props' for direction
function HomeLink(props) {
  const handleHomeLink = (event) => {
    event.preventDefault()
    window.location.href = '/'
  }
  return (
    <span onClick={handleHomeLink}>
      HomeLink
    </span>
  )
}

function ProfileLink(props) {
  return (
    <span>
      ProfileLink *useless right now*
    </span>
  )
}