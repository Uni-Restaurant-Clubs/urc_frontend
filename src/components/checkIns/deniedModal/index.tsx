import React, { useEffect, useState } from "react";
import {
  IonModal,
  IonContent,
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonImg,
} from '@ionic/react';
import { useHistory } from "react-router-dom";
import "./index.scss";
import { track } from '../../../utils/analytics';

const LocationDeniedModal: React.FC<{ open: boolean, closeFunction: any}> = (
  { open, closeFunction }) => {
  let history = useHistory();

  const handleContactSupportButtonClick = () => {
    track("Button Click", {label: "Contact Support from location denied modal",
      category: "deals"});
    closeFunction();
    history.push(`/contact`)
  }

  return (
    <>
      <IonModal isOpen={open}>
        <IonHeader>
          <IonToolbar>
            <IonImg className="passwordlessHeader" src="https://urc-public-images.s3.us-east-2.amazonaws.com/output-onlinepngtools.png" />
            <IonButtons slot="end">
              <IonButton onClick={() =>closeFunction()}>Cancel</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding locationDeniedModal">
          <h3>📍 Oops we cannot access your location. 📍</h3>
          <br />
          <p>It looks like you have denied access to your location.</p>
          <p>We need your location to verify that you are at the restaurant.</p>
          <p>Please allow location and then refresh the page.</p>
          <br />
          <p>Here are links on how to allow location</p>
          <p><a href="https://support.google.com/chrome/answer/142065?hl=en&co=GENIE.Platform%3DAndroid&oco=1" target="_blank">Chrome</a></p>
          <p><a href="https://browserhow.com/how-to-enable-or-disable-location-access-in-apple-safari/" target="_blank">Safari</a></p>
          <p><a href="https://support.mozilla.org/en-US/kb/does-firefox-share-my-location-websites" target="_blank">Firefox</a></p>
          <p><a href="https://docs.buddypunch.com/en/articles/919258-how-to-enable-location-services-for-chrome-safari-edge-and-android-ios-devices-gps-setting" target="_blank">Chrome, Safari, Edge, and Android/iOS Devices</a></p>
          <br />
          <p>If you are still having issues, then please contact us!</p>
          <IonButton fill="solid"
                     color="danger"
                     onClick={handleContactSupportButtonClick}
                     className="getDealButton"
          >Contact support</IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default LocationDeniedModal;
