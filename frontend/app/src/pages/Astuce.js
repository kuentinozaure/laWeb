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
    
        this.state = {
          show: false,
          titre: '',
          description: '',
          nom: '',
          lien: '',
          astuces : [],
          astuceSearch : "",
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

    render() {
        return (
            <div>
                <h1 align="center">Astuces</h1>
                <a class="btn btn-info btn-lg " role="button" onClick={this.handleShow}>Proposer une astuce</a>
                <p></p>
                <p></p>
                <h2 align="center">
                    Vous avez un problème ? Nos astuces peuvent peut-être vous aider à le résoudre.
                </h2>
                <div className="row">
              <div className="col-12">
                <div id="custom-search-input">
                  <div className="input-group">
                      <input type="text" className="search-query form-control" placeholder="Rechercher une activité" onChange={e => this.handleSearch(e)}/>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
                {this.display()}
            </div>
        )
    }
    
}



export default Astuce;
