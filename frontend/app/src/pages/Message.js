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
   
     mailto =() =>{

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
                <div>
                <button type="button" onClick={this.handleShow} class="btn btn-primary btn-lg"> Details</button>
                <button type="button" onClick={this.handleDelete} class="btn btn-danger btn-lg"> Supprimer</button>
                <div className="pretty p-default p-curve p-toggle">
                    <input type="checkbox" />
                        <div className="state p-success p-on">
                            <label><h7>message lue </h7></label>
                        </div>
                        <div className="state p-danger p-off">
                            <label><h7>message non  lue </h7> </label>
                        </div>
                 </div>
                 </div>
                </td>
            </tr>
            <div>

<Modal show={this.state.show} >
<Modal.Body>
                <h4>Message</h4>
                <form id="register-form" role="form" autoComplete="off" className="form"  >
                    
                        <div className="form-group">
                        
                        <h3>Nom :</h3>
                        
                                    <div className="input-group">
                                        {this.props.nom}
                                    </div>
                                    </div>
                        
                        <div className="form-group">
                        <h3>Prénom :</h3>
                                    <div className="input-group">

                                        {this.props.prenom}
                                           </div>
                                    </div>

                        <div className="form-group">
                        <h3>Mail :</h3>
                                    <div className="input-group">

                                      {this.props.mail}  
                                     </div>
                                    </div>
                                    <div className="form-group">
                        
                        <h3>Sujet du  message :</h3>
                                    <div className="input-group">
                                    {this.props.categorieMessage}
                                     </div>
                                    </div> 

                        <div className="form-group">
                        <h3>Message :</h3>
                                    <div className="input-group">
                                    {this.props.message} 
                                    </div>
                                    </div>

                        
                            <a HREF={"mailto:" + this.props.mail} class="btn btn-success btn-lg active" role="button" title="Répondre">Répondre</a>             
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