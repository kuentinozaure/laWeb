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
      ufr: 0,
      adresse: '',
      numero: '',
      newsletter: false,
      listeUfr : [],
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




      <div>

<div className="container">
  <div className="well">
      <div className="media">
      	<a className="pull-left" href="#">
    		  <img id="imgbox" src="https://image.freepik.com/free-icon/activity-feed_318-1665.jpg" alt="Image"/>
  		  </a>
  		  <div className="media-body">
    		<h2 className="media-heading">{this.props.modtitre}</h2>
        <h3><p>{this.props.moddescription}</p></h3>
        <ul className="list-inline list-unstyled">
          <li>|</li>
          <li><span><i className="glyphicon glyphicon-calendar"></i>{this.props.moddate}</span></li>
          <li>|</li>
          <span><i className="glyphicon glyphicon-warning-sign"></i> IL RESTE {this.props.modnbplaceRestante} PLACES</span>
          <li>|</li>
          <li>
              <span><i className="glyphicon glyphicon-asterisk"></i> IL Y A {this.props.modnbplace} PLACES AU TOTALES</span>
          </li>
          <li>|</li>
			  </ul>
        <Button id="BtAct" className="center-right" onClick={this.handleShow}>
          INSCRIVEZ-VOUS
        </Button>
       </div>
    </div>
  </div>

      </div>


      
      <div className="Box">
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Body>
          <h2 className="text-center">Vous voulez vous inscrire à cette activité ?</h2>
          <h3 className="text-center">Inscrivez vous ici</h3>

          <form id="register-form" role="form" autoComplete="off" className="form" method="get" onSubmit={this.handleSubmit}>
                <div className="form-group">
                              <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                <input id="name" name="nom" placeholder="Nom" required="remplir votre nom" className="form-control"  type="text" onChange={e => this.setState({name: e.target.value})}/>
                              </div>
                            </div>
                  
                  <div className="form-group">
                              <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                <input id="prenom" name="prenom" placeholder="Prenom" required="remplir votre prenom" className="form-control"  type="text" onChange={e => this.setState({prenom: e.target.value})}/>
                              </div>
                            </div>

                            <div className="form-group">
                              <select className="form-control" require="true"  id="ufr" onChange={e => this.setState({ufr: e.target.value.substring(0, 1)})}>
                                  <option id="1" >1 -Sciences Espaces et Sociétés</option>
                                  <option id="2" >2 - Langue Etrangères Appliquées</option>
                                  <option id="3" >3 - Histoire</option>
                              </select>
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
                  <label htmlFor="scales">S'abonner aux newsletter</label>

                  <input type="submit" className="center-block btn btn-danger" value="S'inscrire à l'activité" />
                  </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>FERMER</Button>
        </Modal.Footer>
      </Modal>
      </div>

    </div>
    );
    //<--<h4><b>Animateur : </b>{this.props.modanimateur}</h4>!-->
  }


  displaySelect(){
    let i;
    let option =[];
    for (i = 0; i < this.state.listeUfr.length; i++) {
      console.log(this.state.listeUfr[i][1]);
      option.push("<option>"+this.state.listeUfr[i][1]+"</option>");
      
    }
  }

  handleSubmit(event) {
    const url = 'http://laweb.alwaysdata.net/?choix=9&nom='+this.state.name +'&prenom='+this.state.prenom+'&mail='+this.state.adresse +'&tel='+this.state.numero +'&abonne='+this.state.newsletter+'&ufr='+ this.state.ufr+'&idAct='+this.props.modnom
    axios.get(url)
      .then(response => {
        this.handleClose();
      })
      .catch(error => {
        console.log(error);
      });
    }

    componentDidMount() {
      const url = 'http://laweb.alwaysdata.net/?choix=11';
      axios.get(url)

        let i;
        let tab =[];
        axios.get(url)
        .then(response => {
          for (i = 0; i < response.data.ufr.length; i++) {
            tab.push(response.data.ufr);
          }
          this.setState({
            listeUfr: tab,
          });

        })
        .catch(error => {
          console.log(error);
        });
      }
    }

export default Box;
