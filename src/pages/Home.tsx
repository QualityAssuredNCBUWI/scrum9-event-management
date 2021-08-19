import { 
  IonButton,
  IonCol,
  IonContent, 
  IonGrid, 
  IonHeader, 
  IonPage, 
  IonRow, 
  IonSlide, 
  IonSlides, 
  IonTitle, 
  IonToolbar,
  IonIcon,
  IonSplitPane,
  IonButtons,
  IonMenuButton,
  useIonViewWillEnter,
  IonItem,
} from '@ionic/react';
import {arrowBackOutline, arrowForwardOutline} from 'ionicons/icons'
import { useRef, useState } from 'react';
import Menu from '../components/Menu';
import Event from '../components/Event';
import { API_LOC, isloggedin } from '../services/ApiServices';
import './Home.css';

interface i_event {
  id: number;
  title: string;
  description: string;
  start_date: string;
  attendance: number;
  image: string;
}

const Home: React.FC = () => {

  const [auth, setAuth] = useState<boolean>(isloggedin());
  const [name, setName] = useState<string>();
  const [upComing, setUpComing] = useState([]);

  const test = ['hi','by']
  const onNextSlide = () => {
    const htmlslides = document.querySelector('ion-slides');
    if (htmlslides) htmlslides.slideNext();
  };

  const onPrevSlide = () => {
    const htmlslides = document.querySelector('ion-slides');
    if (htmlslides) htmlslides.slidePrev();
  };
  

 
  
  useIonViewWillEnter(() => {
    // call api
        // console.log("ionWillEnterView event fired");
        getName();

        async function getName(){
            // import service call to get all events here
            const response = await fetch(API_LOC + "api/users/current", {
              headers: {
                  'Accept': 'application/json',
                  'Authorization': "Bearer " + localStorage.getItem('token')
              }
          });
          if(response.status === 200){
            const data = await response.json();
            console.log(data);
            setName(data.user.first_name + ' ' + data.user.last_name);
          } else if(response.status === 404 || response.status === 401){
              localStorage.removeItem('token');
              setAuth(false);
          } else if(response.status === 406){
              localStorage.removeItem('token');
              setAuth(false);
          }
        }

        getEvents();

        async function getEvents(){
            // import service call to get all events here
            const response = await fetch(API_LOC + "api/events");
            const data = await response.json();
            console.log(data);
            // store the data into our news state variable
            setUpComing(data.result);
        }
  }, []);

  return (
    <IonContent>
      <IonSplitPane contentId="page">
        {/*--  the side menu  --*/}
        <Menu auth={auth} />
        <IonPage id="page" className="page">
          <IonHeader>
              <IonToolbar>
                <IonTitle>Home</IonTitle>
                <IonButtons slot="start">
                  <IonMenuButton></IonMenuButton>
                </IonButtons>
              </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <div className="top-segment">
              <div className="content">
                <h3>DU ROAD</h3>
                <h4>Event management system</h4>
                <h5>Mek Wi Du Road Nuh</h5>
                {auth ? 
                  <h4>Where To, {name}? </h4>
                : <IonButton fill="outline" routerLink="/signup" color="light" size="large">Sign Up</IonButton>}            
              </div>
            </div>
          <div className="mid-segment">
            <IonGrid>
              <IonRow>
                <IonCol size="4" className="ion-hide-lg-down">
                  <IonButton fill="outline" color="dark" onClick={() => {onPrevSlide(); console.log('next')}} size="large"><IonIcon icon={arrowBackOutline}></IonIcon></IonButton>
                </IonCol>
                <IonCol className="" size="12" size-md="4">
                  <h2>Up Coming Events</h2>
                </IonCol>
                <IonCol size="4" className="ion-hide-lg-down">
                  <IonButton fill="outline" color="dark" size="large"  onClick={() => {onNextSlide(); console.log('next')} }><IonIcon icon={arrowForwardOutline}></IonIcon></IonButton>
                </IonCol>
                <IonCol size="12">
                  <IonSlides pager={true} className="ion-padding">
                    { upComing.length? upComing.map((event: i_event) => (
                      <IonSlide>
                        <Event event_id={event.id} event_name={event.title} event_description={event.description} event_date={event.start_date} event_attendance={event.attendance} event_img_url='assets/matty-adame-nLUb9GThIcg-unsplash.jpg'/>
                      </IonSlide>
                    )) : <IonSlide>No Content</IonSlide>}

                    {/* <IonSlide className="ion-padding" >
                      hi
                    </IonSlide>
                    <IonSlide className="ion-padding">
                      bye
                    </IonSlide> */}
                  </IonSlides>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
          <div className="bottom-segment">
          </div>
          </IonContent>
        </IonPage>
      </IonSplitPane>
    </IonContent>  
  );
};

export default Home;
