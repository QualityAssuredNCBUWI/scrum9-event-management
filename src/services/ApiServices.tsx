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

interface CreateGroup {
    groupName: string;
    groupDescription: string; 
}

export function createGroup(body:CreateGroup){
    console.log(body)
}


