import React, { useEffect, useState } from "react";
import {
  IonCardHeader,
  IonButton,
  IonLabel,
  IonCardContent,
  IonCardTitle,
  IonCard,
} from "@ionic/react";
import "./index.scss"

const DealInfo: React.FC<{ deal: string, perks: string}> = ({ deal, perks}) => {

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
