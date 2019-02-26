import React, { Component } from 'react';
import './Box.css';
import {Button,Modal} from 'react-bootstrap';
import Inscription from './Inscription.js'
import axios from 'axios';
import BoxParticipant from './BoxParticipant.js'
import { connect } from 'react-redux';

import { SERVER_URL } from "../consts";

class Box extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleShowParticipant = this.handleShowParticipant.bind(this);
    this.closeParticipant = this.closeParticipant.bind(this);

    this.state = {
      handleShowParticipant:false,
      show: false,
      idActivite: this.props.modnom,
      idPersonne:0,
      name: '',
      prenom: '',
      adresse: '',
      ufr: [],
      numero: '',
      newsletter: false,
      ufrSelected:1,
      participants:[],
      //listeUfr : []
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  async handleSubmit() {
    await this.getId()
    const url = SERVER_URL+"participe/?idActivity="+this.props.modnom+"&idParticipant="+this.state.idPersonne ;
    axios.post(url)
      .then(response => {
        this.handleClose();
      })
      .catch(error => {
        console.log(error);
      });
    }

    async getId(){
      const urladdParticipant = SERVER_URL +"participant/?nom="+this.state.name+"&prenom="+this.state.prenom+"&mail="+this.state.adresse+"&telephone="+this.state.numero+"&ufr="+this.state.ufrSelected;
      await axios.post(urladdParticipant).then(response => {
          this.setState({
            idPersonne:response.data.id,
          })

        })
        .catch(error => {
          console.log(error);
        });
    }

    handleShowParticipant(){

      if(this.state.handleShowParticipant == true){
        this.setState({
          handleShowParticipant:false,
        })
      }else{
        const urladdParticipant = SERVER_URL +"participe/"+this.state.idActivite+"/"
        axios.get(urladdParticipant).then(response => {

              let i
              let tab =[]
              for (i = 0; i < response.data.length; i++) {
                tab.push(response.data[i]);
              }

              this.setState({
                handleShowParticipant:true,
                participants:tab,
              })

          })
          .catch(error => {
            console.log(error);
          });
      }
    }

    displayUfr(){
      let listUfr = [];
      let content
      content = this.state.ufr.map((ufr, index) =>{
        listUfr.push(<option id={ufr.id}>{ufr.id} - {ufr.intitule}</option>)
      })
      return content = listUfr
    }

    componentDidMount() {
      axios.get(SERVER_URL + "ufr/")
        .then(response => {
          console.log(response.data);
          let i
          let tab =[]

          for (i = 0; i < response.data.length; i++) {
            tab.push(response.data[i]);
          }
          this.setState({
            ufr: tab,
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    closeParticipant(){
      this.setState({
        handleShowParticipant:false,
      })
    }
    displayParticipants(){
      let listeParticipant =[]
      let content = this.state.participants.map((participant, index) => {

        listeParticipant.push(
            <BoxParticipant
              nom={participant.nom}
              prenom={participant.prenom}
              mail={participant.mail}
              telephone={participant.telephone}
              ufr={participant.intitule}
              />
          );
      });

      return content = listeParticipant;
    }

    displayParticipant(){
      if(this.state.handleShowParticipant == true){
        return(
          <div>
          <div className="row">
          <div className="col-md-12 col-sm-6 col-xs-6">
            <div className="panel panel-info">
                <div className="panel-heading">
                    <h3 className="panel-title">Participants &nbsp;&nbsp;<span ><i class="fa fa-times" onClick={this.closeParticipant}></i></span></h3>
                </div>
                <div className="panel-body">
                <table className="table table-striped custab">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prenom</th>
                        <th>Mail</th>
                        <th>Telephone</th>
                        <th>UFR</th>
                    </tr>
                </thead>
                <tbody>
                    {this.displayParticipants()}
                </tbody>
                </table>
                </div>
            </div>
        </div>
        </div>
        </div>
      )
      }else{
        return(<div></div>);
      }
    }


display(){
  if (this.props.sessionConnect.isConnected == true){
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="container">
              <div className="well">
                <div className="media">
                  {/*<img id="imgbox" src="http://www.iconarchive.com/download/i91192/icons8/windows-8/Messaging-Activity-Feed.ico" alt="Image"/>*/}
                  <div className="media-body">
                    <h2 className="media-heading">{this.props.modtitre}</h2>
                    <h3><p>{this.props.moddescription}</p></h3>
                    <ul className="list-inline list-unstyled">
                      <li>|</li>
                      <li><span><i className="glyphicon glyphicon-calendar"></i>{this.props.moddate}</span></li>
                      <li>|</li>
                      <span>
                        <i className="glyphicon glyphicon-warning-sign"></i> IL RESTE {this.props.modnbplaceRestante} PLACES
                      </span>
                      <li>|</li>
                      <li>
                        <span><i className="glyphicon glyphicon-asterisk"></i> IL Y A {this.props.modnbplace} PLACES AU TOTAL</span>
                      </li>
                      <li>|</li>
                      <li>
                        <span><i className="glyphicon glyphicon-user"></i> ANIME PAR {this.props.modanimateur} </span>
                      </li>
                      <li>|</li>
			              </ul>
                    <Button id="BtAct" clas-sName="center-right" onClick={this.handleShow}>
                      INSCRIVEZ-VOUS
                    </Button>
                    <Button id="BtAct" className="center-right" onClick={this.handleShowParticipant}>
                      DETAILS
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          this.displayParticipant()
        }

      <div className="Box">
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Body>
          <h2 className="text-center">Voulez-vous vous inscrire à cette activité ?</h2>
          <h3 className="text-center">Inscrivez vous ici</h3>
                <div className="form-group">
                              <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                <input id="name" name="nom" placeholder="Nom" required="remplir votre nom" className="form-control"  type="text" onChange={e => this.setState({name: e.target.value})}/>
                              </div>
                            </div>

                  <div className="form-group">
                              <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                <input id="prenom" name="prenom" placeholder="Prénom" required="remplir votre prenom" className="form-control"  type="text" onChange={e => this.setState({prenom: e.target.value})}/>
                              </div>
                            </div>

                            <div className="form-group">
                              <select className="form-control" require="true"  id="ufr" onChange={e => this.setState({ufrSelected: e.target.value.substring(0, 1)})}>
                              {
                                this.displayUfr()
                              }
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
                                <input id="tel" name="tel" placeholder="Téléphone" required="remplir votre telephone" className="form-control"  type="text" onChange={e => this.setState({numero: e.target.value})}/>
                              </div>
                            </div>

                  <input className="center-block btn btn-danger" value="S'inscrire à l'activité" onClick={this.handleSubmit}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>FERMER</Button>
        </Modal.Footer>
      </Modal>
      </div>

    </div>
    );
  } else{
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="container">
              <div className="well">
                <div className="media">
                  {/*<img id="imgbox" src="http://www.iconarchive.com/download/i91192/icons8/windows-8/Messaging-Activity-Feed.ico" alt="Image"/>*/}
                  <div className="media-body">
                    <h2 className="media-heading">{this.props.modtitre}</h2>
                    <h3><p>{this.props.moddescription}</p></h3>
                    <ul className="list-inline list-unstyled">
                      <li>|</li>
                      <li><span><i className="glyphicon glyphicon-calendar"></i>{this.props.moddate}</span></li>
                      <li>|</li>
                      <span>
                        <i className="glyphicon glyphicon-warning-sign"></i> IL RESTE {this.props.modnbplaceRestante} PLACES
                      </span>
                      <li>|</li>
                      <li>
                        <span><i className="glyphicon glyphicon-asterisk"></i> IL Y A {this.props.modnbplace} PLACES AU TOTAL</span>
                      </li>
                      <li>|</li>
                      <li>
                        <span><i className="glyphicon glyphicon-user"></i> ANIME PAR {this.props.modanimateur.toUpperCase()} </span>
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
          </div>
        </div>
      <div className="Box">
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Body>
          <h2 className="text-center">Voulez-vous vous inscrire à cette activité ?</h2>
          <h3 className="text-center">Inscrivez vous ici</h3>
                <div className="form-group">
                    <div className="input-group">
                        <span className="input-group-addon">
                          <i className="fa fa-user fa" aria-hidden="true"></i>
                        </span>
                        <input id="name" name="nom" placeholder="Nom" required="Nom"
                        className="form-control"  type="name" pattern='[A-Za-z]{1,}' title="prenom sans caractères spéciaux"
                        onChange={e => this.setState({name: e.target.value})}
                        />
                    </div>
                </div>

                  <div className="form-group">
                              <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                <input id="prenom" name="prenom" placeholder="Prénom" pattern='[A-Za-z]{1,}' required="remplir votre prenom" className="form-control"  type="text" onChange={e => this.setState({prenom: e.target.value})}/>
                              </div>
                            </div>

                            <div className="form-group">
                              <select className="form-control" require="true"  id="ufr" onChange={e => this.setState({ufrSelected: e.target.value.substring(0, 1)})}>
                              {
                                this.displayUfr()
                              }
                              </select>
                            </div>

                  <div className="form-group">
                    <div className="input-group">
                      <span className="input-group-addon">
                      <i className="glyphicon glyphicon-envelope color-blue"></i>
                      </span>
                      <input id="email" name="email" placeholder="Email" required="remplir votre email"
                      className="form-control"  type="email"
                      onChange={e => this.setState({adresse: e.target.value})}/>
                    </div>
                  </div>

                  <div className="form-group">
                              <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                                <input id="tel" name="tel" placeholder="Téléphone" pattern="[0-9]{10}" required="remplir votre telephone" className="form-control"  type="text" onChange={e => this.setState({numero: e.target.value})}/>
                              </div>
                            </div>

                  <input className="center-block btn btn-danger" value="S'inscrire à l'activité" onClick={this.handleSubmit}/>
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
render(){
  return (
    <div>
      {this.display()}
    </div>

    );
  }


  /*displaySelect(){
    let i;
    let option =[];
    for (i = 0; i < this.state.listeUfr.length; i++) {
      console.log(this.state.listeUfr[i][1]);
      option.push("<option>"+this.state.listeUfr[i][1]+"</option>");

    }
  }
*/

    }


    const mapStateToProps = state => {
      return { sessionConnect: state.sessionReducer}
    }

    // const mapDispatchToProps = dispatch => {
    //   console.log("ok");
    //   return {
    //     removeSession: (name) => {
    //       dispatch(removeSession(name))
    //     }
    //   }
    // }

    export default connect(mapStateToProps,null)(Box)
