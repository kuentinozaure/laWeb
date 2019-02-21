import React,{ Component } from 'react';

import { SERVER_URL } from "../consts";

class ActiviteNonValide  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
                        Valider
                </a>
                <a className='btn btn btn-danger btn-sm' href="#">
                        Refuser
                </a>  
                </td>
            </tr>
            
            </React.Fragment> 

        );
      }
}

export default ActiviteNonValide;