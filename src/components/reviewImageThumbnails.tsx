import React, { useState } from "react";
import './reviewImageThumbnails.css';
import {
         IonImg,
         IonThumbnail,
         IonGrid,
         IonCard,
         IonCardHeader,
         IonCardContent,
         IonCardTitle,
         IonRow,
         IonCol,
         IonLabel,
         IonModal,
         IonButton,
         IonContent } from '@ionic/react';
import ImageSlider from "./ImageSlider";

interface Image {
  name: string,
  photo: string
}

interface Props {
  photos: Image[]
}

const ReviewImageThumbnails: React.FC<{photos: Image[];}> = ({ photos }) => {
  photos = photos || [];

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageClick = (e: object, imageId: number) => {
    setSelectedImage(imageId);
    setShowModal(true)
  }

  const pics = photos.map((image, i) =>
    <IonCol key={i}>
      <IonThumbnail onClick={(e) => handleImageClick(e, i) } className="reviewPhotoThumbnail">
        <IonImg src={image.photo} />
      </IonThumbnail>
    </IonCol>
  )
  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>
            Photos
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonGrid>
            <IonRow>
              {pics}
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonCard>
      <IonModal isOpen={showModal} cssClass='my-custom-class' onDidDismiss={()=>setShowModal(false)}>
        <IonButton onClick={() => setShowModal(false)} color="light">Close</IonButton>
        <ImageSlider photos={photos} selectedImage={selectedImage}/>
      </IonModal>
    </>
  );
};

export default ReviewImageThumbnails;
