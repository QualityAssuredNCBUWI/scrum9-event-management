import { IonItem, IonContent, IonHeader, IonList, IonMenu, IonTitle, IonToolbar} from '@ionic/react';
// import { pin, accessibilityOutline} from 'ionicons/icons';

interface ContainerProps {auth:boolean}

const Menu: React.FC<ContainerProps> = ({auth}) => {
  return (
    <IonMenu contentId="page">
        <IonHeader>
        <IonToolbar>
            <IonTitle>Menu</IonTitle>
        </IonToolbar>
        </IonHeader>
        <IonContent>
        { !auth ? 
            <IonList>
              <IonItem routerLink="/home">Home</IonItem>
              <IonItem routerLink="/login">Login</IonItem>
              <IonItem routerLink="/events">Events</IonItem>
            </IonList>
         : 
            <IonList>
              <IonItem routerLink="/home">Home</IonItem>
              {/* <IonItem routerLink="/login">Logout</IonItem> */}
              <IonItem routerLink="/events">Events</IonItem>
              <IonItem routerLink="/profile">Profile</IonItem>
              <IonItem routerLink="/groups">My Groups</IonItem>
              <IonItem routerLink="/createGroup">Create Groups</IonItem>
              <IonItem color='danger' routerLink="/logout">Logout</IonItem>
            </IonList>
         }
        </IonContent>
    </IonMenu>
  );
};

export default Menu;
