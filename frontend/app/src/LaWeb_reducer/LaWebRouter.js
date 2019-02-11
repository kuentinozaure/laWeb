import React, { Component } from "react";
import Accueil from "./../pages/Accueil";
import Connexion from './../pages/Connexion';
import Membre from './../pages/Membre';
import Mdp from './../pages/Mdp';
import Astuce from './../pages/Astuce';
import Section from './../pages/Section';
import ListeActivite from './../pages/ListeActivite';
import Inscription from './../pages/Inscription';
import ValidMembers from './../pages/ValidationMembre.js';
import ValidActivity from './../pages/ValidationActivite.js';
import createActivity from './../pages/CreateActivite.js';
import Member from './../pages/membersView.js';
import UpdatePass from './../pages/updatePass.js';

import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";


// Import pour redux
import { connect } from 'react-redux';

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
          
          <Route path='/validMembers'component={ValidMembers}/>
          <Route path='/validActivity'component={ValidActivity}/>
          <Route path='/createActivity'component={createActivity}/>
          <Route path='/member'component={Member}/>
          <Route path ='/updatePass' component = {UpdatePass}/>
          <Route component={Error} />
          <PrivateRoute component={Accueil} isConnected={this.props.sessionConnect.isConnected} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return { sessionConnect: state.sessionReducer}
}

// const mapDispatchToProps = dispatch => {
//   return {
//     setTokenSession: token => {
//       dispatch(setTokenSession(token))
//     }
//   }
// }

export default connect(mapStateToProps,null)(LaWebRouter)
