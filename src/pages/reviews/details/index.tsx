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
import "./index.css"


const ReviewPage: React.FC = () => {

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  let review = useSelector((state: any) => state.reviews.reviews[id]);

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
              <ReviewArticle title={review?.article_title} article={review?.article} />
            </IonCardContent>
          </IonCard>
        }
      </IonPage>
    </>
  );
};

export default ReviewPage;
