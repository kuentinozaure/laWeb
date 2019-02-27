import React,{ Component } from 'react';

import { SERVER_URL } from "../consts";

import axios from 'axios';

class ActiviteValide  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleModify = this.handleModify.bind(this);
      }

    handleDelete() {
        axios.delete(SERVER_URL + "activity/"+this.props.id+"/"); 
    }

    handleModify(){

    }

    render() {
        return (
            <React.Fragment> 
            <tr>
                <td>{this.props.titre}</td>
                <td>{this.props.description}</td>    
                <td>{this.props.dateDebut}</td>
                <td>{this.props.dateFin}</td>
                <td>{this.props.salle}</td>
                <td>{this.props.animateur}</td>
                <td>{this.props.placeDisponible}</td>
                <td className="text-right">
                <a className='btn btn btn-info btn-sm' href="#gererAstuceAdmin"onClick={this.handleModify}>
                        Modifier
                </a>
                <a className='btn btn btn-danger btn-sm' href="#gererAstuceAdmin" onClick={this.handleDelete}>
                        Supprimer
                </a>  
                </td>
            </tr>
            </React.Fragment> 

        );
      }
}

export default ActiviteValide;