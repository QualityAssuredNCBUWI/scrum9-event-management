import {IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonCardSubtitle, IonButton, IonImg, IonIcon, IonItem, IonLabel} from '@ionic/react';
import { pin, accessibilityOutline} from 'ionicons/icons';
import './Event.css';

import { useHistory } from 'react-router';


interface ContainerProps {event_id:number,event_name:string, event_description:string, event_date:string, event_attendance: number, event_img_url:string}

const Event: React.FC<ContainerProps> = ({event_id, event_name, event_description, event_date, event_attendance, event_img_url}) => {
    const history = useHistory();


  return (
			<IonCard id={'event-'+event_id}>
                <IonImg src={event_img_url}/>
                <IonCardHeader>
						<IonCardTitle className="success">{event_name}</IonCardTitle>
                        <IonCardSubtitle>{event_description}</IonCardSubtitle>
					</IonCardHeader>
				<IonCardContent>
                    <IonItem>
                        <IonIcon icon={pin} slot="start" />
                        <IonLabel>{event_date}</IonLabel>
                    </IonItem>
                    <IonItem>
                        <IonIcon icon={ accessibilityOutline } slot='start' />
                        <IonLabel>Attendees: {event_attendance}</IonLabel>
                    </IonItem>
					<div className="ion-text-left">
						<IonButton className="ion-margin-end" color="light" onClick={() => history.push('/event/'+event_id)} >View Event</IonButton>
					</div>
				</IonCardContent>
			</IonCard>
  );
};

export default Event;
function useIonViewDidEnter(arg0: () => void, arg1: never[]) {
    throw new Error('Function not implemented.');
}

function initalSetup(arg0: number) {
    throw new Error('Function not implemented.');
}

