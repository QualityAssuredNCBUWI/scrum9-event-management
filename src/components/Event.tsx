import {IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonCardSubtitle, IonButton, IonImg, IonIcon, IonItem, IonLabel} from '@ionic/react';
import { pin, accessibilityOutline} from 'ionicons/icons';
import { API_LOC } from '../services/ApiServices';
import './Event.css';

interface ContainerProps {event_id:number,event_name:string, event_description:string, event_date:string, event_attendance: number, event_img_url:string}

const Event: React.FC<ContainerProps> = ({event_id, event_name, event_description, event_date, event_attendance, event_img_url}) => {

  return (
			<IonCard id={'event-'+event_id}>
                <IonImg src={API_LOC+event_img_url}/>
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
						<IonButton className="ion-margin-end" color="light">View Event</IonButton>
					</div>
				</IonCardContent>
			</IonCard>
  );
};

export default Event;
