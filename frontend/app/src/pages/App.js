import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Accueil from "./Accueil";
import Connexion from './Connexion';
import Membre from './Membre';
import Mdp from './Mdp';
import Astuce from './Astuce';
import Section from './Section';
import ListeActivite from './ListeActivite';
import Inscription from './Inscription';
import Member from './membersView.js';
import GererActiviteAdmin from './GererActiviteAdmin.js';
import ListeActiviteAdmin from './ListeActiviteAdmin.js';
import GererMembreAdmin from './GererMembreAdmin.js';
import ListeMembreAdmin from './ListeMembreAdmin.js';
import InfoCompte from './InfoCompte.js';
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
