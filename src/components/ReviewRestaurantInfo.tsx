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
import './ReviewRestaurantInfo.css';

interface Restaurant {
  name: string,
  address: string,
  description: string,
  yelp_url: string
}

const ReviewRestaurantInfo: React.FC<{restaurant: Restaurant}> = ({ restaurant }) => {
  restaurant = restaurant || { name: "", address: "", description: "", yelp_url: "" };

  return (
    <>
      <IonCardHeader>
        <IonCardTitle className="articleTitle">
          { restaurant.name }
        </IonCardTitle>

      </IonCardHeader>
      <IonCardContent className="restaurantInfoContent">
        <ul className="restaurantInfoList">
          { restaurant?.address &&
            <li>{ restaurant.address }</li>
          }
          { restaurant?.yelp_url &&
            <li><a href={restaurant.yelp_url} target="_blank">View on Yelp</a></li>
          }
        </ul>
      </IonCardContent>
    </>
  );
};

export default ReviewRestaurantInfo;
