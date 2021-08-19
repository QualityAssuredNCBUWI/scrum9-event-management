import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonItem, IonSplitPane, IonButtons, IonMenuButton, useIonViewWillEnter, IonImg, IonCardHeader, IonCardSubtitle, IonCard, IonCardTitle, IonCardContent, IonButton, IonIcon, IonLabel } from '@ionic/react';
import { calendarNumberSharp } from 'ionicons/icons';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { isloggedin, API_LOC, API_LOC_SEC } from '../../services/ApiServices';
import Menu from '../../components/Menu';

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

    const handleDate = (value:any) => {
        let vals = value.split(' ');
        let result = '';
        for( let i=0; i < 4; i++){
            result += vals[i] + ' ';
        }
        return result;
    }

    useIonViewWillEnter(() => {
        // call api
        // console.log("ionWillEnterView event fired");
        let isMounted = true;
        if(isMounted){
            getUserProfile();
        }

        async function getUserProfile(){
            // import service call to get all events here
            const response = await fetch(API_LOC +"api/users/current", {
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
        <Menu auth={auth} />
        <IonPage id="page" className="page">
            <IonHeader>
                <IonToolbar>
                <IonTitle>My Profile</IonTitle>
                <IonButtons slot="start">
                  <IonMenuButton></IonMenuButton>
                </IonButtons>
                </IonToolbar>
            </IonHeader>
            { !auth ? <Redirect to={{
                    pathname: '/login',
                    state: { flash: 'Session expired.' }
                }} /> : 
                <IonContent  className="contain" fullscreen>
                    <IonGrid id="page">
                        { user ? 
                        <IonRow>
                            <IonCol>
                                <IonCard>
                                    <IonImg src={API_LOC+user.profile_photo}/>
                                    <IonCardHeader>
                                        <IonCardSubtitle>
                                            {user.email}
                                        </IonCardSubtitle>
                                        <IonCardTitle>
                                            {user.first_name + ' ' + user.last_name}
                                        </IonCardTitle>
                                    </IonCardHeader>
                                    <IonCardContent>
                                    <IonItem>
                                        <IonIcon icon={ calendarNumberSharp } slot='start' />
                                        <IonLabel>Joined: {handleDate(user.created_at)}</IonLabel>
                                    </IonItem>
                                    <div className="ion-text-left">
                                        <IonButton className="ion-margin-end" color="light">Update Profile</IonButton>
                                    </div>
                                    </IonCardContent>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                        : 
                            <Redirect to='/login'/>
                        }
                    </IonGrid>
                <div className="cover-lay"></div>
            </IonContent>}
        </IonPage>  
    </IonSplitPane>
    </IonContent>      
    )
}

export default ViewProfile;