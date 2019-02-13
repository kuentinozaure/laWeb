export default function removeSession(name) {
    return {
        type: "REMOVE_SESSION",
        name: name
    };
}