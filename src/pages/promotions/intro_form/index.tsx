import {
  IonPage, IonContent, IonCard, IonCardContent, IonCardTitle, IonCardHeader,
  IonButton, IonLoading, IonAlert
} from "@ionic/react";
import { useState, useEffect } from "react";
import { isPlatform } from '@ionic/react';
import { useHistory } from "react-router-dom";
import "./index.scss";
import { restaurantActions } from "../../../redux/actions/restaurantActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import airbrake from "../../../utils/airbrake";
import useScript from '../../../hooks/useScript';
import useAnalytics from '../../../hooks/useAnalytics';

const PromotionsIntroForm: React.FC = () => {

  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { token } = useParams<{ token: string }>();

  const userClickedIsInterested = async () => {
    setLoading(true);
    const formData = {
      token,
     };

    let res: any = await dispatch(
      promotionActions.sendIsInterested(formData)
    );
    setLoading(false);
    if (res?.status === 200) {
      debugger;
      //const promotionToken = res.data.promotionToken;
      //router.push(`/promotion_form_intro?promotionToken=${promotionToken}`)
    } else {
      setAlertMessage("Oops looks like there was an issue. Please try again soon");
      setShowAlert(true);
      airbrake.notify({
        error: apiError,
        params: formData
      });
    }
  }

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
            <IonButton
              expand="block"
              size="large"
              color="danger"
              onClick={userClickedIsInterested}
              style={{ marginTop: "1rem" }}
            >
              I'm interested. Tell me more!
            </IonButton>

          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default PromotionsIntroForm;
