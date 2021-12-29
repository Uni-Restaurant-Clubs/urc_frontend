import React, { useEffect, useState } from "react";
import { reviewActions } from "../../../redux/actions/reviewActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { isPlatform } from '@ionic/react';
import {
  IonButton,
  IonContent,
  IonCard,
  IonHeader,
  IonCardContent,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Header from "../../../components/Header";
import ReviewImageThumbnails from "../../../components/reviewImageThumbnails";
import ReviewArticle from "../../../components/ReviewArticle";
import ReviewRestaurantInfo from "../../../components/ReviewRestaurantInfo";
import WPCredits from "../../../components/reviews/writerPhotographerCredits";
import Ads from "../../../components/ads";
import DealInfo from "../../../components/reviews/dealInfo";
import Ad from "../../../components/googleAdsense/ad";
import useAnalytics from '../../../hooks/useAnalytics';
import "./index.css"

const ReviewPage: React.FC = () => {

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  let review = useSelector((state: any) => state.reviews.reviews[id]);
  useAnalytics("Review", {restaurant_id: review?.restaurant?.id});

  useEffect(() => {
    const getReview = async (id: string) => {
      return await dispatch(reviewActions.getReview({ id }));
    }

    getReview(id);
  }, [id]);

  return (
    <>
      <IonPage>
        <Header headertitle="Review" />
        { review &&
          <div className="reviewCard">
            <ReviewRestaurantInfo restaurant={review?.restaurant}/>
            { review?.featuring_info &&
              <div className="topDealInfo">
                <DealInfo
                  reviewId={id}
                  deal={review.featuring_info.deal}
                  perks={review.featuring_info.perks} />
              </div>
            }
            <div className="topBannerAd">
              <Ads />
            </div>
            <IonCardContent className="photoThumbnails">
              <ReviewImageThumbnails
                title={review?.article_title}
                photos={review?.photos}
                featuredPhoto={review?.featured_photo}
              />
              <br />
              <br />
              <WPCredits
                writer={review?.writer}
                photographer={review?.photographer}
              />
            </IonCardContent>
            { review?.featuring_info &&
              <DealInfo
                reviewId={id}
                deal={review.featuring_info.deal}
                perks={review.featuring_info.perks} />
            }
            <IonCardContent className="photoThumbnails">
              <Ads />
              <br />
              <br />
              <ReviewArticle title={review?.article_title} article={review?.article} />
              <br />
            </IonCardContent>
              { review?.featuring_info &&
              <DealInfo
                reviewId={id}
                deal={review.featuring_info.deal}
                perks={review.featuring_info.perks} />
              }
            <IonCardContent className="photoThumbnails">
              <Ads />
            </IonCardContent>
          </div>
        }
      </IonPage>
    </>
  );
};

export default ReviewPage;
