import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Navigation/Footer";

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import LaWebRouter from './../LaWeb_reducer/LaWebRouter';

import LaWebApp from './../LaWeb_reducer/reducers';

let store = createStore(
  LaWebApp,
)

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          
          <Provider store={store}>
            <Navigation />
            <LaWebRouter />
          </Provider>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
