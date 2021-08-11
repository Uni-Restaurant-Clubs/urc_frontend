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

const ReviewArticle: React.FC<{article: string, title: string;}> = ({ article, title }) => {
  article = article || "";

  return (
    <>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <div className="reviewArticle" dangerouslySetInnerHTML={{ __html: article }} />
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </>
  );
};

export default ReviewArticle;
