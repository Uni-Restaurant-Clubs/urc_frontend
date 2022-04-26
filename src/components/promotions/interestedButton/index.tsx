import {
  IonButton
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

const PromotionsInterestedButton: React.FC<{token: string, setLoading: any,
setAlertMessage, setShowAlert: any}> = ({token, setLoading,
setAlertMessage, setShowAlert}) => {

  const dispatch = useDispatch();

  const userClickedIsInterested = async () => {
    setLoading(true);
    const formData = { token };

    let res: any = await dispatch(
      promotionActions.sendIsInterested(formData)
    );
    setLoading(false);
    if (res?.status === 200) {
      setAlertMessage("We're excited to hear that you're interested! We will contact you soon. Thank you.");
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
    <IonButton
      expand="block"
      onClick={userClickedIsInterested}
      style={{ marginTop: "1rem" }}
    >
      I'm interested. Tell me more!
    </IonButton>
  );
};

export default PromotionsInterestedButton;
