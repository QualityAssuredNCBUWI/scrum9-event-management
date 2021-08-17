import { useIonViewWillEnter, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonItem, IonList, IonMenu, IonSplitPane, IonButtons, IonButton, IonMenuButton, IonSearchbar, IonDatetime, IonIcon } from '@ionic/react';
import { calendarClearOutline } from 'ionicons/icons';
import { useState, useEffect } from 'react';
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
    const [filteredEvents,setFilteredEvents] = useState(events);

    const handleSearch = (event:any) =>{
        let value = event.target.value.toLowerCase();
        // console.log(value);
        let result = [];
        result = events.filter((data:any) => {
            // return data.title.search(value) != -1;
            return JSON.stringify(data).toLowerCase().indexOf(value) > -1;
        });
        setFilteredEvents(result);
    }

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
            setFilteredEvents(data.result);
        }
    }, []);

    return (
    <IonContent>
        <IonSplitPane contentId="page">
        {/*--  the side menu  --*/}
        <IonMenu contentId="page">
            <IonHeader>
            <IonToolbar>
                <IonTitle>Menu</IonTitle>
            </IonToolbar>
            </IonHeader>
            <IonContent>
            <IonList>
                <IonItem routerLink="/home">Home</IonItem>
                <IonItem routerLink="/login">Login</IonItem>
                <IonItem routerLink="/events">Events</IonItem>
            </IonList>
            </IonContent>
        </IonMenu>
        <IonPage id="page" className="page">
            <IonHeader>
                <IonToolbar>
                <IonTitle>Events</IonTitle>
                <IonButtons slot="start">
                  <IonMenuButton></IonMenuButton>
                </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent  className="contain" fullscreen>
                <IonGrid id="page">
                <IonSearchbar placeholder="Search Events by Title" onIonChange={(e) =>handleSearch(e)}></IonSearchbar>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonButton color="light">
                                <IonIcon icon={ calendarClearOutline } slot='start' />
                                <IonDatetime displayFormat="DDDD MMM D, YYYY" placeholder="Select Start Date" ></IonDatetime>
                            </IonButton>
                        </IonCol>
                        <IonCol>
                            <IonButton color="light">
                            <IonIcon icon={ calendarClearOutline } slot='start' />
                                <IonDatetime displayFormat="DDDD MMM D, YYYY" placeholder="Select End Date" ></IonDatetime>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                    <IonRow>
                    { filteredEvents.map((event: i_event) => (
                    <IonCol>
                        <Event event_id={event.id} event_name={event.title} event_description={event.description} event_date={event.start_date} event_attendance={event.attendance} event_img_url='assets/matty-adame-nLUb9GThIcg-unsplash.jpg'/>
                    </IonCol>
                    ))}
                    </IonRow>
                    </IonGrid>
                <div className="cover-lay"></div>
            </IonContent>
        </IonPage>  
    </IonSplitPane>
    </IonContent>      
    )
}

export default ViewEvents;