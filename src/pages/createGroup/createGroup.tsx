import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonInput, IonLabel, IonPage, IonRow, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './createGroup.css';
import { createGroup } from '../../services/ApiServices'
import { useState } from 'react';

const CreateGroup: React.FC = () => {

    const [groupName, setGroupName] = useState('')
    const [groupDescription, setGroupDesc] = useState('')

    const groupSubmit = (e:any) => {
        const createGroupBody = {groupName: groupName, groupDescription: groupDescription}
        createGroup(createGroupBody)
    }

    return (
    <IonPage id="page" className="page">
        <IonHeader>
            <IonToolbar>
            <IonTitle>Create Your Group</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent  className="contain" fullscreen>
            <IonGrid id="page">
                <IonRow className="row">
                    <IonCol className="form-col" size="12" size-md="4">
                        <div className="form-container">
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

export default CreateGroup