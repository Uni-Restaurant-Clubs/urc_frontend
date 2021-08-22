import {
  IonContent,
  IonHeader,
  IonPage,
} from "@ionic/react";
import Header from "../components/Header";
import SocialLoginButtons from "../components/socialLoginButtons"
import PasswordlessLogin from "../components/socialLoginButtons"

const Login: React.FC = () => {
  return (
    <div className=" ">
      <IonPage>
        <Header headertitle="Connect" />
        <IonContent className="ion-padding bgImg ">
          <div className="main-container">
            <h2 className="main-title">Login</h2>
            <SocialLoginButtons />
            <PasswordlessLogin />
          </div>
        </IonContent>
      </IonPage>
    </div>
  );

};

export default Login;
