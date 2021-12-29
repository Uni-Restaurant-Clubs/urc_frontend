import React, { useEffect, useState } from "react";
import {
  IonCardHeader,
  IonButton,
  IonLabel,
  IonCardContent,
  IonCardTitle,
  IonCard,
} from "@ionic/react";
import { Storage } from "@capacitor/storage";
import "./index.scss"
import { track } from '../../../utils/analytics';
import useIsAuthenticated from '../../../hooks/useIsAuthenticated';
let connected = false;

const DealInfo: React.FC<{ reviewId: string, deal: string, perks: string}> = (
  { reviewId, deal, perks}) => {

  connected = useIsAuthenticated();

  const handleDealButtonClick = async () => {
    track("Button Click", {label: "Get Deal!", category: "deals"});
    if (connected && member) {
      // go to deal
    } else {
      // save deal in redirect path
      await Storage.set({
        key: "dealReviewIdToRedirectTo",
        value: reviewId,
      });
      // go to membership options page
      window.location.href = "/membership_options";
    }
  }

  return (
    <>
      <IonCard className="dealCard">
        <div>
          <IonCardHeader className="dealCardHeader">
            <h4 className="dealTitle">Deal {deal} off!</h4>
          </IonCardHeader>
          <IonCardContent className="dealCardContent">
            <IonLabel>
              <div><h3 className="dealItem">plus a {perks.toLowerCase()}!</h3></div>
            </IonLabel>
          </IonCardContent>
        </div>
        <IonCardContent>
          <IonButton fill="solid" className="getDealButton">Get Deal!</IonButton>
        </IonCardContent>
        <div className="dealCardHeaderLast">
          <IonCardHeader className="dealCardHeader">
            <h4 className="dealTitle">Deal {deal} off!</h4>
          </IonCardHeader>
          <IonCardContent className="dealCardContent">
            <IonLabel>
              <div><h3 className="dealItem">plus a {perks.toLowerCase()}!</h3></div>
            </IonLabel>
          </IonCardContent>
        </div>
      </IonCard>
    </>
  );
};

export default DealInfo;
