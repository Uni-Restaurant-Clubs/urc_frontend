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
                Want to be promoted at the top of the list??
              </IonCardTitle>
            </IonCardHeader>
            <div className="introFormTextContainer">
              <img src="https://urc-public-images.s3.us-east-2.amazonaws.com/promotion-email-banner-1.png"/>
              <h2>It's free for you!</h2>
              <h2>All we need is a discount to get our members excited</h2>
              <div className="introFormPromotionBenefitsText">
                <p>We will..</p>
                <div className="benefitText">
                  <p>Add you to our <b>featured section</b></p>
                  <small>(highlighted at the top of our list)</small>
                </div>
                <div className="benefitText">
                  <p>Spend more than <b>$200 in instagram ads</b></p>
                  <small>(to promote your restaurant alone)</small>
                </div>
                <div className="benefitText">
                  <p><b>Social media accounts and newsletters</b></p>
                  <small>(We focus on your restaurant)</small>
                </div>
              </div>
            </div>
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
