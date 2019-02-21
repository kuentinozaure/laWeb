import React, { Component } from "react";
import Accueil from "./../pages/Accueil";
import Connexion from './../pages/Connexion';
import Membre from './../pages/Membre';
import Mdp from './../pages/Mdp';
import Astuce from './../pages/Astuce';
import Section from './../pages/Section';
import ListeActivite from './../pages/ListeActivite';
import Inscription from './../pages/Inscription';
import Member from './../pages/membersView.js';
import ListeActiviteAdmin from './../pages/ListeActiviteAdmin.js';
import GererActiviteAdmin from './../pages/GererActiviteAdmin.js';
import ListeMembreAdmin from './../pages/ListeMembreAdmin.js';
import GererMembreAdmin from './../pages/GererMembreAdmin.js';
import InfoCompte from './../pages/InfoCompte.js';
import Reseaux from './../pages/Reseaux.js';
import ListeAstuceAdmin from './../pages/ListeAstuceAdmin';
import GererAstuceAdmin from './../pages/GererAstuceAdmin';

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { connect } from 'react-redux';
import Navigation from "../pages/components/Navigation/Navigation";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return rest.isConnected ? (
        <Component {...props} {...rest} />
      ) : (
        <Redirect to="/connexion" />
      );
    }}
  />
);

class LaWebRouter extends Component {

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Accueil}/>
          <Route path='/connexion' component={Connexion}/>
          <Route path='/membre' component={Membre}/>
          <Route path='/mdp' component={Mdp}/>
          <Route path='/astuces' component={Astuce}/>
          <Route path='/contact'component={Section}/>
          <Route path='/activite'component={ListeActivite}/>
          <Route path='/inscription'component={Inscription}/>
          <Route path='/reseaux' component={Reseaux}/>
          <Route path ='/navigation' component = {Navigation}/>
          <Route path='/listeActiviteAdmin'component={ListeActiviteAdmin}/>
          <Route path='/gererActiviteAdmin'component={GererActiviteAdmin}/>
          <Route path='/listeMembreAdmin'component={ListeMembreAdmin}/>
          <Route path='/gererMembreAdmin'component={GererMembreAdmin}/>
          <Route path='/listeAstuceAdmin'component={ListeAstuceAdmin}/>
          <Route path='/gererAstuceAdmin'component={GererAstuceAdmin}/>
          <Route path='/member'component={Member}/>
          <Route path ='/infoCompte' component = {InfoCompte}/>
          <Route component={Error} />
          {/* <PrivateRoute component={Accueil} isConnected={this.props.sessionConnect.isConnected} /> */}
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return { sessionConnect: state.sessionReducer}
}

export default connect(mapStateToProps,null)(LaWebRouter)
