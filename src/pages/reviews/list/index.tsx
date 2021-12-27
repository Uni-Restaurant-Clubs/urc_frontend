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
import useAnalytics from '../../../hooks/useAnalytics';
import "./index.css"

const ReviewsPage: React.FC = () => {

  useAnalytics("Reviews");
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

  const featuredReviewItems = Object.keys(reviews).map((key, i) => {
    let review = reviews[key as keyof Review];
    if (review.featuring_info) {
      const info = review?.featuring_info;
      return (
        <ReviewListItem
          key={key}
          id={key}
          name={review?.restaurant?.name}
          title={review?.article_title}
          photo={review?.featured_photo?.photo}
          discountType={info?.discount_type}
          discountNumber={info?.discount_number}
          perks={info?.perks}
          disclaimers={info?.disclaimers}
        />
      )
    }
  })

  const reviewItems = Object.keys(reviews).map((key, i) => {
    let review = reviews[key as keyof Review];
    if (!review.featuring_info) {
      return (
        <ReviewListItem
          key={key}
          id={key}
          name={review?.restaurant?.name}
          title={review?.article_title}
          photo={review?.featured_photo?.photo}
        />
      )
    }
  })

  return (
    <>
      <IonPage>
        <Header headertitle="Reviews" />
        <IonContent>
          { featuredReviewItems.length > 0 &&
            <IonList className="featuredRestaurantList">
              <h5 className="featuredRestaurantLabel">Featured Restaurants</h5>
              {featuredReviewItems.reverse()}
            </IonList>
          }
          <IonList>
            { featuredReviewItems.length > 0 &&
              <h5 className="featuredRestaurantLabel">More Restaurants</h5>
            }
            {reviewItems.reverse()}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ReviewsPage;
