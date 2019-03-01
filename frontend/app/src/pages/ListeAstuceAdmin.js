import React,{ Component } from 'react';
import NavbarMembres from './NavbarMembres.js';
import AstuceValide from './AstuceValide';
import axios from 'axios';

import { SERVER_URL } from "../consts";
import Page404 from './404.js';
import { connect } from 'react-redux';

class ListeAstuceAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activites: [],
            show: false
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount() {
        axios.get(SERVER_URL + "astuce/")
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

          listeActivite.push(
              <AstuceValide
                id={activite.id}
                titre={activite.titre}
                message={activite.message}
                description={activite.description}
                lienAstuce={activite.lienAstuce}
                auteur={activite.auteur}
                type_astuce={activite.type_astuce}
                image={activite.image}
                />
            );
        });

        return content = listeActivite;
      }

      handleShow(){
        this.setState({
            show : true
        })
      }

      handleClose() {
        this.setState({ show: false });
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
                                <th>Message</th>
                                <th>Description</th>
                                <th>Lien astuce</th>
                                <th>Auteur</th>
                                <th>Image</th>
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
export default connect(mapStateToProps,null)(ListeAstuceAdmin)