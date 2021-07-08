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
    console.log("res = ", res, apiError);
    if (res && Object.keys(res).length > 0) {
      setEmail(null);
      setPassword(null);
      setAlertMessage("Verification link has been sent to your mail");
      setShowAlert(true);
      dispatch(authActions.emailConfirmation({ email }));
      setTimeout(() => {
        // router.push("/login");
        setShowAlert(false);
      }, 3000);
    } else if (apiError) {
      if(Array.isArray(apiError.message)){
        let outputError  = apiError.message.map((errMsg:any)=>{
          return(`<li>${errMsg}</li>`)
        })
  
        setAlertMessage(`<ul class="errorMessageStyle">${outputError.join('')}</ul`);
        setShowAlert(true);
      } else{
        setAlertMessage(`<ul class="errorMessageStyle"><li>${apiError.message}</li></ul`);
        setShowAlert(true);
      }
    }
  };

  useEffect(() => {
    if (apiError) {
      if(Array.isArray(apiError.message)){
      let outputError  = apiError.message.map((errMsg:any)=>{
        return(`<li>${errMsg}</li>`)
      })

      setAlertMessage(`<ul class="errorMessageStyle">${outputError.join('')}</ul`);
      setShowAlert(true);
    } else{
      setAlertMessage(`<ul class="errorMessageStyle"><li>${apiError.message}</li></ul`);
      setShowAlert(true);
    }
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
            header={"Alert"}
            // subHeader={'Subtitle'}
            message={alertMessage}
            buttons={[
              {
                text: "Ok",
                cssClass: "confirmButtonStyle",
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
