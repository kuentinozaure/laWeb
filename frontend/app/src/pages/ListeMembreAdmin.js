import React,{ Component } from 'react';
import NavbarMembres from './NavbarMembres.js';
import MembreValide from './MembreValide.js'
import axios from 'axios';

import { SERVER_URL } from "../consts";
import Page404 from './404.js';
import { connect } from 'react-redux';


class ListeMembreAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            membres:[],
        };
      }

      componentDidMount() {
        axios.get(SERVER_URL + "members/")
          .then(response => { 
            let i
            let tab =[]
            for (i = 0; i < response.data.length; i++) {
              tab.push(response.data[i]);
            }
            this.setState({
              membres: tab,
            });
          })
          .catch(error => {
            console.log(error);
          });

          
      }

      display(){
        let listeMembre =[]
        let content = this.state.membres.map((membre, index) => {
    
          listeMembre.push(
              < MembreValide 
                nom={membre.nom}
                prenom={membre.prenom}
                login={membre.login}
                telephone={membre.telephone}
                mail={membre.mail}
                description={membre.description}
            />
            );
        });
        
        return content = listeMembre;
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
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th>Login</th>
                                <th>Telephone</th>
                                <th>Mail</th>
                                <th>Description</th>
                                {//<th className="text-center">Action</th>
                                }
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
      }else{
        return(<Page404/>)
      }
    }
}

const mapStateToProps = state => {
  return {
      sessionConnect: state.sessionReducer
  }
};
export default connect(mapStateToProps,null)(ListeMembreAdmin)
