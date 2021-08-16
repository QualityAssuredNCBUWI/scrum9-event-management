import { useIonViewWillEnter, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import Event from '../../components/Event';
import './ViewEvents.css';

interface i_event {
    id: number;
    title: string;
    description: string;
    start_date: string;
    attendance: number;
    image: string;
  }

const ViewEvents: React.FC = () => {

    const [events, setEvents] = useState([]);

    useIonViewWillEnter(() => {
        // call api
        console.log("ionWillEnterView event fired");
        getEvents();

        async function getEvents(){
            // import service call to get all events here
            const response = await fetch("http://127.0.0.1:8079/api/events");
            const data = await response.json();
            console.log(data);
            // store the data into our news state variable
            setEvents(data.result);
        }
    }, []);

    return (
    <IonPage id="page" className="page">
        <IonHeader>
            <IonToolbar>
            <IonTitle>Events</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent  className="contain" fullscreen>
            <IonGrid id="page" className="events">
                <IonRow>
                { events.map((event: i_event) => (
                <IonCol>
                    <Event event_id={event.id} event_name={event.title} event_description={event.description} event_date={event.start_date} event_attendance={event.attendance} event_img_url='assets/matty-adame-nLUb9GThIcg-unsplash.jpg'/>
                </IonCol>
                ))}
                </IonRow>
                </IonGrid>
            <div className="cover-lay"></div>
        </IonContent>
    </IonPage>        
    )
}

export default ViewEvents;