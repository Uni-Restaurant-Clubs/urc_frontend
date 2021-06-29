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
import { authActions } from "../redux/actions/authActions";
import { useDispatch } from "react-redux";
const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUserName] = useState(null);

  const forgotPasswordEmail = async () => {
    console.log(username);
    if (username && username !== "") {
      console.log(username);
      let res: any = await dispatch(authActions.forgotPassword({ username }));
      console.log(res.status);
      if (res && res.status === 204) {
        setUserName(null);

        // Redirect logic
      }
    } else {
      return;
    }
  };

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
              value={username}
              onIonChange={(e: any) => setUserName(e.target.value)}
            />
          </IonItem>

          <IonButton
            expand="block"
            onClick={forgotPasswordEmail}
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
