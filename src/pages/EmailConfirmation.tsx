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
import { useState } from "react";
import "./Login.css";
import { authActions } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const EmailConfirmation: React.FC = () => {
  const dispatch = useDispatch();
  const router = useHistory();
  const [email, setEmail] = useState(null);
  const signupLoading = useSelector((state: any) => state.signupLoading);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [emailConfirmLoading, setEmailConfirmLoading] = useState(false);

  const handleEmailConfirmation = async () => {
    // if (email && email !== "") {
    setEmailConfirmLoading(true);
    let res: any = await dispatch(authActions.emailConfirmation({ email }));
    setEmailConfirmLoading(false);
    if (res && !res.error && !res.message) {
      setAlertMessage("A verification email has been resent to you");
      setShowAlert(true);
    } else {
      setAlertMessage(
        res.message ||
          "Oops looks like something went wrong. Please try again soon"
      );
      setShowAlert(true);
    }
    // } else {
    //   setEmail(null);
    // }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Confirm Email Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding bgImg ">
        <IonLoading
          spinner="bubbles"
          message="Please wait ..."
          duration={0}
          isOpen={emailConfirmLoading}
        />
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={"Error"}
          message={alertMessage}
          buttons={[
            {
              text: "Login",
              role: "cancel",
              cssClass: "confirmButtonStyle leftButton",
              handler: () => {
                router.push("/login");
                setAlertMessage("");
              },
            },
            {
              text: "Ok",
              cssClass: "confirmButtonStyle rightButton",
              handler: () => {
                setAlertMessage("");
              },
            },
          ]}
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
