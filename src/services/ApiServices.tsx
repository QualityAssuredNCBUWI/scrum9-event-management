interface LoginCred {
    email: string;
    password: string
}

// Production
// export const API_LOC = 'https://du-road-api.herokuapp.com/'

// Development (Place your server here!)
export const API_LOC = 'http://127.0.0.1:8079/'

export function login_user(body:LoginCred){
    // send request to endpoint
    console.log("called");
}

export function sign_up(body:object){
    console.log(body)
}

interface CreateGroup {
    groupName: string;
    groupDescription: string; 
}

export function createGroup(body:CreateGroup){
    console.log(body)
}


export function isloggedin(){
    let res =  false;
    if(localStorage.getItem('token')){
        res = true;
    } else {
        res = false;
    }
    // console.log(res);
    return res;
}
