import React, { Component } from 'react';
import './Astuce.css';

import {Button,Modal} from 'react-bootstrap';

class Astuce extends Component {

    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
          titre: '',
          description: '',
          nom: '',
          lien: ''
        };

       
      }

      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }

    render () {
        return(
            <div>
        <h1 align="center">Astuces</h1>
        <a class="btn btn-info btn-lg " role="button" onClick={this.handleShow}>Proposes une astuce</a>
        <p></p>
        <p></p>
        <h2 align="center">
            Vous avez un problème ? Nos astuces peuvent peut-être vous aider à le résoudre.
        </h2>
        <p></p>
        <p></p>
        <div className="container">
          <div className="row">
          <div className="container">
            <div className="well">
                <div className="media">
                        <img id="imgbox" src="../aide.png" alt="Image"/>
                    <div className="media-body">
                            <h2 className="media-heading">Aide étudiant</h2>
                        <h3><p>Si vous rencontrez des problèmes avec l'ENT, que vous ne voyez pas apparaîtres vos cours ou que vous ne connaissez pas vos identifiants par exemple... cette page web peut vous aider.</p></h3>
                        <ul className="list-inline list-unstyled">
                        <li>|</li>
                        <li><span><i className="glyphicon glyphicon-education"></i>
                        LaWeb
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
                        <h3><p>Si vous voulez déposer une demande qui concerne le site de l'université du Mirail et qui est un problème techinique.</p></h3>
                        <ul className="list-inline list-unstyled">
                        <li>|</li>
                        <li><span><i className="glyphicon glyphicon-education"></i>
                        LaWeb
                        </span></li>
                        <li>|</li>
                        </ul>
                        <a href="https://aladin.univ-tlse2.fr/connecte" class="btn btn-info btn-lg " role="button" >En savoir plus</a>
                    </div>
                    
                </div>
            </div>
         </div>


          <div className="container">
            <div className="well">
                <div className="media">
                        <img id="imgbox" src="../calc.jpg" alt="Image"/>
                    <div className="media-body">
                            <h2 className="media-heading">LibreOffice</h2>
                        <h3><p>Besoin d'un logiciel gratuit et simple à utiliser pour rédiger des documents ou même faire des présentations ? Jette un coup d'œil à ça !</p></h3>
                        <ul className="list-inline list-unstyled">
                        <li>|</li>
                        <li><span><i className="glyphicon glyphicon-education"></i>
                        LaWeb
                        </span></li>
                        <li>|</li>
                        </ul>
                        <a href="https://fr.wikipedia.org/wiki/LibreOffice" class="btn btn-info btn-lg " role="button" >En savoir plus</a>
                    </div>
                    
                </div>
            </div>
         </div>

        
         <div className="container">
            <div className="well">
                <div className="media">
                        <img id="imgbox" src="../secu.png" alt="Image"/>
                    <div className="media-body">
                            <h2 className="media-heading">Comment se protéger sur internet ?</h2>
                        <h3><p>Nous te donnons des petites astuces simples !</p></h3>
                        <ul className="list-inline list-unstyled">
                        <li>|</li>
                        <li><span><i className="glyphicon glyphicon-education"></i>
                        LaWeb
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
                            <h2 className="media-heading">Sécurité informatique</h2>
                        <h3><p>Tu veux en savoir plus sur ce qu'est la sécurité informatique ? Tu pourras en apprendre un peu plus ici.</p></h3>
                        <ul className="list-inline list-unstyled">
                        <li>|</li>
                        <li><span><i className="glyphicon glyphicon-education"></i>
                        LaWeb
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
    <div className="Box">
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Body>
          <h2 className="text-center">Vous voulez proposer une astuce ?</h2>

          <form id="register-form" role="form" autoComplete="off" className="form" method="get" onSubmit={this.handleSubmit}>
                <div className="form-group">
                              <div className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-chevron-right" aria-hidden="true"></i></span>
                                <input id="titre" name="titre" placeholder="Titre" required="Remplir le titre" className="form-control"  type="text" onChange={e => this.setState({titre: e.target.value})}/>
                              </div>
                            </div>
                  
                  <div className="form-group">
                              <div className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-pencil" aria-hidden="true"></i></span>
                                <textarea  id="description" name="description" placeholder="Description" required="Remplir la description" className="form-control"  type="text" onChange={e => this.setState({description: e.target.value})}/>
                              </div>
                            </div>

                <div className="form-group">
                              <div className="input-group">
                                <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
                                <input id="auteur" name="auteur" placeholder="Auteur de l'astuce" required="Remplir le nom de l'auteur" className="form-control"  type="text" onChange={e => this.setState({nom: e.target.value})}/>
                              </div>
                            </div>

                <div className="form-group">
                              <div className="input-group">
                                <span className="input-group-addon"><i className="glyphicon glyphicon-link" aria-hidden="true"></i></span>
                                <input id="lien" name="lien" placeholder="Lien de l'astuce" required="Remplir le lien de l'astuce" className="form-control"  type="text" onChange={e => this.setState({lien: e.target.value})}/>
                              </div>
                            </div>

                  <input type="submit" className="center-block btn btn-danger" value="Proposer une activité" />
                  </form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>FERMER</Button>
        </Modal.Footer>
      </Modal>
      </div>
</div>

        )
    }
}

export default Astuce;
