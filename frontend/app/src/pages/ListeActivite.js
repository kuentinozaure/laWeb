import React, { Component } from 'react';
import TypeActivite from './TypeActivite';
import Box from './Box.js';
import {Button,Modal} from 'react-bootstrap';
import "./ListeActivite.css"
import axios from 'axios';
import Swal from 'sweetalert2';

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

      titre:"",
      description:"",
      dateDebut:"",
      dateFin:"",
      salle:"",
      placeDisponible:0,
      animateur:"",
      idCategorgieActivite:1,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  displayCateg(){
    let listCateg = [];
    let content = this.state.categories.map((categorie, index) =>{
      listCateg.push(<option id={categorie.id}>{categorie.id} - {categorie.intitule}</option>)
    })
    return content = listCateg
  }

  handleAddActivity() {
    const url = SERVER_URL + "activity/?titre="+this.state.titre+"&description="+this.state.description+"&dateDebut="+this.state.dateDebut+"&dateFin="+this.state.dateFin+"&salle="+this.state.salle+"&animateur="+this.state.animateur+"&placeDispo="+this.state.placeDisponible+"&idCateg="+this.state.idCategorgieActivite+""
    console.log(alert(url));
    
    axios.post(url)
      .then(response => {
        Swal.fire(
          'Succès!',
          'Vous avez créer une nouvelle activité\nelle est soumise à validation',
          'success'
        )
        this.handleClose()
      })
      .catch(error => {
        console.log(error);
      });
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
          <a className="btn btn-primary btn-lg pull-right " role="button" onClick={this.handleShow}>Proposer une activite</a>
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
      <div>
                  <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Body>
                      <h2 className="text-center">Voulez-vous proposer une activité ?</h2>
                      <h3 className="text-center">Faites le ici</h3>
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon"><i className="glyphicon glyphicon-chevron-right" aria-hidden="true"></i></span>
                          <input type="text" id="titre" name="titre"  required placeholder="Titre" className="form-control" onChange={e => this.setState({titre: e.target.value})}></input>
                        </div>
                      </div>
                        <br></br>
                        <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue "></i></span>
                            <textarea class="form-control" rows="3" placeholder="Décris nous ton activité" id="description" required="Remplir la description" type="text" onChange={e => this.setState({description: e.target.value})}></textarea>
                        </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-calendar fa" aria-hidden="true"></i></span>
                            <input id="dateDebut" name="dateDebut"  required placeholder="dateDebut" className="form-control"  type="date" onChange={e => this.setState({dateDebut: e.target.value})}/>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-calendar fa" aria-hidden="true"></i></span>
                            <input id="dateFin" name="dateFin"  placeholder ="dateFin"  required className="form-control"  type="date" onChange={e => this.setState({dateFin: e.target.value})}/>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-chevron-right" aria-hidden="true"></i></span>
                            <input id="salle" name="salle"  placeholder ="Salle" required  className="form-control"  type="text" onChange={e => this.setState({salle: e.target.value})}/>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                              <input id="placeDisponible" placeholder ="Nombre de places" className="form-control" type="text"  onChange={e => this.setState({placeDisponible: e.target.value})}/>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon"><i className="glyphicon glyphicon-chevron-right" aria-hidden="true"></i></span>
                            <input id="animateur" name="animateur"  placeholder ="Nom de l'animateur" required  className="form-control"  type="text" onChange={e => this.setState({animateur: e.target.value})}/>
                          </div>
                        </div>
                        <div className="form-group">
                          <select className="form-control" require="true"  id="idCateg" onChange={e => this.setState({ufrSelected: e.target.value.substring(0, 1)})}>
                          {
                            this.displayCateg()
                          }
                          </select>
                        </div>

                      <input className="center-block btn btn-danger" value="Proposer l'activité " onClick={this.handleAddActivity}/>
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


export default ListeActivite;
