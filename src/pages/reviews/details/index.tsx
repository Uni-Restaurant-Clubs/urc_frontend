import React, { useEffect, useState } from "react";
import { reviewActions } from "../../../redux/actions/reviewActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  IonButton,
  IonContent,
  IonCard,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import ReviewImageThumbnails from "../../../components/reviewImageThumbnails";
import ReviewArticle from "../../../components/ReviewArticle";
import ReviewRestaurantInfo from "../../../components/ReviewRestaurantInfo";
import "./index.css"


const ReviewPage: React.FC = () => {

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const review = useSelector((state: any) => state.reviews.reviews[id]);

  useEffect(() => {
    async function getReview(id: string) {
      let res = await dispatch(reviewActions.getReview({ id }));
    }
    getReview(id);
    // if id != id in state, then refetch
  }, []);

  return (
    <>
      <IonPage>
        <Header headertitle="Review" />
          <IonCard className="reviewCard">
            <ReviewRestaurantInfo restaurant={review?.restaurant}/>
            <br />
            <ReviewImageThumbnails
              title={review?.article_title}
              photos={review?.photos} />
            <ReviewArticle title={review?.article_title} article={review?.article} />
          </IonCard>
      </IonPage>
    </>
  );
};

export default ReviewPage;
