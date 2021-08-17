import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Login.css';
// import { login_user } from '../../services/ApiServices'
import { useState } from 'react';
import { Redirect } from 'react-router';

const Login: React.FC = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth, setAuth] = useState<boolean>();

    const loginSubmit = (e:any) => {
        const loginBody = {email: email, password: password}
        login();

        async function login(){
            // import service call to get all events here
            const response = await fetch(`http://127.0.0.1:8079/api/auth/login`,{
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
                // store the token into localstorage
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
            {auth ? <Redirect to={{
                    pathname: '/home',
                    state: { flash: 'Login Successful!' }
                }} /> : <Redirect to={{
                    pathname: '/login',
                    state: { flash: 'Username or password is incorrect...' }
                }} />}
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