import React,{ Component } from 'react';
import axios from 'axios';
import { SERVER_URL } from "../consts";

class NavbarMembres extends Component {
    constructor(props) {
        super(props);
        this.state = {

          membresNonValide:[],
          message:[],
          astuceNonValide:[],
          activityNonValide:[],
        };

      }

      componentDidMount() {
        axios.get(SERVER_URL + "message/")
          .then(response => {
            let i
            let tab =[]
            console.log(response);
            for (i = 0; i < response.data.length; i++) {
              tab.push(response.data[i]);
            }
            this.setState({
              message: tab,
            });
          })
          .catch(error => {
          });

          axios.get(SERVER_URL + "invalid/")
            .then(response => {
              let i
              let tab =[]
              console.log(response);
              for (i = 0; i < response.data.length; i++) {
                tab.push(response.data[i]);
              }
              this.setState({
                membresNonValide: tab,
              });
            })
            .catch(error => {
            });

            axios.get(SERVER_URL + "unvalidateAstuces/")
              .then(response => {
                let i
                let tab =[]
                console.log(response);
                for (i = 0; i < response.data.length; i++) {
                  tab.push(response.data[i]);
                }
                this.setState({
                  astuceNonValide: tab,
                });
              })
              .catch(error => {
              });

              axios.get(SERVER_URL + "unvalidate/")
                .then(response => {
                  let i
                  let tab =[]
                  console.log(response);
                  for (i = 0; i < response.data.length; i++) {
                    tab.push(response.data[i]);
                  }
                  this.setState({
                    activityNonValide: tab,
                  });
                })
                .catch(error => {
                });



      }

      displayNotififationActivite(){
        let nbActivite =0;
        let content = this.state.astuceNonValide.map((act, index) => {
          if(act.estValide == false){
            nbActivite +=1;
          }
        })

        if(nbActivite>0){
          return(
            <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Activités<span class="badge badge-danger">{nbActivite}</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#listeActiviteAdmin">Liste des activités</a>
              <a className="dropdown-item" href="#gererActiviteAdmin">Gérer les activités<span class="badge badge-danger">{nbActivite}</span></a>
            </div>
          </li>
        )
      }else{
        return(
          <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Activités
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="#listeActiviteAdmin">Liste des activités</a>
            <a className="dropdown-item" href="#gererActiviteAdmin">Gérer les activités</a>
          </div>
        </li>
      )
      }


      }

      displayNotificationAstuceNonValide(){
        let nbAstucennvalide =0;
        let content = this.state.astuceNonValide.map((ast, index) => {
          if(ast.estValide == false){
            nbAstucennvalide +=1;
          }
        })

        if(nbAstucennvalide>0){
          return(
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Astuces<span class="badge badge-danger">{nbAstucennvalide}</span>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#listeAstuceAdmin">Liste des astuces</a>
                <a className="dropdown-item" href="#gererAstuceAdmin">Gérer les astuces<span class="badge badge-danger">{nbAstucennvalide}</span></a>
              </div>
            </li>
          )
        }else{
          return(
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Astuces
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <a className="dropdown-item" href="#listeAstuceAdmin">Liste des astuces</a>
                <a className="dropdown-item" href="#gererAstuceAdmin">Gérer les astuces</a>
              </div>
            </li>
          )
        }
      }

      displayNotificationValidationMembre(){
        let nbMembreNNValide =0;
        let content = this.state.membresNonValide.map((mem, index) => {
          if(mem.estValide == false){
            nbMembreNNValide +=1;
          }
        })

        if(nbMembreNNValide>0){
          return(
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Membres<span class="badge badge-danger">{nbMembreNNValide}</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="#listeMembreAdmin">Liste des membres</a>
              <a className="dropdown-item" href="#gererMembreAdmin">Gérer les membres<span class="badge badge-danger">{nbMembreNNValide}</span></a>
            </div>
          </li>
          )
        }else{
          return(
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Membres
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a className="dropdown-item" href="#listeMembreAdmin">Liste des membres</a>
              <a className="dropdown-item" href="#gererMembreAdmin">Gérer les membres</a>
            </div>
          </li>
          )
        }
      }

      displayNotificationsMessage(){
        let nbMsg=0;
        let content = this.state.message.map((mes, index) => {
          if(mes.estLu == false){
            nbMsg +=1;
          }
        })
        if(nbMsg>0){
          return(<span class="badge badge-danger">{nbMsg}</span>)
        }
      }

    render() {
        return (
        <div>

          <br></br>
          <br></br>
        <div className="col-xs-12 col-sm-1"></div>
        <div className="col-xs-12 col-sm-10">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#member">Accueil</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {this.displayNotififationActivite()}
               {this.displayNotificationAstuceNonValide()}
              {this.displayNotificationValidationMembre()}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Messages{this.displayNotificationsMessage()}
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="#gererMessageAdmin">Gérer les messages</a>
                </div>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Mon compte
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="#infoCompte">Informations de mon compte</a>
                </div>
              </li>
              <li className="nav-item dropdown" className="disabled">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Ressources
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a className="dropdown-item" href="#">Enregister des biens</a>
                  <a className="dropdown-item" href="#">Enregister recettes</a>
                  <a className="dropdown-item" href="#">Suppression</a>
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
