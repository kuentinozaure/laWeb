import React,{ Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

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
        console.log(this.props.sessionConnect.id)
        axios.put(SERVER_URL + "astuce/"+this.props.sessionConnect.id+"/")
          .then(response => {
          })
          .catch(error => {
            console.log(error);
          });
        }

    handleDelete() {
      axios.delete(SERVER_URL + "astuce/"+this.props.id+"/"); 
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
                <a className='btn btn btn-info btn-sm' href="#gererAstuceAdmin" onClick={this.handleAcceptAstuce}>
                        Valider
                </a>
                <a className='btn btn btn-danger btn-sm' href="#gererAstuceAdmin" onClick={this.handleDelete}>
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