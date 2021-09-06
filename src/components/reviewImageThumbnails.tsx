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
  id: string,
  name: string,
  photo: string
}

interface Props {
  photos: Image[]
}

const ReviewImageThumbnails: React.FC<{featuredPhoto: object,
   photos: Image[], title: string;}> = (
  { featuredPhoto, photos, title }) => {
  photos = photos || [];

  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (e: object, imageId: number) => {
    setSelectedImage(imageId);
    setShowModal(true)
  }

  const handleFeatureImageClick = () => {
    Object.keys(photos).forEach(function(key) {
      if (photos[key].id === featuredPhoto?.id) {
        setSelectedImage(key);
        setShowModal(true);
      }
    })
  }

  const pics = photos.map((image, i) =>
    <IonThumbnail key={image.name}
                  onClick={(e) => handleImageClick(e, i)}
                  className="reviewPhotoThumbnail">
      <IonImg key={image.id} src={image.photo} />
    </IonThumbnail>
  )
  return (
    <>
      <IonGrid>
        <IonRow>
            <IonImg onClick={handleFeatureImageClick}
                    key={featuredPhoto?.id}
                    className="reviewFeaturePhoto" src={featuredPhoto?.photo} />
        </IonRow>
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
