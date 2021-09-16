import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  IonButton,
  IonRow,
  IonCol,
  IonImg,
  IonAvatar,
  IonThumbnail,
  IonItem,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonContent,
  IonCard,
  IonHeader,
  IonCardContent,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./index.css"

interface Person {
  first_name: string,
  last_name: string,
  photo: string,
  public_unique_username: string,
}

const WPCard: React.FC<{person: Person, contentType: string;}> = (
  { person, contentType }) => {

  const fullName = () => {
    if (person?.first_name && person?.last_name) {
      return person?.first_name + " " + person?.last_name;
    } else {
      return "";
    }
  }

  const url = () => {
    return "/creators/" + person?.public_unique_username;
  }

  return (
    <>
      { person &&
        <Link className="menuListItem" replace to={url}>
          <IonCard className="wpCreditsCard">
            <IonRow>
              <IonCol className="wpCreditsImageCol">
                <IonThumbnail className="wpCreditsImage">
                  <IonImg src={person?.photo} />
                </IonThumbnail>
              </IonCol>
              <IonCol>
                <IonCardHeader className="wpCreditsHeader">
                  <IonCardTitle className="wpCreditsTitle">
                    {contentType}
                  </IonCardTitle>
                </IonCardHeader>
                <IonCardContent className="wpCreditsContent">
                  {fullName()}
                </IonCardContent>
                <IonButton className="wpProfileButton" fill="clear"
                           size="small">View Profile</IonButton>
              </IonCol>
            </IonRow>
          </IonCard>
        </Link>
      }
    </>
  );
};

export default WPCard;
