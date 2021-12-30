import React, { useEffect, useState } from "react";
import { dealActions } from "../../redux/actions/dealActions";
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
import Header from "../../components/Header";
import useAnalytics from '../../hooks/useAnalytics';
import "./index.scss";

const DealPage: React.FC = () => {

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  let deal = useSelector((state: any) => state.deals.deals[id]);
  useAnalytics("Deal", {feature_period_id: id});

  useEffect(() => {
    const getDeal = async (id: string) => {
      return await dispatch(dealActions.getDeal({ id }));
    }

    getDeal(id);
  }, [id]);

  return (
    <>
      <IonPage>
        <Header headertitle="Get Deal Page" />
        <IonContent>
          <h1>Get Deal</h1>
        </IonContent>
      </IonPage>
    </>
  );
};

export default DealPage;
