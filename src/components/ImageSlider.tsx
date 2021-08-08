import React, { useRef, useState } from "react";
import { IonSlides,
         IonSlide,
         IonImg,
         IonButton,
         IonThumbnail,
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
      <IonImg src={image.photo} />
      <div>
        <IonLabel>{image.name}</IonLabel>
      </div>
    </IonSlide>
  )
  return (
    <>
      <IonContent>
        <IonSlides onIonSlidesDidLoad={init} ref={mySlides} pager={true} options={slideOpts}>
          {slides}
        </IonSlides>
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
      </div>      </IonContent>
    </>
  );
};

export default ImageSlider;
