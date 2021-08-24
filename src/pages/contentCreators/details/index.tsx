import React, { useEffect, useState } from "react";
import { contentCreatorActions } from "../../../redux/actions/contentCreatorActions";
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
import "./index.css"


const ContentCreatorPage: React.FC = () => {

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const contentCreator = useSelector((state: any) => state.contentCreators[id]);

  useEffect(() => {
    debugger;
    async function getContentCreator(id: string) {
      let res = await dispatch(contentCreatorActions.getContentCreator({ id }));
    }
    getContentCreator(id);
    // if id != id in state, then refetch
  }, []);

  return (
    <>
      <IonPage>
        <Header headertitle="Review" />
        <IonCard className="reviewCard">
          <IonCardContent>
            Content Creator
          </IonCardContent>
        </IonCard>
      </IonPage>
    </>
  );
};

export default ContentCreatorPage;
