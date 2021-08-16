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

interface Restaurant {
  name: string,
}

const ReviewRestaurantInfo: React.FC<{restaurant: Restaurant}> = ({ restaurant }) => {
  restaurant = restaurant || { name: "" };

  return (
    <>
      <IonCardHeader>
        <IonCardTitle className="articleTitle">
          {restaurant.name}
        </IonCardTitle>
      </IonCardHeader>
    </>
  );
};

export default ReviewRestaurantInfo;
