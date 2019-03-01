import React,{ Component } from 'react';
import NavbarMembres from './NavbarMembres.js';
import AstuceNonValide from './AstuceNonValide.js';
import axios from 'axios';
import Page404 from './404'
import {Button,Modal} from 'react-bootstrap';

import { SERVER_URL } from "../consts";

import { connect } from 'react-redux';

class GererAstuceAdmin extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {

          activity:[],
          show:false,
          categories:[],

          titre: '',
          description: '',
          message : '',
          auteur:'',
          lien: '',
          image : '',
          chooseCateg : 1,

        }
      }

      componentDidMount() {
        axios.get(SERVER_URL + "unvalidateAstuces/")
          .then(response => {
            let i
            let tab =[]
            for (i = 0; i < response.data.length; i++) {
              tab.push(response.data[i]);
            }
            this.setState({
              activity: tab,
            });
          })
          .catch(error => {
          });
      }

      handleClose(){
        axios.get(SERVER_URL + "unvalidateAstuces/")
          .then(response => {
            let i
            let tab =[]
            for (i = 0; i < response.data.length; i++) {
              tab.push(response.data[i]);
            }
            this.setState({
              activity: tab,
            });
          })
          .catch(error => {
          });
        this.setState({
          show : false,
        })
      }
      handleSubmit() {
        const url = SERVER_URL + "astuce/?titre="+this.state.titre+"&message="+this.state.message+"&description="+this.state.description+"&lienAstuce="+this.state.lien+"&auteur="+this.state.auteur+"&image="+this.state.image+"&idAstuce="+this.state.chooseCateg
        axios.post(url)
          .then(response => {
            this.handleClose();
          })
          .catch(error => {
          });
        }
    
      handleShow() {
        axios.get(SERVER_URL + "astucesCategories/")
         .then(response => {
           let i
           let tab =[]

           for (i = 0; i < response.data.length; i++) {
             tab.push(response.data[i]);
           }
           this.setState({ show: true,categories:tab,});
         })
         .catch(error => {
         });
    }

    displayCateg(){
      let listCateg = [];
      let content
      content = this.state.categories.map((categ, index) =>{
        listCateg.push(<option id={categ.id}>{categ.id} - {categ.intitule}</option>)
      })
      return content = listCateg
    }

      display(){
        let listeActivite =[]
          let content = this.state.activity.map((activite, index) => {
            listeActivite.push(
                <AstuceNonValide
                  id={activite.id}
                  image={activite.image}
                  titre={activite.titre}
                  message={activite.message}
                  description={activite.description}
                  lienAstuce={activite.lienAstuce}
                  auteur={activite.auteur}
                  type_astuce={activite.categorieAstuce}
                  />
              );
          });
          return content = listeActivite;
      }

      render() {
        if (this.props.sessionConnect.isConnected == true){
        return (
            <div>
            <br></br>
            <br></br>
                    <NavbarMembres/>
                        <div className="container">
                        <div className="row col-md-12 col-md-offset-2 custyle">
                        <button type="button" onClick={this.handleShow} class="btn btn-info btn-lg">Proposer une Activite</button>
                        <table className="table table-striped custab">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Message</th>
                                <th>Description</th>
                                <th>Lien astuce</th>
                                <th>Auteur</th>
                                <th>Type astuce</th>
                                <th>Image</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.display()}
                        </tbody>
                        </table>

                        <Modal show={this.state.show} onHide={this.handleClose}>
                          <Modal.Body>
                            <h2 className="text-center">Vous voulez proposer une astuce ?</h2>
                            <h4 className="text-center">Vous avez une idée d'astuce qui pourrait aider d'autres utilisateurs et qui touche à l'informatique ? Faites-nous en part !</h4>

                                  <div className="form-group">
                                                <div className="input-group">
                                                  <span className="input-group-addon"><i className="glyphicon glyphicon-chevron-right" aria-hidden="true"></i></span>
                                                  <input id="titre" name="titre" placeholder="Titre" required="Remplir le titre" className="form-control"  type="text" onChange={e => this.setState({titre: e.target.value})}/>
                                                </div>
                                              </div>
                                              <div className="form-group">
                                                            <div className="input-group">
                                                              <span className="input-group-addon"><i className="glyphicon glyphicon-chevron-right" aria-hidden="true"></i></span>
                                                              <input id="msg" name="msg" placeholder="Message" required="Remplir le titre" className="form-control"  type="text" onChange={e => this.setState({message: e.target.value})}/>
                                                            </div>
                                                          </div>

                                    <div className="form-group">
                                                <div className="input-group">
                                                  <span className="input-group-addon"><i className="glyphicon glyphicon-pencil" aria-hidden="true"></i></span>
                                                  <textarea  id="description" name="description" placeholder="Description" required="Remplir la description" className="form-control"  type="text" onChange={e => this.setState({description: e.target.value})}/>
                                                </div>
                                              </div>

                                              <div className="form-group">
                                                <div className="input-group">
                                                  <span className="input-group-addon"><i className="fa fa-camera-retro fa" aria-hidden="true"></i></span>
                                                  <input id="image" name="image"  placeholder="Image" required className="form-control"  type="text" onChange={e => this.setState({image: e.target.value})}/>
                                                  <img src={this.state.image} width="50" height="50"/>
                                                </div>
                                              </div>

                                  <div className="form-group">
                                                <div className="input-group">
                                                  <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                                  <input id="auteur" name="auteur" placeholder="Auteur de l'astuce" required="Remplir le nom de l'auteur" className="form-control"  type="text" onChange={e => this.setState({auteur: e.target.value})}/>
                                                </div>
                                              </div>

                                  <div className="form-group">
                                                <div className="input-group">
                                                  <span className="input-group-addon"><i className="glyphicon glyphicon-link" aria-hidden="true"></i></span>
                                                  <input id="lien" name="lien" placeholder="Lien de l'astuce" required="Remplir le lien de l'astuce" className="form-control"  type="text" onChange={e => this.setState({lien: e.target.value})}/>
                                                </div>
                                              </div>

                                    <div className="form-group">
                                    <select className="form-control" require="true"  id="ufr" onChange={e => this.setState({chooseCateg: e.target.value.substring(0, 1)})}>
                                      {
                                        this.displayCateg()
                                      }
                                    </select>
                                        </div>

                                    <input type="button" className="center-block btn btn-danger" onClick={this.handleSubmit} value="Proposer une activité" />
                          </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={this.handleClose}>FERMER</Button>
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
  return {
      sessionConnect: state.sessionReducer
  }
};
export default connect(mapStateToProps,null)(GererAstuceAdmin)