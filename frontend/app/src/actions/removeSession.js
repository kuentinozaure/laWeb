export default function removeSession(name,id) {
    return {
        type: "REMOVE_SESSION",
        id: id,
        name: name
    };
}