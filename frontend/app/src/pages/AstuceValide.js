import React,{ Component } from 'react';

import { SERVER_URL } from "../consts";

class AstuceValide  extends React.Component {
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
                <td>{this.props.message}</td>    
                <td>{this.props.description}</td>
                <td>{this.props.lienAstuce}</td>
                <td>{this.props.auteur}</td>
                <td>{this.props.type_astuce}</td>
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

export default AstuceValide;