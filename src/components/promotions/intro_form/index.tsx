import {
  IonPage, IonContent, IonCard, IonCardContent, IonCardTitle, IonCardHeader,
  IonButton
} from "@ionic/react";
import { useState, useEffect } from "react";
import { isPlatform } from '@ionic/react';
import { useHistory } from "react-router-dom";
import "./index.scss";
import { promotionActions } from "../../../redux/actions/promotionActions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import PromotionInterestedButton from "../../../components/promotions/interestedButton";
import PromotionNotInterestedButton from "../../../components/promotions/notInterestedButton";
import airbrake from "../../../utils/airbrake";
import useScript from '../../../hooks/useScript';
import useAnalytics from '../../../hooks/useAnalytics';

const PromotionsIntroForm: React.FC<{token: string, dispatch: any, setLoading: any,
setAlertMessage, setShowAlert: any, restaurantName: any}> = ({token, dispatch, setLoading,
setAlertMessage, setShowAlert, restaurantName}) => {


  const apiError = useSelector((state: any) => {
    return state.promotions?.isInterestedFail;
  });

  return (
    <IonPage>
      <Header headertitle="Promotions Intro Form" />
      <IonContent>
        <IonCard className="promotionsIntroCard">
          <IonCardContent>
            <IonCardHeader>
              <IonCardTitle>
                Want {restaurantName} to be at the top of the list?
              </IonCardTitle>
            </IonCardHeader>
            <p>It's free for you!</p>
            <p>All we need is a discount and we will...</p>
            <ul>
              <li>Highlight you and add you to the top of our restaurant list</li>
              <li>Spend more than $200 in instagram ads to promote your restaurant</li>
              <li>Focus on your restaurant in our social media accounts and newsletters</li>
            </ul>
            <PromotionInterestedButton
              token={token}
              setLoading={setLoading}
              setAlertMessage={setAlertMessage}
              setShowAlert={setShowAlert}
            />
            <PromotionNotInterestedButton
              token={token}
              setLoading={setLoading}
              setAlertMessage={setAlertMessage}
              setShowAlert={setShowAlert}
            />
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default PromotionsIntroForm;
