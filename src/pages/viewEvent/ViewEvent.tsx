import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter} from '@ionic/react';
import { RequestOptions } from 'https';
import React, { useState } from 'react'; 
import { useHistory, RouteComponentProps } from 'react-router';
import { useParams } from 'react-router-dom';

import testimage from '../../images/testevent.jpg';
import { API_LOC, checkUserAttendEvent, getEvent, getEventAttendee, getEventGroup, getLoginUserId, setUserAtendEvent, setUserLeaveEvent, updateEventStatus } from '../../services/ApiServices';
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

interface group{
    id: string;
    admin: string;
    name: string;
}

type EventParams = {
    event_id: string
}


const ViewEvent: React.FC<RouteComponentProps> = (props) => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [cur_event_id, setEventId] = useState<number>();
    const [current_event, setEvent] = useState<event>();
    const [event_attendee, setAttendee] = useState<attendee[]>();
    const [isAttendingEvent, changeAttendEvent] = useState<Boolean>();
    const [isEventAdmin, setEventAdmin] = useState<Boolean>();
    const [eventGroup, setEventGroup] = useState<group>();

    const history = useHistory();

    let {event_id} = useParams<EventParams>();

    async function changeEventAttendance(){
        if(isAttendingEvent == true){
            await setUserLeaveEvent(cur_event_id!);
        }else{
            await setUserAtendEvent(cur_event_id!);
        }
        window.location.reload();
    }

    async function changeEventStatus(){
        if(current_event?.status =="pending"){
            await updateEventStatus(cur_event_id!, "published");
        }else{
            await updateEventStatus(cur_event_id!, "pending");
        }
        window.location.reload();
    }

    async function initalSetup(event_id: number){
        setEvent(await getEvent(event_id));
        setAttendee(await getEventAttendee(event_id))
        changeAttendEvent(await checkUserAttendEvent(event_id));
        let group = await getEventGroup(event_id)
        setEventGroup( group)

        let current_user = await getLoginUserId() 

        if(current_user == group.admin){
            setEventAdmin(true);
        }else{
            setEventAdmin(false);
        }
    }

    useIonViewDidEnter(() => {
        setEventId(-1);
        if(!isNaN(Number(event_id))){
            setEventId(Number(event_id));
            initalSetup(Number(event_id));
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
                    <IonButton color="primary" 
                        onClick={()=>{ changeEventAttendance()}}
                    > {isAttendingEvent == true? "Leave Event": "Attend Event"}</IonButton>
                    {isEventAdmin == true &&
                    <IonButton color="primary"
                        onClick={()=>{ changeEventStatus()}}
                    >{current_event?.status == "pending"? "Publish Event" : "Unpublish Event"}</IonButton>
                    }
                    <a onClick={() => history.push('/group/'+eventGroup?.id)} className="e-join-group">
                        <p>View event group</p>
                    </a>
              </div>
          </div> 
      </IonContent>
    </IonPage>
  );  
};

export default ViewEvent;
