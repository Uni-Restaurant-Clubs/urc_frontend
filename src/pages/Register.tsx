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
import "./Home.css";
import { Link, useHistory } from "react-router-dom";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../redux/actions/authActions";

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const router = useHistory();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const signupLoading = useSelector((state: any) => state.signupLoading);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const apiError = useSelector((state: any) => state.signUpFail);

  const registerUser = async () => {
    console.log(email, password);
    let res = await dispatch(authActions.registerUser({ email, password }));
    console.log("res = ", res, res && Object.keys(res).length > 0, apiError);
    if (res && Object.keys(res).length > 0) {
      router.push("/login");
      setEmail(null);
      setPassword(null);
      dispatch(authActions.emailConfirmation({ email }));
    } else if (apiError) {
      console.log("apiError = ", apiError.message, apiError);
      setAlertMessage(apiError.message);
      setShowAlert(true);
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
    <div className="">
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Register Page</IonTitle>
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
                text: "Ok",
                handler: () => {
                  console.log("Confirm Okay");
                },
              },
            ]}
          />
          <div className="main-container">
            <h2 className="main-title">Register</h2>

            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                placeholder="Email"
                value={email}
                onIonChange={(e: any) => setEmail(e.target.value)}
                required
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                placeholder="Password"
                value={password}
                onIonChange={(e: any) => setPassword(e.target.value)}
              />
            </IonItem>

            <IonButton
              onClick={registerUser}
              expand="block"
              style={{ marginTop: "1rem" }}
            >
              Register
            </IonButton>

            <p className="center">
              Already have account ? <Link to="/login">Login</Link>
            </p>
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default Register;
