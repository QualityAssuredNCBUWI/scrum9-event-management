import {IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonCardSubtitle, IonButton, IonIcon, IonItem, IonLabel} from '@ionic/react';
import {lockClosedOutline} from 'ionicons/icons';

interface ContainerProps {group_id:number,group_name:string, group_admin:string}

const Group: React.FC<ContainerProps> = ({group_id, group_name, group_admin}) => {
  return (
			<IonCard id={'group-'+group_id}>
                <IonCardHeader>
						<IonCardTitle className="success">{group_name}</IonCardTitle>
                        <IonCardSubtitle>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et ullam inventore suscipit illo cumque perferendis qui iste atque! Deserunt voluptates natus quisquam. Nulla ex quod quibusdam natus tempora? Architecto, doloribus?</IonCardSubtitle>
					</IonCardHeader>
				<IonCardContent>
                    <IonItem>
                        <IonIcon icon={ lockClosedOutline } slot='start' />
                        <IonLabel>Admin: {group_admin}</IonLabel>
                    </IonItem>
					<div className="ion-text-left">
						<IonButton className="ion-margin-end" color="light" routerLink={'group/' + group_id}>View Group Events</IonButton>
					</div>
				</IonCardContent>
			</IonCard>
  );
};

export default Group;
