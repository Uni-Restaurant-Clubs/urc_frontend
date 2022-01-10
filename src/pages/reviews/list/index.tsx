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
import Ads from "../../../components/ads";
import "./index.css"

const ReviewsPage: React.FC = () => {

  useAnalytics("Reviews");
  const [hasFeaturedReviews, setHasFeaturedReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const currentUser = useSelector((state: any) => state.currentUser.currentUser);
  const activeSubscription = currentUser?.subscription_active;
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

  const featuredReviewItems = () => {
    let list = [];
    reviews.forEach((review, i) => {
      if (!activeSubscription && i != 0 && i%5 == 0) {
        list.push((<IonItem><div className="reviewsPageAd"><Ads /></div></IonItem>));
      }
      let key = review?.id;
      if (review.featuring_info) {
        if (!hasFeaturedReviews) {
          setHasFeaturedReviews(true);
        }
        const info = review?.featuring_info;
        let item = (
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
        list.push(item)
      }
    })
    return list;
  }

  const reviewItems = () => {
    let list = [];
    reviews.forEach((review, i) => {
      if (!activeSubscription && i != 0 && i%5 == 0) {
        list.push((<IonItem className="reviewsPageAd"><Ads /></IonItem>));
      }
      let key = review?.id;
      if (!review.featuring_info) {
        let item = (
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
        list.push(item)
      }
    })
    return list;
  }

  return (
    <>
      <IonPage>
        <Header headertitle="Reviews" />
        <IonContent>
          { hasFeaturedReviews &&
            <IonList className="featuredRestaurantList">
              <h5 className="featuredRestaurantLabel">Featured Restaurants</h5>
              {featuredReviewItems()}
            </IonList>
          }
          <IonList>
            { hasFeaturedReviews &&
              <h5 className="featuredRestaurantLabel">More Restaurants</h5>
            }
            {reviewItems()}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ReviewsPage;
