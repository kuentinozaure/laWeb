import React,{ Component } from 'react';
import {Button,Modal} from 'react-bootstrap';
import { SERVER_URL } from "../consts";
import Axios from 'axios';

class Message  extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            show: false,
            
            
            
            
          };
      }

      handleClose = ()  =>{
        this.setState({ show: false });
      }
      handleShow = () => {
        this.setState({ show: true });
      }
      handleDelete() {

        Axios.delete(SERVER_URL + "message/"+this.props.id+"/");
    
    }

     


    render() {
        return (
            <React.Fragment> 
            <tr>
                <td>{this.props.nom}</td>
                <td>{this.props.prenom}</td>    
                <td>{this.props.mail}</td>
                <td>{this.props.message}</td>
                <td>{this.props.categorieMessage}</td>
                <td className="text-right">
                <button type="button" onClick={this.handleShow} class="btn btn-primary btn-lg"> Details</button>
                <button type="button" onClick={this.handleDelete} class="btn btn-danger btn-lg"> Supprimer</button>
                </td>
            </tr>
            <div>

<Modal show={this.state.show} >
<Modal.Body>
                <h4>Message</h4>
                <form id="register-form" role="form" autoComplete="off" className="form"  >
                        
                        <div className="form-group">
                        <h3>nom</h3>
                                    <div className="input-group">
                                        {this.props.nom}
                                    </div>
                                    </div>
                        
                        <div className="form-group">
                        <h3>prenom</h3>
                                    <div className="input-group">

                                        {this.props.prenom}
                                           </div>
                                    </div>

                        <div className="form-group">
                        <h3>mail</h3>
                                    <div className="input-group">

                                      {this.props.mail}  
                                     </div>
                                    </div>

                        <div className="form-group">
                        <h3>message</h3>
                                    <div className="input-group">
                                    {this.props.message} 
                                    </div>
                                    </div>

                        <div className="form-group">
                        <h3>Categorie message</h3>
                                    <div className="input-group">
                                    {this.props.categorieMessage}
                                     </div>
                                    </div>

                        

                            <button type="button"  class="btn btn-primary btn-lg">Save</button>
                        </form>
                </Modal.Body>
            <Modal.Footer>
                    <Button onClick={this.handleClose}>FERMER</Button>
            </Modal.Footer>
</Modal>
</div>
            </React.Fragment> 
            
        );
      }
}

export default Message;