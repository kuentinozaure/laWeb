import React from "react";
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    <div>
    <header id="header">
    
      <div id="div_titre">
        <img src="images/logo_mirail.png" alt="logo_ut2j" id="div_logo_mirail" title="Université Jean Jaurès"/>
        <img src="images/logo3.png" alt="logo" id="img_logo"/>
        <h1>~ LaWeb ~</h1>
        <p>Association d'informatique</p>
      </div>

      <div id="div_menu_hamburger">
        <nav id="menu">
            <ul id="list_menu">
            <li>
              <a href="/" exact={true} activeClassName='is-active' className="menu_text">
                Accueil
              </a>
            </li>
            <li>
              <a href="#activite"  exact={true} activeClassName='is-active' className="menu_text">
                Viens découvrir
              </a>
            </li>
            <li>
              <a href="#astuces" exact={true} activeClassName='is-active' className="menu_text">
                Astuces
              </a>
            </li>
            <li>
              <a href="#/contact" exact={true} activeClassName='is-active' className="menu_text" >
                Contact
              </a>
            </li>
            <li>
            <a href="#membre" exact={true} activeClassName='is-active'  className="menu_text">
              Rejoins nous
            </a>
            </li>          
          </ul>
        </nav>
  
        {/* div CONNEXION */}
        <div className="inter">
          <a href="#connexion" id="connexion" role="button" title="Se connecter">Se connecter</a>
        </div>
      </div>
    </header>
    </div>
  );
};

export default Navigation;