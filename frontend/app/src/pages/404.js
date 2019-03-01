import React, { Component } from 'react';

class Page404 extends Component {

    render(){
        return (
        <div>
            <br></br>
            <br></br>
  			<div class="container">
                <div class="jumbotron">
                    <h1 class="text-center display-3">Oups,Erreur 404<p></p>
                        <p>
                            <small class="text-center">La page demandé n'existe pas</small>
                        </p>
                    </h1>
                    <p class="text-center">revenez en arriere ou cliquez sur le bouton si dessous</p>
                    <p class="text-center"><a class="btn btn-primary" href="#"><i class="fa fa-home"></i>Revenir a l'accueil</a></p>
                </div>
            </div>
            <br></br>
            <br></br>
        </div>
    
          );
        }


}
export default Page404;