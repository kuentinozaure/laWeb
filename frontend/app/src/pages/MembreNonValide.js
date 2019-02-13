import React,{ Component } from 'react';

class MembreNonValide  extends React.Component {
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
                <td>{this.props.login}</td>
                <td>{this.props.telephone}</td>
                <td>{this.props.mail}</td>
                <td>{this.props.description}</td>
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

export default MembreNonValide;