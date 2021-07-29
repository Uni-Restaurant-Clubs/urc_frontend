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
  IonLoading,
  IonAlert,
} from "@ionic/react";
import { useEffect, useState } from "react";
import "./Login.css";
import { authActions } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const EmailConfirmation: React.FC = () => {
  const dispatch = useDispatch();
  const router = useHistory();
  const signupLoading = useSelector((state: any) => state.signupLoading);
  const [email, setEmail] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [emailConfirmLoading, setEmailConfirmLoading] = useState(false);

  useEffect(() => {
  }, [showAlert]);

  const handleEmailConfirmation = async () => {
    setEmailConfirmLoading(true);
    let res: any = await dispatch(authActions.emailConfirmation({ email }));
    setEmailConfirmLoading(false);
    if (res && !res.error && res.status === 204) {
      setAlertMessage(`<li>A verification email has been resent to you</li>`);
      setShowAlert(true);
    } else {
      setAlertMessage(
        `<li> ${
          res.message ||
          "Oops looks like something went wrong. Please try again soon"
        }</li>`
      );
      setShowAlert(true);
    }
  };

  return (
    <IonPage>
      <Header headertitle="Confirm Email" />
      <IonContent className="ion-padding bgImg ">
        <IonLoading
          spinner="bubbles"
          message="Please wait ..."
          duration={0}
          isOpen={emailConfirmLoading}
        />
        <IonLoading
          spinner="bubbles"
          message="Please wait ..."
          duration={0}
          isOpen={signupLoading}
        />
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => {
            setShowAlert(false);
            setAlertMessage("");
          }}
          header={"Alert"}
          message={alertMessage}
          buttons={[
            {
              text: "Ok",
              cssClass: "confirmButtonStyle rightButton",
              handler: () => {
                setAlertMessage("");
              },
            },
          ]}
        />
        <div className="main-container">
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
          <div className="center">
            <p>
              New here? <Link to="/register">Register</Link>
            </p>
            <p>
              Already Registered ? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default EmailConfirmation;
