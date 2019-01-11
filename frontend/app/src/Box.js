import React, { Component } from 'react';
import './App.css';
import {Button,Modal} from 'react-bootstrap';

class Box extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    return (
      <div className="Box">

      <Button id="BtAct" onClick={this.handleShow}>
        {this.props.imgnom}
      </Button>

      <a className="thumbnail">
        <img id="imgbox" src={this.props.imglink} alt="Image"/>
      </a>

      <Modal show={this.state.show} onHide={this.handleClose}>

        <Modal.Body>
          <h4><b>{this.props.modnom} : </b>{this.props.modtitre}</h4>
          <h4><b>Animateur : </b>{this.props.modanimateur}</h4>
          <h4><b>Date : </b>{this.props.moddate}</h4>
          <h4><b>Places disponible : </b>{this.props.modnbplace} </h4>
          <hr/>
          <h4><b>Description :</b></h4>
          <p>
            {this.props.moddescription}
          </p>

        </Modal.Body>
        <Modal.Footer>

          <Button href="/inscription" id="Btinscription">Inscription</Button>
          <Button onClick={this.handleClose}>Close</Button>

        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}

export default Box;
