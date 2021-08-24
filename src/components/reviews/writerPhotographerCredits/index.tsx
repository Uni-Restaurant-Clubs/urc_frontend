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

interface Writer {
  first_name: string,
  last_name: string,
  photo: string
}

interface Photographer {
  first_name: string,
  last_name: string,
  photo: string
}

const WPCredits: React.FC<{writer: Writer, photographer: Photographer;}> = (
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
