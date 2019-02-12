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
              <NavLink exact={true} activeClassName='is-active' to="/" className="menu_text">
                Accueil
              </NavLink>
            </li>
            <li>
              <NavLink exact={true} activeClassName='is-active' to="/activite" className="menu_text">
                Viens découvrir
              </NavLink>
            </li>
            <li>
              <NavLink exact={true} activeClassName='is-active' to="/astuces" className="menu_text">
                Astuces
              </NavLink>
            </li>
            <li>
              <NavLink exact={true} activeClassName='is-active' to="/contact" className="menu_text" >
                Contacts
              </NavLink>
            </li>
            <li>
            <NavLink exact={true} activeClassName='is-active' to="/membre" className="menu_text">
              Rejoins nous
            </NavLink>
            </li>          
          </ul>
        </nav>
  
        {/* div CONNEXION */}
        <div className="inter">
          <NavLink to="/connexion" id="connexion" role="button" title="Se connecter">Se connecter</NavLink>
        </div>
      </div>
    </header>
    </div>
  );
};

export default Navigation;