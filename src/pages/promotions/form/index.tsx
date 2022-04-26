import {
  IonPage, IonContent, IonCard, IonCardContent, IonCardTitle, IonCardHeader,
  IonButton, IonLoading, IonAlert
} from "@ionic/react";
import { useState, useEffect } from "react";
import "./index.scss";
import { promotionActions } from "../../../redux/actions/promotionActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Intro from "../../../components/promotions/intro_form";
import airbrake from "../../../utils/airbrake";

const PromotionsForm: React.FC = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [formStep, setFormStep] = useState("");
  let promotionInfo = useSelector((state: any) => state.promotions?.infoForForm);

  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    const getPromotionInfo = async (token: string) => {
      setLoading(true);
      const res:any = await dispatch(promotionActions.getInfoForForm({ token }));
      setLoading(false);
      if (res?.data) {
        setFormStep(res.data.form_step);
        setRestaurantName(res.data.restaurant_name);
      } else {
        setAlertMessage("Oops this link is no longer valid");
        setShowAlert(true);
        airbrake.notify({
          error: "Cannot find restaurant during scheduling form restaurant fetch ",
          token: token
        });
      }
    }

    if (token) {
      getPromotionInfo(token);
    }
  }, [token]);

  const apiError = useSelector((state: any) => {
    return state.promotions?.fetchPromotionInfoFail;
  });

  return (
    <>
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
      {formStep == "one" &&
        <Intro
          token={token}
          dispatch={dispatch}
          setLoading={setLoading}
          setAlertMessage={setAlertMessage}
          setShowAlert={setShowAlert}
          restaurantName={restaurantName}
        />
      }
    </>
  );
};

export default PromotionsForm;
