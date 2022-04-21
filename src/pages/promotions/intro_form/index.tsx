import {
  IonPage, IonContent, IonCard, IonCardContent, IonCardTitle, IonCardHeader,
  IonButton, IonLoading, IonAlert
} from "@ionic/react";
import { useState, useEffect } from "react";
import { isPlatform } from '@ionic/react';
import { useHistory } from "react-router-dom";
import "./index.scss";
import { promotionActions } from "../../../redux/actions/promotionActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import PromotionInterestedButton from "../../../components/promotions/interestedButton";
import airbrake from "../../../utils/airbrake";
import useScript from '../../../hooks/useScript';
import useAnalytics from '../../../hooks/useAnalytics';

const PromotionsIntroForm: React.FC = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { token } = useParams<{ token: string }>();

  const apiError = useSelector((state: any) => {
    return state.promotions?.isInterestedFail;
  });

  return (
    <IonPage>
      <Header headertitle="Promotions Intro Form" />
      <IonContent>
        <IonCard className="promotionsIntroCard">
          <IonCardContent>
            <IonLoading
              spinner="bubbles"
              message="Please wait ..."
              duration={0}
              isOpen={loading}
            />
            <IonAlert
              isOpen={showAlert}
              onDidDismiss={() => {
                setShowAlert(false);
                setAlertMessage("");
              }}
              header={"Alert"}
              message={alertMessage}
              buttons={[
                {
                  text: "Ok",
                  cssClass: "schedulingConfirmButtonStyle rightButton",
                  handler: () => {
                    setAlertMessage("");
                  },
                },
              ]}
            />

            <IonCardHeader>
              <IonCardTitle>
                Want to be promoted?
              </IonCardTitle>
            </IonCardHeader>
            <PromotionInterestedButton
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
