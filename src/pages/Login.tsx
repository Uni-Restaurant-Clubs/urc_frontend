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

const Login: React.FC = () => {
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
