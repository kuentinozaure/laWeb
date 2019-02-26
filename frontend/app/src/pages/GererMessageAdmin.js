import React,{ Component } from 'react';
import NavbarMembres from './NavbarMembres.js';
import Message from './Message.js';
import axios from 'axios';

import { SERVER_URL } from "../consts";

class GererMessageAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        };
      }

      componentDidMount() {
        axios.get(SERVER_URL + "message/")
          .then(response => {
            let i
            let tab =[]
            for (i = 0; i < response.data.length; i++) {
              tab.push(response.data[i]);
            }
            this.setState({
              messages: tab,
            });
          })
          .catch(error => {
            console.log(error);
          });

          
      }

      display(){
        let listeMessage =[]
        let content = this.state.messages.map((message, index) => {
    
          listeMessage.push(
              < Message 
                id={message.id}
                titre={message.titre}
                message={message.message}
                description={message.description}
                lienAstuce={message.lienAstuce}
                auteur={message.auteur}
                type_astuce={message.type_astuce}
                />
            );
        });
        
        return content = listeMessage;
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

export default GererMessageAdmin;