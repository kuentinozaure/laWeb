import React, { Component } from 'react';
import "./Accueil.css";
class Accueil extends Component {
  render() {
    return (
    //     <div className="container">
    //     <div className="row">
    //         <div className="col-xs-12 col-sm-12 col-md-4 col-lg-8 col-md-offset-2">
    //                        <p>
    //                            <div id="div_titreAccueil">
    //                                  ~ Qu'est-ce que LaWeb ? ~
    //                              </div>
    //                              <br/>
    //                              <div id="div_presentation" align="center">
                                    //  LaWeb est une association constituée d'étudiants et d'enseignants
                                    //  de l'université Jean Jaurès située à Toulouse.<div id="sautdeligne"></div>
                                    //  Elle a pour but d'aider et d'apporter de nouvelles connaissances
                                    //  dans des domaines autour de l'informatique.<div id="sautdeligne"></div>
                                    //  Elle propose un certain nombre d'activités ayant pour but d'initier
                                    //  ou d'approfondir vos connaissances autour d'ateliers et d'évènements.<div id="sautdeligne"></div>
    //                         </div>
    //                        </p>
    //                        <br></br>
    //         </div>
    //     </div>
    //      <br>
    //      </br>
    //  </div>
    //<article>
    //         Fondé par des :
    //           <ul>
    //             <li>
    //               Étudiants
    //             </li>
    //             <li>
    //               Ensaignant
    //             </li>
    //           </ul> 
    //         En :
    //           <ul>
    //             <li>
    //               2018
    //             </li>
    //           </ul>
    //       </article> 
    

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
        <section className="section-laWeb col-xs-4 col-sm-4 col-lg-6 ">
          <h1 className="titre">Nos activités</h1>
          <article>
            les activités sont fait pour tout les etudiants et non etudiant voulant....
            <ul>
              <li>
                Aide au etudiants
              </li>
              <li>
                Aide au etudiants
              </li>
              <li>
                Aide au etudiants
              </li>
              <li>
                Aide au etudiants
              </li>
            </ul>
          </article>
        </section>
        <section className="section-laWeb col-xs-4 col-sm-4 col-lg-6">
          <h1 className="titre">Nos évènements</h1>
          <article>
            les eévènement sont des...
            <ul>
              <li>
                Conférence
              </li>
              <li>
                soirées rabta ztenda
              </li>
              <li>
                Aide au etudiants
              </li>
              <li>
                Aide au etudiants
              </li>
            </ul>
          </article>
        </section>
        </div>
    </div>
      
    
    );
  }
}

export default Accueil;