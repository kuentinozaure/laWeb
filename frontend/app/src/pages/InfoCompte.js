import React, { Component } from 'react';
import Mdp from './Mdp.js';
import NavbarMembres from './NavbarMembres.js';
// import Modal from 'react-responsive-modal';
import "./FormulaireCard.css";
import {Button,Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';

import { SERVER_URL } from "../consts";

import "./InfoCompte.css"

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};


class InfoCompte extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow;
    this.handleClose = this.handleClose;
    this.handleSubmit = this.handleSubmit;

    this.state = {
      show: false,
      show1: false,
      show2:false,
      
      //listeUfr : []
    };
  }

      handleClose = ()  =>{
        this.setState({ show: false });
      }
      handleClose1 = ()  =>{
        this.setState({ show1: false });
      }
    
      handleShow = () => {
        this.setState({ show: true });
      }
      handleShow1 = () => {
        this.setState({ show1: true });
      }
      handleDelete = () => {
        Swal.fire({
          title: 'Etes vous sur de supprimer votre compte  ?',
          text: "Vous ne pourrez pas revenir en arrière",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Oui , je suis sur'
        }).then((result) => {
          if (result.value) {
            axios.delete(SERVER_URL + "members/"+this.props.id+"/");
            Swal.fire(
              'Supprimer!',
              'votre compte a ete supprimer',
              'success'
            )
          }
        })
      }

    // handleSubmit(event) {
    //     alert('Adresse: '+this.state.adresse);
    //     event.preventDefault();
    // }
    
  
    // onOpenModal = () => {
    //   this.setState({ open: true });
    // };

    
  
    // onCloseModal = () => {
    //   this.setState({ open: false });
    // };

    render() {
      const { open } = this.state;
      return (

        <div style={styles} >
        <div id="infocomptenavbar">
        <NavbarMembres/>
        
        <div className="container">
          <div className="row col-md-12 col-md-offset-2 custyle">
            <table className="table table-striped custab">
              <thead>
                <tr className="info">
                  <th className="case">Nom</th>
                  <th className="case">Prenom</th>
                  <th className="case">email</th>
                  <th className="case">Telephone</th>
                  <th className="case">Description</th>
                  <th className="case">Identifiant</th>
                  <th className="case">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="warning">
                    <th className="case"h>laweb</th>
                    <th  className="case">admin </th>
                    <th className="case">laweb@admin</th>
                    <th className="case">02020202</th>
                    <th className="case">je suis bien</th>
                    <th className="case">laweb@admin</th>
                    <th className="case">
                      <button type="button" onClick={this.handleShow} class="btn btn-primary btn-lg">Modifier profil</button>
                      <button type="button" onClick={this.handleShow1} class="btn btn-danger btn-lg"> Modifier mot de passe</button>
                      <button type="button" onClick={this.handleDelete}  class="btn btn-warning btn-lg"> Supprimer </button>
                    </th>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
          <p>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          </p>
          
          {/*<button type="button" onClick={this.handleShow} class="btn btn-primary btn-lg">Modifier profil</button>
            Nom : <br/>
            Prenom:<br/>
            email:<br/>
            Telephone:<br/>
            Description:<br/>
            Identifiant:<br/>
            <br/>
          <br/>
          <br/>
          </p>

          
          <button type="button" onClick={this.handleShow1} class="btn btn-danger btn-lg"> Modifier mot de passe</button>
          <button type="button" onClick={this.handleShow2}  class="btn btn-warning btn-lg"> Supprimer </button>
           <Modal open={open} onClose={this.onCloseModal} center>
          <h2>Mon Profil</h2>
          <p>
            Nom : <br/>
            Prenom:<br/>
            email:<br/>
            Telephone:<br/>
            Description:<br/>
            Identifiant:<br/>
          </p>
          <button onClick={this.onCloseModal} color="primary">Enregistrer</button>
          </Modal> */}
           <Modal show={this.state.show} >
              <Modal.Body>
                <h4>Modifie ton profil ici </h4>
                <form id="register-form" role="form" autoComplete="off" className="form"  >
                      <div className="form-group">
                                    <div className="input-group">
                                      <input id="Nom" name="Nom" placeholder="Nom"  className="form-control"  type="text" />
                                    </div>
                                  </div>
                        
                        <div className="form-group">
                                    <div className="input-group">
                                      
                                      <input  id="Prenom" name="Prenom" placeholder="Prenom" className="form-control"  type="text" />
                                    </div>
                                  </div>
      
                      <div className="form-group">
                                    <div className="input-group">
                                      
                                      <input id="email" name="email" placeholder="email"  className="form-control"  type="text" />
                                    </div>
                                  </div>
      
                      <div className="form-group">
                                    <div className="input-group">
                                      
                                      <input id="Tel" name="Tel" placeholder="Tel"  className="form-control"  type="text" />
                                    </div>
                                  </div>

                      <div className="form-group">
                                    <div className="input-group">
                                      
                                      <input id="Description" name="Description" placeholder="Description" className="form-control"  type="text" />
                                    </div>
                                  </div>

                       
      
                            <button type="button"  class="btn btn-primary btn-lg">Save</button>
                        </form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose}>FERMER</Button>
              </Modal.Footer>
            </Modal>
            <Modal show={this.state.show1} >
              <Modal.Body>
                <h4>Modifie ton profil ici </h4>
                <form id="register-form" role="form" autoComplete="off" className="form"  >
                      <div className="form-group">
                                    <div className="input-group">
                                      <input id="Nouveau mot de passe " name="Nouveau mot de passe " placeholder="Nouveau mot de passe " className="form-control"  type="text" />
                                    </div>
                                  </div>
                        
                        <div className="form-group">
                                    <div className="input-group">
                                      
                                      <input  id="Confirmer mot de passe" name="Confirmer mot de passe" placeholder="Confirmer mot de passe" className="form-control"  type="text" />
                                    </div>
                                  </div>
                            <button type="button"  class="btn btn-primary btn-lg">Save</button>
                        </form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.handleClose1}>FERMER</Button>
              </Modal.Footer>
            </Modal>

         </div>
        </div>
      );
    }
}

export default InfoCompte;
