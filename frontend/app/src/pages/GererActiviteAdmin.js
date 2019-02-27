import React,{ Component } from 'react';
import NavbarMembres from './NavbarMembres.js';
import ActiviteNonValide from './ActiviteNonValide.js';
import axios from 'axios';
import setSession from './../actions/setSession';
import {Button,Modal} from 'react-bootstrap';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';

import { SERVER_URL } from "../consts";

class GererActiviteAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activites: [],
            show : false,

            titre:"",
            description:"",
            dateDebut:"",
            dateFin:"",
            salle:"",
            placeDisponible:0,
            animateur:"",
            idCategorgieActivite:1,

            categories:[],
        };

        this.handleAddActivity = this.handleAddActivity.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
      }

      componentDidMount() {
        axios.get(SERVER_URL + "unvalidate/")
          .then(response => {
            let i
            let tab =[]
            for (i = 0; i < response.data.length; i++) {

              tab.push(response.data[i]);
            }
            this.setState({
              activites: tab,
            });
          })
          .catch(error => {
            console.log(error);
          });


      }

      display(){
        let listeActivite =[]
        let content = this.state.activites.map((activite, index) => {

          listeActivite.push(
              < ActiviteNonValide
                id={activite.id}
                titre={activite.titre}
                description={activite.description}
                dateDebut={activite.dateDebut}
                dateFin={activite.dateFin}
                salle={activite.salle}
                animateur={activite.animateur}
                placeDisponible={activite.placeDisponible}
                />
            );
        });

        return content = listeActivite;
      }

      displayCateg(){
        let listCateg = [];
        let content = this.state.categories.map((categorie, index) =>{
          listCateg.push(<option id={categorie.id}>{categorie.id} - {categorie.intitule}</option>)
        })
        return content = listCateg
      }

      handleShow(){
        axios.get(SERVER_URL + "activitesCategories/")
         .then(response => {
           let i
           let tab =[]

           for (i = 0; i < response.data.length; i++) {
             tab.push(response.data[i]);
           }
           this.setState({
             categories: tab,
             show : true,
           });
         })
         .catch(error => {
           console.log(error);
         });
     }

      handleClose(){
        this.setState({
          show : false,
        })
      }

      handleAddActivity() {
        const url = SERVER_URL + "activity/?titre="+this.state.titre+"&description="+this.state.description+"&dateDebut="+this.state.dateDebut+"&dateFin="+this.state.dateFin+"&salle="+this.state.salle+"&animateur="+this.state.animateur+"&placeDispo="+this.state.placeDisponible+"&idCateg="+this.state.idCategorgieActivite+"";

        axios.post(url)
          .then(response => {
            let i
            let tab =[]
            for (i = 0; i < response.data.length; i++) {
              tab.push(response.data[i]);
            }
            this.setState({
              activites: tab,
            });
            Swal.fire(
              'Succès!',
              'Vous avez créer une nouvelle activité\nelle est soumise à validation',
              'success'
            )
            this.handleClose()
          })
          .catch(error => {
          });
      }

      render() {
        return (
            <div>
            <br></br>
            <br></br>
                    <NavbarMembres/>
                        <div className="container">
                        <div className="row col-md-12 col-md-offset-2 custyle">
                        <button type="button" onClick={this.handleShow} class="btn btn-info btn-lg">Proposer une activité</button>
                        <table className="table table-striped custab">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Date de début</th>
                                <th>Date de fin</th>
                                <th>Salle</th>
                                <th>Nombre de places</th>
                                <th>Animateur</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.display()}
                        </tbody>
                        </table>
                        </div>
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

        );
      }
}

const mapStateToProps = state => {
  return { sessionConnect: state.sessionReducer}
};
const mapDispatchToProps = dispatch => {
  return {
    setSession: (name,id,prenom,mail,image,telephone,description,login,token) => {
      dispatch(setSession(name,id,prenom,mail,image,telephone,description,login,token))
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(GererActiviteAdmin)
