import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonSplitPane, IonButtons, IonMenuButton, useIonViewWillEnter, IonSlides, IonSlide, IonItem, IonIcon, IonCard, IonCardHeader, IonCardContent, IonCardTitle, } from '@ionic/react';
import { calendarNumberSharp, addCircle } from 'ionicons/icons';
import { useState } from 'react';
import { Redirect } from 'react-router';
import { isloggedin, API_LOC } from '../../services/ApiServices';
import Menu from '../../components/Menu';
import Group from '../../components/DisplayGroup';

interface i_Group {
    id: number;
    name: string;
    admin: number;
  }

// interface Response {
//     message: string
// }

const ViewGroups: React.FC = () => {
    
    const slideOpts = {
        initialSlide: 0,
        speed: 1000,
        autoplay: true
      };

    const [groups, setGroups] = useState([]);
    const [auth, setAuth] = useState<boolean>(isloggedin());
    const [resp, setResp] = useState({ message:'An error occured.'});

    useIonViewWillEnter(() => {
        // call api
        let isMounted = true;
        if(isMounted){
            getAffiliations();
        }

        async function getAffiliations(){
            // import service call to get all events here
            const response = await fetch(API_LOC +"api/groups/user", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            });
            if(response.status === 200){
                const data = await response.json();
                console.log(data);
                if(isMounted) setGroups(data);
            } else if(response.status === 404 || response.status === 401){
                const data = await response.json();
                setResp(data.result);
                localStorage.removeItem('token');
                setAuth(false);
            } else if(response.status === 406){
                const data = await response.json();
                setResp(data.result);
                localStorage.removeItem('token');
                setAuth(false);
            }
        }

        return () => isMounted = false;
    }, []);

    return (
    <IonContent>
        <IonSplitPane contentId="page">
        {/*--  the side menu  --*/}
        <Menu auth={auth} />
        <IonPage id="page" className="page">
            <IonHeader>
                <IonToolbar>
                <IonTitle></IonTitle>
                <IonButtons slot="start">
                  <IonMenuButton></IonMenuButton>
                </IonButtons>
                </IonToolbar>
            </IonHeader>
            { !auth ? <Redirect to={{
                    pathname: '/login',
                    state: { flash: 'Session expired.' }
                }} /> : 
                <IonContent  className="contain" fullscreen>
                    { groups.length ? 
                    <IonGrid id="page">
                    <IonRow>
                        <h1>My Groups</h1>
                    </IonRow>
                    <IonRow>
                        {groups.map((group: i_Group) => (
                        <IonCol>
                            <Group group_id={group.id} group_name={group.name}  group_admin={ group.admin.toString()} />
                        </IonCol>
                        ))}
                    </IonRow>
                    <IonRow>
                        <IonSlides pager={true} options={slideOpts}>
                        <IonSlide>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>
                                        What are Groups?
                                    </IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                <IonItem><IonIcon icon={ calendarNumberSharp } slot='start' size="large" />In order to make events more organised and easy to manage, We have given you the ability to create your own groups to organize events as a team.<br/>
                                </IonItem>
                                </IonCardContent>
                            </IonCard>
                        </IonSlide>
                        <IonSlide>
                            <IonCard>
                                <IonCardHeader>
                                    <IonCardTitle>
                                        What can You do with Groups?
                                    </IonCardTitle>
                                </IonCardHeader>
                                <IonCardContent>
                                <IonItem><IonIcon icon={ addCircle } slot='start' size="large" />You can create a group as an admin and add members to that group to help each other organize events.<br/> Or, you may join someone elses group!
                                </IonItem>
                                </IonCardContent>
                            </IonCard>
                        </IonSlide>
                        
                        </IonSlides>
                    </IonRow>
                    </IonGrid>
                    : 
                    <IonCol><IonItem>You are in no groups.</IonItem></IonCol>
                    }
                <div className="cover-lay"></div>
            </IonContent>}
        </IonPage>  
    </IonSplitPane>
    </IonContent>      
    )
}

export default ViewGroups;