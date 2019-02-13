import React, { Component } from 'react';
import "./Accueil.css";
import { FacebookProvider, Page } from 'react-facebook';
import { Timeline } from 'react-twitter-widgets';


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
     </div>
    );
  }
}

export default Accueil;