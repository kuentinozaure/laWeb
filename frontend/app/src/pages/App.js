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
import ValidMembers from './ValidationMembre.js';
import ValidActivity from './ValidationActivite.js';
import createActivity from './CreateActivite.js';
import Member from './membersView.js';
import UpdatePass from './updatePass.js';
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Navigation/Footer";

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
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
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
      // <div className="App">
      //   <header id="header">
      //  <div id="div_titre">
      //   <img src="../logo_mirail.png" alt="logo_ut2j" id="div_logo_mirail" title="Université Jean Jaurès"/>
      //   <img src="../logo3.png" alt="logo" id="img_logo" width="6%" height="6%"/>
      //   <h1>~ LaWeb ~</h1>
      //   <p>Association d'informatique</p>
      // </div>
      //     <nav id="menu">
      //       <hr className="separateur" id="separateur_haut"/>
      //         <ul id="list_menu">
      //           <li id="en-cours">
      //               <a className="menu_text" href="/"><img src="../accueil.svg" alt="Accueil" className="images"/>Accueil</a>
      //           </li>
      //           <li>
      //               <a className="menu_text" href="/activite"><img src="../apprendre.svg" alt="Activité" className="images"/>Viens découvrir</a>
      //           </li>
      //           <li>
      //               <a className="menu_text" href="/astuces"><img src="../astuce.svg" alt="Astuce" className="images"/>Astuces</a>
      //           </li>
      //           <li>
      //               <a className="menu_text" href="/contact"><img src="../contact.svg" alt="Administrateur" className="images"/>Contact</a>
      //           </li>
      //           <li>
      //               <a className="menu_text" href="/membre"><img src="../rejoindre.svg" alt="rejoindre" className="images"/>Rejoins nous</a>
      //           </li>
      //         </ul>
      //       <hr className="separateur" id="separateur_bas"/>
      //   </nav>

      //   <div className="inter">
      //     <a href="/connexion" className="btn btn-danger btn-lg" role="button" title="Se connecter"> Se connecter</a>
      //   </div>


      // </header>
      // <Router>
      //     <Switch>
      //       <Route exact path='/' component={Accueil}/>
      //       <Route path='/connexion' component={Connexion}/>
      //       <Route path='/membre' component={Membre}/>
      //       <Route path='/mdp' component={Mdp}/>
      //       <Route path='/astuces' component={Astuce}/>
      //       <Route path='/contact'component={Section}/>
      //       <Route path='/activite'component={ListeActivite}/>
      //       <Route path='/inscription'component={Inscription}/>
      //       <Route path='/validMembers'component={ValidMembers}/>
      //       <Route path='/validActivity'component={ValidActivity}/>
      //       <Route path='/createActivity'component={createActivity}/>
      //       <Route path='/member'component={Member}/>
      //       <Route path ='/updatePass' component = {UpdatePass}/>
      //   </Switch>
      // </Router>
    );
  }
}

export default App;
