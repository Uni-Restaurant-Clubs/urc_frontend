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
  IonModal,
} from "@ionic/react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import ImageSlider from "../../../components/ImageSlider";


const ReviewPage: React.FC = () => {

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const [showModal, setShowModal] = useState(false);
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
          <IonModal isOpen={showModal} cssClass='my-custom-class'>
            <IonButton onClick={() => setShowModal(false)}>Close Modal</IonButton>
            <ImageSlider photos={review?.photos} />
          </IonModal>
          <IonButton onClick={() => setShowModal(true)}>Show Modal</IonButton>
        </IonContent>
        <IonContent className="ion-padding bgImg ">
          <div className="home-container">
          <h1>Review</h1>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ReviewPage;
