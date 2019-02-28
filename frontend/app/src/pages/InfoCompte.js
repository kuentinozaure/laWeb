import React, { Component } from 'react';
import Mdp from './Mdp.js';
import NavbarMembres from './NavbarMembres.js';
import setSession from './../actions/setSession'
import removeSession from './../actions/removeSession'
import "./FormulaireCard.css";
import {Button,Modal} from 'react-bootstrap';
import { connect } from 'react-redux';
import Swal from 'sweetalert2'
import axios from 'axios'

import { SERVER_URL } from "../consts";
import Page404 from './404.js';

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};


class InfoCompte extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleUpdateMdp = this.handleUpdateMdp;
    this.handleCloseMdp = this.handleCloseMdp;
    this.handleShow = this.handleShow;
    this.handleClose = this.handleClose;
    this.handleSubmit = this.handleSubmit;
    this.handleUpdate = this.handleUpdate;
    this.handleShowMdp = this.handleShowMdp;
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      show: false,
      showModalMdp : false,

      nom : this.props.sessionConnect.name,
      prenom :this.props.sessionConnect.prenom,
      mail : this.props.sessionConnect.mail,
      image : this.props.sessionConnect.image,
      telephone :this.props.sessionConnect.telephone,
      description : this.props.sessionConnect.description,
      login : this.props.sessionConnect.login,
      mdp : "",
      visible: this.props.sessionConnect.visible,
      retypeMdp : "",


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
          text: "Vous ne pourrez pas revenir en arriere",
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
            this.props.history.push(process.env.PUBLIC_URL+"/connexion");
            this.props.removeSession("");
          }
        })
      }



      handleUpdate= ()  =>{
        const url = SERVER_URL+"members/"+this.props.sessionConnect.id+"/?nom="+this.state.nom+"&prenom="+this.state.prenom+"&mail="+this.state.mail+"&image="+this.state.image+"&telephone="+this.state.telephone+"&description="+this.state.description+"&login="+this.state.login+"&visible="+this.state.visible ;
        axios.put(url)
          .then(response => {

            this.props.setSession(
              this.state.nom,
              this.props.sessionConnect.id,
              this.state.prenom,
              this.state.mail,
              this.state.image,
              this.state.telephone,
              this.state.description,
              this.state.token,
              this.state.login,
              this.state.visible,
            );
            this.handleClose();
          })
          .catch(error => {
            console.log(error);
          });
      }
      handleCloseMdp= ()  =>{
        this.setState({
          showModalMdp:false,
        })
      }

      handleShowMdp = () =>{
        this.setState({
          showModalMdp:true,
        })
      }

      handleUpdateMdp = () =>{
        if(this.state.mdp == "" || this.state.retypeMdp == ""){
          Swal.fire(
            'ERREUR',
            'Veuillez saisir les memes informations',
            'warning'
          )
        }
        else if(this.state.mdp == this.state.retypeMdp){

          const url = SERVER_URL+"membersM/"+this.props.sessionConnect.id+"/?mdp="+this.state.mdp;
          axios.put(url)
            .then(response => {
              Swal.fire(
                'Modification',
                'Vous avez changé votre mot de passe',
                'success'
              )
              this.handleCloseMdp();
            })
            .catch(error => {
              console.log(error);
            });
        }else{
          Swal.fire({
            title: 'ERREUR',
            text: "Veuillez saisir les memes informations",
            type: 'warning',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
          })
        }
      }

      displayVisible(){
        if(this.state.visible == true){
          return(<input type="checkbox" id="visible" name="visible" checked disabled/>)
        }else{
          return(<input type="checkbox" id="visible" name="visible" disabled/>)
        }
      }

      handleChange() {
      this.setState({
        visible: !this.state.visible
      })
    }

      // displayVisibleModale(){
      //   if(this.state.visible == true){
      //     return()
      //   }else{
      //     return(<input class="form-check-input" type="checkbox" id="defaultCheck2" onChange={e => {if (e.target.value == "on") {this.setState({visible: true})} else {this.setState({visible: false})}}} ></input>)
      //   }
      // }

    render() {
      const { open } = this.state;

      if (this.props.sessionConnect.isConnected == true){
      return (
        <div>
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
                  <th className="case">Est visible</th>
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
                    <th className="case">{this.displayVisible()}</th>
                    <th className="case">
                      <button type="button" onClick={this.handleShow} class="btn btn-primary btn-lg">Modifier profil</button>
                      <button type="button" onClick={this.handleShowMdp} class="btn btn-danger btn-lg"> Modifier mot de passe</button>
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
                <input type="text" id="name" name="name"  required value={this.state.nom} className="form-control" onChange={e => this.setState({nom: e.target.value})}></input>
              </div>
              <br></br>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-tags fa" aria-hidden="true"></i></span>
                  <input id="prenom" name="prenom" required value ={this.state.prenom} className="form-control"  type="text" onChange={e => this.setState({prenom: e.target.value})}/>
                  </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-pencil fa" aria-hidden="true"></i></span>
                  <input id="email" name="email"  required value ={this.state.mail} className="form-control"  type="email" onChange={e => this.setState({mail: e.target.value})}/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-camera-retro fa" aria-hidden="true"></i></span>
                  <input id="image" name="image"  value ={this.state.image}  required className="form-control"  type="text" onChange={e => this.setState({image: e.target.value})}/>
                  <img src={this.state.image} width="50" height="50"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-phone fa" aria-hidden="true"></i></span>
                  <input id="tel" name="tel"  value ={this.state.telephone} required  className="form-control"  type="text" onChange={e => this.setState({telephone: e.target.value})}/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                    <textarea id="story" className="form-control" name="story" required rows="2" cols="33" value={this.state.description} type="text"  onChange={e => this.setState({description: e.target.value})}></textarea>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                  <input id="login" name="login"  value ={this.state.login} required  className="form-control"  type="text" onChange={e => this.setState({login: e.target.value})}/>
                </div>
              </div>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox"  id="defaultCheck2" checked={this.state.visible}  onChange={this.handleChange} ></input>
              <label class="form-check-label" for="defaultCheck2">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Visible
              </label>
            </div>
            <input className="center-block btn btn-danger" value="Modifier informations" onClick={this.handleUpdate}/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>FERMER</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showModalMdp} onHide={this.handleCloseMdp}>
        <Modal.Body>
          <h2 className="text-center">Voulez-vous modifier votre mot de passe ?</h2>
          <h3 className="text-center">Faites le ici</h3>
          <div className="form-group">
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                <input id="mdp" name="mdp"  required placeholder="votre nouveau de passe" required className="form-control"  type="password" onChange={e => this.setState({mdp: e.target.value})}/>
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                <input id="mdpcheck" name="mdpcheck"  required placeholder="retaper votre nouveau mot de passe" className="form-control"  type="password" onChange={e => this.setState({retypeMdp: e.target.value})}/>
              </div>
            </div>
          </div>
          <input className="center-block btn btn-danger" value="Mettre a jour" onClick={this.handleUpdateMdp}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleCloseMdp}>FERMER</Button>
        </Modal.Footer>
      </Modal>
        </div>
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
const mapDispatchToProps = dispatch => {
  return {
    setSession: (name,id,prenom,mail,image,telephone,description,login,token,visible) => {
      dispatch(setSession(name,id,prenom,mail,image,telephone,description,login,token,visible))
    }
  }
};
export default connect(mapStateToProps,mapDispatchToProps)(InfoCompte)
