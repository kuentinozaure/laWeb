import React,{ Component } from 'react';

import { SERVER_URL } from "../consts";

class Message  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
      }

   

    render() {
        return (
            <React.Fragment> 
            <tr>
                <td>{this.props.nom}</td>
                <td>{this.props.prenom}</td>    
                <td>{this.props.mail}</td>
                <td>{this.props.message}</td>
                <td>{this.props.categorieMessage}</td>
                <td className="text-right">
                <a className='btn btn btn-info btn-sm' href="#">
                        Détails
                </a>
                </td>
            </tr>
            </React.Fragment> 

        );
      }
}

export default Message;