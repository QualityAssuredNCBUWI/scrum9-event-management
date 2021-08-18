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
} from '@ionic/react';
import {arrowBackOutline, arrowForwardOutline} from 'ionicons/icons'
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="toolbar">
          <IonTitle>Blank</IonTitle>
          sdf
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
                  <IonButton fill="outline" color="dark" size="large"><IonIcon icon={arrowBackOutline}></IonIcon></IonButton>
                </IonCol>
                <IonCol className="" size="4">
                  <h2>Up Coming Events</h2>
                </IonCol>
                <IonCol size="4" className="ion-hide-lg-down">
                  <IonButton fill="outline" color="dark" size="large"><IonIcon icon={arrowForwardOutline}></IonIcon></IonButton>
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
  );
};

export default Home;
