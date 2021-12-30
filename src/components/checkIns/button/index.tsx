import React, { useEffect, useState } from "react";
import { dealActions } from "../../../redux/actions/dealActions";
import { useDispatch, useSelector } from "react-redux";
import {
  IonButton,
  IonContent,
  IonCard,
  IonHeader,
  IonCardContent,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./index.scss";

const CheckInButton: React.FC<{ dealId: string}> = ({ dealId}) => {

  const checkUserIn = () => {
    navigator.geolocation.getCurrentPosition(
      (response) => {
        alert(response.coords.latitude);
        const lat = response.coords.latitude
        const lng = response.coords.longitude
      },
      (err) => {
        alert(err);
        debugger;
    })
  }

  const checkLocation = () => {
    //setShowLocationPrePromptMessage(false);
    //setShowLocationDeniedPromptMessage(false);

    navigator.permissions.query({'name': 'geolocation'})
      .then( permission => {
        if (permission.state === "granted") { checkUserIn(); }
        if (permission.state === "prompt") {
          //setShowLocationPrePromptMessage(true);
        }
        if (permission.state === "denied") {
          //setShowLocationDeniedPromptMessage(true);
        }
      })
  }

  const handleCheckInButtonClick = async () => {
    checkLocation();
  }


  return (
    <IonButton fill="solid"
               onClick={handleCheckInButtonClick}
               className="getDealButton"
    >Check in to unlock deal!</IonButton>
  );
};

export default CheckInButton;
