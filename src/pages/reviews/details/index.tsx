import React, { useEffect, useState } from "react";
import { reviewActions } from "../../../redux/actions/reviewActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import ReviewImageThumbnails from "../../../components/reviewImageThumbnails";


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
        <IonContent fullscreen>
          <ReviewImageThumbnails photos={review?.photos} />
        </IonContent>
      </IonPage>
    </>
  );
};

export default ReviewPage;
