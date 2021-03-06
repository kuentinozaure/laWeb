import React,{ Component } from 'react';
import NavbarMembres from './NavbarMembres.js';
import MembreNonValide from './MembreNonValide.js'
import Swal from 'sweetalert2';
import Page404 from './404'

import axios from 'axios';

import { connect } from 'react-redux';
import setSession from './../actions/setSession'

import {Button,Modal} from 'react-bootstrap';


import { SERVER_URL } from "../consts";


class GererMembreAdmin extends Component {
    constructor(props,context) {
        super(props,context);

        this.handleAddMember = this.handleAddMember.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

        this.state = {
            membres:[],
            show : false,

            nom:"",
            prenom:"",
            mail:"",
            image:"",
            telephone:"",
            description:"",
            login:"",
            mdp:"",
            visible:false,
            ufr:1,

            ufrs:[],
        };
      }

      handleClose(){
        axios.get(SERVER_URL + "invalid/")
          .then(response => {
            let i
            let tab =[]
            for (i = 0; i < response.data.length; i++) {
              tab.push(response.data[i]);
            }
            this.setState({
              membres: tab,
            });
          })
          .catch(error => {
            console.log(error);
          });
        this.setState({
          show : false,
        })
      }

       handleShow(){
         axios.get(SERVER_URL + "ufr/")
          .then(response => {
            let i
            let tab =[]

            for (i = 0; i < response.data.length; i++) {
              tab.push(response.data[i]);
            }
            this.setState({
              ufrs: tab,
              show : true,
            });
          })
          .catch(error => {
            console.log(error);
          });
      }

      displayUfr(){
        let listUfr = [];
        let content
        content = this.state.ufrs.map((ufr, index) =>{
          listUfr.push(<option id={ufr.id}>{ufr.id} - {ufr.intitule}</option>)
        })
        return content = listUfr
      }

      componentDidMount() {
        axios.get(SERVER_URL + "invalid/")
          .then(response => {
            let i
            let tab =[]
            for (i = 0; i < response.data.length; i++) {
              tab.push(response.data[i]);
            }
            this.setState({
              membres: tab,
            });
          })
          .catch(error => {
            console.log(error);
          });


      }

      display(){
        let listeMembre =[]
        let content = this.state.membres.map((membre, index) => {

          listeMembre.push(
              < MembreNonValide
                id={membre.id}
                nom={membre.nom}
                prenom={membre.prenom}
                login={membre.login}
                telephone={membre.telephone}
                mail={membre.mail}
                description={membre.description}
                />
            );
        });
        return content = listeMembre;
      }

      handleAddMember(){
        const url = SERVER_URL + "member/?nom="+this.state.nom+"&prenom="+this.state.prenom+"&mail="+this.state.mail+"&image="+this.state.image+"&telephone="+this.state.telephone+"&description="+this.state.description+"&login="+this.state.login+"&mdp="+this.state.mdp+"&visible="+this.state.visible+"&idUfr="+this.state.ufr+""
        axios.post(url)
          .then(response => {
            let json = '{"id": "'+response.data.id+'", "nom": "'+this.state.nom+'","prenom" : "'+this.state.prenom+'","login" : "'+this.state.login+'","telephone" : "'+this.state.telephone+'","mail": "'+this.state.mail+'","description": "'+this.state.description+'"}'
            let jsonPa = JSON.parse(json)
            this.state.membres.push(jsonPa)
            Swal.fire(
              'Succes!',
              'Vous avez creer un nouveau membre\nil est soumis a validation',
              'success'
            )
            this.handleClose()
          })
          .catch(error => {
            Swal.fire(
              'Erreur!',
              'Veuillez renseigner un login different',
              'warning'
            )
          });
      }

    render(){

      if (this.props.sessionConnect.isConnected == true){
        return (
            <div>
            <br></br>
            <br></br>
                    <NavbarMembres/>
                        <div className="container">
                        <div className="row col-md-12 col-md-offset-2 custyle">
                        <button type="button" onClick={this.handleShow} className="btn btn-info btn-lg">Proposer un membre</button>
                        <table className="table table-striped custab">
                        <thead>
                            <tr>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Login</th>
                                <th>Telephone</th>
                                <th>Mail</th>
                                <th>Description</th>
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
                      <h2 className="text-center">Voulez-vous proposer un membre ?</h2>
                      <h3 className="text-center">Faites le ici</h3>
                      <div className="form-group">
                        <div className="input-group">
                          <span className="input-group-addon"><i className="fa fa-tags fa" aria-hidden="true"></i></span>
                          <input type="text" id="name" name="name"  required placeholder="nom" className="form-control" onChange={e => this.setState({nom: e.target.value})}></input>
                        </div>
                      </div>
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-tags fa" aria-hidden="true"></i></span>
                            <input id="prenom" name="prenom" required placeholder ="prenom" className="form-control"  type="text" onChange={e => this.setState({prenom: e.target.value})}/>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-pencil fa" aria-hidden="true"></i></span>
                            <input id="email" name="email"  required placeholder="email" className="form-control"  type="email" onChange={e => this.setState({mail: e.target.value})}/>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-camera-retro fa" aria-hidden="true"></i></span>
                            <input id="image" name="image"  placeholder ="image"  required className="form-control"  type="text" onChange={e => this.setState({image: e.target.value})}/>
                            <img src={this.state.image} width="50" height="50"/>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-phone fa" aria-hidden="true"></i></span>
                            <input id="tel" name="tel"  placeholder ="telephone" required  className="form-control"  type="text" onChange={e => this.setState({telephone: e.target.value})}/>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                              <textarea id="story" placeholder ="description" className="form-control" name="story" required rows="2" cols="33" type="text"  onChange={e => this.setState({description: e.target.value})}></textarea>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                            <input id="login" name="login"  placeholder ="login" required  className="form-control"  type="text" onChange={e => this.setState({login: e.target.value})}/>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                            <input id="mdp" name="mdp"  placeholder ="mdp" required  className="form-control"  type="password" onChange={e => this.setState({mdp: e.target.value})}/>
                          </div>
                        </div>

                        <div className="form-group">
                          <select className="form-control" require="true"  id="ufr" onChange={e => this.setState({ufr: e.target.value.substring(0, 1)})}>
                          {
                            this.displayUfr()
                          }
                          </select>
                        </div>

                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" value="" id="defaultCheck2" onChange={e => {if (e.target.value == "on") {this.setState({visible: true})}}} ></input>
                          <label className="form-check-label" for="defaultCheck2">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Visible
                          </label>
                        </div>

                      <input className="center-block btn btn-danger" value="Proposer le membre " onClick={this.handleAddMember}/>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={this.handleClose}>FERMER</Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>
        );
      }else{
        return(<Page404/>)
      }
    }
    }

    const mapStateToProps = state => {
      return { sessionConnect: state.sessionReducer}
    };

export default connect(mapStateToProps,null)(GererMembreAdmin)
