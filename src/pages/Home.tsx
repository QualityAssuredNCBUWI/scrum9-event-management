import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonSplitPane, IonTitle, IonToolbar } from '@ionic/react';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import Menu from '../components/Menu';
import { isloggedin } from '../services/ApiServices';
import './Home.css';

const Home: React.FC = () => {

  const [auth, setAuth] = useState<boolean>(isloggedin());
  
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
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
      </IonContent>
    </IonPage>
    </IonSplitPane>
    </IonContent>  
  );
};

export default Home;
