import React,{ Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Swal from 'sweetalert2';

import { SERVER_URL } from "../consts";

class AstuceNonValide  extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.handleAcceptAstuce = this.handleAcceptAstuce.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
      }

    handleAcceptAstuce() {
        axios.put(SERVER_URL + "astuce/"+this.props.id+"/"+this.props.sessionConnect.id+"/")
          .then(response => {
            Swal.fire(
              'Astuce',
              'Votre Astuce validé',
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
        'Suppression',
        'Suppression de l activite',
        'warning'
      )
  }

    render() {
        return (

            <React.Fragment>
            <tr>
                <td>{this.props.titre}</td>
                <td>{this.props.message}</td>
                <td>{this.props.description}</td>
                <td><a href={this.props.lienAstuce} target="_blank"><font color="FF00CC">Lien de l'astuce</font></a></td>
                <td>{this.props.auteur}</td>
                <td>{this.props.type_astuce}</td>
                <td><input type="image" src={this.props.image} width="50" height="50"/><br></br>{this.props.image}</td>
                <td className="text-right">
                <a className='btn btn btn-info btn-sm'  onClick={this.handleAcceptAstuce}>
                        Valider
                </a>
                <a className='btn btn btn-danger btn-sm'  onClick={this.handleDelete}>
                        Refuser
                </a>
                </td>
            </tr>

            </React.Fragment>

        );
      }
}
const mapStateToProps = state => {
    return { sessionConnect: state.sessionReducer}
  };
export default connect(mapStateToProps,null)(AstuceNonValide);
