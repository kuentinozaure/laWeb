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
    this.handleUpdate = this.handleUpdate;

    this.state = {
      show: false,

      nom : this.props.sessionConnect.name,
      prenom :this.props.sessionConnect.prenom,
      mail : this.props.sessionConnect.mail,
      image : this.props.sessionConnect.image,
      telephone :this.props.sessionConnect.telephone,
      description : this.props.sessionConnect.description,
      login : this.props.sessionConnect.login,


    };
  }

      handleClose = ()  =>{
        this.setState({ show: false });
      }

      handleShow = () => {
        this.setState({ show: true });
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
            axios.delete(SERVER_URL + "members/"+this.props.sessionConnect.id+"/");
            Swal.fire(
              'Supprimer!',
              'votre compte a ete supprimer',
              'success'
            )
          }
        })
      }



      handleUpdate= ()  =>{
        const url = SERVER_URL+"members/"+this.props.sessionConnect.id+"/?nom="+this.state.nom+"&prenom="+this.state.prenom+"&mail="+this.state.mail+"&image="+this.state.image+"&telephone="+this.state.telephone+"&description="+this.state.description+"&login="+this.state.login ;
        axios.put(url)
          .then(response => {
            this.handleClose();
          })
          .catch(error => {
            console.log(error);
          });

      }

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
                  <th className="case">Email</th>
                  <th className="case">Image</th>
                  <th className="case">Telephone</th>
                  <th className="case">Description</th>
                  <th className="case">Identifiant</th>
                  <th className="case">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="warning">
                    <th className="case">{this.state.nom}</th>
                    <th  className="case">{this.state.prenom} </th>
                    <th className="case">{this.state.mail}</th>
                    <th className="case"><img src={this.state.image} width="50" height="50"/><br></br>{this.state.image}</th>
                    <th className="case">{this.state.telephone}</th>
                    <th className="case">{this.state.description}</th>
                    <th className="case">{this.state.login}</th>
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
          <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Body>
            <h2 className="text-center">Voulez-vous modifier votre profil ?</h2>
            <h3 className="text-center">Faites le ici</h3>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-tags fa" aria-hidden="true"></i></span>
                <input type="text" id="name" name="name" value={this.state.nom} className="form-control" onChange={e => this.setState({nom: e.target.value})}></input>
              </div>
              <br></br>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-tags fa" aria-hidden="true"></i></span>
                  <input id="prenom" name="prenom"  value ={this.state.prenom} className="form-control"  type="text" onChange={e => this.setState({prenom: e.target.value})}/>
                  </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-pencil fa" aria-hidden="true"></i></span>
                  <input id="email" name="email"  value ={this.state.mail} className="form-control"  type="text" onChange={e => this.setState({mail: e.target.value})}/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-camera-retro fa" aria-hidden="true"></i></span>
                  <input id="image" name="image"  value ={this.state.image}  className="form-control"  type="text" onChange={e => this.setState({image: e.target.value})}/>
                  <img src={this.state.image} width="50" height="50"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-phone fa" aria-hidden="true"></i></span>
                  <input id="tel" name="tel"  value ={this.state.telephone}  className="form-control"  type="text" onChange={e => this.setState({telephone: e.target.value})}/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                    <textarea id="story" className="form-control" name="story" rows="2" cols="33" value={this.state.description} type="text"  onChange={e => this.setState({description: e.target.value})}></textarea>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                  <input id="login" name="login"  value ={this.state.login} className="form-control"  type="text" onChange={e => this.setState({login: e.target.value})}/>
                </div>
              </div>
            </div>
            <input className="center-block btn btn-danger" value="Modifier cette astuce" onClick={this.handleUpdate}/>
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
    return {
        sessionConnect: state.sessionReducer
    }
};

export default connect(mapStateToProps,null)(InfoCompte)
