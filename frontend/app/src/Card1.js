import React, { Component } from 'react';
import FormulaireCard from './FormulaireCard.js'
import InformationCard from './InformationCard.js'
import './Card1.css';

class Card1 extends Component {
  render() {
    return (
    <div>
      <li className="list-group-item">
        <div className="col-xs-12 col-sm-3">
          <img src={this.props.photo} alt={this.props.nom+" "+this.props.prenom}  className="img-responsive img-circle" />
        </div>
        <div className="col-xs-12 col-sm-3"></div>
        <div class="col-xs-12 col-sm-6">
          <h5 className="font-weight-bold mt-4 mb-3">Salut moi c'est, {this.props.nom} {this.props.prenom} </h5>
          <p className="text-uppercase blue-text"><strong>Membre</strong></p>
          <p className="grey-text">{this.props.description}</p>
          <p className="grey-text"><a className="fa fa-comments text-muted c-info" href={"mailto:"+this.props.mail}>Contact moi</a></p><br/><br/>
          <span className="name">| laWeb |</span>
        </div>
        <div className="clearfix"></div>
      </li>
    </div>
 );
  }

  /*<div className="row">
            <div className="col-md-4">
              <img src={this.props.photo} className="rounded-circle z-depth-1" alt="Sample avatar" height="300px" width="300px"/>
              <h5 className="font-weight-bold mt-4 mb-3">{this.props.nom} {this.props.prenom} </h5>
              <p className="text-uppercase blue-text"><strong>Membre</strong></p>
              <p className="grey-text">{this.props.description}</p>
              <p className="grey-text">telephone : {this.props.telephone}</p>
              <p className="grey-text">mail : <a href={"mailto:"+this.props.mail}>{this.props.mail}</a></p>
            </div>
          </div>*/
}




export default Card1;