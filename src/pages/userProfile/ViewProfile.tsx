import { useIonViewWillEnter, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonItem, IonList, IonMenu, IonSplitPane, IonButtons, IonButton, IonMenuButton, IonSearchbar, IonDatetime, IonIcon } from '@ionic/react';
import { calendarClearOutline } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { Redirect } from 'react-router';
// import Event from '../../components/Event';

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    profile_photo: number;
    created_at: string;
  }


const ViewProfile: React.FC = () => {

    const def = {
        id: -1,
        first_name: '',
        last_name: '',
        email: '',
        profile_photo: -1,
        created_at: ''
      }
    const [user, setUser] = useState<User>(def);
    const [auth, setAuth] = useState<boolean>();

    useIonViewWillEnter(() => {
        // call api
        // console.log("ionWillEnterView event fired");
        getUserProfile();

        async function getUserProfile(){
            // import service call to get all events here
            const response = await fetch("http://127.0.0.1:8079/api/user/current", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            });
            if(response.status == 200){
                const data = await response.json();
                console.log(data);
                setUser(data.user);
                
            } else if(response.status == 404){
                setAuth(false);
            } else if(response.status == 406){
                setAuth(false);
            }
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
                <IonItem routerLink="/profile">Profile</IonItem>
            </IonList>
            </IonContent>
        </IonMenu>
        <IonPage id="page" className="page">
            <IonHeader>
                <IonToolbar>
                <IonTitle>My Profile</IonTitle>
                <IonButtons slot="start">
                  <IonMenuButton></IonMenuButton>
                </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent  className="contain" fullscreen>
                <IonGrid id="page">
                    { user === def ? 
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    {user.first_name}
                                </IonItem>
                            </IonCol>
                        </IonRow>
                    : <Redirect to='/login'/>
                    }
                </IonGrid>
                <div className="cover-lay"></div>
            </IonContent>
        </IonPage>  
    </IonSplitPane>
    </IonContent>      
    )
}

export default ViewProfile;