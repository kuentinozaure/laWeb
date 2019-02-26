const initialState = {
    id:0,
    name: "",
    isConnected: false
}
  
  function sessionReducer(state = initialState, action) {
      console.log(action)
      switch (action.type) {
          case "SET_SESSION":
              return {
                  ...state,
                  id: action.id,
                  name: action.name,
                  isConnected: true,
              };
          case "REMOVE_SESSION":
              return {
                ...state,
                id:0,
                name: "",
                isConnected: false,
              };
          default:
              return state;
      }
  }
  export default sessionReducer