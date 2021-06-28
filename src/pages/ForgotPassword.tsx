import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import "./Login.css";

const ForgotPassword: React.FC = () => {
  const [username, setUserName] = useState(null);

  function loginUser() {
    console.log(username);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Forgot Password Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding bgImg ">
        <div className="home-container">
          <h2 className="main-title">Forgot Password</h2>
          <IonItem>
            <IonLabel position="floating">Username</IonLabel>
            <IonInput
              placeholder="User email"
              onIonChange={(e: any) => setUserName(e.target.value)}
            />
          </IonItem>

          <IonButton
            expand="block"
            onClick={loginUser}
            style={{ marginTop: "1rem" }}
          >
            Send Email
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
