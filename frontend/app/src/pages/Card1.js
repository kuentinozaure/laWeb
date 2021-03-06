import React, { Component } from 'react';
import FormulaireCard from './FormulaireCard.js'
import InformationCard from './InformationCard.js'
import './Card1.css';

import { SERVER_URL } from "../consts";

class Card1 extends Component {
  render() {
    return (
    <div>
      <div className="list-group-item">
        <div className="col-xs-12 col-sm-3">
          <img src={this.props.image} alt={this.props.nom+" "+this.props.prenom}  className="img-responsive img-circle" />
        </div>
        <div className="col-xs-12 col-sm-3"></div>
        <div className="col-xs-12 col-sm-6">
          <h5 className="font-weight-bold mt-4 mb-3"> {this.props.nom} {this.props.prenom} </h5>
          <p className="text-uppercase blue-text"><strong>Membre</strong></p>
          <p className="grey-text">{this.props.description}</p>
          <p className="grey-text"><a className="fa fa-comments text-muted c-info" href={"mailto:"+this.props.mail}>Me contacter</a></p><br/><br/>
          <span className="name">| LaWeb |</span>
        </div>
        <div className="clearfix"></div>
      </div>
    </div>
 );
  }
}




export default Card1;