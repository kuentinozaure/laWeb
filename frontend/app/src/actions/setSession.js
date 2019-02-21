
export default function setSession(name,id) {
    return {
        type: "SET_SESSION",
        id: id,
        name: name
    };
}
