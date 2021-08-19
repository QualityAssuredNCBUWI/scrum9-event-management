import { useIonViewWillEnter, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonItem, IonSplitPane, IonButtons, IonButton, IonMenuButton, IonSearchbar, IonDatetime, IonIcon, IonInput, IonLabel } from '@ionic/react';
import { calendarClearOutline } from 'ionicons/icons';
import { useState } from 'react';
import Event from '../../components/Event';
import Menu from '../../components/Menu';
import { isloggedin } from '../../services/ApiServices';
import './CreateEvent.css';
import { API_LOC } from '../../services/ApiServices';

import { useHistory } from 'react-router';


interface i_event {
    id: number;
    title: string;
    description: string;
    start_date: string;
    attendance: number;
    image: string;
  }


const CreateEvents: React.FC = () => {
    const history = useHistory();

    const [auth, setAuth] = useState<boolean>(isloggedin());
    const [title, setEventTitle] = useState('');
    const [description, setDescription]= useState ('');
    const [venue, setVenue]= useState('');
    const [image, setImage]= useState('');
    const [website_url, setwebsite_url]= useState('');
    const [start_date, setStartDate] = useState('');
    const [end_date, setEndDate] = useState('');
    const [group_id, setGroupID] = useState('');

    

    async function handleSubmit(){
        console.log('button clicked');
        /*saveNewEvent (); */
        const form = new FormData();
        form.append('title', title);
        form.append('description', description);
        form.append('venue', venue);
        form.append('websiteurl', website_url);
        form.append('start_date', start_date);
        form.append('end_date', end_date);
        form.append('group_id', group_id);
        form.append('image', image);
            
    }
   

    useIonViewWillEnter(() => {
       
    }, []);

    return (
    <IonContent>
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
                <IonGrid id="page">
                    <div className="main-content">
                        <form action="/action_page.php">
                            <IonLabel> Title</IonLabel>
                            <IonInput type="text" onIonChange= {(e:any) => setEventTitle(e.target.value)}></IonInput>
                            <IonLabel> Venue</IonLabel>
                            <IonInput type="text" onIonChange= {(e:any) => setVenue(e.target.value)}></IonInput>
                            <IonLabel> Description</IonLabel>
                            <IonInput type="text" onIonChange= {(e:any) => setDescription(e.target.value)}></IonInput>
                            <IonLabel> Start Date</IonLabel>
                            <IonInput> </IonInput>
                            <IonLabel> End Date </IonLabel>
                            <IonInput> </IonInput>
                            <IonLabel> Website Url</IonLabel>
                            <IonInput> </IonInput>
                            <IonItem>
                            <IonButton color="success" onClick={()=>{handleSubmit()}} fill="outline">Submit</IonButton>
                            </IonItem>
                        </form>
                    </div>
                
                </IonGrid>
            </IonContent>
        </IonPage>  
    </IonSplitPane>
    </IonContent>      
    )
}

export default CreateEvents;