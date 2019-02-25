import React,{ Component } from 'react';

import { SERVER_URL } from "../consts";

class ActiviteValide  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
        };
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
                        Modifier
                </a>
                <a className='btn btn btn-danger btn-sm' href="#">
                        Supprimer
                </a>  
                </td>
            </tr>
            </React.Fragment> 

        );
      }
}

export default ActiviteValide;