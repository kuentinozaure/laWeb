import React,{ Component } from 'react';
import {Button,Modal} from 'react-bootstrap';
import { SERVER_URL } from "../consts";
import Swal from 'sweetalert2';
import axios from 'axios';

class AstuceValide  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            titre:this.props.titre,
            message:this.props.message,
            description:this.props.description,
            lienAstuce:this.props.lienAstuce,
            auteur:this.props.auteur,
            image:this.props.image,
            categorie:1,
            categorieAstuce:[],
            show:false,
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
      }

      handleUpdate(){
        const url = SERVER_URL+"astuces/"+this.state.id+"/?titre="+this.state.titre+"&message="+this.state.message+"&description="+this.state.description+"&lienAstuce="+this.state.lienAstuce+"&auteur="+this.state.auteur+"&image="+this.state.image+"&idAstuce="+this.state.categorie ;
        axios.put(url)
          .then(response => {
            this.handleClose();
            Swal.fire(
              'Astuce',
              'Votre Astuce a ete mise a jour',
              'success'
            )
          })
          .catch(error => {
            console.log(error);
          });
      }

      handleDelete() {
        axios.delete(SERVER_URL + "astuce/"+this.props.id+"/");
        Swal.fire(
          'Astuce',
          'Votre Astuce est supprimé',
          'success'
        )
      }

      handleClose() {
        this.setState({ show: false });
      }

      handleShow() {
        this.setState({ show: true });
      }
      componentDidMount() {
        axios.get(SERVER_URL + "astucesCategories/")
          .then(response => {
            let i
            let tab =[]

            for (i = 0; i < response.data.length; i++) {
              tab.push(response.data[i]);
            }
            this.setState({
              categorieAstuce: tab,
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
      displayCategorie(){
        let listCategorie = [];
        let content
        content = this.state.categorieAstuce.map((categorie, index) =>{
          listCategorie.push(<option id={categorie.id}>{categorie.id} - {categorie.intitule}</option>)
        })
        return content = listCategorie
      }

    render() {
        return (
            <React.Fragment>
            <tr>
                <td>{this.state.titre}</td>
                <td>{this.state.message}</td>
                <td>{this.state.description}</td>
                <td>{this.state.lienAstuce}</td>
                <td>{this.state.auteur}</td>
                <td><img src={this.state.image} width="50" height="50"/><br></br>{this.state.image}</td>
                <td>{this.state.type_astuce}</td>
                <td className="text-right">
                <a className='btn btn btn-info btn-sm' onClick={this.handleShow}>
                        Modifier
                </a>
                <a className='btn btn btn-danger btn-sm' onClick={this.handleDelete}>
                        Supprimer
                </a>
                </td>
            </tr>

            <div className="Box">
            <Modal show={this.state.show} onHide={this.handleClose}>
              <Modal.Body>
                <h2 className="text-center">Voulez-vous modifier cette activité ?</h2>
                <h3 className="text-center">Faites le ici</h3>
                      <div className="form-group">
                                    <div className="input-group">
                                      <span className="input-group-addon"><i className="fa fa-tags fa" aria-hidden="true"></i></span>
                                      <input type="text" id="titre" name="titre" value={this.state.titre} className="form-control" onChange={e => this.setState({titre: e.target.value})}></input>
                                    </div>
                                    <br></br>
                                    <div className="form-group">
                                                  <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-tags fa" aria-hidden="true"></i></span>
                                                    <input id="message" name="message"  value ={this.state.message} className="form-control"  type="text" onChange={e => this.setState({message: e.target.value})}/>
                                                  </div>
                                    </div>
                                    <div className="form-group">
                                                  <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-pencil fa" aria-hidden="true"></i></span>
                                                    <textarea id="story" className="form-control" name="story" rows="2" cols="33" value={this.state.description} type="text"  onChange={e => this.setState({description: e.target.value})}></textarea>
                                                  </div>
                                    </div>
                                    <div className="form-group">
                                                  <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-link fa" aria-hidden="true"></i></span>
                                                    <input id="lien" name="lien"  value ={this.state.lienAstuce}  className="form-control"  type="text" onChange={e => this.setState({lienAstuce: e.target.value})}/>
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
                                                    <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                                    <input id="auteur" name="auteur"  value ={this.state.auteur} className="form-control"  type="text" onChange={e => this.setState({auteur: e.target.value})}/>
                                                  </div>
                                    </div>
                                    <div className="form-group">
                                                  <div className="input-group">
                                                    <span className="input-group-addon"><i className="fa fa-align-justify fa" aria-hidden="true"></i></span>
                                                    <select className="form-control" require="true"  id="categ" onChange={e => this.setState({categorie: e.target.value.substring(0, 1)})}>
                                                    {
                                                      this.displayCategorie()
                                                    }
                                                    </select>
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
            </React.Fragment>
        );
      }
}

export default AstuceValide;
