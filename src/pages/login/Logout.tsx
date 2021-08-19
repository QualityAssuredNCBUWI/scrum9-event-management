import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { API_LOC, isloggedin } from '../../services/ApiServices'
import { useState } from 'react';
import { Redirect } from 'react-router';
import { eye , eyeOff} from 'ionicons/icons'


const Logout: React.FC = () => {

    const [auth, setAuth] = useState<boolean>(isloggedin());
    
    useIonViewWillEnter(() => {
        logout();


        async function logout(){
            // import service call to get all events here
            const response = await fetch(`${API_LOC}/api/auth/logout`,{
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('token')
                  },
                method: 'POST'
            });
            if(response.status === 200){
                const data = await response.json();
                console.log(data);
                // store the token into localstorage
                localStorage.removeItem('token');
                setAuth(false)
            } else if(response.status === 401){
                // remove the token from localstorage
                localStorage.removeItem('token');
                setAuth(false)
            }
        }
    })

    return (

    <IonPage id="page" className="page">
        <IonHeader>
            <IonToolbar>
            <IonTitle>Logout</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent  className="contain" fullscreen>
            { auth ? <Redirect to={{
                    pathname: '/home',
                    state: { flash: 'Logout Successful!' }
                }} /> : 
                <Redirect to={{
                    pathname: '/home',
                    state: { flash: 'This should happen...' }
                }} />
            }
            <div className="cover-lay"></div>
        </IonContent>
    </IonPage>       
    )
}

export default Logout;