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
      activitySearch : "",
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
    if(this.activitySearch === ""){
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

    }else{
      let titre="";
      let description = "";

      let content = this.state.activities.map((activity, index) => {
        titre = activity.titre;
        description = activity.description

        if(titre.includes(this.state.activitySearch) || description.includes(this.state.activitySearch)){
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
        }
      });
      
      return content = listActivity;
    }
  }

  handleSearch(e){
    this.setState({
      activitySearch:e.target.value,
    })
    this.display()
  }

  render() {

    return (
      <div>
        <br></br>
        <div className="container">
	        <div className="row">
	          <div className="col-12">
    	        <div id="custom-search-input">
                <div className="input-group">
                    <input type="text" className="search-query form-control" placeholder="Rechercher une activité" onChange={e => this.handleSearch(e)}/>
                </div>
              </div>
            </div>
	        </div>
        </div>
        <br></br>
          {this.display()}
      </div>
    )
  }


}


export default ListeActivite;