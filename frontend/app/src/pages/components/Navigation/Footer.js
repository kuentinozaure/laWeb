import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';


class Footer extends Component{

  constructor(props){
    super(props);

    this.state = {
      show : true,
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(){
    this.setState({
      show : false,
    });
  }

  display(){
    if(this.state.show === true){
      return(
        <div>
          <div className="cookie-accept d-block position-fixed mw-25 bg-secondary text-white rounded-top pt-2 pr-3 pl-3 pb-2">
            <h5>En poursuivant votre navigation sur ce site</h5>
            <p>Vous acceptez l’utilisation de cookies ou technologies similaires de traçage pour vous proposer au mieux des services adapté a votre utilisation</p>
            <a target="_blank" onClick={this.handleClose} className="btn btn-outline-light btn-block">Accepter</a>
          </div>
        <footer>
        <section id="lab_social_icon_footer">
        <h2>Association LaWeb</h2>
            <div className="container">
                <div className="text-center center-block">
                    <a href="https://www.facebook.com/Association-LaWeb-1334130680060783/"  target="_blank"><i id="social-fb" className="fa fa-facebook-square fa-3x social"></i></a>
                    <a href="https://twitter.com/AssociationLaW1"  target="_blank"><i id="social-tw" className="fa fa-twitter-square fa-3x social" ></i></a>
                    <a href="mailto:associationlaweb@gmail.com" title="associationlaweb@gmail.com"  target="_blank"><i id="social-em" className="fa fa-envelope-square fa-3x social"></i></a>
                </div>
            </div>
        </section>
        </footer>
      </div>);
    }else{
      return(
      <div>
      <footer>
      <section id="lab_social_icon_footer">
      <h2>Association LaWeb</h2>
          <div className="container">
              <div className="text-center center-block">
                  <a href="https://www.facebook.com/Association-LaWeb-1334130680060783/"  target="_blank"><i id="social-fb" className="fa fa-facebook-square fa-3x social"></i></a>
                  <a href="https://twitter.com/AssociationLaW1"  target="_blank"><i id="social-tw" className="fa fa-twitter-square fa-3x social" ></i></a>
                  <a href="mailto:associationlaweb@gmail.com"   target="_blank"><i id="social-em" className="fa fa-envelope-square fa-3x social"></i></a>
              </div>
          </div>
      </section>
      </footer>
      </div>)
    }
  }
  render(){
      return (
        <div>
          {this.display()}
        </div>
      );
    };
    
    }
  


export default Footer;