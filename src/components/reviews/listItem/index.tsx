import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IonButton,
  IonText,
  IonLabel,
  IonThumbnail,
  IonImg,
  IonList,
  IonItem,
  IonContent,
  IonCard,
  IonHeader,
  IonCardContent,
  IonPage,
  IonTitle,
  IonToolbar} from '@ionic/react';
import './index.css';

const ReviewListItem: React.FC<{
    id: string, photo: string, name: string, title: string, discountType: string,
    discountNumber: string, perks: string,
  }> = ({ id, photo, name, title, discountType, discountNumber, perks}) => {
    let classes = "reviewItem";
    if (discountType) {
      classes += " featuredRestaurantItem";
    }

  return (
    <Link className="reviewItemLink" key={id} to={"/reviews/" + id}>
      <IonItem href="#" className={classes} key={id}>
        <div>
          <IonThumbnail key={id} className="reviewsPhotoThumbnail">
            <IonImg src={photo} />
          </IonThumbnail>
       </div>
        <IonLabel key={id} className="reviewItemLabel">
          <h2>{name}</h2>
          <p>{title}</p>
          { discountType &&
            <h2 className="discountListItem">30% off!</h2>
          }
          { perks &&
            <h3 className="discountListItem">{perks}</h3>
          }
        </IonLabel>
      </IonItem>
    </Link>
  );
};

export default ReviewListItem;
