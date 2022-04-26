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
      setAlertMessage("Got it! We have marked you as not interested :(");
      setShowAlert(true);
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
        header={"You sure?"}
        message={"You do not want to be promoted for free?"}
        buttons={[
          {
            text: "Oops go back",
            cssClass: "schedulingConfirmButtonStyle rightButton",
            handler: () => {
              setShowConfirm(false);
            },
          },
          {
            text: "I'm Sure",
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
    onClick={() => {
        setShowConfirm(true);
      }}
      style={{ marginTop: "1rem" }}
      >
       I do not want to be promoted
      </IonButton>
    </>
  );
};

export default PromotionsNotInterestedButton;
