const initialState = {
    id:0,
    name: "",
    prenom: "",
    mail:	"",
    image:	"",
    telephone:	"",
    description:	"",
    login:	"",
    token: "",
    isConnected: false,
}

  function sessionReducer(state = initialState, action) {
      console.log(action)
      switch (action.type) {
          case "SET_SESSION":
              return {
                  ...state,
                  id: action.id,
                  name: action.name,
                  prenom: action.prenom,
                  mail:	action.mail,
                  image:	action.image,
                  telephone:	action.telephone,
                  description:	action.description,
                  login:	action.login,
                  token: action.token,
                  isConnected: true,
              };
          case "REMOVE_SESSION":
              return {
                ...state,
                id:0,
                name: "",
                prenom: "",
                mail:	"",
                image:	"",
                telephone:	"",
                description:	"",
                login:	"",
                token: "",
                isConnected: false,
              };
          default:
              return state;
      }
  }
  export default sessionReducer
