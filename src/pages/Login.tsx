import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonHeader,
  IonPage,
} from "@ionic/react";
import Header from "../components/Header";
import SocialLoginButtons from "../components/socialLoginButtons";
import PasswordlessLogin from "../components/auth/passwordlessEmail";
import useAnalytics from '../hooks/useAnalytics';

const Login: React.FC = () => {
  const path = window.location.pathname;
  const page = path == "/register" ? "Register" : "Login";
  // TODO: Fix analytics calling twice here
  useAnalytics(page);
  return (
    <IonPage>
      <Header />
      <IonContent className="ion-padding bgImg ">
        <br/>
        <br/>
        <br/>
        <br/>
        <IonCard className="loginCard">
          <IonCardHeader>
            <IonCardTitle>
              Connect using a method below
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent>
            <SocialLoginButtons />
            <PasswordlessLogin />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );

};

export default Login;
