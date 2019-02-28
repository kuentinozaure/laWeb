const notification = {
    nbMessageNonlu:0,
    nbMembreNonValide:0,
    nbAstuceNonValide:0,
    nbActiviteNonValide:0,
}

function notificationReducer(state = notification, action) {
    switch (action.type) {
        case "SET_NOTIFICATION":
            return {
                ...state,
                nbMessageNonlu: action.nbMessageNonlu,
                nbMembreNonValide: action.nbMembreNonValide,
                nbAstuceNonValide: action.nbAstuceNonValide,
                nbActiviteNonValide:action.nbActiviteNonValide,
            };
        case "REMOVE_NOTIFICATION":
            return {
              ...state,
              nbMessageNonlu: 0,
              nbMembreNonValide: 0,
              nbAstuceNonValide: 0,
              nbActiviteNonValide:0,
            };
        default:
            return state;
    }
}
export default notificationReducer