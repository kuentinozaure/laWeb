export default function setNotification(nbMessageNonlu,nbMembreNonValide,nbAstuceNonValide,nbActiviteNonValide) {
    return {
        type: "SET_NOTIFICATION",
        nbMessageNonlu: nbMessageNonlu,
        nbMembreNonValide: nbMembreNonValide,
        nbAstuceNonValide:nbAstuceNonValide,
        nbActiviteNonValide:nbActiviteNonValide,
    };
}
