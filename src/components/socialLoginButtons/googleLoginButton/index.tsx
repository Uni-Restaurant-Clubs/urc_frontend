import {
  IonButton,
} from "@ionic/react";
import { Plugins } from '@capacitor/core';
import "@codetrix-studio/capacitor-google-auth";
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { useHistory } from "react-router-dom";
import { authActions } from "../../../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

const GoogleLoginButton: React.FC = () => {
  const dispatch = useDispatch();
  const router = useHistory();

  const connectGoogleLoading = useSelector((state: any) => state.connectGoogleLoading);
  const apiError = useSelector((state: any) => state.connectGoogleFail);

  useEffect(() => {
    GoogleAuth.init()
  }, []);

  const signIn = async () => {
    try {
      console.log("Signin");
      const result = await GoogleAuth.signIn();
      if (result && result.serverAuthCode) {
        let res = await dispatch(authActions.connectGoogle(
          {authorization_code: result.serverAuthCode}));
        if (res && res.length > 0) {
          window.location.reload();
        } else if (apiError) {
        }
      }
    } catch (error) {
      console.log("error gpi =>", error);
    }
  }

  return (
    <IonButton onClick={() => signIn()}>
      Connect with Google
    </IonButton>
  );
};

export default GoogleLoginButton;
