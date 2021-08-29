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
         IonHeader,
         IonToolbar,
         IonTitle,
         IonButtons,
         IonContent } from '@ionic/react';
import ImageSlider from "./ImageSlider";

interface Image {
  name: string,
  photo: string
}

interface Props {
  photos: Image[]
}

const ReviewImageThumbnails: React.FC<{photos: Image[], title: string;}> = (
  { photos, title }) => {
  photos = photos || [];

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleImageClick = (e: object, imageId: number) => {
    setSelectedImage(imageId);
    setShowModal(true)
  }

  const pics = photos.map((image, i) =>
    <IonThumbnail key={image.name}
                  onClick={(e) => handleImageClick(e, i)}
                  className="reviewPhotoThumbnail">
      <IonImg key={image.name} src={image.photo} />
    </IonThumbnail>
  )
  return (
    <>
      <IonGrid>
        <IonRow>
          {pics}
        </IonRow>
      </IonGrid>
      <IonModal isOpen={showModal} cssClass='imageSlider' onDidDismiss={()=>setShowModal(false)}>
        <IonHeader className="imageSliderHeader" translucent>
          <IonToolbar>
            <IonTitle>
            </IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setShowModal(false)}>Close</IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <ImageSlider photos={photos} selectedImage={selectedImage}/>
      </IonModal>
    </>
  );
};

export default ReviewImageThumbnails;
