import React,{ Component } from 'react';
import NavbarMembres from './NavbarMembres.js';

import { SERVER_URL } from "../consts";

class CreateActivite extends Component {
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
                    <NavbarMembres/>
                        <div class="container">
                        <div class="row col-md-12 col-md-offset-2 custyle">
                        <table class="table table-striped custab">
                        <thead>
                            <tr>
                                <th>Id Client</th>
                                <th>Nom</th>
                                <th>Prenom</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                                <tr>
                                    <td>0</td>
                                    <td>TEST</td>
                                    <td>XXXXXXXXXXXXX</td>
                                    <td class="text-right">
                                        <a class='btn btn btn-info btn-sm' href="#">
                                            <span class="glyphicon glyphicon-edit">
                                            </span> 
                                            Edit
                                        </a> 
                                        <a href="#" class="btn btn-danger btn-sm">
                                            <span class="glyphicon glyphicon-remove">
                                            </span> 
                                            Del
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>0</td>
                                    <td><input type="text" class="  search-query form-control" placeholder="TEST" /></td>
                                    <td><input type="text" class="  search-query form-control" placeholder="XXXXXXXXXXXXX" /></td>
                                    <td class="text-right">
                                        <a class='btn btn btn-info btn-sm' href="#">
                                            <span class="glyphicon glyphicon-edit">
                                            </span> 
                                            OK
                                        </a> 
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>TEST</td>
                                    <td>XXXXXXXXXXXXXXXXXXXXXXXXXX</td>
                                    <td class="text-right">
                                        <a class='btn btn btn-info btn-sm' href="#">
                                            <span class="glyphicon glyphicon-edit">
                                            </span> 
                                            Edit
                                        </a> 
                                        <a href="#" class="btn btn-danger btn-sm">
                                            <span class="glyphicon glyphicon-remove">
                                            </span> 
                                            Del
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td><input type="text" class="  search-query form-control" placeholder="TEST" /></td>
                                    <td><input type="text" class="  search-query form-control" placeholder="XXXXXXXXXXXXXXXXXXXXXXXXXX" /></td>
                                    <td class="text-right">
                                        <a class='btn btn btn-info btn-sm' href="#">
                                            <span class="glyphicon glyphicon-edit">
                                            </span> 
                                            OK
                                        </a> 
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>XXXXXXXXXXXXXXXXXXXXXXX</td>
                                    <td>XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</td>
                                    <td class="text-right">
                                        <a class='btn btn-info btn-sm' href="#">
                                            <span class=" glyphicon-pencil"/>
                                            Edit
                                        </a> 
                                        <a href="#" class="btn btn-danger btn-sm">
                                            <span class="glyphicon glyphicon-remove">
                                            </span> 
                                            Del
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td><input type="text" class="  search-query form-control" placeholder="XXXXXXXXXXXXXXXXXXXXXXX" /></td>
                                    <td><input type="text" class="  search-query form-control" placeholder="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" /></td>
                                    <td class="text-right">
                                        <a class='btn btn btn-info btn-sm' href="#">
                                            <span class="glyphicon glyphicon-edit">
                                            </span> 
                                            OK
                                        </a> 
                                    </td>
                                </tr>
                        </table>
                        </div>
                            <div class="row col-md-12 col-md-offset-2 custyle">
                            <div class="col-md-4">             
                            </div>
                            <div class="col-md-4">  
                            </div>
                            <div class="col-md-4">  
                                <a href="#" class="btn btn-primary btn-sm pull-right"><b>+</b></a>
                            </div>
                        </div>
                    </div>
                </div>
            
                
        );
      }
}

export default CreateActivite;