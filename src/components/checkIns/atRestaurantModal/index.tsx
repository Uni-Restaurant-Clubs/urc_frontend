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

const atRestaurantModal: React.FC<{ open: boolean, closeFunction: any}> = (
  { open, closeFunction }) => {
  let history = useHistory();

  const handleContactSupportButtonClick = () => {
    track("Button Click", {label: "Contact Support from at restaurant modal",
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
          <h3>📍 You are checked in! 📍</h3>
          <br />
          <p>Have a good time!</p>
          <p> the restaurant</p>
          <br />
          <p>If there are any issues at the restaurant regarding the deal then please contact us immediately</p>
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

export default atRestaurantModal;
