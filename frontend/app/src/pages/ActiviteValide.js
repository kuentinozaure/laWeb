import React,{ Component } from 'react';

import { SERVER_URL } from "../consts";

import axios from 'axios';

import {Button,Modal} from 'react-bootstrap';

class ActiviteValide  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            show: false,
            titre: this.props.titre,
            description: this.props.description,
            dateDebut: this.props.dateDebut,
            dateFin: this.props.dateFin,
            salle: this.props.salle,
            nbPlaces: this.props.nombrePlaceDispo,
            animateur: this.props.animateur,
            idCateg: this.props.idCateg
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleModify = this.handleModify.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
      }

    handleDelete() {
        axios.delete(SERVER_URL + "activity/"+this.props.id+"/"); 
    }

    handleModify(){
        axios.put(SERVER_URL + "activity/"+this.props.id+"/?titre="+this.state.titre+"&description="+this.state.description+"&dateDebut="+this.state.dateDebut+"&dateFin="+this.state.dateFin+"&salle="+this.state.salle+"&placeDispo="+this.state.nbPlaces+"&idCateg="+this.state.idCateg+"&animateur="+this.state.animateur); 
    }

    handleShow(){
        this.setState({
            show : true
        })
      }

      handleClose() {
        this.setState({ show: false });
      }

    render() {
        return (
                    <React.Fragment> 
                    <tr>
                        <td>{this.state.titre}</td>
                        <td>{this.state.description}</td>    
                        <td>{this.state.dateDebut}</td>
                        <td>{this.state.dateFin}</td>
                        <td>{this.state.salle}</td>
                        <td>{this.state.nombrePlaceDispo}</td>
                        <td className="text-right">
                        <a className='btn btn btn-info btn-sm' onClick={this.handleShow}>
                                Modifier
                        </a>
                        <a className='btn btn btn-danger btn-sm' onClick={this.handleDelete}>
                                Supprimer
                        </a>  
                        </td>
                    </tr>
                    <Modal show={this.state.show} onHide={this.handleClose}>

                <Modal.Body>
                    
                <h2 className="text-center">Vous voulez modifier l'activité ?</h2>
                        <div className="form-group">
                                        <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-chevron-right" aria-hidden="true"></i></span>
                                        <input id="titre" name="titre" className="form-control"  type="text" required value={this.state.titre} onChange={e => this.setState({titre: e.target.value})}/>
                                        </div>
                                    </div>

                        <div className="form-group">
                                        <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-pencil" aria-hidden="true"></i></span>
                                        <textarea  id="description" name="description" className="form-control"  type="text" required value={this.state.description} onChange={e => this.setState({description: e.target.value})}/>
                                        </div>
                                    </div>

                        <div className="form-group">
                                        <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-calendar" aria-hidden="true"></i></span>
                                        <input id="dateDebut" name="dateDebut" className="form-control"  type="text" required value={this.state.dateDebut} onChange={e => this.setState({dateDebut: e.target.value})}/>
                                        </div>
                                    </div>

                        <div className="form-group">
                                        <div className="input-group">
                                        <span className="input-group-addon"><i className="glyphicon glyphicon-calendar" aria-hidden="true"></i></span>
                                        <input id="dateFin" name="dateFin" className="form-control"  type="text" required value={this.state.dateFin} onChange={e => this.setState({dateFin: e.target.value})}/>
                                        </div>
                                    </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="	glyphicon glyphicon-map-marker" aria-hidden="true"></i></span>
                                    <input id="salle" name="salle" className="form-control"  type="text" required value={this.state.salle} onChange={e => this.setState({salle: e.target.value})}/>
                                </div>
                            </div>

                            <div className="form-group">
                                <div className="input-group">
                                    <span className="input-group-addon"><i className="glyphicon glyphicon-user" aria-hidden="true"></i></span>
                                    <input id="nbPlace" name="nbPlace" className="form-control"  type="text" required value={this.state.nbPlaces} onChange={e => this.setState({nbPlaces: e.target.value})}/>
                                </div>
                            </div>

                            <input type="submit" className="center-block btn btn-danger" value="Modifier l'activité"  onClick={this.handleModify}/>
                </Modal.Body>
                <Modal.Footer>
                <Button onClick={this.handleClose}>FERMER</Button>
                </Modal.Footer>
            </Modal>
                    </React.Fragment> 
            
        );
      }
}

export default ActiviteValide;