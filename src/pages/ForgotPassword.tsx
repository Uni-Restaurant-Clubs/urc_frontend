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
import { useState, useEffect } from "react";
import "./Login.css";
import { authActions } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const router = useHistory();

  const [email, setEmail] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const signupLoading = useSelector((state: any) => state.signupLoading);
  const apiError = useSelector((state: any) => state.forgotPasswordFail);

  const forgotPasswordEmail = async () => {
    console.log(email);
    if (email && email !== "") {
      console.log(email);
      let res: any = await dispatch(authActions.forgotPassword({ email }));
      if (res && res.status === 204) {
        setEmail(null);

        // Redirect logic
      }
      // else if(apiError){
      //   console.log("apiError = ", apiError.message, apiError);
      //   setAlertMessage(apiError.message)

      //       setShowAlert(true);

      // }
    } else {
      return;
    }
  };

  useEffect(() => {
    if (apiError) {
      console.log("apiError = ", apiError.message, apiError);
      setAlertMessage(apiError.message);
      setShowAlert(true);
    }
  }, [apiError]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Forgot Password Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding bgImg ">
        <IonLoading
          spinner="bubbles"
          message="Please wait ..."
          duration={0}
          isOpen={signupLoading}
        />
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          // cssClass='my-custom-class'
          header={"Error"}
          // subHeader={'Subtitle'}
          message={alertMessage}
          buttons={[
            {
              text: "Register",
              role: "cancel",
              cssClass: "confirmButtonStyle leftButton",
              handler: () => {
                router.push("/register");
              },
            },
            {
              text: "Retry",
              cssClass:"confirmButtonStyle rightButton",
              handler: () => {
                console.log("Confirm Okay");
              },
            },
          ]}
        />
        <div className="home-container">
          <h2 className="main-title">Forgot Password</h2>
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
