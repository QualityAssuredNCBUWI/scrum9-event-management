import { useIonViewWillEnter, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonItem, IonSplitPane, IonButtons, IonButton, IonMenuButton, IonSearchbar, IonDatetime, IonIcon } from '@ionic/react';
import { calendarClearOutline } from 'ionicons/icons';
import { useState } from 'react';
import Event from '../../components/Event';
import Menu from '../../components/Menu';
import { isloggedin } from '../../services/ApiServices';
import './ViewEvents.css';
import { API_LOC } from '../../services/ApiServices';

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
    const [start_date, setStartDate] = useState<string>();
    const [end_date, setEndDate] = useState<string>();
    const [auth, setAuth] = useState<boolean>(isloggedin());
    
    const handleSearch = (event:any) =>{
        let value = event.target.value.toLowerCase();
        // console.log(value);
        let result = [];
        result = events.filter((data:any) => {
            return data.title.toLowerCase().indexOf(value) > -1 || data.description.toLowerCase().indexOf(value) > -1;
            // return JSON.stringify(data).toLowerCase().indexOf(value) > -1;
        });
        setFilteredEvents(result);
    }

    const handleSubmit = (event:any) => {
        console.log('button clicked');
        getEventsbyDate();

        async function getEventsbyDate(){
            // import service call to get all events here
            const response = await fetch(`${API_LOC}api/events?start_date=${start_date}&end_date=${end_date}`);
            if(response.status === 200){
                const data = await response.json();
                console.log(data);
                // store the data into our news state variable
                setEvents(data.result);
                setFilteredEvents(data.result);
            } else if(response.status === 404){
                setEvents([]);
                setFilteredEvents([]);
            }
            
        }
    }

    const handleEndDate = (event:any) => {
        let value = event.target.value.split('T')[0];
        console.log(value);
        setEndDate(value);
    }

    const handleStartDate = (event:any) => {
        let value = event.target.value.split('T')[0];
        setStartDate(value);
        console.log(value);
    }

    useIonViewWillEnter(() => {
        // call api
        // console.log("ionWillEnterView event fired");
        setAuth(isloggedin());
        getEvents();

        async function getEvents(){
            // import service call to get all events here
            const response = await fetch(API_LOC + "api/events");
            const data = await response.json();
            console.log(data);
            // store the data into our news state variable
            setEvents(data.result);
            setFilteredEvents(data.result);
        }
    }, []);

    return (
    <IonContent >
        <IonSplitPane contentId="page">
        <Menu auth={auth} />
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
                <IonGrid className="event-Grid" id="page">
                    <IonSearchbar placeholder="Search Events by Title" onIonChange={(e) =>handleSearch(e)}></IonSearchbar>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonButton color="light">
                                    <IonIcon icon={ calendarClearOutline } slot='start' />
                                    <IonDatetime displayFormat="DDDD MMM D, YYYY" placeholder="Select Start Date" onIonChange={(e) =>handleStartDate(e)} ></IonDatetime>
                                </IonButton>
                            </IonCol>
                            
                            <IonCol>
                                <IonButton color="light">
                                <IonIcon icon={ calendarClearOutline } slot='start' />
                                    <IonDatetime displayFormat="DDDD MMM D, YYYY" placeholder="Select End Date" onIonChange={(e) =>handleEndDate(e)} ></IonDatetime>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol className="ion-text-start">
                                <IonButton onClick={ (e) => handleSubmit(e) } color="primary">Filter</IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <IonRow>
                        { filteredEvents.length ? filteredEvents.map((event: i_event) => (
                        <IonCol>
                            <Event event_id={event.id} event_name={event.title} event_description={event.description} event_date={event.start_date} event_attendance={event.attendance} event_img_url='assets/matty-adame-nLUb9GThIcg-unsplash.jpg'/>
                        </IonCol>
                        )) : <IonItem>No events found</IonItem>}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>  
    </IonSplitPane>
    </IonContent>      
    )
}

export default ViewEvents;