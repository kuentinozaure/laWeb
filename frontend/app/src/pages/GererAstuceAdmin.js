import React,{ Component } from 'react';
import NavbarMembres from './NavbarMembres.js';
import AstuceNonValide from './AstuceNonValide.js';
import axios from 'axios';

import { SERVER_URL } from "../consts";

class GererAstuceAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Astuces: []
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
              Astuces: tab,
            });
          })
          .catch(error => {
            console.log(error);
          });


      }

      display(){
        let listeAstuce =[]
        let content = this.state.Astuces.map((Astuce, index) => {

          listeAstuce.push(
              < AstuceNonValide
                id={Astuce.id}
                image={Astuce.image}
                titre={Astuce.titre}
                message={Astuce.message}
                description={Astuce.description}
                lienAstuce={Astuce.lienAstuce}
                auteur={Astuce.auteur}
                type_astuce={Astuce.categorieAstuce}
                />
            );
        });

        return content = listeAstuce;
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
                                <th>Image</th>
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

export default GererAstuceAdmin;
