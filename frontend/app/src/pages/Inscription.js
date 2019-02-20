import React, {Component} from "react";
import "./Inscription.css";
import Formgroup from "./Formgroup.js";

import { SERVER_URL } from "./consts";

class Inscription extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
        prenom: '', 
        ufr: '',
        adresse: '',
        numero: '',
        newsletter: false};
  
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleSubmit(event) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://laweb.alwaysdata.net/?choix=9&nom='+this.state.name +'&prenom='+this.state.prenom+'&mail='+this.state.adresse +'&tel='+this.state.numero +'&abonne='+this.state.newsletter+'&ufr='+ this.state.ufr+'&idAct2');
      
      console.log('http://laweb.alwaysdata.net/?choix=9&nom='+this.state.name +'&prenom='+this.state.prenom+'&mail='+this.state.adresse +'&tel='+this.state.numero +'&abonne='+this.state.newsletter+'&ufr='+ this.state.ufr+'&idAct=2')
      
      
      event.preventDefault();
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

                            <input type="checkbox" id="scales" name="scales" onChange={e => {if (e.target.value == "on") {this.setState({newsletter: true})}}}/>
                  <label for="scales">S'abonner aux newsletter</label>
                  
                  
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