import React, { useEffect, useState } from "react";
import { reviewActions } from "../../../redux/actions/reviewActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { isPlatform } from '@ionic/react';
import {
  IonButton,
  IonItem,
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
                  dealId={review.featuring_info.id}
                  deal={review.featuring_info.deal}
                  perks={review.featuring_info.perks} />
              </div>
            }
            <IonItem><div className="reviewsPageAd"><Ads /></div></IonItem>
            <IonCardContent className="photoThumbnails">
              <ReviewImageThumbnails
                title={review?.article_title}
                photos={review?.photos}
                thumbnailPhotos={review?.thumbnail_photos}
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
                dealId={review.featuring_info.id}
                deal={review.featuring_info.deal}
                perks={review.featuring_info.perks} />
            }
            <br />
            <IonItem><div className="reviewsPageAd"><Ads /></div></IonItem>
            <IonCardContent className="photoThumbnails">
              <br />
              <ReviewArticle title={review?.article_title} article={review?.article} />
              <br />
            </IonCardContent>
              { review?.featuring_info &&
              <DealInfo
                dealId={review.featuring_info.id}
                deal={review.featuring_info.deal}
                perks={review.featuring_info.perks} />
              }
            <IonItem><div className="reviewsPageAd"><Ads /></div></IonItem>
          </div>
        }
      </IonPage>
    </>
  );
};

export default ReviewPage;
