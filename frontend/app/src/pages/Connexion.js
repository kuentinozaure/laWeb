import React, { Component } from 'react';

import { connect } from 'react-redux';
import setSession from './../actions/setSession'


class Connexion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          mdp: '',
          mdpServ: '',
          logServ:'',
          logDebug : 'laweb@admin',
          mdpDebug : 'azerty',
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      
       handleSubmit() {
        if(this.state.mdpDebug == this.state.mdp && this.state.logDebug == this.state.name){
          this.props.setSession(this.state.name);
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
            
                            <form id="register-form" role="form" autoComplete="off" className="form" onSubmit={this.handleSubmit}>
            
                              <div className="form-group">
                                <div className="input-group">
                                  <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                  <input id="identifiant" name="identifiant"  required="Remplir votre identifiant" placeholder="Identifiant" className="form-control"  type="text" onChange={e => this.setState({name: e.target.value})}/>
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
    setSession: (name) => {
      dispatch(setSession(name))
    }
  }

};

export default connect(mapStateToProps,mapDispatchToProps)(Connexion)