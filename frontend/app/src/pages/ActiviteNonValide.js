import React,{ Component } from 'react';

import { SERVER_URL } from "../consts";

import axios from 'axios';

import { connect } from 'react-redux';

class ActiviteNonValide  extends React.Component {
    constructor(props) {
        super(props);

        this.handleDelete = this.handleDelete.bind(this);
        this.handleValidate = this.handleValidate.bind(this);

        this.state = {
            id:0,
        };
      }

    handleDelete() {

        axios.delete(SERVER_URL + "activity/"+this.props.id+"/");
    
    }

    handleValidate() {

        axios.put(SERVER_URL + "activity/"+this.props.id+"/"+this.props.sessionConnect.id+"/");
    
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
                <a className='btn btn btn-info btn-sm' href="#listeActiviteAdmin" onClick={this.handleValidate}>
                        Valider
                </a>
                <a className='btn btn btn-danger btn-sm' href="#listeActiviteAdmin" onClick={this.handleDelete}>
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
  }

  export default connect(mapStateToProps,null)(ActiviteNonValide)