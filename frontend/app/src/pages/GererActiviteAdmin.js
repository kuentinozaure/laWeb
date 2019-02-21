import React,{ Component } from 'react';
import NavbarMembres from './NavbarMembres.js';
import ActiviteNonValide from './ActiviteNonValide.js';
import axios from 'axios';

import { SERVER_URL } from "../consts";

class GererActiviteAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activites: []
        };
      }

      componentDidMount() {
        axios.get(SERVER_URL + "unvalidate/")
          .then(response => {
            let i
            let tab =[]
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
    
          listeActivite.push(
              < ActiviteNonValide 
                titre={activite.titre}
                description={activite.description}
                dateDebut={activite.dateDebut}
                dateFin={activite.dateFin}
                salle={activite.salle}
                nombrePlaceDispo={activite.nombrePlaceDispo}
                />
            );
        });
        
        return content = listeActivite;
      }      

      render() {
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
      }
}

export default GererActiviteAdmin;