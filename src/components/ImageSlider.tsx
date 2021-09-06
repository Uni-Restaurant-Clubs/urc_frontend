import React, { useRef, useState } from "react";
import { IonSlides,
         IonSlide,
         IonImg,
         IonButton,
         IonThumbnail,
         IonGrid,
         IonRow,
         IonCol,
         IonLabel,
         IonContent } from '@ionic/react';
import "./ImageSlider.css"

interface Image {
  name: string,
  photo: string
}

interface Props {
  photos: Image[]
}

const ImageSlider: React.FC<{photos: Image[], selectedImage: any;}> = (
  { photos, selectedImage }) => {
  photos = photos || [];

  const slideOpts = {
    initialSlide: selectedImage,
    speed: 400
  };

  const mySlides = useRef(null);
  const [swiper, setSwiper] = useState<any>({});

  const init = async function(this: any) {
      setSwiper(await this.getSwiper());
  };

  const onBtnClicked = async (direction: string) => {
    if (swiper) {
      if (direction === "next") {
        if (swiper.isEnd) {
          swiper.slideTo(0);
        } else {
          swiper.slideNext();
        }
      } else if (direction === "prev") {
        if (swiper.isBeginning) {
          swiper.slideTo(photos.length - 1);
        } else {
          swiper.slidePrev();
        }
      }
    }
  };
  const slides = photos.map((image, i) =>
    <IonSlide key={image.id}>
      <IonGrid>
        <IonRow>
          <IonCol>
            <br/>
            <IonLabel>{image.name}</IonLabel>
            <br/>
            <br/>
            <IonImg key={image.id} className="sliderSingleImage" src={image.photo} />
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonSlide>
  )
  return (
    <>
      <IonContent>
        { selectedImage !== null &&
          <IonSlides
            className="imageSlider"
            onIonSlidesDidLoad={init}
            ref={mySlides}
            options={slideOpts}>
            {slides}
          </IonSlides>
        }
        <div style={{ textAlign: "center", paddingTop: 12 }}>
          <IonButton className="imagePrevButton" color="light"
            onClick={() => onBtnClicked("prev")}
          >
           {"<"}
          </IonButton>
          <IonButton className="imageNextButton" color="light"
            onClick={() => onBtnClicked("next")}
          >
           {">"}
          </IonButton>
        </div>

      </IonContent>
    </>
  );
};

export default ImageSlider;
