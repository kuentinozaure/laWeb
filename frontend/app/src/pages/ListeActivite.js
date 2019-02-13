import React, { Component } from 'react';
import TypeActivite from './TypeActivite';
import Box from './Box.js';
import {Button,Modal} from 'react-bootstrap';
import "./ListeActivite.css"
import axios from 'axios';

//importer inscription activité (module Modalform)

class ListeActivite extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      activities : [],
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
    const url = 'http://laweb.alwaysdata.net/?choix=1';
    axios.get(url)
      .then(response => {
        let i
        let tab =[]
        for (i = 0; i < response.data.activite.length; i++) {
          tab.push(response.data.activite[i]);
        }
        this.setState({
          activities: tab,
        });
        console.log(this.state.activities);
      })
      .catch(error => {
        console.log(error);
      });

  }

  display(){
    let listActivityEvent =[]
    let listActivityA =[]
    if(this.activitySearch === ""){
      let content = this.state.activities.map((activity, index) => {
        
        if(activity.type == "EVENEMENT"){
          listActivityEvent.push(
            <Box 
                imgnom= {activity.titre}
                modnom= {activity.id}
                modtitre={activity.titre}
                moddate= {activity.dateDebut}
                modnbplace={activity.placeDispo}
                modnbplaceRestante={activity.placeRestante}
                moddescription={activity.description}
            />
          );
        }
        else{
          listActivityA.push(
            <Box 
                imgnom= {activity.titre}
                modnom= {activity.id}
                modtitre={activity.titre}
                moddate= {activity.dateDebut}
                modnbplace={activity.placeDispo}
                modnbplaceRestante={activity.placeRestante}
                moddescription={activity.description}
            />
          );
        }
        
      });
      
      return (
          <div>
          <div class="container">
            <h1>Evènements</h1>
              {content = listActivityEvent}   
          </div>
          <div class="container">
              <h1>Ateliers</h1>
                {content = listActivityA}   
          </div>
          </div>
      );
      

    }else{
      let titre="";
      let description = "";

      let content = this.state.activities.map((activity, index) => {
        titre = activity.titre;
        description = activity.description

        if(titre.includes(this.state.activitySearch) || description.includes(this.state.activitySearch)){
          if(activity.type == "EVENEMENT"){
            listActivityEvent.push(
              <Box 
                  imgnom= {activity.titre}
                  modnom= {activity.id}
                  modtitre={activity.titre}
                  moddate= {activity.dateDebut}
                  modnbplace={activity.placeDispo}
                  modnbplaceRestante={activity.placeRestante}
                  moddescription={activity.description}
              />
            );
          }
          else{
            listActivityA.push(
              <Box 
                  imgnom= {activity.titre}
                  modnom= {activity.id}
                  modtitre={activity.titre}
                  moddate= {activity.dateDebut}
                  modnbplace={activity.placeDispo}
                  modnbplaceRestante={activity.placeRestante}
                  moddescription={activity.description}
              />
            );
          }
        }
      });
      
      return (
        <div>
        <div class="container">
          <h1>Evènements</h1>
            {content = listActivityEvent}   
        </div>
        <div class="container">
            <h1>Ateliers</h1>
              {content = listActivityA}   
        </div>
        </div>
    );
    }
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
            Viens découvrir le domaine de l'informatique autour d'évènements ou d'ateliers.<div id="sautdeligne"></div>
            Tu peux découvrir nos activités sur cette page et t'y inscrire.<div id="sautdeligne"></div>
          </div>
          <br></br>
            <div className="row">
              <div className="col-12">
                <div id="custom-search-input">
                  <div className="input-group">
                      <input type="text" className="search-query form-control" placeholder="Rechercher une activité" onChange={e => this.handleSearch(e)}/>
                  </div>
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


export default ListeActivite;