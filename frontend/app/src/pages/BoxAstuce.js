import React, { Component } from 'react';
import './Box.css';
import {Button,Modal} from 'react-bootstrap';
import Inscription from './Inscription.js'
import axios from 'axios';

import { connect } from 'react-redux';

import { SERVER_URL } from "../consts";

class Box extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
        titre: '',
        description: '',
        nom: '',
        lien: ''
      };
  }

  render(){
  return (
    <div>
        <div className="container">
          <div className="row">
          <div className="container">
            <div className="well">
                <div className="media">
                    <div className="media-body">
                            <h2 className="media-heading">{this.props.modtitre}</h2>
                        <h3><p>{this.props.moddescription}</p></h3>
                        <ul className="list-inline list-unstyled">
                        <li>|</li>
                        <li><span><i className="glyphicon glyphicon-education"></i>
                            Proposé par : {this.props.modauteur}
                        </span></li>
                        <li>|</li>
                        </ul>
                        <Button id="BtAstuce" className="center-right" href={this.props.modlien} >
                          En savoir plus
                        </Button> 
                    </div>
                    
                </div>
            </div>
         </div>
    </div>
    </div>
    </div>
  
    );
  }


  /*displaySelect(){
    let i;
    let option =[];
    for (i = 0; i < this.state.listeUfr.length; i++) {
      console.log(this.state.listeUfr[i][1]);
      option.push("<option>"+this.state.listeUfr[i][1]+"</option>");
      
    }
  }
*/
  
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
    
    export default connect(mapStateToProps,null)(Box)
