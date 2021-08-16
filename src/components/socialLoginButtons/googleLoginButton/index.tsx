import {
  IonButton,
} from "@ionic/react";
import { Plugins } from '@capacitor/core';
import "@codetrix-studio/capacitor-google-auth";
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { useState, useEffect } from "react";

const GoogleLoginButton: React.FC = () => {

  useEffect(() => {
    GoogleAuth.init()
  }, []);

  const signIn = async () => {
    try {
      console.log("Signin");
      const result = await GoogleAuth.signIn();
      debugger;
      console.info('result', result);
      if (result) {
        console.log("res =>", result);
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
