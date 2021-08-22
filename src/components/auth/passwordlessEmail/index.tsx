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
import { authActions } from "../../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { parseQuery } from "../../../utils/utils";
import Header from "../../Header";
import SocialLoginButtons from "../../socialLoginButtons"

interface errorHandling {
  emailError: null;
}

const PasswordlessLogin: React.FC = () => {
  const dispatch = useDispatch();
  const router = useHistory();
  const [emailError, setEmailError] = useState<errorHandling | any>(null);
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const startPasswordlessLoginLoading = useSelector((state: any) => {
    return state.auth.startPasswordlessLoginLoading;
  });
  const apiError = useSelector((state: any) => {
    return state.auth.startPasswordlessLoginFail;
  });

  const sendPasswordlessEmail = async () => {
    let res = await dispatch(authActions.startPasswordlessLogin({ email }));
    if (res && res.length > 0) {
      setEmail("");
      //TODO go to next step
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
          `<ul class="errorMessageStyle"><li>${
            apiError.message ||
            "Oops looks like something went wrong. Please try again soon"
          }</li></ul`
        );
        setShowAlert(true);
      }
    } else {
    }
  }, [apiError]);

  return (
    <IonContent className="ion-padding bgImg ">
      <IonLoading
        spinner="bubbles"
        message="Please wait ..."
        duration={0}
        isOpen={startPasswordlessLoginLoading}
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
        <h2 className="main-title">Connect with email</h2>
        <SocialLoginButtons />
        <IonItem>
          <IonLabel
            color={emailError ? "danger" : ""}
            position="floating"
          >
            Email
          </IonLabel>
          <IonInput
            placeholder="Email"
            required={true}
            onIonChange={(e: any) => setEmail(e.target.value)}
          ></IonInput>
        </IonItem>

        <IonButton
          expand="block"
          onClick={sendPasswordlessEmail}
          style={{ marginTop: "1rem" }}
        >
          Login
        </IonButton>

      </div>
    </IonContent>
  );
};

export default PasswordlessLogin;
