import React, { Component } from 'react';
import './Astuce.css';

import {Button,Modal} from 'react-bootstrap';

import axios from 'axios';
import BoxAstuce from './BoxAstuce.js';

class Astuce extends Component {

    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    
        this.state = {
          show: false,
          titre: '',
          description: '',
          nom: '',
          lien: '',
          astuces : [],
          astuceSearch : "",
          type: "Faculté"
        };

       
      }

      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }

      componentDidMount() {
        const url = 'http://laweb.alwaysdata.net/?choix=19';
        axios.get(url)
          .then(response => {
            let i
            let tab =[]
            for (i = 0; i < response.data.astuce.length; i++) {
              tab.push(response.data.astuce[i]);
            }
            this.setState({
              astuces: tab,
            });
          })
          .catch(error => {
            console.log(error);
          });
    
      }

      handleSearch(e){
        this.setState({
          astuceSearch:e.target.value,
        })
        this.display()
      }

    display () {
        let listeAstuce =[]
        if(this.astuceSearch === ""){
            let content = this.state.astuces.map((astuce, index) => {
                
                listeAstuce.push(
                    <BoxAstuce 
                        modtitre={astuce.titre}
                        modlien={astuce.lienAstuce}
                        modid={astuce.id}
                        modauteur={astuce.auteur}
                        modimage={astuce.image}
                        modtype={astuce.type}
                        moddescription={astuce.description}
                    />
                );
            
            });
            return content = listeAstuce;
        } else{
            let titre="";
            let description = "";
            let auteur = "";
            
            
                
                let content = this.state.astuces.map((astuce, index) => {

                    titre = astuce.titre;
                    description = astuce.description;
                    auteur = astuce.auteur;

                    if(titre.includes(this.state.astuceSearch) || description.includes(this.state.astuceSearch) || auteur.includes(this.state.astuceSearch)){
                    
                    listeAstuce.push(
                        <BoxAstuce 
                            modtitre={astuce.titre}
                            modlien={astuce.lienAstuce}
                            modid={astuce.id}
                            modauteur={astuce.auteur}
                            modimage={astuce.image}
                            modtype={astuce.type}
                            moddescription={astuce.description}
                        />
                    );
                    }
                });
                return content = listeAstuce;
        
}}

handleSubmit(event) {
    const url ="http://laweb.alwaysdata.net/?choix=20&nom="+this.state.titre+"&description="+this.state.description+"&auteur="+this.state.nom+"&lien="+this.state.lien+"&type="+this.state.type
    console.log(url);
    alert(url);
    axios.get(url)
      .then(response => {
        this.handleClose();
      })
      .catch(error => {
        console.log(error);
      });
    }
    render() {
        return (
            <div>
            <div className="container">
                <div id="div_titreAccueil">~ Astuces ~</div>
                <p></p>
                <p></p>
                <div id="div_presentation" align="center">
                  Vous rencontrez des problèmes avec les services en ligne de l'université ou bien vous voulez apprendre
                  de nouvelles choses. Vous trouverez votre bonheur ici !
                  <div id="sautdeligne"></div>
                </div>
                <a className="btn btn-primary btn-lg pull-right " role="button" onClick={this.handleShow}>Proposer une astuce</a>
                <br></br>
                <br></br>
                <br></br>
                <div className="row">
              <div className="col-12">
                <div id="custom-search-input">
                  <div className="input-group">
                      <input type="text" className="search-query form-control" placeholder="Rechercher une astuce" onChange={e => this.handleSearch(e)}/>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
                {this.display()}
            </div>
            <div className="Box">
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Body>
                <h2 className="text-center">Vous voulez proposer une astuce ?</h2>
                <h4 className="text-center">Vous avez une idée d'astuce qui pourrait aider d'autres utilisateurs et qui touche à l'informatique ? Faites-nous en part !</h4>
      
                <form id="register-form" role="form" autoComplete="off" className="form"  onSubmit={this.handleSubmit}>
                      <div className="form-group">
                                    <div className="input-group">
                                      <span className="input-group-addon"><i className="glyphicon glyphicon-chevron-right" aria-hidden="true"></i></span>
                                      <input id="titre" name="titre" placeholder="Titre" required="Remplir le titre" className="form-control"  type="text" onChange={e => this.setState({titre: e.target.value})}/>
                                    </div>
                                  </div>
                        
                        <div className="form-group">
                                    <div className="input-group">
                                      <span className="input-group-addon"><i className="glyphicon glyphicon-pencil" aria-hidden="true"></i></span>
                                      <textarea  id="description" name="description" placeholder="Description" required="Remplir la description" className="form-control"  type="text" onChange={e => this.setState({description: e.target.value})}/>
                                    </div>
                                  </div>
      
                      <div className="form-group">
                                    <div className="input-group">
                                      <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                      <input id="auteur" name="auteur" placeholder="Auteur de l'astuce" required="Remplir le nom de l'auteur" className="form-control"  type="text" onChange={e => this.setState({nom: e.target.value})}/>
                                    </div>
                                  </div>
      
                      <div className="form-group">
                                    <div className="input-group">
                                      <span className="input-group-addon"><i className="glyphicon glyphicon-link" aria-hidden="true"></i></span>
                                      <input id="lien" name="lien" placeholder="Lien de l'astuce" required="Remplir le lien de l'astuce" className="form-control"  type="text" onChange={e => this.setState({lien: e.target.value})}/>
                                    </div>
                                  </div>

                        <div className="form-group">
                              <select className="form-control" require="true"  id="ufr" onChange={e => this.setState({type: e.target.value})}>
                              <option id="1">Faculté</option>
                              <option id="2">Bureautique</option>
                              <option id="3">Apprends avec nous</option>
                              </select>
                            </div>
      
                        <input type="submit" className="center-block btn btn-danger" value="Proposer une activité" />
                        </form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>FERMER</Button>
              </Modal.Footer>
            </Modal>
            </div>
            </div>

            
        )
    }
    
}



export default Astuce;
