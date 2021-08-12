import React, { useEffect, useState } from "react";
import { reviewActions } from "../../../redux/actions/reviewActions";
import { useDispatch, useSelector } from "react-redux";
import {
  IonButton,
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


  const handleReviewClick = (e: object, reviewId: number) => {

  }

  const reviewItems = Object.keys(reviews).map((key, i) => {
    let review = reviews[key as keyof Review];
    return (
      <Link to={"/reviews/" + key}>
        <IonItem key={i} onClick={(e) => handleReviewClick(e, i) }>
          <IonThumbnail  className="reviewPhotoThumbnail">
            <IonImg src={review?.featured_photo?.photo} />
          </IonThumbnail>
          <IonLabel>
            {review.restaurant.name}
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
