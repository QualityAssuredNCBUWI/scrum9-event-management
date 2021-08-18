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
} from '@ionic/react';
import {arrowBackOutline, arrowForwardOutline} from 'ionicons/icons'
import { useRef, useState } from 'react';
import Menu from '../components/Menu';
import { isloggedin } from '../services/ApiServices';
import './Home.css';


const Home: React.FC = () => {

  const [auth] = useState<boolean>(isloggedin());

  const onNextSlide = () => {
    const htmlslides = document.querySelector('ion-slides');
    if (htmlslides) htmlslides.slideNext();
  };

  const onPrevSlide = () => {
    const htmlslides = document.querySelector('ion-slides');
    if (htmlslides) htmlslides.slidePrev();
  };
  

  
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
              <IonButton fill="outline" routerLink="/signup" color="light" size="large">Sign Up</IonButton>              
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
                    <IonSlide className="ion-padding" >
                      hi
                    </IonSlide>
                    <IonSlide className="ion-padding">
                      bye
                    </IonSlide>
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
