import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonItem, IonSplitPane, IonButtons, IonMenuButton, useIonViewWillEnter, IonImg, IonCardHeader, IonCardSubtitle, IonCard, IonCardTitle, IonCardContent, IonButton, IonIcon, IonLabel, IonList, IonSearchbar, IonModal } from '@ionic/react';
import { accessibilitySharp, calendarNumberSharp } from 'ionicons/icons';
import { useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { useParams } from 'react-router-dom';
import { isloggedin, API_LOC } from '../../services/ApiServices';
import Menu from '../../components/Menu';
import Event from '../../components/Event';

interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
  }

interface i_Group {
    id: number;
    name: string;
    admin: number;
}

interface i_event {
    id: number;
    title: string;
    description: string;
    start_date: string;
    attendance: number;
    image: string;
  }

type GroupParams = {
    group_id: string;
  };

const ViewGroup: React.FC<RouteComponentProps> = (props) => {

    let fake = {
        'admin': -1,
        'id': -1,
        'name': ''
    }

    let {group_id}  = useParams<GroupParams>();
    const [group, setGroup] = useState<i_Group>();
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState();
    const [events, setEvents] = useState([]);
    const [filteredEvents,setFilteredEvents] = useState(events);
    const [auth, setAuth] = useState<boolean>(isloggedin());
    const [showModal, setShowModal] = useState(false);


    const handleSearch = (event:any) =>{
        let value = event.target.value.toLowerCase();
        // console.log(value);
        let result = [];
        result = events.filter((data:any) => {
            return data.title.toLowerCase().indexOf(value) > -1 || data.description.toLowerCase().indexOf(value) > -1;
            // return JSON.stringify(data).toLowerCase().indexOf(value) > -1;
        });
        setFilteredEvents(result);
    }
    
    useIonViewWillEnter(() => {
        // call api
        // console.log("ionWillEnterView event fired");
        let isMounted = true;
        if(isMounted){
            getGroup();
            getUsers();
            getEvents();
        }

        async function getGroup(){
            // import service call to get all events here
            const response = await fetch(API_LOC +"api/group/" + group_id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            });
            if(response.status === 200){
                const data = await response.json();
                console.log(data);
                setGroup(data);
            } else if(response.status === 404 || response.status === 401){
                localStorage.removeItem('token');
                setAuth(false);
            } else if(response.status === 406){
                localStorage.removeItem('token');
                setAuth(false);
            }
        }

        async function getUsers(){
            // import service call to get all events here
            const response = await fetch(API_LOC +"api/groups/" + group_id + "/users", {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            });
            if(response.status === 200){
                const data = await response.json();
                console.log(data);
                setUsers(data.result.users);
                setAdmin(data.result.admin);
            } else if(response.status === 404 || response.status === 401){
                localStorage.removeItem('token');
                setAuth(false);
            } else if(response.status === 406){
                localStorage.removeItem('token');
                setAuth(false);
            }
        }

        async function getEvents(){
            // import service call to get all events here
            const response = await fetch(API_LOC +"api/events/groups/" + group_id, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': "Bearer " + localStorage.getItem('token')
                }
            });
            if(response.status === 200){
                const data = await response.json();
                console.log(data);
                setEvents(data.events);
                setFilteredEvents(data.events);
            } else if(response.status === 404 || response.status === 401){
                localStorage.removeItem('token');
                setAuth(false);
            } else if(response.status === 406){
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
                <IonContent  className="contain" fullscreen>
                    { group ? 
                    <IonGrid id="page">
                    <IonRow>
                        <IonCol size="7" className="">
                            <IonCard className="ion-no-margin ion-margin-vertical">
                                <IonCardHeader>
                                    <IonCardTitle>
                                        { group.name } 
                                    </IonCardTitle>
                                    <IonCardSubtitle>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ad repellat id corrupti ducimus sit et illo aliquid cum recusandae unde placeat cumque odit necessitatibus nostrum minus atque, saepe corporis?
                                    </IonCardSubtitle>
                                </IonCardHeader>
                            </IonCard>
                        </IonCol>
                        <IonCol className="ion-hide-md-up ion-padding-top ion-text-center" >
                            <IonModal isOpen={showModal} cssClass='my-custom-class'>
                            <IonHeader>
                                <IonToolbar color="translucent">
                                    <IonTitle>Group Members</IonTitle>
                                    <IonButton onClick={() => setShowModal(false)} slot="end" color="danger">Close</IonButton>
                                </IonToolbar>
                            </IonHeader>
                            {users.map((user: User) => (
                            <IonList>
                                    { user.id === admin ? 
                                    <IonItem>
                                        <IonIcon icon={ accessibilitySharp } slot='start' size="large" /> {user.first_name + ' ' + user.last_name} (Admin)
                                    </IonItem>
                                    : 
                                    <IonItem>
                                        <IonIcon icon={ accessibilitySharp } slot='start' size="large" /> {user.first_name + ' ' + user.last_name}
                                    </IonItem>
                                    }
                            </IonList>
                            ))}
                            <IonButton color="primary">
                                 Add Member
                            </IonButton>
                            </IonModal>
                            <IonButton size="small"color="light" onClick={() => setShowModal(true)}>Group Members
                            </IonButton>
                        </IonCol>
                        <IonCol className="ion-hide-md-down">
                            <h2>Group Members</h2>
                            {users.map((user: User) => (
                            <IonList>
                                    { user.id === admin ? 
                                    <IonItem>
                                        <IonIcon icon={ accessibilitySharp } slot='start' size="large" /> {user.first_name + ' ' + user.last_name} (Admin)
                                    </IonItem>
                                    : 
                                    <IonItem>
                                        <IonIcon icon={ accessibilitySharp } slot='start' size="large" /> {user.first_name + ' ' + user.last_name}
                                    </IonItem>
                                    }
                            </IonList>
                            ))}
                            <IonButton color="primary">
                                 Add Member
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                    <IonTitle>Group Events</IonTitle>
                    <IonSearchbar placeholder="Search Events by Title" onIonChange={(e) =>handleSearch(e)}></IonSearchbar>
                    { filteredEvents.length ? filteredEvents.map((event: i_event) => (
                    <IonCol>
                        <Event event_id={event.id} event_name={event.title} event_description={event.description} event_date={event.start_date} event_attendance={event.attendance} event_img_url='assets/matty-adame-nLUb9GThIcg-unsplash.jpg'/>
                    </IonCol>
                    )) : <IonItem>No events found</IonItem>}
                    </IonRow>
                    </IonGrid>
                    : 
                    <IonCol><IonItem>An error has occured</IonItem></IonCol>
                    }
                <div className="cover-lay"></div>
            </IonContent>
        </IonPage>  
    </IonSplitPane>
    </IonContent>
    )
}

export default ViewGroup;