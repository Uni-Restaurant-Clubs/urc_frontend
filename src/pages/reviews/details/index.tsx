import React, { useEffect, useState } from "react";
import { reviewActions } from "../../../redux/actions/reviewActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
import Ad from "../../../components/googleAdsense/ad";
import useAnalytics from '../../../hooks/useAnalytics';
import "./index.css"


const ReviewPage: React.FC = () => {

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  useAnalytics("Review", {restaurant_id: id});
  let review = useSelector((state: any) => state.reviews.reviews[id]);

  useEffect(() => {
    const getReview = async (id: string) => {
      return await dispatch(reviewActions.getReview({ id }));
    }

    getReview(id);
  }, [id]);

  const iframe = '<iframe f=ifr&lt1=_new src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=21&l=ur1&category=gourmet&banner=1HN0SQGXKCCJ4YE167G2&f=ifr<1=_new&linkID=69a3cd67d71f12cd5ad579d57e8f7e70&t=unirestaurant-20&tracking_id=unirestaurant-20" width="125" height="125" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'
  const iframe2 = '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=21&l=ur1&category=gourmet&banner=1F6R1JY1XW26C7B9K2G2&f=ifr&linkID=c3950f4803d1fc1ff372fb6da56edc08&t=unirestaurant-20&tracking_id=unirestaurant-20" width="125" height="125" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'

  return (
    <>
      <IonPage>
        <Header headertitle="Review" />
        { review &&
          <IonCard className="reviewCard">
            <ReviewRestaurantInfo restaurant={review?.restaurant}/>
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
              <div className="amazonAdContainer">
                <div className="amazonAd" dangerouslySetInnerHTML={ {__html: iframe} } />
                <div dangerouslySetInnerHTML={ {__html: iframe2} } />
              </div>
              <br />
              <ReviewArticle title={review?.article_title} article={review?.article} />
            </IonCardContent>
          </IonCard>
        }
      </IonPage>
    </>
  );
};

export default ReviewPage;
