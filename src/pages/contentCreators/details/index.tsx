import React, { useEffect, useState } from "react";
import { contentCreatorActions } from "../../../redux/actions/contentCreatorActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  IonButton,
  IonImg,
  IonThumbnail,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonContent,
  IonCardTitle,
  IonCard,
  IonHeader,
  IonCardContent,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Header from "../../../components/Header";
import SocialMediaIcons from "../../../components/contentCreators/socialMediaIcons";
import "./index.css"


const ContentCreatorPage: React.FC = () => {

  const dispatch = useDispatch();
  const { public_unique_username } = useParams<{ public_unique_username: string }>();
  const creator = useSelector((state: any) => state.contentCreators.contentCreators[public_unique_username]);

  useEffect(() => {
    async function getContentCreator(public_unique_username: string) {
      let res = await dispatch(contentCreatorActions.getContentCreator({ public_unique_username }));
    }
    getContentCreator(public_unique_username);
  }, [public_unique_username]);

  return (
    <>
      <IonPage>
        <Header headertitle="Review" />
        <IonContent>
          <IonGrid className="contentCreatorPage">
            <IonRow>
              <IonCol sizeXs="12" sizeSm="12" sizeMd="4" sizeLg="4">
                <IonCard className="creatorInfoCard">
                  <IonCardContent>
                    <IonThumbnail className="creatorProfileImage">
                      <IonImg src={creator?.photo}/>
                    </IonThumbnail>
                    <IonCardTitle>{creator?.name}</IonCardTitle>
                    <p>{creator?.creator_type}</p>
                    <br />
                    <SocialMediaIcons creator={creator} />
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol sizeXs="12" sizeSm="12" sizeMd="8" sizeLg="8">
                <IonCard className="creatorBioCard">
                  <IonCardContent>
                    <IonCardTitle>About:</IonCardTitle>
                    <br/>
                    <div className="creatorBioText" dangerouslySetInnerHTML={{ __html: creator?.bio }} />
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ContentCreatorPage;
