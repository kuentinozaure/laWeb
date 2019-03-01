import React,{ Component } from 'react';
import axios from 'axios';
import { SERVER_URL } from "../consts";
import Swal from 'sweetalert2';

class MembreNonValide  extends React.Component {
    constructor(props) {
        super(props);

        this.handleValid = this.handleValid.bind(this);
        this.handleRefuser = this.handleRefuser.bind(this);
        this.state = {
        };
      }

      handleValid(){
        const url = SERVER_URL + "member/"+this.props.id+"/"
        axios.put(url)
          .then(response => {

            Swal.fire(
              'Succes!',
              'Vous avez validez le membre',
              'success'
            )
            this.handleClose()
          })
          .catch(error => {
            console.log(error);
          });
      }

      handleRefuser(){
        const url = SERVER_URL + "members/"+this.props.id+"/"
        axios.delete(url)
          .then(response => {
          })
          .catch(error => {
            console.log(error);
          });

          Swal.fire(
            'Succes!',
            'Vous avez refuser ce membre',
            'warning'
          )
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
                <a className='btn btn btn-info btn-sm' onClick={this.handleValid} >
                        Valider
                </a>
                <a className='btn btn btn-danger btn-sm' onClick={this.handleRefuser} >
                        Refuser
                </a>
                </td>
            </tr>
            </React.Fragment>

        );
      }
}

export default MembreNonValide;
