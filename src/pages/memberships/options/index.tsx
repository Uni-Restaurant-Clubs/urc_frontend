import {
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { useState, useEffect } from "react";
import "./index.css";
import Header from "../../../components/Header";

const MembershipOptions: React.FC = () => {

  return (
    <IonPage>
      <Header headertitle="Creator Application" />
      <IonContent>
        <IonCard className="applicationCard">
          <IonCardContent>
            <IonCardHeader>
              <IonCardTitle>
                Membership Options
              </IonCardTitle>
            </IonCardHeader>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default MembershipOptions;
