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
  title = title || "";

  return (
    <>
      <IonCard className="articleCard">
        <IonCardHeader>
          <IonCardTitle className="articleTitle">
            {title}
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <div className="reviewArticle" dangerouslySetInnerHTML={{ __html: article }} />
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
    </>
  );
};

export default ReviewArticle;
