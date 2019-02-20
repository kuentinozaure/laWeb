import React, { Component } from 'react';
import './/Section.css';
import {Animated} from "react-animated-css";
import axios from 'axios';

import CardInfo from './Card.js';
import CardUser from './Card1.js';

import { SERVER_URL } from "./consts";



class Section extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      members : [],
    };
  }


  render() {
  return (
  <div>
    <div className="row">
      <div className="container">
        <Animated animationIn="swing" animationOut="zoomOutDown" isVisible={true}>
          <img  id="logomassi"src="../images/mail.png"   height="100px" width="100px" />
        </Animated>
      </div>
    </div>
    <div className="row">
      <div className="container">
        <CardInfo/>
      </div>
    </div>
    <div className="row">
      <div className="container">
        <div id="QuiSommeNous">
          <section className="team-section text-center my-5">
              <h2 id="h252" className="h1-responsive font-weight-bold my-5">Qui sommes-nous ? </h2>
              <div className="row">
                <div className="col-md-1"></div>
                  <div className="col-md-10">
                    <ul className="list-group" id="contact-list">
                    <li class="list-group-item">
                        {this.display()}
                      </li>
                    </ul>
                  </div>
                  <div className="col-md-1"></div>
                </div>
          </section>
        </div>
      </div>
    </div>
  </div>
  )
  }

  display(){
    let membersList =[]
    let content = this.state.members.map((member, index) => {

      membersList.push(
          <CardUser
              nom= {member.nom}
              prenom= {member.prenom}
              mail={member.mail}
              telephone= {member.telephone}
              description={member.description}
              photo={member.photo}
          />
        );
    });
    return content = membersList;
  }
componentDidMount() {
  const url = 'http://laweb.alwaysdata.net/?choix=2';
  axios.get(url)
    .then(response => {
      let i
      let tab =[]
      for (i = 0; i < response.data.membres.length; i++) {
        tab.push(response.data.membres[i]);
      }
      this.setState({
        members: tab,
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
}


export default Section;