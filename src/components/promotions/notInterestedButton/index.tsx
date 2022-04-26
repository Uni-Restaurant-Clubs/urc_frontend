import {
  IonButton, IonAlert
} from "@ionic/react";
import { useState, useEffect } from "react";
import { isPlatform } from '@ionic/react';
import { useHistory } from "react-router-dom";
import "./index.scss";
import { promotionActions } from "../../../redux/actions/promotionActions";
import { useDispatch, useSelector } from "react-redux";
import airbrake from "../../../utils/airbrake";
import useScript from '../../../hooks/useScript';
import useAnalytics from '../../../hooks/useAnalytics';

const PromotionsNotInterestedButton: React.FC<{token: string, setLoading: any,
setAlertMessage, setShowAlert: any}> = ({token, setLoading,
setAlertMessage, setShowAlert}) => {

  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const userClickedNotInterested = async () => {
    setLoading(true);
    const formData = { token };

    let res: any = await dispatch(
      promotionActions.sendNotInterested(formData)
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
        error: "promotion form selected is interested didn't work",
        params: formData
      });
    }
  }

  return (
    <>
      <IonAlert
        isOpen={showConfirm}
        onDidDismiss={() => {
          setShowConfirm(false);
        }}
        header={"Alert"}
        message={"Are you sure you are not interested in being promoted for free?"}
        buttons={[
          {
            text: "Go back",
            cssClass: "schedulingConfirmButtonStyle rightButton",
            handler: () => {
              setShowConfirm(false);
            },
          },
          {
            text: "I am not interested",
            cssClass: "schedulingConfirmButtonStyle rightButton",
            handler: () => {
              userClickedNotInterested();
            },
          },
        ]}
      />
      <IonButton
        expand="block"
        color="danger"
        onClick={setShowConfirm(true)}
        style={{ marginTop: "1rem" }}
      >
       I do not want to be promoted
      </IonButton>
    </>
  );
};

export default PromotionsNotInterestedButton;
