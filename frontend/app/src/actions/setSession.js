
export default function setSession(name,id,prenom,mail,image,telephone,description,token,login,visible) {
    return {
        type: "SET_SESSION",
        id: id,
        name: name,
        prenom:prenom,
        mail:mail,
        image:image,
        telephone:telephone,
        description : description,
        token :token,
        login:login,
        visible:visible
    };
}
