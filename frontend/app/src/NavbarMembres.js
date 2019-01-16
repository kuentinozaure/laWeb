import React,{ Component } from 'react';

class NavbarMembres extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

      }

    render() {
        return (
        <div>
          
          <br></br>
          <br></br>
        <div className="col-xs-12 col-sm-1"></div>
        <div className="col-xs-12 col-sm-10">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="/member">Accueil</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Activites
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="/validActivity">Valider des activites</a>
                  <a className="dropdown-item" href="/createActivity">Creer des activites</a>
                  <a className="dropdown-item" href="#">Supprimer des activites</a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Membres
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="/validMembers">Valider des membres</a>
                  <a className="dropdown-item" href="#">Modification membres</a>
                  <a className="dropdown-item" href="#">Suppression membres</a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Ressources
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="#">Enregister des biens</a>
                  <a className="dropdown-item" href="#">Enregister recettes</a>
                  <a className="dropdown-item" href="#">Suppression</a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Mon compte
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="/updatePass">Changer mon mot de passe</a>
                  <a className="dropdown-item" href="#">Changer mes info</a>
                  <a className="dropdown-item" href="#">Supprimer mon compte</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div className="col-xs-12 col-sm-1"></div>
      </div>);
      }
}

export default NavbarMembres;