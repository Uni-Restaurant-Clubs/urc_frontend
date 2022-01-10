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
  const [hasFeaturedReviews, setHasFeaturedReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
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


  useEffect(() => {
    async function getReviews() {
      let res:any = await dispatch(reviewActions.getReviews());
      setReviews(res?.data);
    }
    getReviews();
  }, []);

  const featuredReviewItems = reviews.map((review, i) => {
    let key = review?.id;
    if (review.featuring_info) {
      if (!hasFeaturedReviews) {
        setHasFeaturedReviews(true);
      }
      const info = review?.featuring_info;
      return (
        <ReviewListItem
          key={key}
          id={key}
          name={review?.restaurant?.name}
          title={review?.article_title}
          photo={review?.featured_photo?.photo}
          perks={info?.perks}
          deal={info?.deal}
        />
      )
    }
  })

  const reviewItems = reviews.map((review, i) => {
    let key = review?.id;
    if (!review.featuring_info) {
      return (
        <ReviewListItem
          key={key}
          id={key}
          name={review?.restaurant?.name}
          title={review?.article_title}
          photo={review?.featured_photo?.photo}
          perks={null}
          deal={null}
        />
      )
    }
  })

  return (
    <>
      <IonPage>
        <Header headertitle="Reviews" />
        <IonContent>
          { hasFeaturedReviews &&
            <IonList className="featuredRestaurantList">
              <h5 className="featuredRestaurantLabel">Featured Restaurants</h5>
              {featuredReviewItems}
            </IonList>
          }
          <IonList>
            { hasFeaturedReviews &&
              <h5 className="featuredRestaurantLabel">More Restaurants</h5>
            }
            {reviewItems}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ReviewsPage;
