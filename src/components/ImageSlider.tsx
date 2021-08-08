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

// Optional parameters to pass to the swiper instance.
// See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 1,
  speed: 400
};

interface Image {
  name: string,
  photo: string
}

interface Props {
  photos: Image[]
}

const ImageSlider: React.FC<{photos: Image[];}> = ({ photos }) => {
  photos = photos || [];

  const slideOpts = {
    initialSlide: 1,
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
        swiper.slideNext();
      } else if (direction === "prev") {
        swiper.slidePrev();
      }
    }
  };
  const slides = photos.map((image, i) =>
    <IonSlide key={i}>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonImg src={image.photo} />
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonLabel>{image.name}</IonLabel>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonSlide>
  )
  return (
    <>
      <IonContent>
        <div style={{ textAlign: "center", paddingTop: 12 }}>
          <IonButton
            onClick={() => onBtnClicked("prev")}
          >
            PREV
          </IonButton>
          <IonButton
            onClick={() => onBtnClicked("next")}
          >
            NEXT
          </IonButton>
        </div>
        <IonSlides onIonSlidesDidLoad={init} ref={mySlides} pager={true} options={slideOpts}>
          {slides}
        </IonSlides>
      </IonContent>
    </>
  );
};

export default ImageSlider;
