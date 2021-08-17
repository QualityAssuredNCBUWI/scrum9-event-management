interface LoginCred {
    email: string;
    password: string
}

export function login_user(body:LoginCred){
    // send request to endpoint
    console.log("called");
}

export function sign_up(body:object){
    console.log(body)
}

export function isloggedin(){
    let res =  false;
    if(localStorage.getItem('token')){
        res = true;
    } else {
        res = false;
    }
    console.log(res);
    return res;
}