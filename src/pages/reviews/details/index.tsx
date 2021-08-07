import React, { useEffect, useState } from "react";
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

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
  }, []);

  return (
    <>
      <IonPage>
        <Header headertitle="Review" />
        <IonContent className="ion-padding bgImg ">
          <div className="home-container">
          <h1>Review {id}</h1>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
