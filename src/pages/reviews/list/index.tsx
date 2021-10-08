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
import ReviewListItem from "../../../components/reviews/listItem";
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
      <ReviewListItem
        id={key}
        name={review?.restaurant?.name}
        title={review?.article_title}
        photo={review?.featured_photo?.photo}
      />
    )
  })

  return (
    <>
      <IonPage>
        <Header headertitle="Reviews" />
        <IonContent>
          <IonList>
            {reviewItems.reverse()}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ReviewsPage;
