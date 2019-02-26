import React, { Component } from 'react';
import { connect } from 'react-redux';
import setSession from './../actions/setSession'
import axios from 'axios';
import { SERVER_URL } from "../consts";

class Connexion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          id:0,
          login: '',
          mdp: '',
          logDebug : 'laweb@admin',
          mdpDebug : 'azerty',
          resultatConnexion : [],
        };

        this.handleSubmit = this.handleSubmit.bind(this);
      }

       handleSubmit() {
         const url = SERVER_URL+"connexion/"+this.state.login+"/"+this.state.mdp+"/" ;
         axios.get(url)
           .then(response => {
             this.setState({
               resultatConnexion : response.data,
             })
           })
           .catch(error => {
             console.log(error);
           });

           if(this.state.resultatConnexion.isConnect == true){//si il est connecte
             this.props.setSession(this.state.resultatConnexion.nom,this.state.resultatConnexion.id,this.state.resultatConnexion.prenom,this.state.resultatConnexion.mail,this.state.resultatConnexion.image,this.state.resultatConnexion.telephone,this.state.resultatConnexion.description,this.state.resultatConnexion.login,this.state.resultatConnexion.token);
             console.log("a "+this.props.setSession);
             this.props.history.push(process.env.PUBLIC_URL + "/member");
           }
        }

      display(){
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

                              <div className="form-group">
                                <div className="input-group">
                                  <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                  <input id="identifiant" name="identifiant"  required="Remplir votre identifiant" placeholder="login" className="form-control"  type="text" onChange={e => this.setState({login: e.target.value})}/>
                                </div>
                              </div>

                    <div className="form-group">
                                <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                  <input id="mdp" name="mdp" placeholder="mot de passe" required="Remplir votre mot de passe" className="form-control"  type="password" onChange={e => this.setState({mdp: e.target.value})}/>
                                </div>
                              </div>

                              <div className="forgot">
                      <a href="/mdp">Mot de passe oublié?</a>
                    </div>

                              <br></br><input className="btn btn-danger btn-lg" type="button" onClick={this.handleSubmit} value="Se connecter" />

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
          </div>
          </div>
          </div>
          )
      };
  render() {
    return (
        <div>
          {this.display()}
        </div>
    );

}}
const mapStateToProps = state => {
  return { sessionConnect: state.sessionReducer}
};
const mapDispatchToProps = dispatch => {
  return {
    setSession: (name,id,prenom,mail,image,telephone,description,login,token) => {
      dispatch(setSession(name,id,prenom,mail,image,telephone,description,login,token))
    }
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(Connexion)
