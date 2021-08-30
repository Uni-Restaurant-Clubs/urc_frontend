import React, { useEffect, useState } from "react";
import { contentCreatorActions } from "../../../redux/actions/contentCreatorActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  IonButton,
  IonList,
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
import ReviewListItem from "../../../components/reviews/listItem";
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

  const reviewItems = creator?.reviews?.map((item: any) => {
    return (
      <ReviewListItem
        key={item?.id}
        id={item?.id}
        name={item?.restaurant_name}
        title={item?.article_title}
        photo={item?.photo}
      />
    )
  })

  return (
    <>
      <IonPage>
        <Header headertitle="Review" />
        <IonContent>
          <IonCard className="creatorInfoCard">
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol className="creatorProfileImageCard" sizeXs="12" sizeSm="4" sizeMd="4" sizeLg="4">
                    <IonThumbnail className="creatorProfileImage">
                      <IonImg src={creator?.photo}/>
                    </IonThumbnail>
                  </IonCol>
                  <IonCol sizeXs="12" sizeSm="6" sizeMd="6" sizeLg="6">
                    <IonCardTitle>{creator?.name}</IonCardTitle>
                    <p>{creator?.creator_type}</p>
                    <br />
                    <SocialMediaIcons creator={creator} />
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
          <IonCard className="creatorBioCard">
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol sizeXs="12" sizeSm="12" sizeMd="12" sizeLg="12">
                      <IonCardTitle>About:</IonCardTitle>
                      <div className="creatorBioText" dangerouslySetInnerHTML={{ __html: creator?.bio }} />
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>
          <IonCard className="creatorReviewsCard">
            <IonCardContent className="creatorReviewsContent">
              <IonCardTitle className="creatorReviewsTitle">Reviews Made</IonCardTitle>
              <br />
              <IonList>
                {reviewItems}
              </IonList>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ContentCreatorPage;
