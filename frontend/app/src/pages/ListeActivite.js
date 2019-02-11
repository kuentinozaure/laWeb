import React, { Component } from 'react';
import TypeActivite from './TypeActivite';
import Box from './Box.js';
import {Button,Modal} from 'react-bootstrap';
import "./ListeActivite.css"
import axios from 'axios';

//importer inscription activité (module Modalform)

class ListeActivite extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      activities : [],
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  componentDidMount() {
    const url = 'http://laweb.alwaysdata.net/?choix=1';
    axios.get(url)
      .then(response => {
        let i
        let tab =[]
        for (i = 0; i < response.data.activite.length; i++) {
          tab.push(response.data.activite[i]);
        }
        this.setState({
          activities: tab,
        });
      })
      .catch(error => {
        console.log(error);
      });

  }

  display(){
    let listActivity =[]
    let content = this.state.activities.map((activity, index) => {

      listActivity.push(
          <Box 
              imgnom= {activity.titre}
              modnom= {activity.id}
              modtitre={activity.titre}
              moddate= {activity.dateDebut}
              modnbplace={activity.placeDispo}
              modnbplaceRestante={activity.placeRestante}
              moddescription={activity.description}
          />
        );
    });
    
    return content = listActivity;
    //modanimateur={activity.id}
    //imglink={}
  }

  render() {

    return (
      <div>
        <TypeActivite title='Activités'/>
        <div className="container">
        <div className="container">
            <div className="row">
                  <div className="input-group col-md-11">
                    <span className="input-group-btn">
                      <input type="text" className="search-query form-control" placeholder="Rechercher une activité" />
                        <button className="btn btn-secondary btn-md" type="button">
                          Rechercher
                        </button>
                    </span>
                  </div>
              </div>
          </div><br></br>
          <div className="row">
              {this.display()}
          </div>
        </div>
      </div>
    )
  }


}


export default ListeActivite;