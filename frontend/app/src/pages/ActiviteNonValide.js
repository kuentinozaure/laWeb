import React,{ Component } from 'react';

import { SERVER_URL } from "../consts";

import axios from 'axios';

class ActiviteNonValide  extends React.Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);

        this.state = {
            id:0,
        };
      }

    handleDelete() {

        axios.delete(SERVER_URL + "activity/"+this.props.id+"/")
        // console.log(this.props.id)
        // .then(response => {
        //     console.log("Activité supprimé")
        // })
        // .catch(error => {
        //     console.log(error);
        // });
    
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
                <td>{this.props.nombrePlaceDispo}</td>
                <td className="text-right">
                <a className='btn btn btn-info btn-sm' href="#">
                        Valider
                </a>
                <a className='btn btn btn-danger btn-sm' href="#listeActiviteAdmin" onClick={this.handleDelete()}>
                        Refuser
                </a>  
                </td>
            </tr>
            
            </React.Fragment> 

        );
      }
}

export default ActiviteNonValide;