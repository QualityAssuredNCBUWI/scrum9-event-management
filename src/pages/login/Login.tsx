import { IonButton, IonCard, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Login.css';
import { API_LOC, isloggedin } from '../../services/ApiServices'
import { useState } from 'react';
import { Redirect } from 'react-router';

const Login: React.FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useState<boolean>(isloggedin());

    const loginSubmit = (e:any) => {
        const loginBody = {email: email, password: password}
        login();

        async function login(){
            // import service call to get all events here
            const response = await fetch(`${API_LOC}/api/auth/login`,{
                headers: {
                    'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                method: 'POST',
                body: JSON.stringify(loginBody)
            });
            if(response.status === 200){
                const data = await response.json();
                console.log(data);
                // store the token into localstorage
                localStorage.setItem('token', data.token);
                setAuth(true)
            } else if(response.status === 400 || response.status === 404 || response.status === 500){
                const data = await response.json();
                console.log(data);
                // remove the token from localstorage
                localStorage.removeItem('token');
                setAuth(false)
            }
        }
    }

    return (
    <IonPage id="page" className="page">
        <IonHeader>
            <IonToolbar>
            <IonTitle>Login</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent  className="contain" fullscreen>
            { auth ? <Redirect to={{
                    pathname: '/home',
                    state: { flash: 'Login Successful!' }
                }} /> : 
                <IonGrid id="page">
                <IonRow className="row">
                    <IonCol className="form-col" size="12" size-md="4">
                        <IonCard>
                            <IonCardTitle>LOGIN</IonCardTitle>
                            <IonGrid>
                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="floating">Email</IonLabel>
                                            <IonInput   type="email" placeholder="Email" onIonChange= {(e:any) => setEmail(e.target.value)}/>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol>
                                        <IonItem>
                                                <IonLabel position="floating">Password</IonLabel>
                                                <IonInput   type="password" placeholder="Password" onIonChange= {(e:any) => setPassword(e.target.value)}/>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonButton fill="outline" routerLink="/home" color="danger">Cancel</IonButton>
                                    </IonCol>
                                    <IonCol>
                                        <IonButton fill="outline" onClick={loginSubmit} color="success">submit </IonButton>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCard>
                    </IonCol>
                    <IonCol id="right-col" className="right-col" size="12" size-md="8">
                    </IonCol>                   
                </IonRow>
            </IonGrid>
            }
            
            <div className="cover-lay"></div>
        </IonContent>
    </IonPage>        
    )
}

export default Login