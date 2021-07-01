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
  IonLoading
} from "@ionic/react";
import { useState } from "react";
import "./Login.css";
import { authActions } from "../redux/actions/authActions";
import { useDispatch,useSelector } from "react-redux";

const EmailConfirmation: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const signupLoading = useSelector((state: any) => state.signupLoading);

  const handleEmailConfirmation = async () => {
    console.log(email);
    if (email && email !== "") {
      console.log(email);
      let res: any = await dispatch(authActions.emailConfirmation({ email }));
      if (res && res.status === 204) {
        setEmail(null);

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
          <IonTitle>Confirm Email Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding bgImg ">
      <IonLoading spinner="bubbles" message="Please wait ..."  duration={0} isOpen={signupLoading} />
        <div className="home-container">
          <h2 className="main-title">Confirm Email</h2>
          <IonItem>
            <IonLabel position="floating">Email</IonLabel>
            <IonInput
              placeholder="User email"
              value={email}
              onIonChange={(e: any) => setEmail(e.target.value)}
            />
          </IonItem>

          <IonButton
            expand="block"
            onClick={handleEmailConfirmation}
            style={{ marginTop: "1rem" }}
          >
            Send Email
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EmailConfirmation;
