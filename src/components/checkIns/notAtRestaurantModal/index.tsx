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

const NotAtRestaurantModal: React.FC<{ open: boolean, closeFunction: any}> = (
  { open, closeFunction }) => {
  let history = useHistory();

  const handleContactSupportButtonClick = () => {
    track("Button Click", {label: "Contact Support from not at restaurant modal",
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
              <IonButton onClick={() =>closeFunction()}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding NotAtRestaurantModal">
          <h3>📍 You seem a bit far... 📍</h3>
          <br />
          <p>It looks like you're not at the restaurant.</p>
          <p>Please check in again when you are at the restaurant</p>
          <br />
          <p>If this is in error and you are at the restaurant then please contact us and we will help you immediately!</p>
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

export default NotAtRestaurantModal;
