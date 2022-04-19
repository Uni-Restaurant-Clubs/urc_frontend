import { Route, useHistory } from "react-router-dom";
import { setupIonicReact, IonApp, IonRouterOutlet, IonSplitPane} from "@ionic/react";
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
import PromotionsIntroForm from "./pages/promotions/intro_form";
import Main from "./pages/Main";
import AuthRoute from "./components/AuthRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Deal from "./pages/deal";
import Contact from "./pages/contact";

import Home from "./pages/Home";
import MembershipOptions from "./pages/memberships/options";
import ReviewDetails from "./pages/reviews/details";
import TermsAndPolicies from "./pages/termsAndPolicies";
import Charities from "./pages/charities";
import ContentCreatorDetails from "./pages/contentCreators/details";
import CreatorApplicationForm from "./pages/contentCreators/applicationForm";
import ReviewSchedulingForm from "./pages/reviews/schedule";
import PrivateRoute from "./components/PrivateRoute";
import Menu from './components/Menu';
import Header from "./components/Header";
import ErrorBoundary from "./components/ErrorBoundary";
import useGetCurrentUser from "./hooks/useGetCurrentUser"
import useIsAuthenticated from "./hooks/useIsAuthenticated"

const App: React.FC = () => {
  const history = useHistory();
  setupIonicReact();
  const isAuthenticated = useIsAuthenticated();
  useGetCurrentUser(isAuthenticated);

  return (
    <ErrorBoundary>
      <IonApp>
        <IonReactRouter>
          <IonSplitPane contentId="main">
            <Menu />
            <IonRouterOutlet animated={false} id="main">
        		  <Route exact path="/reviews/:id" component={ReviewDetails} />
        		  <Route exact path="/creators/:public_unique_username" component={ContentCreatorDetails} />
        		  <AuthRoute exact path="/register" component={Login} />
        		  <AuthRoute exact path="/login" component={Login} />
        		  <Route exact path="/contact" component={Contact} />
        		  <Route exact path="/promotion_form_intro/:token" component={PromotionsIntroForm} />
        		  <Route exact path="/membership_options" component={MembershipOptions} />
        		  <Route exact path="/payment_cancelled" component={MembershipOptions} />
        		  <Route exact path="/payment_success" component={MembershipOptions} />
        		  <Route exact path="/apply" component={CreatorApplicationForm} />
        		  <Route exact path="/charities" component={Charities} />
        		  <Route exact path="/terms_and_policies" component={TermsAndPolicies} />
        		  <Route exact path="/reviews/scheduling_info_form/:token" component={ReviewSchedulingForm} />
        		  <AuthRoute exact path="/enter_new_password" component={ResetPassword} />
        		  <AuthRoute exact path="/forgotPassword" component={ForgotPassword} />
        		  <AuthRoute
          		  exact
          		  path="/emailConfirmation"
          		  component={EmailConfirmation}
        		  ></AuthRoute>
        		  <PrivateRoute exact path="/deal/:id" component={Deal} />
        		  <Route exact path="/" component={Reviews} />
            </IonRouterOutlet>
          </IonSplitPane>

        </IonReactRouter>
      </IonApp>
    </ErrorBoundary>
  );
};

export default App;
