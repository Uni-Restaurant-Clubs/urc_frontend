import {
  IonButton,
  IonContent,
  IonLoading,
  IonAlert,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { authActions } from "../../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Plugins } from '@capacitor/core';
import "@codetrix-studio/capacitor-google-auth";
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';

const GoogleLoginButton: React.FC = () => {
  const dispatch = useDispatch();
  const router = useHistory();

  const oauthLoading = useSelector((state: any) => state.auth.oauthLoading);
  const oauthError = useSelector((state: any) => state.auth.oauthFail);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    GoogleAuth.init()
  }, []);

  const signIn = async () => {
    try {
      let authCode = await dispatch(authActions.initiateOauth("google"));
      if (authCode) {
        let res = await dispatch(authActions.connectOauth(
          {provider: "google", authorization_code: authCode}));
        if (res && res.length > 0) {
          window.location.reload();
        } else {
          setShowAlert(true);
        }
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      setShowAlert(true);
    }
  }

  return (
    <>
      <IonLoading
        spinner="bubbles"
        message="Started connecting ..."
        isOpen={oauthLoading}
      />

      <IonAlert
        isOpen={showAlert}
        onDidDismiss={() => {
          setShowAlert(false);
        }}
        header={"Alert"}
        message={oauthError.message}
        buttons={[
          {
            text: "Ok",
            cssClass: "confirmButtonStyle rightButton",
            handler: () => {
              setShowAlert(false);
            },
          },
        ]}
      />

      <IonButton onClick={() => signIn()}>
        Connect with Google
      </IonButton>
    </>
  );
};

export default GoogleLoginButton;
