import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Login.css'

const Login: React.FC = () => {
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
                            <form>
                                <IonInput className="input" type="text" placeholder="Username"></IonInput>
                                <IonInput className="input mt-2" type="password" placeholder="Password"></IonInput>
                                <div className="action-buttons">
                                    <IonButton fill="outline" color="danger">Cancel</IonButton>
                                    <IonButton fill="outline" type="submit" color="success">submit </IonButton>
                                </div>
                            </form>
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