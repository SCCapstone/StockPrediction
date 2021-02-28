import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import {Stock} from './components/StockPredictions';
import {Home} from './components/Home';

function App() {
  return (
    <div id="wrapper">
<Router>
    <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

      <a className="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
        <div className="sidebar-brand-icon rotate-n-15">
        <i className="fas fa-chart-line"></i>
        </div>
        <div className="sidebar-brand-text mx-3">SPA</div>
      </a>

      <hr className="sidebar-divider my-0" />

      <li className="nav-item">
          <Link to="/Home" className="nav-link">Home </Link>
      </li>

      <li className="nav-item">
             <Link to="/Stock" className="nav-link"> Stock Portfolio</Link>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>

    </ul>

    <div id="content-wrapper" className="d-flex flex-column">


    <div className="App content">
     
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

      
          <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3">
            <i className="fa fa-bars"></i>
          </button>

        
          <form className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
            <div className="input-group">
              <input type="text" className="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2" />
              <div className="input-group-append">
                <button className="btn btn-primary" type="button">
                  <i className="fas fa-search fa-sm"></i>
                </button>
              </div>
            </div>
          </form>

          <ul className="navbar-nav ml-auto">


            <div className="topbar-divider d-none d-sm-block"></div>

            <li className="nav-item dropdown no-arrow">
              <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="mr-2 d-none d-lg-inline text-gray-600 small">Valerie Luna</span>
                <img className="img-profile rounded-circle" src="https://source.unsplash.com/QAB-WJcbgJk/60x60" />
              </a>
              <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
                <a className="dropdown-item" href="#">
                  <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                  Profile
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                  Settings
                </a>
                <a className="dropdown-item" href="#">
                  <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                  Activity Log
                </a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
                  <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                  Logout
                </a>
              </div>
            </li>

          </ul>

        </nav>

        <div className="container-fluid">
      <Switch>
          <Route path="/Stock">
            <Stock />
          </Route>
          <Route path="/Home">
          <Home />
          </Route>
          <Route path="/">
                  <Home />
          </Route>
       </Switch>
</div>
{/* <div class="footer">
  <p>Footer</p>
</div> */}
    </div>
   
    <footer className="sticky-footer bg-white" style={{position: 'fixed',bottom: '0',width: '100%'}}>
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright &copy; Stock Prediction web Application</span>
          </div>
        </div>
      </footer>
    </div>
    </Router>
    </div>
  );
}

export default App;