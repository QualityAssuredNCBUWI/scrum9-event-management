import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';
import Login from './pages/login/Login';
import Logout from './pages/login/Logout';
import SignUp from './pages/signup/SignUp'
import ViewEvents from './pages/viewEvents/ViewEvents';
import CreateGroup from './pages/createGroup/createGroup';
import ViewProfile from './pages/userProfile/ViewProfile';
import ViewGroups from './pages/viewMyGroups/ViewGroups';
import ViewGroup from './pages/viewGroup/ViewGroup';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home" component={Home}>
        </Route>
        <Route exact path="/logout" component={Logout}>
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/events">
          <ViewEvents />
        </Route>  
        <Route exact path="/profile">
          <ViewProfile />
        </Route>  
        <Route exact path="/groups">
          <ViewGroups />
        </Route>
        <Route exact path="/group/:group_id" component={ViewGroup}>
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/createGroup">
          <CreateGroup />
          </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
