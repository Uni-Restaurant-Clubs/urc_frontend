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

  // GOURMET FOOD
  // 125 X 125
  const iframe = '<iframe f=ifr&lt1=_new src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=21&l=ur1&category=gourmet&banner=1HN0SQGXKCCJ4YE167G2&f=ifr<1=_new&linkID=69a3cd67d71f12cd5ad579d57e8f7e70&t=unirestaurant-20&tracking_id=unirestaurant-20" width="125" height="125" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'
  const iframe2 = '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=21&l=ur1&category=gourmet&banner=1F6R1JY1XW26C7B9K2G2&f=ifr&linkID=c3950f4803d1fc1ff372fb6da56edc08&t=unirestaurant-20&tracking_id=unirestaurant-20" width="125" height="125" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'

  // 468 X 60
  const iframe3 = '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=13&l=ur1&category=gourmet&banner=01JS6W4RYN6KHF871E82&f=ifr&linkID=d529b00a2933408471a2ed4f22a52116&t=unirestaurant-20&tracking_id=unirestaurant-20" width="468" height="60" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'
  const iframe4 = '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=13&l=ur1&category=gourmet&banner=05HSXBAM75NQEPYG6682&f=ifr&linkID=6adc91107c30a79ffaa54d913bfbb582&t=unirestaurant-20&tracking_id=unirestaurant-20" width="468" height="60" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'

  // 234 X 60
  const iframe5 = '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=42&l=ur1&category=gourmet&banner=188V5ZBP7ZCWPNNDQJG2&f=ifr&linkID=dd09015162af6a4dc14171638c8bdc6b&t=unirestaurant-20&tracking_id=unirestaurant-20" width="234" height="60" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'

  const iframe7 = '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=42&l=ur1&category=gourmet&banner=041PRA92FWBTSP9MJ982&f=ifr&linkID=a479a03b840a47edb857d42b7928b77f&t=unirestaurant-20&tracking_id=unirestaurant-20" width="234" height="60" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'

  // 728 X 90
  const iframe6 = '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=48&l=ur1&category=gourmet&banner=0DSWRZ5A2FXV23WJNK02&f=ifr&linkID=d17358e0245dd0df87dbf40be51977c6&t=unirestaurant-20&tracking_id=unirestaurant-20" width="728" height="90" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'

  return (
    <>
      <IonPage>
        <Header headertitle="Review" />
        { review &&
          <IonCard className="reviewCard">
            <ReviewRestaurantInfo restaurant={review?.restaurant}/>
            <div className="topBannerAd">
              { isPlatform("desktop") &&
                <div dangerouslySetInnerHTML={ {__html: iframe6} } />
              }
              { isPlatform("mobile") &&
                <div dangerouslySetInnerHTML={ {__html: iframe5} } />
              }
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
              { isPlatform("desktop") &&
                <div dangerouslySetInnerHTML={ {__html: iframe3} } />
              }
              { isPlatform("mobile") &&
                <div dangerouslySetInnerHTML={ {__html: iframe7} } />
              }
              <br />
              <br />
              <ReviewArticle title={review?.article_title} article={review?.article} />
              <br />
              { isPlatform("mobile") &&
                <div dangerouslySetInnerHTML={ {__html: iframe5} } />
              }
              { isPlatform("desktop") &&
                <div>
                  <br />
                  <div dangerouslySetInnerHTML={ {__html: iframe4} } />
                </div>
              }
            </IonCardContent>
          </IonCard>
        }
      </IonPage>
    </>
  );
};

export default ReviewPage;
