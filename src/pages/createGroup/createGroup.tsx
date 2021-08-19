import { IonButton, IonButtons, IonCard, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonItem, IonLabel, IonMenuButton, IonPage, IonRow, IonSplitPane, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './createGroup.css';
import { createGroup } from '../../services/ApiServices'
import { useState } from 'react';
import { API_LOC, isloggedin } from '../../services/ApiServices';
import Menu from '../../components/Menu';

const CreateGroup: React.FC = () => {

    const [groupName, setGroupName] = useState('')
    const [groupDescription, setGroupDesc] = useState('')
    const [auth, setAuth] = useState<boolean>(isloggedin());

    const groupSubmit = (e:any) => {
        const createGroupBody = {groupName: groupName, groupDescription: groupDescription}
        createGroup(createGroupBody)
    }

    return (
    <IonContent>
        <IonSplitPane contentId="page">
            <Menu auth={auth} />
            <IonPage id="page" className="page">
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Create Your Group</IonTitle>
                        <IonButtons slot="start">
                            <IonMenuButton></IonMenuButton>
                        </IonButtons>
                    </IonToolbar>  
                </IonHeader>
                <IonContent  className="contain" fullscreen>
                    <IonGrid id="page">
                        <IonRow className="row ion-padding ion-margin">
                            <IonCol className="form-col" size="12">
                                <IonCard className="ion-padding">
                                    <IonCardTitle className="ion-padding">CREATE YOUR GROUP</IonCardTitle>
                                    <IonGrid>
                                        <IonRow>
                                            <IonCol size="12">
                                                <IonItem>
                                                    <IonLabel position="floating">Name</IonLabel>
                                                    <IonInput   type="email" placeholder="Name" onIonChange={(e:any) => setGroupName(e.target.value)}/>
                                                </IonItem>
                                            </IonCol>
                                            <IonCol size="12">
                                                <IonItem>
                                                        <IonLabel position="floating">Description</IonLabel>
                                                        <IonTextarea autoGrow={true} onIonChange= {(e:any) => setGroupDesc(e.target.value)}></IonTextarea>
                                                </IonItem>
                                            </IonCol>
                                        </IonRow>
                                        <IonRow>
                                            <IonCol size="12" size-md="6">
                                                <IonButton fill="outline" routerLink="/home" color="danger">Cancel</IonButton>
                                            </IonCol>
                                            <IonCol size="12" size-md="6">
                                                <IonButton fill="outline" onClick={groupSubmit} color="success">submit </IonButton>
                                            </IonCol>
                                        </IonRow>
                                    </IonGrid>
                                </IonCard>
                                {/* <div className="form-container">
                                    <h2>CREATE YOUR GROUP</h2>
                                    <IonLabel position='floating'>Group Name</IonLabel>
                                    <IonInput 
                                        className="input" 
                                        type="text" 
                                        placeholder="Festive Band" 
                                        onIonChange= {(e:any) => setGroupName(e.target.value)}
                                    />
                                    <IonLabel position='floating'>Description</IonLabel>
                                    <IonTextarea
                                        className="input mt-2" 
                                        placeholder="A brief description of your group" 
                                        onIonChange= {(e:any) => setGroupDesc(e.target.value)}
                                    />
                                    <div className="action-buttons">
                                        <IonButton fill="outline" routerLink="/home" color="danger">Cancel</IonButton>
                                        <IonButton fill="outline" onClick={groupSubmit} color="success">Submit </IonButton>
                                    </div>
                                </div> */}
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                    <div className="cover-lay"></div>
                </IonContent>
            </IonPage>
        </IonSplitPane>
    </IonContent>
        
    )
}

export default CreateGroup