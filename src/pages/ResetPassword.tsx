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
import { useHistory } from "react-router-dom";
import { parseQuery } from "../utils/utils";

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const router = useHistory();

  const [password, setPassword] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const signupLoading = useSelector((state: any) => state.signupLoading);
  const apiError = useSelector((state: any) => state.updatePasswordFail);

  useEffect(() => {
    let queryParams: any = parseQuery(window.location.search);
    if (queryParams.error) {
      setAlertMessage(queryParams.error);
      setShowAlert(true);
    } else if (queryParams.token) {
      setAlertMessage("Email is now verified. You can now reset password");
      setShowAlert(true);
    }
  }, []);

  const resetPassword = async () => {
    const queryToken = router?.location?.search?.split("=")[1];
    if (password && password !== "") {
      let res: any = await dispatch(
        authActions.updatePassword({ password, token: queryToken })
      );
      if (res) {
        setPassword(null);
        setAlertMessage("Password reset successfully.");
        setShowAlert(true);
        setTimeout(() => {
          // Redirect logic
          router.push("/login");
        }, 3000);
      }
    } else {
      return;
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
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Reset Password Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent
          className="ion-padding bgImg "
          style={{ textAlign: "center", position: "relative" }}
        >
          {/* {signupLoading && ( */}
          {/* <IonSpinner className="spinnerStyle" name="lines" color="white" /> */}

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
                  setAlertMessage("");
                },
              },
            ]}
          />
          {/* )} */}

          <div className="main-container">
            <h2 className="main-title">Reset Password</h2>
            <IonItem>
              <IonLabel position="floating">New Password</IonLabel>
              <IonInput
                placeholder="New Password"
                type="password"
                value={password}
                onIonChange={(e: any) => setPassword(e.target.value)}
              />
            </IonItem>

            <IonButton
              expand="block"
              onClick={resetPassword}
              style={{ marginTop: "1rem" }}
            >
              Reset Password
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ResetPassword;
