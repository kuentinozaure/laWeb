import React,{ Component } from 'react';
import NavbarMembres from './NavbarMembres.js';

import { connect } from 'react-redux';

import { SERVER_URL } from "../consts";
import Page404 from './404.js';

class membersView extends Component {
    constructor(props) {
        super(props);
        this.state = {
          adresse: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    handleSubmit() {
    }

    display(){
        if(this.props.sessionConnect.isConnected == false){
           alert(this.props.sessionConnect.isConnected)
        }
        else{
            alert("connecter ")
        }

     }

    render() {
        if (this.props.sessionConnect.isConnected == true){
        return (
            <div>
                <NavbarMembres />
                <br></br>
                <div className="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
                    <h1 className="display-4">Bienvenue {this.props.sessionConnect.name+" "+this.props.sessionConnect.prenom}</h1>
                    <p className="lead"></p>
                </div>
                <br></br>
                <br></br>
                {/* {this.display()} */}
            </div>

        );
      }else{
          return(<Page404/>)
      }}}

const mapStateToProps = state => {
    return {
        sessionConnect: state.sessionReducer
    }
};

export default connect(mapStateToProps,null)(membersView)
