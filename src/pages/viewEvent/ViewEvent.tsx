import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter} from '@ionic/react';
import { RequestOptions } from 'https';
import React, { useState } from 'react'; 
import { useHistory, RouteComponentProps } from 'react-router';
import { useParams } from 'react-router-dom';

import testimage from '../../images/testevent.jpg';
import { API_LOC } from '../../services/ApiServices';
import './ViewEvent.css';

interface event {
    id: number;
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    duration: number;
    image: string;
    status: string;
    venue: string;
    website_url:string;
    uid: number;
}

interface attendee{
    id: number;
    first_name: string;
    last_name: string;
}


type EventParams = {
    event_id: string
}


const ViewEvent: React.FC<RouteComponentProps> = (props) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [cur_event_id, setEventId] = useState<number>();
    const [current_event, setEvent] = useState<event>();
    const [event_attendee, setAttendee] = useState<attendee[]>();
    const [isAttendingEvent, changeAtendEvent] = useState<Boolean>();
    const [isEventAdmin, setEventAdmin] = useState<Boolean>();
    const [eventGroup, setEventGroup] = useState<Number>();


    const history = useHistory();

    let {event_id} = useParams<EventParams>();

    async function getEvent(event_id:number) {
        let token:string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImVtYWlsIjoiam9obnBhdWxAZHVyb2FkLmNvbSIsImlhdCI6MTYyOTM4NjkyMiwiZXhwIjoxNjI5MzkwNTIyfQ.-OiYomQuZMEN9sTfegminWfCtEtLwWuPUJX18q04MYw';

        const getRequestOptions= {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer '+token
            })
        };
        const postRequestOptions= {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer '+token
            })
        };

        const eventResponse = await fetch(`${API_LOC}api/events/${event_id}`);
        if(eventResponse.status === 200){
            const data = await eventResponse.json();
            data.start_date = new Date(data.start_date)
            data.end_date = new Date(data.end_date)

            const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
            data.duration = Math.round(Math.abs((data.start_date - data.end_date) / oneDay));

            console.log(data);
            setEvent(data)

            // get the number of users for the event
            const usersResponse = await fetch(`${API_LOC}api/events/${event_id}/users`);
            if(eventResponse.status === 200){
                const data = await usersResponse.json();
                console.log(data);
                setAttendee(data);

                // check if the current user is attending
                const attendanceResponse = await fetch(`${API_LOC}api/events/${event_id}/attend`, getRequestOptions);
                if(attendanceResponse.status === 200){
                    const data = await attendanceResponse.json();
                    console.log(data);
                    changeAtendEvent(true);
                                        
                }else if(attendanceResponse.status === 200){
                    const data = await attendanceResponse.json();
                    console.log(data);
                    changeAtendEvent(false);
                }

                
            }

        }else{
            const data = await eventResponse.json();
            console.log(data)
        }
        
    }

    async function attendEvent(event_id:number) {
        let token:string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImVtYWlsIjoiam9obnBhdWxAZHVyb2FkLmNvbSIsImlhdCI6MTYyOTM4NjkyMiwiZXhwIjoxNjI5MzkwNTIyfQ.-OiYomQuZMEN9sTfegminWfCtEtLwWuPUJX18q04MYw';

        const getRequestOptions= {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer '+token
            })
        };
        const postRequestOptions= {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer '+token
            })
        };

        const response = await fetch(`${API_LOC}api/events/${event_id}/attend`, postRequestOptions);
            if(response.status === 201){
                console.log("member added successfully");
                window.location.reload();

            }else{
                const data = await response.json();
                console.log(data);   
            }
    }

    async function leaveEvent(event_id:number) {
        let token:string = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjEsImVtYWlsIjoiam9obnBhdWxAZHVyb2FkLmNvbSIsImlhdCI6MTYyOTM4MTQwMCwiZXhwIjoxNjI5Mzg1MDAwfQ.GIW9IBb_j3H2UrqLLagyEQ0RcyGxxsE7lxtkSNehOT0';

        const getRequestOptions= {
            method: 'GET',
            headers: new Headers({
                'Authorization': 'Bearer '+token
            })
        };
        const postRequestOptions= {
            method: 'POST',
            headers: new Headers({
                'Authorization': 'Bearer '+token
            })
        };

        const response = await fetch(`${API_LOC}api/events/${event_id}/user`, postRequestOptions);
            if(response.status === 201){
                console.log("member added successfully");
                window.location.reload();

            }else{
                const data = await response.json();
                console.log(data);   
            }
    }

    useIonViewDidEnter(() => {
        setEventId(-1);
        if(!isNaN(Number(event_id))){
            console.log("its a number");
            setEventId(Number(event_id));
            getEvent(Number(event_id));
        }
  },[]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
            <IonTitle >Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <div className="main-content">
              <div id="eventholder">
                  <div id="img-head">
                    <img src={current_event?.image==undefined?testimage : API_LOC+current_event?.image} />
                  </div>
                  <div id="event-details">
                      <h1 className="e-name">{current_event?.title}</h1>
                      <div id="event-direction">
                          <p className="e-venue">Venue: {current_event?.venue}</p>
                          <p className="e-start">Start: {monthNames[current_event?.start_date.getMonth()!]} {current_event?.start_date.getDate()}, {current_event?.start_date.getFullYear()}</p>
                          <p className="e-end">End: {monthNames[current_event?.end_date.getMonth()!]} {current_event?.end_date.getDate()}, {current_event?.end_date.getFullYear()}</p>
                      </div>
                      <p className="e-description"> Description: {current_event?.description}</p>
                      <div id="attendees-holder">
                          <h3 className="e-attend-title">Attendees ({event_attendee?.length})</h3>
                          <div id="attendees-list">
                              {event_attendee?.map((attendee: attendee)=>{
                                  return <div className="attendee-item" key={attendee.id}><p>{attendee.first_name} {attendee.last_name}</p></div>
                              })}
                          </div>
                      </div>
                  </div>
              </div>
              <div id="event-bottom">
                  <h2 className="e-name">{current_event?.title}</h2>
                  <div className="e-direct">
                    <p className="e-start">{monthNames[current_event?.start_date.getMonth()!]} {current_event?.start_date.getDate()}, {current_event?.start_date.getFullYear()}</p>
                    <p className="e-duration">{current_event?.duration} days</p>
                  </div>
                  <div>
                    <IonButton color="primary" 
                        onClick={()=>{ attendEvent(cur_event_id!)}}
                    > {isAttendingEvent == true? "Leave Event": "Attend Event"}</IonButton>
                      {isEventAdmin == true &&
                        <IonButton color="primary"
                            onClick={()=>{ attendEvent(cur_event_id!)}}
                        >Publish Event</IonButton>
                      }
                      {isEventAdmin == true &&
                        <a href="" className="e-join-group">
                            <p>Join group to attend event</p>
                        </a>
                      }
                    
                    
                  </div>
              </div>
          </div> 
      </IonContent>
    </IonPage>
  );  
};

export default ViewEvent;
