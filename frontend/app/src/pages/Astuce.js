import React, { Component } from 'react';
import './Astuce.css';

class Astuce extends Component {
    render () {
        return(
            <div>
        <h1>Astuces</h1>
        <p></p>
        <p></p>
        <h2>
            Vous avez un problème ? Nos astuces peuvent peut-être vous aider.
        </h2>
        <p></p>
        <div className="container">
          <div className="row">
          <label id="titreactivite">ENT</label>
          <div className="container">
            <div className="well">
                <div className="media">
                        <img id="imgbox" src="../aide.png" alt="Image"/>
                    <div className="media-body">
                            <h2 className="media-heading">Aide étudiant</h2>
                        <h3><p>Si vous avez des problèmes avec l'ENT, que vous ne voyez pas apparaîtres vos cours ou que vous ne connaissez pas vos identifiants par exemple... cette page web peut vous aider :</p></h3>
                        <ul className="list-inline list-unstyled">
                        <li>|</li>
                        <li><span><i className="glyphicon glyphicon-education"></i>
                        laWeb
                        </span></li>
                        <li>|</li>
                        </ul>
                        <a href="http://www.univ-tlse2.fr/accueil/vie-des-campus/services-numeriques/aide-etudiant-210957.kjsp" class="btn btn-info btn-lg " role="button" >En savoir plus</a>
                    </div>
                    
                </div>
            </div>
         </div>
         <div className="container">
            <div className="well">
                <div className="media">
                        <img id="imgbox" src="../alladin.png" alt="Image"/>
                    <div className="media-body">
                            <h2 className="media-heading">Aladin</h2>
                        <h3><p>Si vous voulez déposer une demande qui concerne le site Campus Mirail voici le lien à suivre :</p></h3>
                        <ul className="list-inline list-unstyled">
                        <li>|</li>
                        <li><span><i className="glyphicon glyphicon-education"></i>
                        laWeb
                        </span></li>
                        <li>|</li>
                        </ul>
                        <a href="https://aladin.univ-tlse2.fr/connecte" class="btn btn-info btn-lg " role="button" >En savoir plus</a>
                    </div>
                    
                </div>
            </div>
         </div>

          <label id="titreactivite">Logiciel libre</label>

          <div className="container">
            <div className="well">
                <div className="media">
                        <img id="imgbox" src="../calc.jpg" alt="Image"/>
                    <div className="media-body">
                            <h2 className="media-heading">Libre office calc</h2>
                        <h3><p>Tu veut en savoir plus ?</p></h3>
                        <ul className="list-inline list-unstyled">
                        <li>|</li>
                        <li><span><i className="glyphicon glyphicon-education"></i>
                        laWeb
                        </span></li>
                        <li>|</li>
                        </ul>
                        <a href="https://fr.wikipedia.org/wiki/LibreOffice" class="btn btn-info btn-lg " role="button" >En savoir plus</a>
                    </div>
                    
                </div>
            </div>
         </div>

         <label id="titreactivite">Securite</label>
        
         <div className="container">
            <div className="well">
                <div className="media">
                        <img id="imgbox" src="../secu.png" alt="Image"/>
                    <div className="media-body">
                            <h2 className="media-heading">NE PAS FAIRE SUR INTERNET</h2>
                        <h3><p>Nous t'informons</p></h3>
                        <ul className="list-inline list-unstyled">
                        <li>|</li>
                        <li><span><i className="glyphicon glyphicon-education"></i>
                        laWeb
                        </span></li>
                        <li>|</li>
                        </ul>
                        <a href="http://mass-cara2.univ-tlse2.fr/~massi.ouldrabah/Vulgarisation/Page/SeProteger.html" class="btn btn-info btn-lg " role="button" >En savoir plus</a>
                    </div>
                    
                </div>
            </div>
         </div>
         <div className="container">
            <div className="well">
                <div className="media">
                        <img id="imgbox" src="../cybersecurite.jpg" alt="Image"/>
                    <div className="media-body">
                            <h2 className="media-heading">Securite informatique</h2>
                        <h3><p>Tu veut en savoir plus ?</p></h3>
                        <ul className="list-inline list-unstyled">
                        <li>|</li>
                        <li><span><i className="glyphicon glyphicon-education"></i>
                        laWeb
                        </span></li>
                        <li>|</li>
                        </ul>
                        <a href="http://mass-cara2.univ-tlse2.fr/~massi.ouldrabah/Vulgarisation/Page/index.html" class="btn btn-info btn-lg " role="button" >En savoir plus</a>
                    </div>
                    
                </div>
            </div>
         </div>
        </div>
    </div>   
</div>
        )
    }
}

export default Astuce;
