import React, { Component } from 'react';
import Mdp from './Mdp.js';
import NavbarMembres from './NavbarMembres.js';
import Modal from 'react-responsive-modal';
import "./FormulaireCard.css"

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};


class InfoCompte extends Component {
    constructor(props) {
        super(props);
        this.state = {
          adresse: '',
          open: false
          
        };
        
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleSubmit(event) {
        alert('Adresse: '+this.state.adresse);
        event.preventDefault();
    }
    
  
    onOpenModal = () => {
      this.setState({ open: true });
    };

    modifierprofil(){
      
    }
  
    onCloseModal = () => {
      this.setState({ open: false });
    };

    render() {
      const { open } = this.state;
      return (

        <div style={styles} >
        <div id="infocomptenavbar">
        <NavbarMembres/>
        </div>
          
          
          <div id="infocompte">
            <h2>Mon Profil</h2>
            <p>
              Nom : <br/>
              Prenom:<br/>
              email:<br/>
              Telephone:<br/>
              Description:<br/>
              Identifiant:<br/>

            </p>
            
            <button onClick={this.onOpenModal} color="primary">
              Modifier
            </button>
            <button onClick={this.handleClose} color="primary">
              Fermer
            </button>
            <Modal open={open} onClose={this.onCloseModal} center>
          </Modal>
          </div>
        </div>
      );
    }
}

export default InfoCompte;