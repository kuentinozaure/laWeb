import React, { Component } from 'react';
import "./InformationCard.css"

import { SERVER_URL } from "./consts";



class InformationCard extends Component {
  render() {
    return (
        
        
        <div className="card mb">
            <div className="card-body mb">
            <h2 id="h252" className="h1-responsive font-weight-bold my-5">Où Nous Trouver ? </h2>
              Université Toulouse II Jean-Jaures
              5 Allée Antonio Machado, 31100 Toulouse 
              Bureau 204 Bâtiment Olympes de Gouges, département Mathématiques et Informatique<br/>
              Nathalie Hernandez : <a href="mailto:nathalie.hernandez@irit.fr">nathalie.hernandez@irit.fr</a>,<br/><a href="mailto:nathalie.hernandez@univ-tlse2.fr">nathalie.hernandez@univ-tlse2.fr</a><br/>
              Stephane Isnard : <a href="mailto:stephane.isnard@univ-tlse2.fr">stephane.isnard@univ-tlse2.fr </a>                                           
          </div>
        </div>
                            
        
    );
  }
}




export default InformationCard;