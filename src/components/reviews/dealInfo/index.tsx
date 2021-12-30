import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
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

const DealInfo: React.FC<{ dealId: string, deal: string, perks: string}> = (
  { dealId, deal, perks}) => {
  let history = useHistory();
  const currentUser = useSelector((state: any) => state.currentUser.currentUser);
  const activeSubscription = currentUser?.subscription_active;


  const handleDealButtonClick = async () => {
    track("Button Click", {label: "Get Deal!", category: "deals"});
    if (activeSubscription) {
      history.push(`/deal/${dealId}`)
    } else {
      // save deal in redirect path
      await Storage.set({
        key: "dealReviewIdToRedirectTo",
        value: dealId,
      });
      // go to membership options page
      history.push(`/membership_options`)
    }
  }

  return (
    <>
      <IonCard onClick={handleDealButtonClick} className="dealCard">
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
