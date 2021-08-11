import React, { useState } from "react";
import {
         IonGrid,
         IonCard,
         IonCardHeader,
         IonCardContent,
         IonCardTitle,
         IonRow,
         IonCol,
         IonLabel,
         IonButton,
         IonHeader,
         IonContent } from '@ionic/react';
import './ReviewArticle.css';

const ReviewRestaurantInfo: React.FC<{restaurant: object}> = ({ restaurant }) => {
  restaurant = restaurant || { name: "" };

  return (
    <>
      <IonCard className="articleCard">
        <IonCardHeader>
          <IonCardTitle className="articleTitle">
            {restaurant.name}
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default ReviewRestaurantInfo;
