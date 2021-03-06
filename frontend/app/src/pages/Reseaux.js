import React, { Component } from 'react';
import "./Accueil.css";
import { FacebookProvider, Page, Share } from 'react-facebook';
import axios from 'axios';
import { Timeline } from 'react-twitter-widgets';
import './/Section.css';
import Swal from 'sweetalert2';

import { SERVER_URL } from "../consts";


class Reseaux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom : '',
            prenom: '',
            adresse:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        }

    handleSubmit(event) {
    const url = SERVER_URL + "newletter/?nom=" +this.state.nom + '&prenom='+ this.state.prenom +'&mail='+ this.state.adresse
      axios.post(url)
      .then(response => {
       
      })
      .catch(error => {
        console.log(error);
      });
      Swal.fire(
        'Succès!',
        'Vous venez de vous inscrire a notre newsletter',
        'success'
      )
    }
    render() {
        return (
            <div className="container">
                <div id="div_titreAccueil">
                    ~ Nos activités en temps réel sur les réseaux ~
                 </div>
                <div id="div_presentation" align="center">
                    Pour suivre nos activités et être au courant en direct des mouvements au sein de l'association LaWeb, tu peux nous suivre
                    sur nos réseaux sociaux Twitter et Facebook.

                </div>

                <h4>S'abonner à la newletter</h4>
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4">
                            <div className="panel panel-default">
                                <div className="panel-body">
                                    <div className="text-center">
                                        <h3><i className="fa fa-user fa-4x"></i></h3>
                                        <h2 className="text-center">Abonnement à la newsletter</h2>
                                        <p>Pour être notifier par mail de nos activités</p>
                                        <div className="panel-body">

                                            {/*<form id="register-form" role="form" autocomplete="off" className="form" method="get" onSubmit={this.handleSubmit}>*/}

                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                                        <input id="name" name="nom" placeholder="Nom" className="form-control" type="text" required onChange={e => this.setState({ nom: e.target.value })} />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                                        <input id="prenom" name="prenom" placeholder="Prenom" className="form-control" type="text" required onChange={e => this.setState({ prenom: e.target.value })} />
                                                    </div>
                                                </div>

                                                <div className="form-group">
                                                    <div className="input-group">
                                                        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
                                                        <input id="email" name="email" placeholder="Email" className="form-control" type="email" requrired onChange={e => this.setState({ adresse: e.target.value })} />
                                                    </div>
                                                </div>

                                                <br></br><input name="recover-submit" className="btn btn-lg btn-primary btn-block" value="S'inscrire" type="submit" onClick={this.handleSubmit} />
                                            {/*</form>*/}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                <div className="col-sm-5">
                <div id="twitter">
                <h4>Nos derniers tweets</h4>
                <Timeline
                    dataSource={{sourceType:"profile",screenName:"AssociationLaW1"}}
                    options={{username:"AssociationLaW1",height: '545',width:'100%'}}/>
                </div>
                </div>

                <div className="col-sm-2">
                </div>
                <div className="col-sm-5" >
                    <h4>Nos derniers posts</h4>
                    <FacebookProvider appId="2079577735665543">
                        <Page href="https://www.facebook.com/Association-LaWeb-1334130680060783/?modal=suggested_action&notif_id=1549887853715466&notif_t=page_user_activity" tabs="timeline" />
                    </FacebookProvider>
                </div>
            </div>
        );
    }
}

export default Reseaux;
