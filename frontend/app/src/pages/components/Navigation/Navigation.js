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
                    Contacts
                  </a>
                </li>
                <li>
                <a href="#member" exact={true} activeClassName='is-active'  className="menu_text">
                  Membres
                </a>
                </li>          
              </ul>
            </nav>
      
            {/* div CONNEXION */}
            <div className="inter">
            <a href="#connexion">
            <button onClick={this.handleClick}>
              Se déconnecter
            </button>
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
                    Contacts
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
      dispatch(removeSession(name))
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navigation)