import {
  IonButton,
  IonContent,
  IonLoading,
  IonAlert,
  IonImg,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { authActions } from "../../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { isPlatform, getPlatforms } from '@ionic/react';
import { Plugins } from '@capacitor/core';
import "@codetrix-studio/capacitor-google-auth";
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import "./index.css"

const GoogleLoginButton: React.FC = () => {
  const dispatch = useDispatch();
  const router = useHistory();

  const oauthLoading = useSelector((state: any) => state.auth.oauthLoading);
  const oauthError = useSelector((state: any) => state.auth.oauthFail);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    if (!isPlatform('android') && !isPlatform('ios')) {
      GoogleAuth.init()
    }
  }, []);

  // 500 from server is showing blank alert popup
  const signIn = async (provider: string) => {
    const tokenField = provider == "facebook" ? "token" : "authorization_code";
    try {
      dispatch(authActions.initiateOauth(provider, async (authCode: string) => {
        if (authCode) {
          let res = await dispatch(authActions.connectOauth(
            {provider: provider, tokenField: authCode}));
          if (res && res.length > 0) {
            window.location.reload();
          } else {
            setShowAlert(true);
          }
        } else {
          setShowAlert(true);
        }
      }));
    } catch (error) {
      setShowAlert(true);
    }
  }

  const signInFacebook = async () => {

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

      <br/>
      <IonButton
        className="ios"
        fill="outline"
        expand="block"
        color="medium"
        onClick={() => signIn("google")}>
        <IonImg className="googleIcon"
          src="https://urc-public-images.s3.us-east-2.amazonaws.com/google-logo-9827.png"/>
        Connect with Google
      </IonButton>
      <IonButton className="login-button" onClick={() => signIn("facebook")} expand="full" fill="solid" color="primary">
        Login with Facebook
      </IonButton>
    </>
  );
};

export default GoogleLoginButton;
