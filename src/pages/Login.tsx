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
import { Link, useHistory } from "react-router-dom";
import { authActions } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { parseQuery } from "../utils/utils";

interface errorHandling {
  userNameError: null;
  passwordError: null;
}

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const router = useHistory();
  const [email, setEmail] = useState(null);

  const [userNameError, setUserNameError] = useState<errorHandling | any>(null);
  const [passwordError, setPasswordError] = useState<errorHandling | any>(null);

  const [password, setPassword] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const signupLoading = useSelector((state: any) => state.signupLoading);
  const apiError = useSelector((state: any) => state.signInFail);

  useEffect(() => {
    let queryParams: any = parseQuery(window.location.search);
    if (queryParams.error) {
      setAlertMessage(queryParams.error);
      setShowAlert(true);
    } else if (queryParams.email_confirmed) {
      setAlertMessage("Email is now verified. You can now log in");
      setShowAlert(true);
    }
  }, []);

  const loginUser = async () => {
    let res = await dispatch(authActions.loginUser({ email, password }));
    if (res && res.length > 0) {
      router.push("/main");
      setEmail(null);
      setPassword(null);
    } else if (apiError) {
    }
  };

  useEffect(() => {
    if (apiError) {
      if (Array.isArray(apiError.message)) {
        let outputError = apiError.message.map((errMsg: any) => {
          return `<li>${errMsg}</li>`;
        });

        setAlertMessage(
          `<ul class="errorMessageStyle">${outputError.join("")}</ul`
        );
        setShowAlert(true);
      } else {
        setAlertMessage(
          `<ul class="errorMessageStyle"><li>${apiError.message}</li></ul`
        );
        setShowAlert(true);
      }
    }
  }, [apiError]);

  return (
    <div className=" ">
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login Page</IonTitle>
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
            onDidDismiss={() => {
              setShowAlert(false);
              setAlertMessage("");
            }}
            // cssClass='my-custom-class'
            header={"Alert"}
            // subHeader={'Subtitle'}
            message={alertMessage}
            buttons={[
              {
                text: "Register",
                role: "cancel",
                cssClass: "confirmButtonStyle leftButton",
                handler: () => {
                  router.push("/register");
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

          <div className="main-container">
            <h2 className="main-title">Login</h2>
            <IonItem>
              <IonLabel
                color={userNameError ? "danger" : ""}
                position="floating"
              >
                Email
              </IonLabel>
              <IonInput
                placeholder="Email"
                required={true}
                // color="danger"
                onIonChange={(e: any) => setEmail(e.target.value)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel
                color={passwordError ? "danger" : ""}
                position="floating"
              >
                Password
              </IonLabel>
              <IonInput
                type="password"
                placeholder="Password"
                onIonChange={(e: any) => setPassword(e.target.value)}
              />
            </IonItem>

            <IonButton
              expand="block"
              onClick={loginUser}
              style={{ marginTop: "1rem" }}
            >
              Login
            </IonButton>

            <div className="center">
              <p>
                New here? <Link to="/register">Register</Link>
              </p>
              <p>
                <Link to="/forgotPassword">Forgot Password?</Link>
              </p>
              <p>
                <Link to="/emailConfirmation">Resend Confirmation mail ?</Link>
              </p>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default Login;
