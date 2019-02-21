import React,{ Component } from 'react';
import NavbarMembres from './NavbarMembres.js';
import AstuceNonValide from './AstuceNonValide.js';
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
        axios.get(SERVER_URL + "unvalidateAstuces/")
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
              < AstuceNonValide 
                id={activite.id}
                titre={activite.titre}
                message={activite.message}
                description={activite.description}
                lienAstuce={activite.lienAstuce}
                auteur={activite.auteur}
                type_astuce={activite.type_astuce}
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
                                <th>Message</th>
                                <th>Description</th>
                                <th>Lien astuce</th>
                                <th>Auteur</th>
                                <th>Type astuce</th>
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