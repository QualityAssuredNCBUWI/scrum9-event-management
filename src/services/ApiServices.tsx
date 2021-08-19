import { LoginCred } from "../models/Login";
import { CreateGroup } from "../models/Group";


// Production
export const API_LOC = 'https://du-road-api.herokuapp.com/'

// Development (Place your server here!)
// export const API_LOC = 'http://127.0.0.1:8079/'


/**
    HTTP headers
*/
const getRequestOptions= {
    method: 'GET',
    headers: new Headers({
        'Authorization': 'Bearer '+ (isloggedin() ? getToken(): "" )
    })
};

const postRequestOptions= {
    method: 'POST',
    headers: new Headers({
        'Authorization': 'Bearer '+ (isloggedin() ? getToken(): "" )
    })
};

const deleteRequestOptions= {
    method: 'DELETE',
    headers: new Headers({
        'Authorization': 'Bearer '+ (isloggedin() ? getToken(): "" )
    })
};

const putRequestOptions= {
    method: 'PUT',
    headers: new Headers({
        'Authorization': 'Bearer '+ (isloggedin() ? getToken(): "" )
    }),
};

/**
    Authentication and user services
*/

export function login_user(body:LoginCred){
    // send request to endpoint
    localStorage.clear()
    
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
    // console.log(res);
    return res;
}

export function getToken(){
    if(localStorage.getItem('token')){
        return localStorage.getItem('token');
    } 
    return null;
}

export async function getLoginUserId(){
    if(localStorage.getItem('user-id')){
        return localStorage.getItem('user-id');
    }else{
        let user_info: any=  await getCurrentUserInfo()
        localStorage.setItem('user-id', user_info.user.id);
        console.log("the id", localStorage.getItem('user-id'))
        return localStorage.getItem('user-id');
    } 
}

export async function getCurrentUserInfo(){
    const response = await fetch(`${API_LOC}api/users/current`, getRequestOptions);
    if(response.status == 200){
        const data = await response.json();
        console.log(data)
        return data
    }else{
        const data = await response.json();
        console.log(data)
        return null
    }
}

/**
    Event services
*/

export async function getEvent(event_id:number) {
    const response = await fetch(`${API_LOC}api/events/${event_id}`);
    if(response.status == 200){
        const data = await response.json();
        data.start_date = new Date(data.start_date)
        data.end_date = new Date(data.end_date)

        const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        data.duration = Math.round(Math.abs((data.start_date - data.end_date) / oneDay));

        console.log(data);
        return data;
    }else{
        const data = await response.json();
        console.log(data)
    }
}

export async function getEventAttendee(event_id:number) {
    const response = await fetch(`${API_LOC}api/events/${event_id}/users`);
    if(response.status === 200){
        const data = await response.json();
        console.log(data);

        return data;
    }else{
        const data = await response.json();
        console.log(data)
    }

}

export async function checkUserAttendEvent(event_id:number) {
    const response = await fetch(`${API_LOC}api/events/${event_id}/attend`, getRequestOptions);
    if(response.status === 200){
        const data = await response.json();
        console.log(data);
        return true;
                            
    }else if(response.status === 409){
        const data = await response.json();
        console.log(data);
        return false
    }
}

export async function setUserAtendEvent(event_id:number){
    const response = await fetch(`${API_LOC}api/events/${event_id}/attend`, postRequestOptions);
    if(response.status === 200){
        console.log("member added successfully");
        return false;
    }else{
        const data = await response.json();
        console.log(data);   
        return false;
    }
}

export async function setUserLeaveEvent(event_id:number){
    const response = await fetch(`${API_LOC}api/events/${event_id}/leave`, postRequestOptions);
    if(response.status === 200){
        console.log("member leave successfully");
        return false;
    }else{
        const data = await response.json();
        console.log(data);   
        return false;
    }
}

export async function updateEventStatus(event_id:number, status:string){
    let formData = new FormData();
    formData.append('status', status);

    var putRequestOptions_temp = {
        method: putRequestOptions.method,
        headers: putRequestOptions.headers,
        body: formData
    };

    const response = await fetch(`${API_LOC}api/events/${event_id}`, putRequestOptions_temp);
    if(response.status === 200){
        const data = await response.json();
        console.log(data);
        return false;
    }else{
        const data = await response.json();
        console.log(data);   
        return false;
    }
}



/**
    Group services
*/

export function createGroup(body:CreateGroup){
    console.log(body)
}

export async function getEventGroup(event_id:number){
    const response = await fetch(`${API_LOC}api/events/${event_id}/group`);
    if(response.status === 200){
        const data = await response.json();
        console.log(data);
        return data;
    }else{
        const data = await response.json();
        console.log(data)
        return null;
    }
}


