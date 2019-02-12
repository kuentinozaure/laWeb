import React, { Component } from 'react';
import axios from 'axios'
import swal from 'sweetalert2'



class FormulaireCard extends Component {
    
constructor(props) {

    super(props);
    
    this.state = {
    
    Nom: '',
    Prenom: '',
    mail:'',
    message:'',

    
    }
    
     
    
    this.handleSubmit = this.handleSubmit.bind(this);
    
    }
    
     
    
    handleSubmit() {
    const url = 'http://laweb.alwaysdata.net/?choix=10&nom='+this.state.Nom+'&prenom='+this.state.Prenom+'&mail='+this.state.mail+'&message='+this.state.message;
    axios.get(url)
      .then(response => {
        alert(
          'Mail envoyé',
        )
        console.log('mail envoye')
      })
      .catch(error => {
        console.log(error);
      });

    }
    
     
    
    render() {
    
    return (
        <div className="card mb">
            <div className="card-body mb">
            <h2 id="h252" className="h1-responsive font-weight-bold my-5">Nous contacter ? </h2>


             <form onSubmit={this.handleSubmit}>
    
    <div className="form-group">
      <div className="input-group">
        <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
        <input id="nom" name="nom" placeholder="Nom" className="form-control"  type="text" required="remplir votre nom" onChange={e => this.setState({Nom: e.target.value})}/>
      </div>
    </div>

    <div className="form-group">
      <div className="input-group">
        <span className="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
        <input id="prenom" name="prenom" placeholder="Prénom" className="form-control"  required="remplir votre prenom" type="text"  onChange={e => this.setState({Prenom: e.target.value})}/>
      </div>
    </div>
    
  
    
    <div className="form-group">
      <div className="input-group">
        <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
        <input id="email" name="email" placeholder="Email" className="form-control"  required="remplir votre email" type="email" onChange={e => this.setState({mail: e.target.value})}/>
      </div>
    </div>

    <div className="form-group">
          <div className="input-group ">
              <span className="input-group-addon"><i className="glyphicon glyphicon-envelope color-blue"></i></span>
              <input id="message" name="message" placeholder="Message" className="form-control" required="remplir votre message" type="text"  onChange={e => this.setState({message: e.target.value})}/>
          </div>
    </div>
    
    <div className="form-group">
      <input name="recover-submit" className="btn btn-lg btn-primary btn-block" value="Envoyer" type="submit" />
    </div>
    
    <input type="hidden" className="hide" name="token" id="token" value=""/>
     </form>
  
     </div>
    </div>
    );
    
    }
    
    }
    
    
    



export default FormulaireCard ;
