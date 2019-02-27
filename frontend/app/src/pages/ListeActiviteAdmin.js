import React,{ Component } from 'react';
import NavbarMembres from './NavbarMembres.js';
import ActiviteValide from './ActiviteValide.js';
import {Button,Modal} from 'react-bootstrap';
import axios from 'axios';

import { SERVER_URL } from "../consts";

class GererActiviteAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activites: [],
            show: false
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount() {
        axios.get(SERVER_URL + "activity/")
          .then(response => {
            let i
            let tab =[]
            console.log(response);
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
          console.log(activite);
    
          listeActivite.push(
              < ActiviteValide 
                id={activite.id}
                titre={activite.titre}
                description={activite.description}
                dateDebut={activite.dateDebut}
                dateFin={activite.dateFin}
                salle={activite.salle}
                nombrePlaceDispo={activite.placeDisponible}
                animateur={activite.animateur}
                idCateg={activite.idCateg}
                />
            );
        });
        
        return content = listeActivite;
      }
      
      handleShow(){
        this.setState({
            show : true
        })
      }

      handleClose() {
        this.setState({ show: false });
      }

      handleSubmit(event) {
        const url = ''
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
            <br></br>
            <br></br>
                    <NavbarMembres/>
                        <div className="container">
                        <div className="row col-md-12 col-md-offset-2 custyle">
                        <a className='btn btn btn-info btn-sm' align="center" onClick={this.handleAddActivity}>
                            Proposer une activité
                        </a>
                        <table className="table table-striped custab">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Date de début</th>
                                <th>Date de fin</th>
                                <th>Salle</th>
                                <th>Nombre de places</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.display()}
                        </tbody>
                        </table>
                        </div>
                    </div>

                    <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Body>
          <h2 className="text-center">Voulez-vous vous inscrire à cette activité ?</h2>
          <h3 className="text-center">Inscrivez vous ici</h3>

          salut
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>FERMER</Button>
        </Modal.Footer>
      </Modal>
                </div>

        );
      }
}

export default GererActiviteAdmin;