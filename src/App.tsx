import { Route, useHistory } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonSplitPane} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./gobal-style/global.css";
import EmailConfirmation from "./pages/EmailConfirmation";
import ResetPassword from "./pages/ResetPassword";
import Reviews from "./pages/reviews/list";
import Main from "./pages/Main";
import AuthRoute from "./components/AuthRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import Home from "./pages/Home";
import ReviewDetails from "./pages/reviews/details";
import ContentCreatorDetails from "./pages/contentCreators/details";
import PrivateRoute from "./components/PrivateRoute";
import Menu from './components/Menu';
import Header from "./components/Header";

const App: React.FC = () => {
  const history = useHistory();

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main">
          <Menu />
          <IonRouterOutlet animated={false} id="main">
        		<Route exact path="/reviews/:id" component={ReviewDetails} />
        		<AuthRoute exact path="/register" component={Login} />
        		<AuthRoute exact path="/login" component={Login} />
        		<AuthRoute exact path="/enter_new_password" component={ResetPassword} />
        		<AuthRoute exact path="/forgotPassword" component={ForgotPassword} />
        		<AuthRoute
          		exact
          		path="/emailConfirmation"
          		component={EmailConfirmation}
        		></AuthRoute>
        		<Route exact path="/" component={Reviews} />
        		<Route exact path="/writers/:id" component={ContentCreatorDetails} />
        		<Route exact path="/photographers/:id" component={ContentCreatorDetails} />
          </IonRouterOutlet>
        </IonSplitPane>

      </IonReactRouter>
    </IonApp>
  );
};

export default App;
