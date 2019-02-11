
export default function setSession(email, name) {
    return {
        type: "SET_TOKEN_SESSION",
        email: email,
        name: name,
    };
}