import React, { Component } from 'react';
import './Navigation.css';
import removeSession from './../../../actions/removeSession'

import { connect } from 'react-redux';

class Navigation extends Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.props.removeSession("");
    console.log(this.props)
    // this.props.history.push(process.env.PUBLIC_URL + "/connexion");
  };

  display(){
    if (this.props.sessionConnect.isConnected == true){
      return (
        <div>
        <header id="header">

          <div id="div_titre">
          {/* LOGO DU MIRAIL EN ATTENTE DE VALIDATION */}
            {/* <img src="images/logo_mirail.png" alt="logo_ut2j" id="div_logo_mirail" title="Université Jean Jaurès"/> */}
            <img src="images/logo3.png" alt="logo" id="img_logo"/>
            <h1>~ LaWeb ~</h1>
            <p>Association d'informatique</p>
          </div>

          <div id="div_menu_hamburger">
            <nav id="menu">
                <ul id="list_menu">
                <li>
                  <a href="#" exact={true} ClassName='is-active' className="menu_text">
                    Viens Découvrir
                  </a>
                </li>
                <li>
                  <a href="#activite"  exact={true} ClassName='is-active' className="menu_text">
                    Nos Activités
                  </a>
                </li>
                <li>
                  <a href="#astuces" exact={true}  className="menu_text">
                    Nos Astuces
                  </a>
                </li>
                <li>
                  <a href="#/contact" exact={true} ClassName='is-active' className="menu_text" >
                    Contacts
                  </a>
                </li>
                <li>
                <a href="#member" exact={true}   className="menu_text">
                  Gestion
                </a>
                </li>
              </ul>
            </nav>

            {/* div CONNEXION */}
            <div className="inter">
            <a href="#connexion" id="connexion" onClick={this.handleClick}>
              Se déconnecter
            </a>

              {/* <a id="deconnexion" role="button" title="Se déconnecter" onCLick={this.handleClick}>Se déconnecter</a> */}
            </div>
          </div>
        </header>
        </div>
      );
    } else{
      return (
        <div>
        <header id="header">

          <div id="div_titre">
          {/* LOGO DU MIRAIL EN ATTENTE DE VALIDATION */}
            {/* <img src="images/logo_mirail.png" alt="logo_ut2j" id="div_logo_mirail" title="Université Jean Jaurès"/> */}
            <img src="images/logo3.png" alt="logo" id="img_logo"/>
            <h1>~ LaWeb ~</h1>
            <p>Association d'informatique</p>
          </div>

          <div id="div_menu_hamburger">
            <nav id="menu">
                <ul id="list_menu">
                <li>
                  <a href="#" className="menu_text">
                    Viens Découvrir
                  </a>
                </li>
                <li>
                  <a href="#activite" className="menu_text">
                    Nos Activités
                  </a>
                </li>
                <li>
                  <a href="#astuces" className="menu_text">
                    Nos Astuces
                  </a>
                </li>
                <li>
                  <a href="#contact" className="menu_text" >
                    Contacts
                  </a>
                </li>
                <li>
                <a href="#reseaux" className="menu_text">
                  Restons Connectés
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
    }
  }
  render(){
    return (
      <div>
        {this.display()}
      </div>

      );
    }

};

const mapStateToProps = state => {
  return { sessionConnect: state.sessionReducer}
}

const mapDispatchToProps = dispatch => {
  console.log("ok");
  return {
    removeSession: (name) => {
      dispatch(removeSession())
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation)
