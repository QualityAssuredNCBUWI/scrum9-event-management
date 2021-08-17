interface LoginCred {
    email: string;
    password: string
}

export function login_user(body:LoginCred) {
    // send request to endpoint
    fetch(`http://127.0.0.1:8079/api/auth/login`,{
        method: 'POST',
        body: JSON.stringify(body)
    })
    .then(response => {
        return response;
    })
}

export function sign_up(body:object){
    console.log(body)
}