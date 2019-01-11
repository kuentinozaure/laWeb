import React, {Component} from "react";
import "./Inscription.css";

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
      xhr.open('POST', 'https://mi-phpmut.univ-tlse2.fr/~ia.web/index.php?choix=8&nom='+this.state.name +'&prenom='+this.state.prenom+'&mail='+this.state.adresse +'&tel='+this.state.numero +'&abonne='+this.state.newsletter+'&ufr='+ this.state.ufr+'&login=blabla&mdp=votreMdp&desc=votreDescription');
      console.log('https://mi-phpmut.univ-tlse2.fr/~ia.web/index.php?choix=8&nom='+this.state.name +'&prenom='+this.state.prenom+'&mail='+this.state.adresse +'&tel='+this.state.numero +'&abonne='+this.state.newsletter+'&ufr='+ this.state.ufr+'&login=blabla&mdp=votreMdp&desc=votreDescription')
      
      //  https://mi-phpmut.univ-tlse2.fr/~ia.web/index.php?choix='+1+'&nom='+this.state.name +'&prenom='+this.state.prenom+'&mail='+this.state.adresse +'&tel='+this.state.numero +'&abonne='+this.state.newsletter+'&ufr='+ this.state.ufr)
      
      event.preventDefault();
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
                        <h2 class="text-center">Vous voulez vous inscrire à cette activité ?</h2>
                        <p>Inscrivez vous ici</p>
                        <div class="panel-body">
          
                          <form id="register-form" role="form" autocomplete="off" class="form" method="post" onSubmit={this.handleSubmit}>
          
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
                      <span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
                      <input id="ufr" name="ufr" placeholder="UFR" class="form-control"  type="text" onChange={e => this.setState({ufr: e.target.value})}/>
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