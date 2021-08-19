import {IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonCardSubtitle, IonButton, IonIcon, IonItem, IonLabel, IonHeader, IonList, IonModal, IonTitle, IonToolbar, IonCol, IonGrid, IonInput, IonRow, useIonToast } from '@ionic/react';
import { searchCircleOutline } from 'ionicons/icons';
import { useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { useHistory } from 'react-router-dom';
import { API_LOC } from '../services/ApiServices';

interface ContainerProps extends RouteComponentProps{group_id:string, show: boolean}

const AddMember: React.FC<ContainerProps> = ({ history, group_id, show}) => {

    // const history = useHistory();

    // const g_id = group_id.toString();
    const [email, setEmail] = useState('')
    const [show_Modal, setShow_Modal] = useState(show);
    const [present, dismiss] = useIonToast();


    const memberSubmit = (e:any) => {
        const memberBody = new FormData();
        memberBody.append('email', email);
        memberBody.append('group', group_id);

        addMember();


        async function addMember(){
            // import service call to get all events here
            const response = await fetch(`${API_LOC}api/groups/addMember`,{
                headers: {
                    'Authorization': "Bearer " + localStorage.getItem('token')
                    // 'Content-Type': 'application/json'
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                method: 'POST',
                body: memberBody
            });
            if(response.status === 201){
                const data = await response.json();
                console.log(data);
                present({
                    buttons: [{ text: 'hide', handler: () => dismiss() }],
                    message: 'New Member added!',
                    duration: 3000,
                    color: 'success'
                  })
                history.replace('/group/'+group_id, { flash: 'New Member added!' })
            } else if(response.status === 400 || response.status === 401){
                const data = await response.json();
                console.log(data);
                present({
                    buttons: [{ text: 'hide', handler: () => dismiss() }],
                    message: data.message,
                    duration: 3000,
                    color: 'danger'
                  })
            } else if(response.status === 409) {
                present({
                    buttons: [{ text: 'hide', handler: () => dismiss() }],
                    message: "User is already a member!",
                    duration: 3000,
                    color: 'danger'
                  })
            }
        }
    }

    return (
        <IonModal isOpen={show_Modal}>
            <IonHeader>
                <IonToolbar color="translucent">
                    <IonTitle>Add Member</IonTitle>
                    <IonButton onClick={() => setShow_Modal(false)} slot="end" color="danger">Close</IonButton>
                </IonToolbar>
            </IonHeader>
            <IonGrid>
                <IonRow>
                    <IonCol size="12">
                        <IonItem>
                            Enter the email of the user you would like to add.
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol size="12">
                        <IonItem>
                            <IonLabel position="floating">Email</IonLabel>
                            <IonInput   type="email" placeholder="Email" onIonChange= {(e:any) => setEmail(e.target.value)}/><IonIcon icon={ searchCircleOutline } ></IonIcon>
                        </IonItem>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonButton fill="outline" onClick={memberSubmit} color="success">SUBMIT </IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonModal>
    );
};

export default AddMember;
