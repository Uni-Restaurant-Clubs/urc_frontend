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


const Home: React.FC = () => {

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    async function getReview(id: string) {
      let res = await dispatch(reviewActions.getReview({ id }));
      debugger;
    }
    getReview(id);
    // if id != id in state, then refetch
  }, []);

  return (
    <>
      <IonPage>
        <Header headertitle="Review" />
        <IonContent className="ion-padding bgImg ">
          <div className="home-container">
          <h1>Review</h1>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
