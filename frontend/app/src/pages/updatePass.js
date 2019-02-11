import React, { Component } from 'react';
import Mdp from './Mdp.js';
import NavbarMembres from './NavbarMembres.js';

class updatePass extends Component {
    constructor(props) {
        super(props);
        this.state = {
          adresse: ''
        };
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleSubmit(event) {
        alert('Adresse: '+this.state.adresse);
        event.preventDefault();
    }

    render() {
        return (
                <div>
                    <NavbarMembres/>
                    <Mdp/>
                </div>
        );
      }
}

export default updatePass;