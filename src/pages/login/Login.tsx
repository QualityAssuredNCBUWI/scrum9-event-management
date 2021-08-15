import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Login.css';
import { login_user } from '../../services/ApiServices'
import { useState } from 'react';

const Login: React.FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const loginSubmit = (e:any) => {
        const loginBody = {email: email, password: password}
        login_user(loginBody)
    }

    return (
    <IonPage id="page" className="page">
        <IonHeader>
            <IonToolbar>
            <IonTitle>Login</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent  className="contain" fullscreen>
            <IonGrid id="page">
                <IonRow className="row">
                    <IonCol className="form-col" size="12" size-md="4">
                        <div className="form-container">
                            <h2>LOGIN</h2>
                            <IonInput 
                                className="input" 
                                type="email" 
                                placeholder="Email" 
                                onIonChange= {(e:any) => setEmail(e.target.value)}
                            />
                            <IonInput 
                                className="input mt-2" 
                                type="password" 
                                placeholder="Password" 
                                onIonChange= {(e:any) => setPassword(e.target.value)}
                            />
                            <div className="action-buttons">
                                <IonButton fill="outline" routerLink="/home" color="danger">Cancel</IonButton>
                                <IonButton fill="outline" onClick={loginSubmit} color="success">submit </IonButton>
                            </div>
                        </div>
                    </IonCol>
                    <IonCol id="right-col" className="right-col" size="12" size-md="8">
                    </IonCol>                   
                </IonRow>
            </IonGrid>
            <div className="cover-lay"></div>
        </IonContent>
    </IonPage>        
    )
}

export default Login