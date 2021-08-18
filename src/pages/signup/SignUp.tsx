import { 
    IonButton, 
    IonCard, 
    IonCardTitle, 
    IonCol, 
    IonContent, 
    IonGrid, 
    IonHeader, 
    IonIcon, 
    IonInput, 
    IonItem, 
    IonLabel, 
    IonPage, 
    IonRow, 
    IonTitle, 
    IonToolbar 
} from '@ionic/react';
import './SignUp.css';
import { sign_up } from '../../services/ApiServices'
import { useState } from 'react';
import { eye , eyeOff} from 'ionicons/icons';

const SignUp: React.FC = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profile_photo, setProfilePhoto] = useState('')
    const [passVisible, setPassVisible] = useState(false)
    const SignUpSubmit = (e:any) => {
        const SignUpBody = {firstName: firstName, lastName: lastName , email: email, password: password, profile_photo: profile_photo}
        sign_up(SignUpBody)
    }

    function changeVisibility(){
        setPassVisible(!passVisible)
    }

    return (
    <IonPage id="page" className="page">
        <IonHeader>
            <IonToolbar>
            <IonTitle>SignUp</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent  className="contain" fullscreen>
            <IonGrid id="page">
                <IonRow className="row">
                    <IonCol className="form-col" size="12" size-md="4">
                        <IonCard className="ion-padding">
                            <IonCardTitle className="ion-padding"> Sign Up </IonCardTitle>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="12" size-md="6">
                                        <IonItem>
                                            <IonLabel position="floating">First Name</IonLabel>
                                            <IonInput type="text" onIonChange= {(e:any) => setFirstName(e.target.value)}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size="12" size-md="6">
                                        <IonItem>
                                                <IonLabel position="floating">Last Name</IonLabel>
                                                <IonInput type="text" onIonChange= {(e:any) => setLastName(e.target.value)}></IonInput>
                                        </IonItem>
                                    </IonCol>   
                                    <IonCol size="12">
                                        <IonItem>
                                                <IonLabel position="floating">Email</IonLabel>
                                                <IonInput type="email" onIonChange= {(e:any) => setEmail(e.target.value)}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size="12">
                                        <IonItem>
                                                <IonLabel position="floating">password</IonLabel>
                                                <IonInput type={passVisible? "text" : "password"} onIonChange= {(e:any) => setPassword(e.target.value)}></IonInput>
                                                <IonButton onClick={() => changeVisibility()} slot="end" fill="clear"><IonIcon icon={passVisible? eye : eyeOff } ></IonIcon></IonButton>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size="12">
                                        <IonItem>
                                            <IonLabel position="floating"> Profile Photo </IonLabel>
                                            <input type="file" onChange={(e:any) => setProfilePhoto(e.target.value)} className="ion-margin"/>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol size="12" size-md="5"> 
                                        <IonItem>
                                            <IonButton routerLink="/home" color="danger" fill="outline">Cancel</IonButton>
                                        </IonItem>
                                    </IonCol>
                                    <IonCol size="12"  size-md="5"> 
                                        <IonItem>
                                            <IonButton color="success" onClick={SignUpSubmit} fill="outline">Submit</IonButton>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCard>
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

export default SignUp