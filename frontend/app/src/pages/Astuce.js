import React, { Component } from 'react';
import './Astuce.css';

import {Button,Modal} from 'react-bootstrap';
import Swal from 'sweetalert2';

import axios from 'axios';
import BoxAstuce from './BoxAstuce.js';

import { SERVER_URL } from "../consts";

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
          message : '',
          auteur:'',
          lien: '',
          image : '',
          chooseCateg : 1,

          astuces : [],
          astuceSearch : "",
          type: "Faculté",
          categories :[],

        };


      }

      handleClose() {
        this.setState({ show: false });
      }

      handleShow() {
          axios.get(SERVER_URL + "astucesCategories/")
           .then(response => {
             let i
             let tab =[]

             for (i = 0; i < response.data.length; i++) {
               tab.push(response.data[i]);
             }
             this.setState({ show: true,categories:tab,});
           })
           .catch(error => {
             console.log(error);
           });
      }

      displayCateg(){
        let listUfr = [];
        let content
        content = this.state.categories.map((categ, index) =>{
          listUfr.push(<option id={categ.id}>{categ.id} - {categ.intitule}</option>)
        })
        return content = listUfr
      }

      componentDidMount() {

        axios.all([
          axios.get(SERVER_URL+"astuce/"),
          axios.get(SERVER_URL + "astucesCategories/")
        ])
        .then(axios.spread((responseA, responseC) => {
          let tab =[]
          let i;
          for (i = 0; i < responseA.data.length; i++) {
            tab.push(responseA.data[i]);
          }
    
          let ii
            let tabb =[]
            for (ii = 0; ii < responseC.data.length; ii++) {
              tabb.push(responseC.data[ii]);
            }
    
            this.setState({
              astuces:tab,
              categories:tabb,
            })
        }));

        /* axios.get(SERVER_URL + "astuce/")
          .then(response => {
            let i
            let tab =[]
            for (i = 0; i < response.data.length; i++) {
              tab.push(response.data[i]);
            }
            this.setState({
              astuces: tab,
            });
          })
          .catch(error => {
            console.log(error);
          });

           axios.get(SERVER_URL + "astucesCategories/")
           .then(response => {
             let i
             let tab =[]

             for (i = 0; i < response.data.length; i++) {
               tab.push(response.data[i]);
             }
             this.setState({categories:tab,});
           })
           .catch(error => {
             console.log(error);
           }); */
         }

      handleSearch(e){
        this.setState({
          astuceSearch:e.target.value,
        })
        this.display()
      }

     display () {
        let tabActivite =[]
        let content
        let contentA
        let nbAstuceParCategorie

        if(this.state.astuceSearch === ""){//si on a rien taper dans la navbar
           content = this.state.categories.map((categorie, index) => {
             tabActivite.push(<h1>{categorie.intitule}</h1>)
             nbAstuceParCategorie = 0 //a chaque categorie on remet a 0 le compteur
             contentA = this.state.astuces.map((astuce, index) =>{
               if(categorie.intitule ==  astuce.type_astuce){
                nbAstuceParCategorie+=1;
                   tabActivite.push(
                     <BoxAstuce
                       modtitre={astuce.titre}
                       modlien={astuce.lienAstuce}
                       modid={astuce.id}
                       modauteur={astuce.auteur}
                       modimage={astuce.image}
                       modtype={astuce.type}
                       moddescription={astuce.description}
                     />
                   )
               }
             })
             if(nbAstuceParCategorie == 0){
              tabActivite.push(
                 <div className="alert alert-primary" role="alert">
                     <h1>Aucune astuce de ce type trouvé</h1>
                 </div>
               )
              }
          })
        }else{
          let titre;
          let description;
          let auteur;
          let nbAstuceParCategorie;

          content = this.state.categories.map((categorie, index) => {
            tabActivite.push(<h1>{categorie.intitule}</h1>)
            contentA = this.state.astuces.map((astuce, index) =>{

            //RECUPERE LA VALEUR DU TITRE,DESCRITPION,AUTEUR DE L'ASTUCE
            titre = astuce.titre;
            description = astuce.description;
            auteur = astuce.auteur;
            nbAstuceParCategorie = 0 //a chaque categorie on remet a 0 le compteur

              //SI CE QU'IL Y A ECRIT DANS LA BAR DE RECHERCHE EST EGALE AU TITRE,DESCRITPION,AUTEUR DE L'ASTUCE
              if(titre.includes(this.state.astuceSearch) || description.includes(this.state.astuceSearch) || auteur.includes(this.state.astuceSearch)){
                if(categorie.intitule ==  astuce.type_astuce){
                  nbAstuceParCategorie+=1;
                    tabActivite.push(
                      <BoxAstuce
                        modtitre={astuce.titre}
                        modlien={astuce.lienAstuce}
                        modid={astuce.id}
                        modauteur={astuce.auteur}
                        modimage={astuce.image}
                        modtype={astuce.type}
                        moddescription={astuce.description}
                      />
                    )
                }
              }
            })
            if(nbAstuceParCategorie == 0){
              tabActivite.push(
                 <div className="alert alert-primary" role="alert">
                     <h1>Aucune activite de ce type trouvé</h1>
                 </div>
               )
              }
         })
        }
          return (tabActivite)
        }

handleSubmit() {
    const url = SERVER_URL + "astuce/?titre="+this.state.titre+"&message="+this.state.message+"&description="+this.state.description+"&lienAstuce="+this.state.lien+"&auteur="+this.state.auteur+"&image="+this.state.image+"&idAstuce="+this.state.chooseCateg
    axios.post(url)
      .then(response => {
        Swal.fire(
          'Succès!',
          'Vous avez créer une nouvelle actuce\nelle est soumise à validation',
          'success'
        )
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
                  Vous rencontrez des problèmes avec les services en ligne de l'université ou bien apprendre
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

                      <div className="form-group">
                                    <div className="input-group">
                                      <span className="input-group-addon"><i className="glyphicon glyphicon-chevron-right" aria-hidden="true"></i></span>
                                      <input id="titre" name="titre" placeholder="Titre" required="Remplir le titre" className="form-control"  type="text" onChange={e => this.setState({titre: e.target.value})}/>
                                    </div>
                                  </div>
                                  <div className="form-group">
                                                <div className="input-group">
                                                  <span className="input-group-addon"><i className="glyphicon glyphicon-chevron-right" aria-hidden="true"></i></span>
                                                  <input id="msg" name="msg" placeholder="Message" required="Remplir le titre" className="form-control"  type="text" onChange={e => this.setState({message: e.target.value})}/>
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
                                      <span className="input-group-addon"><i className="fa fa-camera-retro fa" aria-hidden="true"></i></span>
                                      <input id="image" name="image"  placeholder="Image" required className="form-control"  type="text" onChange={e => this.setState({image: e.target.value})}/>
                                      <img src={this.state.image} width="50" height="50"/>
                                    </div>
                                  </div>

                      <div className="form-group">
                                    <div className="input-group">
                                      <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                      <input id="auteur" name="auteur" placeholder="Auteur de l'astuce" required="Remplir le nom de l'auteur" className="form-control"  type="text" onChange={e => this.setState({auteur: e.target.value})}/>
                                    </div>
                                  </div>

                      <div className="form-group">
                                    <div className="input-group">
                                      <span className="input-group-addon"><i className="glyphicon glyphicon-link" aria-hidden="true"></i></span>
                                      <input id="lien" name="lien" placeholder="Lien de l'astuce" required="Remplir le lien de l'astuce" className="form-control"  type="text" onChange={e => this.setState({lien: e.target.value})}/>
                                    </div>
                                  </div>

                        <div className="form-group">
                        <select className="form-control" require="true"  id="ufr" onChange={e => this.setState({chooseCateg: e.target.value.substring(0, 1)})}>
                          {
                            this.displayCateg()
                          }
                        </select>
                            </div>

                        <input type="button" className="center-block btn btn-danger" onClick={this.handleSubmit} value="Proposer une activité" />
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
