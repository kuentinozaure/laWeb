const initialState = {
    name: "",
    isConnected: false
}
  
  function sessionReducer(state = initialState, action) {
      console.log(action)
      switch (action.type) {
          case "SET_SESSION":
              return {
                  ...state,
                  name: action.name,
                  isConnected: true,
              };
          case "REMOVE_SESSION":
              return {
                ...state,
                name: "",
                isConnected: false,
              };
          default:
              return state;
      }
  }
  export default sessionReducer