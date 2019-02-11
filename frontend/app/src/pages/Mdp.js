import React, { Component } from 'react';

class Mdp extends Component {
    constructor(props) {
        super(props);
        this.state = {
          adresse: ''};
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleSubmit(event) {
        alert('Adresse: '+this.state.adresse);
        event.preventDefault();
    }

    render() {
        return (
          <div>
            <div className="container">
            <div className="row">
              <div className="col-md-4 col-md-offset-4">
                      <div className="panel panel-default">
                        <div className="panel-body">
                          <div className="text-center">
                            <h3><i className="fa fa-lock fa-lg"></i></h3>
                            <h2 className="text-center">Mot de passe oublié?</h2>
                            <p>Réinitialisé votre mot de passe</p>
                            <div className="panel-body">
              
                              <form id="register-form" role="form" autoComplete="off" className="form" method="post" onSubmit={this.handleSubmit}>
              
                              <div className="form-group">
                              <div className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                <input id="email" name="email" placeholder="Email" className="form-control"  type="email" onChange={e => this.setState({adresse: e.target.value})}/>
                              </div>
                            </div>
    
                                <br></br><input className="btn btn-danger btn-lg" type="submit" value="Réinitialiser le mot de passe" />
                              </form>
              
                            </div>
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

export default Mdp;