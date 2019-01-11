import {Button,Modal} from 'react-bootstrap';
import "./ListeActivite.css"
import axios from 'axios';

//importer inscription activité (module Modalform)

class ListeActivite extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      activities : [],
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  componentDidMount() {
    const url = 'http://laweb.alwaysdata.net/?choix=1';
    axios.get(url)
      .then(response => {
        console.log(response)

        
        //this.setState({
          //activities: response.data.cards,
          //loading: false,
        //});
      })
      .catch(error => {
        console.log(error);
      });

  }

  render() {

    return (
      <div>
        <TypeActivite title='Conférence'/>
        <div className="container">
          <div className="row">
              <Box imgnom='Intelligence Artificielle' imglink="./images/OpenAI.png"
              modnom='Intelligence Artificielle' modtitre="Introduction" modanimateur="Hernadez Nathalie"
              moddate="20 Février 2019" modnbplace="5"
              moddescription="Dans cette conférence nous vous présenterons qu'est-ce que l'intelligence Artificielle, est-elle compatible avec notre société et bien d'autres thématiques... !"/>
          </div>
        </div>
      </div>
    )
  }


}


export default ListeActivite;