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
                <NavbarMembres />
                <br></br>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Bienvenue {this.props.loginUser}</h1>
                    <p className="lead"></p>
                </div>
                <br></br>
                <br></br>
            </div>
            
        );
      }
}

export default membersView;