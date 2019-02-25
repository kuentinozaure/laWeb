import React, {Component} from "react";
import "./Inscription.css";
import Formgroup from "./Formgroup.js";

import { SERVER_URL } from "../consts";

import axios from 'axios';

class Inscription extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id: 0,
        name: '',
        prenom: '', 
        ufr: '',
        adresse: '',
        numero: '',
        };
    }

    getId(){
      axios.post(SERVER_URL + 'participant/?&nom='+this.state.name +'&prenom='+this.state.prenom+'&mail='+this.state.adresse +'&telephone='+this.state.numero +'&ufr='+ this.state.ufr)
        .then(response => {
          //alert(response.data.id);
          this.setState({
            id: response.data.id
          })
        })
        .catch(error => {
          console.log(error);
        });
    }
  
    handleSubmit(event) {
      this.getId();
      }
  
    render() {
      return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
                  <div className="panel panel-default">
                    <div className="panel-body">
                      <div className="text-center">
                        <h3><i className="fa fa-user fa-4x"></i></h3>
                        <h2 className="text-center">Vous voulez vous inscrire à cette activité ?</h2>
                        <p>Inscrivez vous ici</p>
                        <div className="panel-body">
          
                          <form id="register-form" role="form" autocomplete="off" className="form" method="get" onSubmit={this.handleSubmit}>
          
                          <div class="form-group">
                              <div class="input-group">
                                <span class="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                <input id="name" name="nom" placeholder="Nom" className="form-control"  
                                type="text" onChange={e => this.setState({name: e.target.value})}
                                />
                                
                              </div>
                            </div><div class="form-group">
                              <div class="input-group">
                                <span class="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                <input id="name" name="nom" placeholder="Nom" className="form-control"  
                                type="text" onChange={e => this.setState({name: e.target.value})}
                                />
                                
                              </div>
                            </div>
                  
                  <div className="form-group">
                              <div className="input-group">
                                <span class="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                <input id="prenom" name="prenom" placeholder="Prenom" className="form-control"  
                                type="password" onChange={e => this.setState({prenom: e.target.value})}
                                pattern="tel"/>
                              </div>
                            </div>

                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon"><i classNames="fa fa-user fa" aria-hidden="true"></i></span>
                      <input id="ufr" name="ufr" placeholder="UFR" className="form-control"  type="text" onChange={e => this.setState({ufr: e.target.value})}/>
                    </div>
                  </div>
                  
                  <div className="form-group">
                              <div className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                <input id="email" name="email" placeholder="Email" className="form-control"  type="email" onChange={e => this.setState({adresse: e.target.value})}/>
                              </div>
                            </div>
                  
                  <div className="form-group">
                              <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                                <input id="tel" name="tel" placeholder="Telephone" className="form-control"  type="tel" onChange={e => this.setState({numero: e.target.value})}/>
                              </div>
                            </div>

                            
                  
                  
                  <br></br><input type="submit" value="S'inscrire à l'activité" />
                          </form>
          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        </div>
        </div>
      );
    }
  }

  export default Inscription;