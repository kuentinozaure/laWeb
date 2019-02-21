import React, { Component } from 'react';
import "./Accueil.css";
import axios from 'axios';

import { SERVER_URL } from "../consts";

class Accueil extends Component {

  render() {
    return ( 
    <div className="container">
      <div className="row  div-zone1">
        <img src="../../images/laWeb-logo-accueil.png" alt="Smiley face" className="laWeb-logo-accueil col-xs-4 col-sm-12 col-lg-6"/> 

         <section className="section-laWeb col-xs-8 col-sm-12 col-lg-6">
          <h1 className="titre">LaWeb c'est quoi ?</h1>
          <article>
          LaWeb est une association constituée d'étudiants et d'enseignants
          de l'université Jean Jaurès située à Toulouse.
          Elle a pour but d'aider et d'apporter de nouvelles connaissances
          dans des domaines autour de l'informatique.
          Elle propose un certain nombre d'activités ayant pour but d'initier
          ou d'approfondir vos connaissances autour d'ateliers et d'évènements.
          </article>
        </section>
        
        </div>
        <div className="row div-zone1">
        <section className="section-laWeb col-xs-4 col-sm-4 col-lg-12 ">
          <h1 className="titre">Nos activités</h1>
          <article>
          Les activités que l'on propose sont variées. On peut y trouver des ateliers visant à prendre en main des outils
          informatiques (bureautique, logiciel de programmation web...), des évènements autour de l'informatique touchant à plusieurs domaines.
          Ces évènements seront accèssible à tout public. Les ateliers quant à eux seront diviser en différents niveaux. Ces activités
          seront animés par des personnes choisies pour leurs compétences d'encadrement et leurs connaissances. 
          </article>
        </section>
        </div>
    </div>
      
    
    );
  }
}

export default Accueil;