import React, { Component } from 'react';
import TypeActivite from './TypeActivite';
import Box from './Box.js';
import {Button,Modal} from 'react-bootstrap';
import "./ListeActivite.css"
import axios from 'axios';

import { SERVER_URL } from "../consts";

//importer inscription activité (module Modalform)

class ListeActivite extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,

      activities : [],
      categories :[],

      activitySearch : "",
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  componentDidMount() {
    const url = SERVER_URL+"activity/";
    axios.get(url)
      .then(response => {
        let tab =[]
        let i;
        for (i = 0; i < response.data.length; i++) {
          tab.push(response.data[i]);
        }
        this.setState({
          activities: tab,
        });
      })
      .catch(error => {
        console.log(error);
      });

      axios.get(SERVER_URL + "categorieActivity/")
      .then(response => {
        let i
        let tab =[]
        for (i = 0; i < response.data.length; i++) {
          tab.push(response.data[i]);
        }
        this.setState({categories:tab,});
                console.log(this.state.activities)
      })
      .catch(error => {
        console.log(error);
      });
  }

  display(){

    let tabActivite =[]
    let content
    let contentA
    if(this.state.activitySearch === ""){//si on a rien taper dans la navbar
       content = this.state.categories.map((categorie, index) => {
         tabActivite.push(<h1>{categorie.intitule}</h1>)
         contentA = this.state.activities.map((activity, index) =>{
           if(categorie.intitule ==  activity.categorie){
               tabActivite.push(
                 <Box
                     imgnom= {activity.titre}
                     modnom= {activity.id}
                     modtitre={activity.titre}
                     moddate= {activity.dateDebut}
                     modnbplace={activity.placeDisponible}
                     modnbplaceRestante={activity.placeRestante}
                     moddescription={activity.description}
                     modanimateur={activity.animateur}
                 />
               )
           }
         })
      })
    }else{
      let titre;
      let description;
      let animateur;

      content = this.state.categories.map((categorie, index) => {
        tabActivite.push(<h1>{categorie.intitule}</h1>)
        contentA = this.state.activities.map((activity, index) =>{

        //RECUPERE LA VALEUR DU TITRE,DESCRITPION,ANIMATEUR DE L'ACTIVITE
        titre = activity.titre;
        description = activity.description;
        animateur = activity.animateur;

          //SI CE QU'IL Y A ECRIT DANS LA BAR DE RECHERCHE EST EGALE AU TITRE,DESCRITPION,ANIMATEUR DE L'ACTIVITE
          if(titre.includes(this.state.activitySearch) || description.includes(this.state.activitySearch) || animateur.includes(this.state.activitySearch)){
            if(categorie.intitule ==  activity.categorie){
                tabActivite.push(
                  <Box
                      imgnom= {activity.titre}
                      modnom= {activity.id}
                      modtitre={activity.titre}
                      moddate= {activity.dateDebut}
                      modnbplace={activity.placeDisponible}
                      modnbplaceRestante={activity.placeRestante}
                      moddescription={activity.description}
                      modanimateur={activity.animateur}
                  />
                )
            }
          }
        })
     })
    }
      return (tabActivite)
    }



  handleSearch(e){
    this.setState({
      activitySearch:e.target.value,
    })
    this.display()
  }

  render() {

    return (
      <div>
        <br></br>
        <div className="container">
        <div id="div_titreAccueil">
          ~ Quelles activités te propose LaWeb ? ~
        </div>
        <br></br>
          <div id="div_presentation" align="center">
            LaWeb te propose des activités au sein de l'université.<div id="sautdeligne"></div>
            Viens découvrir le domaine de l'informatique autour d'évènements et ateliers.<div id="sautdeligne"></div>
            Tu peux découvrir nos activités sur cette page et t'y inscrire.<div id="sautdeligne"></div>
          </div>
          <br></br>
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
      </div>
    )
  }


}


export default ListeActivite;
