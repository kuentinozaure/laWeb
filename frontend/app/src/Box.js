import React, { Component } from 'react';
import './App.css';
import {Button,Modal} from 'react-bootstrap';
import Inscription from './Inscription.js'
import axios from 'axios'

class Box extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      show: false,
      name: '',
      prenom: '', 
      ufr: '',
      adresse: '',
      numero: '',
      newsletter: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (

      <div className="Box">

      <Button id="BtAct" onClick={this.handleShow}>
        {this.props.imgnom}
      </Button>

      <a className="thumbnail">
        <img id="imgbox" src="https://image.freepik.com/free-icon/activity-feed_318-1665.jpg" alt="Image"/>
      </a>

      <Modal show={this.state.show} onHide={this.handleClose}>

        <Modal.Body>
          <h4><b>{this.props.modnom} : </b>{this.props.modtitre}</h4>
          <h4><b>Date : </b>{this.props.moddate}</h4>
          <h4><b>Places restante : </b>{this.props.modnbplaceRestante} </h4>
          <h4><b>Places totales : </b>{this.props.modnbplace} </h4>
          <hr/>
          <h4><b>Description :</b></h4>
          <p>
            {this.props.moddescription}
          </p>
          
          <h2 className="text-center">Vous voulez vous inscrire à cette activité ?</h2>
          <h3 className="text-center">Inscrivez vous ici</h3>

          <form id="register-form" role="form" autocomplete="off" className="form" method="get" onSubmit={this.handleSubmit}>
                <div class="form-group">
                              <div class="input-group">
                                <span class="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                <input id="name" name="nom" placeholder="Nom" required="remplir votre nom" className="form-control"  type="text" onChange={e => this.setState({name: e.target.value})}/>
                              </div>
                            </div>
                  
                  <div className="form-group">
                              <div className="input-group">
                                <span class="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                <input id="prenom" name="prenom" placeholder="Prenom" required="remplir votre prenom" className="form-control"  type="text" onChange={e => this.setState({prenom: e.target.value})}/>
                              </div>
                            </div>

                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon"><i className="glyphicon glyphicon-home" aria-hidden="true"></i></span>
                      <input id="ufr" name="ufr" placeholder="UFR" className="form-control"  type="text" onChange={e => this.setState({ufr: e.target.value})}/>
                    </div>
                  </div>
                  
                  <div className="form-group">
                              <div className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                <input id="email" name="email" placeholder="Email" required="remplir votre email" className="form-control"  type="email" onChange={e => this.setState({adresse: e.target.value})}/>
                              </div>
                            </div>
                  
                  <div className="form-group">
                              <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                                <input id="tel" name="tel" placeholder="Telephone" required="remplir votre telephone" className="form-control"  type="text" onChange={e => this.setState({numero: e.target.value})}/>
                              </div>
                            </div>

                            <input type="checkbox" id="scales" name="scales" onChange={e => {if (e.target.value == "on") {this.setState({newsletter: true})}}}/>
                  <label for="scales">S'abonner aux newsletter</label>

                  <input type="submit" className="center-block btn btn-danger" value="S'inscrire à l'activité" />
                  </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
    //<--<h4><b>Animateur : </b>{this.props.modanimateur}</h4>!-->
  }

  handleSubmit(event) {
    const url = 'http://laweb.alwaysdata.net/?choix=9&nom='+this.state.name +'&prenom='+this.state.prenom+'&mail='+this.state.adresse +'&tel='+this.state.numero +'&abonne='+this.state.newsletter+'&ufr='+ this.state.ufr+'&idAct2'
    axios.get(url)
      .then(response => {
        this.handleClose();
      })
      .catch(error => {
        console.log(error);
      });
    }
}

export default Box;
