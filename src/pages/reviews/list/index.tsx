import React, { useEffect, useState } from "react";
import { reviewActions } from "../../../redux/actions/reviewActions";
import { useDispatch, useSelector } from "react-redux";
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
  IonToolbar,
} from "@ionic/react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import "./index.css"

const ReviewsPage: React.FC = () => {

  const dispatch = useDispatch();
  interface Review {
    featured_photo: object
  }

  interface Reviews {
    reviews: {
      reviews: {
        [key: number]: Review
      }
    }
  }

  const reviews = useSelector((state: any) => state.reviews.reviews);

  useEffect(() => {
    async function getReviews() {
      let res = await dispatch(reviewActions.getReviews());
    }
    getReviews();
  }, []);

  const reviewItems = Object.keys(reviews).map((key, i) => {
    let review = reviews[key as keyof Review];
    return (
      <Link className="reviewItemLink" key={i} to={"/reviews/" + key}>
        <IonItem className="reviewItem" key={i}>
          <div>
            <IonThumbnail key={i} className="reviewsPhotoThumbnail">
              <IonImg src={review?.featured_photo?.photo} />
            </IonThumbnail>
         </div>
          <IonLabel className="reviewItemLabel">
            <h2>{review?.restaurant?.name}</h2>
            <p>{review?.article_title}</p>
            <IonText color="danger">
              <p>40% off</p>
            </IonText>
          </IonLabel>
        </IonItem>
      </Link>
    )
  })

  return (
    <>
      <IonPage>
        <Header headertitle="Reviews" />
        <IonContent>
          <IonList>
            {reviewItems}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ReviewsPage;
