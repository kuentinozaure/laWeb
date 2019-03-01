import React,{ Component } from 'react';
import {Button,Modal} from 'react-bootstrap';
import { SERVER_URL } from "../consts";
import Axios from 'axios';
import Swal from 'sweetalert2';



class Message  extends React.Component {
    constructor(props) {
        super(props);
        this.handleDelete = this.handleDelete.bind(this);
        this.state = {
            show: false,
            estLu:this.props.estLu,
          };
      }

      handleClose = ()  =>{
        this.setState({ show: false });
      }
      handleShow = () => {
        this.setState({ show: true });
        Axios.put(SERVER_URL + "reading/"+this.props.id+"/");
        this.setState({
          estLu:true,
        })

      }
      handleDelete() {

        Axios.delete(SERVER_URL + "message/"+this.props.id+"/");
        Swal.fire(
          'Succes!',
          'Vous avez supprimer ce message',
          'warning'
        )

    }

     mailto =() =>{

     }

     displayEstLu(){
       if (this.state.estLu===true){
         return(
           <div className="pretty p-default p-curve p-toggle">
             <input type="checkbox" disabled />
             <div className="state p-success p-off">
                 <label><h7>lu&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h7> </label>
             </div>
          </div>
         )

       }else{
         return(
           <div className="pretty p-default p-curve p-toggle">
             <input type="checkbox" disabled />
             <div className="state p-danger p-off">
                 <label><h7>&nbsp;non lu </h7> </label>
             </div>
          </div>
        )
       }
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
                <button type="button" onClick={this.handleShow} className="btn btn-primary btn-lg"> Details</button>
                <button type="button" onClick={this.handleDelete} className="btn btn-danger btn-lg"> Supprimer</button>
                  {this.displayEstLu()}
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


                            <a HREF={"mailto:" + this.props.mail} className="btn btn-success btn-lg active" role="button" title="Répondre">Répondre</a>
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
