import React, {Component} from "react";

import { SERVER_URL } from "../consts";

class Formgroup extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        id:'',
        name:"",
        placeholder:"",
        className:"",  
        type:""
        };
  
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    render(){
        return(
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon"><i className="fa fa-user fa" aria-hidden="true"></i></span>
              <input id={this.props.id} name={this.props.name} placeholder={this.props.placeholder} 
              className="form-control" type={this.props.type} onChange={e => this.setState({name: e.target.value})}
              />
            </div>
          </div>
        );
    }
}
export default Formgroup;