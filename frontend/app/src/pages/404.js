import React, { Component } from 'react';

class Page404 extends Component {

    render(){
        return (
        <div>
            <br></br>
            <br></br>
  			<div className="container">
                <div className="jumbotron">
                    <h1 className="text-center display-3">Oups,Erreur 404<p></p>
                        <p>
                            <small className="text-center">La page demandé n'existe pas</small>
                        </p>
                    </h1>
                    <p className="text-center">revenez en arriere ou cliquez sur le bouton si dessous</p>
                    <p className="text-center"><a class="btn btn-primary" href="#"><i className="fa fa-home"></i>Revenir a l'accueil</a></p>
                </div>
            </div>
            <br></br>
            <br></br>
        </div>
    
          );
        }


}
export default Page404;