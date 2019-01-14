import React, { Component } from 'react';
import Mdp from "./Mdp.js";
import axios from 'axios';
import MemberPage from './membersView.js'

class Connexion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          identifiant: '',
          mdp: '',
          mdpServ: '',
          logServ:'',
          isConnect:false,
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      
       handleSubmit() {
        this.setState({
          isConnect:true,
        });
        /*const url = '../membre.json';
         axios.get(url)
          .then(response => {
            let taille = Object.keys(response.data).length
            let log=""
            let mdp=""
            for (let i = 0; i < taille; i++) {
              log=response.data[i].login 
              mdp=response.data[i].mdp
            }
            this.setState({
              mdpServ: mdp,
              logServ:log,
            });

          })
          .catch(error => {
            console.log(error);
          });*/
          
          /*if((this.state.mdp ===this.state.mdpServ) && (this.state.logServ ===this.state.identifiant)){
            alert("Bonjour " + this.state.identifiant + " !");

          }else{
            alert("Identifiant ou mot de passe incorrect.");   
          }*/


      }
      
      display(){
        if(this.state.isConnect == false){
          return (
            <div>
              <div className="container">
                <div className="row">
                  <div className="col-md-4 col-md-offset-4">
                    <div className="panel panel-default">
                      <div className="panel-body">
                        <div className="text-center">
                          <h3><i className="fa fa-user fa-4x"></i></h3>
                          <h2 className="text-center">Connexion</h2>
                          <p>Saisissez votre identifiant et votre mot de passe</p>
                          <div className="panel-body">
            
                            <form id="register-form" role="form" autoComplete="off" className="form" onSubmit={this.handleSubmit}>
            
                              <div className="form-group">
                                <div className="input-group">
                                  <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                  <input id="identifiant" name="identifiant"  required="Remplir votre identifiant" placeholder="Identifiant" className="form-control"  type="text" onChange={e => this.setState({identifiant: e.target.value})}/>
                                </div>
                              </div>
                    
                    <div className="form-group">
                                <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                  <input id="mdp" name="mdp" placeholder="Mot de passe" required="Remplir votre mot de passe" className="form-control"  type="password" onChange={e => this.setState({mdp: e.target.value})}/>
                                </div>
                              </div>
  
                              <div className="forgot">
                      <a href="/mdp">Mot de passe oublié?</a>
                    </div>
  
                              <br></br><input className="btn btn-danger btn-lg" type="submit" value="Se connecter" />
                            </form>
            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
          </div>
          </div>
          </div>
          )
        }else{
          return( 
          < MemberPage isConnect={this.state.isConnect}/>
          )
        }
      }

  render() {
    return (
        <div>
          {this.display()}
        </div>
    );
  }
}

export default Connexion;