const initialState = {
    isConnected: false
  }
  
  function sessionReducer(state = initialState, action) {
      switch (action.type) {
          case "SET_TOKEN_SESSION":
              return {
                  ...state,
                  name: action.name,
                  email: action.email,
                  isConnected: true,
              };
          case "REMOVE_TOKEN_SESSION":
              return {
                ...state,
                  name: "",
                  email: "",
                isConnected: false,
              };
          default:
              return state;
      }
  }
  export default sessionReducer