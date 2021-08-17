import { useIonViewDidEnter, useIonViewWillLeave ,IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonItem, IonList, IonMenu, IonSplitPane, IonButtons, IonMenuButton, useIonViewWillEnter } from '@ionic/react';
// import { calendarClearOutline } from 'ionicons/icons';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { isloggedin } from '../../services/ApiServices';

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
    const [user, setUser] = useState(def);
    const [auth, setAuth] = useState<boolean>(isloggedin());

    useIonViewWillEnter(() => {
        // call api
        // console.log("ionWillEnterView event fired");
        let isMounted = true;
        if(isMounted){
            getUserProfile();
        }

        async function getUserProfile(){
            // import service call to get all events here
            const response = await fetch("http://127.0.0.1:8079/api/users/current", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            });
            if(response.status === 200){
                const data = await response.json();
                console.log(data);
                if(isMounted) setUser(data.user);
            } else if(response.status === 404 || response.status === 401){
                localStorage.removeItem('token');
                if(isMounted) setAuth(false);
            } else if(response.status === 406){
                localStorage.removeItem('token');
                if(isMounted) setAuth(false);
            }
        }

        return () => isMounted = false;
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
            {/* { !auth ? <Redirect to={{
                    pathname: '/login',
                    state: { flash: 'Session expired.' }
                }} /> :  */}
                <IonContent  className="contain" fullscreen>
                    <IonGrid id="page">
                        { user ? 
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    {user.first_name}
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        : 
                            <Redirect to='/login'/>
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