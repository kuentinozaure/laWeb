import React, { Component } from 'react';
import axios from 'axios';

class Membre extends Component {
    constructor(props) {
        super(props);
        this.state = {
          name: '',
          prenom: '', 
          adresse: '',
          numero: '',
          identifiant: '',
          mdp: '',
          ufr: [],
          description :'',
          newsletter: 0
      };
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    componentDidMount() {
      const url = 'http://laweb.alwaysdata.net/?choix=11';
      axios.get(url)
        .then(response => {
          let i
          let tab =[]
          for (i = 0; i < response.data.ufr.length; i++) {
            tab.push(response.data.ufr[i]);
          }
          this.setState({
            ufr: tab,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    handleSubmit() {
      const url = 'http://laweb.alwaysdata.net/?choix=8&nom='+this.state.name+'&prenom='+this.state.prenom+'&mail='+this.state.adresse+'&tel='+this.state.numero+'&abonne='+this.state.newsletter+'&ufr='+this.state.ufr+'&login='+this.state.identifiant+'&mdp='+this.state.mdp+'&desc='+this.state.description;
      axios.get(url)
        axios.get(url)
        .then(response => {

          console.log("creation du membre ...")
        })
        .catch(error => {
          console.log(error);
        });
        alert(url);
    }

  render() {
    return (
        <div class="container">
        <div class="row">
          <div class="col-md-4 col-md-offset-4">
                  <div class="panel panel-default">
                    <div class="panel-body">
                      <div class="text-center">
                        <h3><i class="fa fa-user fa-4x"></i></h3>
                        <h2 class="text-center">Vous voulez devenir membre?</h2>
                        <p>Faites votre demande ici</p>
                        <div class="panel-body">
          
                          <form id="register-form" role="form" autocomplete="off" class="form" method="get" onSubmit={this.handleSubmit}>
          
                            <div class="form-group">
                              <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                <input id="name" name="nom" placeholder="Nom" class="form-control"  type="text" onChange={e => this.setState({name: e.target.value})}/>
                              </div>
                            </div>
                  
                  <div class="form-group">
                              <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                <input id="prenom" name="prenom" placeholder="Prenom" class="form-control"  type="text" onChange={e => this.setState({prenom: e.target.value})}/>
                              </div>
                            </div>
                  
                  <div class="form-group">
                              <div class="input-group">
                                <span class="input-group-addon"><i class="glyphicon glyphicon-envelope color-blue"></i></span>
                                <input id="email" name="email" placeholder="Email" class="form-control"  type="email" onChange={e => this.setState({adresse: e.target.value})}/>
                              </div>
                            </div>
                  
                  <div class="form-group">
                              <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-phone"></i></span>
                                <input id="tel" name="tel" placeholder="Telephone" class="form-control"  type="text" onChange={e => this.setState({numero: e.target.value})}/>
                              </div>
                            </div>

                            <div className="form-group">
                              <select className="form-control" require="true"  id="ufr" onChange={e => this.setState({ufr: e.target.value.substring(0, 1)})}>
                                {
                                  this.state.ufr.map((ufr, index) =>
                                    <option id={ufr.id} >{ufr.id} - {ufr.ufr}</option>
                                  )}
                              </select>
                            </div>

                            <div class="form-group">
                              <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                <input id="desc" name="desc" placeholder="Description" class="form-control"  type="text" onChange={e => this.setState({description: e.target.value})}/>
                              </div>
                            </div>

                            <div class="form-group">
                              <div class="input-group">
                                <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                                <input id="identifiant" name="identifiant" placeholder="Identifiant" class="form-control"  type="text" onChange={e => this.setState({identifiant: e.target.value})}/>
                              </div>
                            </div>
                  
                  <div class="form-group">
                              <div class="input-group">
                              <span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
                                <input id="mdp" name="mdp" placeholder="Mot de passe" class="form-control"  type="password" onChange={e => this.setState({mdp: e.target.value})}/>
                              </div>
                            </div>

                            <input type="checkbox" id="scales" name="scales" onChange={e => {if (e.target.value == "on") {this.setState({newsletter: 1})}}}/>
                  <label for="scales">S'abonner aux newsletter</label>
                  
                  
                  <br></br><input class="btn btn-danger btn-lg" type="submit" value="Devenir membre" />
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

export default Membre;
