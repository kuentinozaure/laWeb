import React, { Component } from 'react';
import "./Accueil.css";
import { FacebookProvider, Page } from 'react-facebook';


class Accueil extends Component {
  render() {
    return (
        <div className="container">
        <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-8 col-md-offset-2">
                           <p>
                               <div id="div_titreAccueil">
                                     ~ Qu'est-ce que LaWeb ? ~
                                 </div>
                                 <br/>
                                 <div id="div_presentation" align="center">
                                     LaWeb est une association constituée d'étudiants et d'enseignants
                                     de l'université Jean Jaurès située à Toulouse.<div id="sautdeligne"></div>
                                     Elle a pour but d'aider et d'apporter de nouvelles connaissances
                                     dans des domaines autour de l'informatique.<div id="sautdeligne"></div>
                                     Elle propose un certain nombre d'activités ayant pour but d'initier
                                     ou d'approfondir vos connaissances autour d'ateliers et d'évènements.<div id="sautdeligne"></div>
                            </div>
                           </p>
                           <br></br>
            </div>
        </div>
         <br>
         </br>
         <div className="col-sm-5">
             <a className="twitter-timeline" href="https://twitter.com/AssociationLaW1"
             data-width="500"
             data-height="500">
             Nos derniers tweets
             </a>
         </div>
         <div className="col-sm-2">
         </div>
         <div className="col-sm-5" >
         
         <FacebookProvider appId="2079577735665543">
        <Page href="https://www.facebook.com/Association-LaWeb-1334130680060783/?modal=suggested_action&notif_id=1549887853715466&notif_t=page_user_activity" tabs="timeline"  />
         </FacebookProvider> 
         </div>
     </div>
    );
  }
}

export default Accueil;