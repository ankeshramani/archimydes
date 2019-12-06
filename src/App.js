import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Route, Link } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import { simpleAction } from './actions/simpleAction';
import { bindActionCreators } from 'redux';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  simpleAction = (event) => {
    this.props.simpleAction();
  }
  

  render() {
    document.body.classList.add('index-page');
    return (
      <div className="App">
        <div id="wrapper" class="animate">
          <nav class="navbar header-top fixed-top navbar-expand-lg  navbar-dark bg-dark">
            <span class="navbar-toggler-icon leftmenutrigger"></span>
            <a class="navbar-brand" href="#">LOGO</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText"
              aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarText">
              <ul class="navbar-nav animate side-nav">
                <li class="nav-item">
                  <a class="nav-link" href="#">Home
                    <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Side Menu Items</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Pricing</a>
                </li>
              </ul>
              <ul class="navbar-nav ml-md-auto d-md-flex">
                <li class="nav-item">
                  <a class="nav-link" href="#">Home
                    <span class="sr-only">(current)</span>
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Top Menu Items</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Pricing</a>
                </li>
              </ul>
            </div>
          </nav>    
        </div>
      
        <div class="container-fluid">
          <main>
            this is the main content
          </main>
          <footer class="footer">
            <div class="container">
              <div class="copyright pull-right">
                &copy; A <a href="http://www.root-nyc.com">Root NYC</a> product.
              </div>
            </div>
          </footer>          
        </div>        
      </div>
    );
  }
}

const mapStateToProps = state => ({...state});
// function mapDispatchToProps(dispatch){
//   return bindActionCreators({simpleAction}, dispatch);
// }
const mapDispatchToProps = dispatch => ({
  simpleAction: () => dispatch(simpleAction())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
