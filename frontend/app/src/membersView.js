import React,{ Component } from 'react';
import NavbarMembres from './NavbarMembres.js';

class membersView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          adresse: '',
          isConnect:this.props.isConnect,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleSubmit() {
    }

    display(){
        if(this.state.isConnect == false){
           alert("pas connecter")
        }
        else{
            alert("connecter")
        }
        
     }

    render() {
        return (
            <div>
                < NavbarMembres />
            </div>
        );
      }
}

export default membersView;