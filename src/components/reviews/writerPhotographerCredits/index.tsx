import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonCardTitle,
  IonContent,
  IonCard,
  IonHeader,
  IonCardContent,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./index.css"
import WPCard from "./wpCard"

interface Creator {
  first_name: string,
  last_name: string,
  photo: string,
  public_unique_username: string,
}

const WPCredits: React.FC<{writer: Creator, photographer: Creator;}> = (
  { writer, photographer }) => {

  return (
    <div>
      <IonCardTitle className="articleTitle">
        Credits
      </IonCardTitle>
      <br/>
      <IonGrid className="reviewCredits">
        <IonRow className="wpCreditsRow">
          <IonCol className="wpCreditsCol">
            <WPCard person={photographer} contentType="Photographer" />
          </IonCol>
          <IonCol className="wpCreditsCol">
            <WPCard person={writer} contentType="Writer" />
          </IonCol>
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default WPCredits;
