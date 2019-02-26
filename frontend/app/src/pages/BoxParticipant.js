import React, { Component } from 'react';
import {Button,Modal} from 'react-bootstrap';
import axios from 'axios';
import { connect } from 'react-redux';

import { SERVER_URL } from "../consts";

class BoxParticipant extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      nom : this.props.nom,
      prenom : this.props.prenom,
      mail : this.props.mail,
      telephone : this.props.telephone,
      ufr : this.props.ufr ,
    };
  }

render(){
  return (
    <React.Fragment>
    <tr>
        <td>{this.state.nom}</td>
        <td>{this.state.prenom}</td>
        <td>{this.state.mail}</td>
        <td>{this.state.telephone}</td>
        <td>{this.state.ufr}</td>
    </tr>
    </React.Fragment>
    );
  }


    }


    const mapStateToProps = state => {
      return { sessionConnect: state.sessionReducer}
    }

    // const mapDispatchToProps = dispatch => {
    //   console.log("ok");
    //   return {
    //     removeSession: (name) => {
    //       dispatch(removeSession(name))
    //     }
    //   }
    // }

    export default connect(mapStateToProps,null)(BoxParticipant)
