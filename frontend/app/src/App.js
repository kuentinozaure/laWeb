import React, { Component } from 'react';

import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
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

class App extends Component {

  render() {
    return (
      <div className="App">
        <header id="header">
       <div id="div_titre">
        <img src="../logo_mirail.png" alt="logo_ut2j" id="div_logo_mirail" title="Université Jean Jaurès" width="15%" height="35%"/>
        <img src="../logo3.png" alt="logo" id="img_logo" width="6%" height="6%"/>
        <h1>~ LaWeb ~</h1>
        <p>Association d'informatique</p>
      </div>
        <div id="div_menu_hamburger">
          <nav id="menu">
            <hr className="separateur" id="separateur_haut"/>
              <ul id="list_menu">
                <li id="en-cours">
                    <a className="menu_text" href="/"><img src="../accueil.svg" alt="Accueil" className="images"/>Accueil</a>
                </li>
                <li>
                    <a className="menu_text" href="/activite"><img src="../apprendre.svg" alt="Activité" className="images"/>Viens découvrir</a>
                </li>
                <li>
                    <a className="menu_text" href="/astuces"><img src="../astuce.svg" alt="Astuce" className="images"/>Trucs & Astuces</a>
                </li>
                <li>
                    <a className="menu_text" href="/contact"><img src="../contact.svg" alt="Administrateur" className="images"/>Contact</a>
                </li>
                <li>
                    <a className="menu_text" href="/membre"><img src="../rejoindre.svg" alt="rejoindre" className="images"/>Rejoins nous</a>
                </li>
              </ul>
            <hr className="separateur" id="separateur_bas"/>
        </nav>

        <div className="inter">
          <a href="/connexion" className="btn btn-danger btn-lg" role="button" title="Se connecter"> Se connecter</a>
        </div>

        </div>


        <button id="humburger-bottom">&#9776;</button>

      <div id="hamburger-sidebar">
        <div id="hamburger-sidebar-header"></div>
        <div id="hamburger-sidebar-body"></div>
      </div>
      <div id="hamburger-overlay"></div>

      <script type="text/javascript" src="js/main.js"></script>
    </header>
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
        </Switch>
      </Router>


        <footer>
                    <section id="lab_social_icon_footer">
                    <h2>Association LaWeb</h2>
                        <div className="container">
                            <div className="text-center center-block">
                                <a href="https://www.facebook.com"><i id="social-fb" className="fa fa-facebook-square fa-3x social"></i></a>
                                <a href="https://twitter.com"><i id="social-tw" className="fa fa-twitter-square fa-3x social"></i></a>
                                <a href="mailto:#" title="LaWeb@gma²il.com"><i id="social-em" className="fa fa-envelope-square fa-3x social"></i></a>
                            </div>
                        </div>
                    </section>
            </footer>
      </div>
    );
  }
}

export default App;
