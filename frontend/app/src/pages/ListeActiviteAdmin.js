import React,{ Component } from 'react';
import NavbarMembres from './NavbarMembres.js';
import ActiviteValide from './ActiviteValide.js';
import {Button,Modal} from 'react-bootstrap';
import axios from 'axios';

import { SERVER_URL } from "../consts";
import Page404 from './404.js';
import { connect } from 'react-redux';

class ListeActiviteAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activites: [],
            show: false
        };
      }

      componentDidMount() {
        axios.get(SERVER_URL + "activity/")
          .then(response => {
            let i
            let tab =[]
            console.log(response);
            for (i = 0; i < response.data.length; i++) {
              tab.push(response.data[i]);
            }
            this.setState({
              activites: tab,
            });
          })
          .catch(error => {
            console.log(error);
          });

          
      }

      display(){
        let listeActivite =[]
        let content = this.state.activites.map((activite, index) => {
          console.log(activite);
    
          listeActivite.push(
              < ActiviteValide 
                id={activite.id}
                titre={activite.titre}
                description={activite.description}
                dateDebut={activite.dateDebut}
                dateFin={activite.dateFin}
                salle={activite.salle}
                nombrePlaceDispo={activite.placeDisponible}
                animateur={activite.animateur}
                idCateg={activite.idCateg}
                />
            );
        });
        
        return content = listeActivite;
      }
      
      handleSubmit(event) {
        const url = ''
        axios.get(url)
          .then(response => {
            this.handleClose();
          })
          .catch(error => {
            console.log(error);
          });
        }

      render() {
        if (this.props.sessionConnect.isConnected == true){
        return (
            <div>
            <br></br>
            <br></br>
                    <NavbarMembres/>
                        <div className="container">
                        <div className="row col-md-12 col-md-offset-2 custyle">
                        <table className="table table-striped custab">
                        <thead>
                            <tr>
                                <th>Titre</th>
                                <th>Description</th>
                                <th>Date de début</th>
                                <th>Date de fin</th>
                                <th>Salle</th>
                                <th>Nombre de places</th>
                                <th className="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.display()}
                        </tbody>
                        </table>
                        </div>
                    </div>
                </div>

        );
      }else if(this.props.sessionConnect.isConnected == false || this.props.sessionConnect.isConnected == null){
          return(<Page404/>)
      }
    }
}

const mapStateToProps = state => {
  return {
      sessionConnect: state.sessionReducer
  }
};

export default connect(mapStateToProps,null)(ListeActiviteAdmin)