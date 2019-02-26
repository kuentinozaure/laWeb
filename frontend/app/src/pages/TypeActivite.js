import React, { Component } from 'react';
import './App.css';
import './Box.js';

import { SERVER_URL } from "../consts";

class TypeActivite extends Component {
  render(){
    return (
        <div>
          <label id="titreactivite">{this.props.title}</label>
        </div>
    )
  }

}



export default TypeActivite;
