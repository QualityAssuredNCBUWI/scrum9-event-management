import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar, IonItem, IonSplitPane, IonButtons, IonMenuButton, useIonViewWillEnter, IonCardHeader, IonCardSubtitle, IonCard, IonCardTitle, IonButton, IonIcon, IonList, IonSearchbar, IonModal, IonInput, IonLabel, useIonToast } from '@ionic/react';
import { accessibilitySharp, searchCircleOutline } from 'ionicons/icons';
import { useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { useParams, useHistory } from 'react-router-dom';
import { isloggedin, API_LOC } from '../../services/ApiServices';
import Menu from '../../components/Menu';
import Event from '../../components/Event';
import AddMember from '../../components/AddMember';

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

const ViewGroup: React.FC<RouteComponentProps> = ({history, location, match}: RouteComponentProps) => {

    // const history = useHistory();

    let {group_id}  = useParams<GroupParams>();
    const [email, setEmail] = useState('')
    const [group, setGroup] = useState<i_Group>();
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState();
    const [events, setEvents] = useState([]);
    const [filteredEvents,setFilteredEvents] = useState(events);
    const [auth, setAuth] = useState<boolean>(isloggedin());
    const [showModal, setShowModal] = useState(false);
    const [show_Modal, setShow_Modal] = useState(false);
    const [present, dismiss] = useIonToast();

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
                // present('New Member added!', 3000);
                present({
                    buttons: [{ text: 'hide', handler: () => dismiss() }],
                    message: 'New Member added!',
                    duration: 3000,
                    color: 'success'
                  })
                console.log(data);
                history.replace('/group/'+group_id, { flash: 'New Member added!' })
            } else if(response.status === 400 || response.status === 401){
                const data = await response.json();
                present({
                    buttons: [{ text: 'hide', handler: () => dismiss() }],
                    message: data.message,
                    duration: 3000,
                    color: 'danger'
                  })
                console.log(data);
                // remove the token from localstorage
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
                        { !auth ? 
                            <IonItem>
                                Please Login to view Members...
                            </IonItem>
                        : null }
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
                        { auth ? 
                            <IonButton color="primary" size="default" onClick={() => {setShowModal(false);
                            setShow_Modal(true)}}>
                                Add Member
                            </IonButton>
                        : null }
                        </IonModal>
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
                        <IonButton size="small"color="light" onClick={() => setShowModal(true)}>Group Members
                        </IonButton>
                    </IonCol>
                    <IonCol className="ion-hide-md-down">
                        <h2>Group Members</h2>
                        { !auth ? 
                            <IonItem>
                                Please Login to view Members...
                            </IonItem>
                        : null }
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
                        { auth ? 
                            <IonButton color="primary" size="default" onClick={() => setShow_Modal(true)} >
                                Add Member
                            </IonButton>
                        : null }
                        <AddMember group_id={group_id} show={false} history={history} location={location} match={match} />
                    </IonCol>
                </IonRow>
                <IonRow>
                <h2 className="ion-padding-start">Group Events</h2>
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