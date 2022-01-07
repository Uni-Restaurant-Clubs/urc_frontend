import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isPlatform } from '@ionic/react';
import { track } from '../../../utils/analytics';
import {
  IonButton,
  IonLoading,
  IonAlert,
  IonContent,
  IonCard,
  IonHeader,
  IonCardContent,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./index.scss";
import { dealActions } from "../../../redux/actions/dealActions";
import LocationDeniedModal from "../deniedModal";
import NotAtRestaurantModal from "../notAtRestaurantModal";
import airbrake from "../../../utils/airbrake";
import { checkInActions } from "../../../redux/actions/checkInActions";

const CheckInButton: React.FC<{
  restaurantId: any, restaurantName: any, setIsAtRestaurant: any, dealId: string}> = (
  { restaurantId, restaurantName, setIsAtRestaurant, dealId}) => {

  const dispatch = useDispatch();

  const [showPrePromptMessage, setShowPrePromptMessage] = useState(false);
  const [showDeniedMessage, setShowDeniedMessage] = useState(false);
  const [showNotAtRestaurantModal, setShowNotAtRestaurantModal] = useState(false);
  const [fetchingCoords, setFetchingCoords] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const createCheckInLoading = useSelector((state: any) => state.checkIns.createCheckInLoading);
  const apiError = useSelector((state: any) => state.checkIns.createCheckInFail);

  useEffect(() => {
    if (apiError) {
      if (Array.isArray(apiError.message)) {
        let outputError = apiError.message.map((errMsg: any) => {
          return `<li>${errMsg}</li>`;
        });

        setAlertMessage(
          `<ul class="errorMessageStyle">${outputError.join("")}</ul`
        );
        setShowAlert(true);
      } else {
        setAlertMessage(
          `<ul class="errorMessageStyle"><li>${
            apiError.message ||
            "Oops looks like something went wrong. Please try again soon"
          }</li></ul`
        );
        setShowAlert(true);
      }
    } else {
    }
  }, [apiError]);

  const getButtonName = () => {
    if (isPlatform("mobile")) {
      return "Tap here to check in";
    } else {
      return "Click here to check in";
    }
  }
  const checkUserIn = async () => {
    setFetchingCoords(true);
    track("Button Click", {restaurant_id: restaurantId, label: "Check In", category: "deals"});
    navigator.geolocation.getCurrentPosition(
      async (response) => {
        const data = {
        feature_period_id: dealId,
        latitude: response.coords.latitude,
        longitude: response.coords.longitude
      }
        let res: any = await dispatch(checkInActions.createCheckIn(data));
        setFetchingCoords(false);
        if (res?.status === 200) {
          if (res?.data?.user_is_at_restaurant) {
            track("check in at restaurant", { restaurant_id: restaurantId,
              label: restaurantName, category: "deals"});
            setIsAtRestaurant(true);
          } else {
            track("check in not at restaurant", { restaurant_id: restaurantId,
              label: restaurantName, category: "deals"});
            setShowNotAtRestaurantModal(true);
          }
        } else if (apiError) {
          setAlertMessage("Oops looks like there was an issue. Please try again soon");
          setShowAlert(true);
          setFetchingCoords(false);
          airbrake.notify({
            error: apiError,
            params: data
          });
        }
      },
      (err) => {
        airbrake.notify({
          error: err,
          location: "getting location from user during deal check in"
        });
        setShowDeniedMessage(true);
        setFetchingCoords(false);
    })
  }

  const checkLocation = () => {
    if (fetchingCoords || createCheckInLoading) {return;}

    navigator.permissions.query({'name': 'geolocation'})
      .then( permission => {
        if (permission.state === "granted") { checkUserIn(); }
        if (permission.state === "prompt") { setShowPrePromptMessage(true); }
        if (permission.state === "denied") {
          setFetchingCoords(false);
          setShowDeniedMessage(true);
        }
      })
  }

  const closeDeniedMessageModal = () => {
    setShowDeniedMessage(false);
  }

  const closeNotAtRestaurantModal = () => {
    setShowNotAtRestaurantModal(false);
  }

  const handleCheckInButtonClick = async () => {
    checkLocation();
  }

  const prePromptAlertMessage = "We are now going to check that you are at the restaurant. If your browser or device asks you for permission to access your location, please accept.";

  return (
    <>
      <IonLoading
        spinner="bubbles"
        message="Please wait ..."
        duration={0}
        isOpen={createCheckInLoading || fetchingCoords}
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
            cssClass: "confirmButtonStyle rightButton",
            handler: () => {
              setAlertMessage("");
            },
          },
        ]}
      />

      <IonAlert
        isOpen={showPrePromptMessage}
        onDidDismiss={() => setShowPrePromptMessage(false)}
        header={"We need your location!"}
        message={prePromptAlertMessage}
        buttons={[
          {
            text: "Ok",
            cssClass: "confirmButtonStyle",
            handler: () => {
              checkUserIn();
            },
          },
        ]}
      />
      <LocationDeniedModal open={showDeniedMessage} closeFunction={closeDeniedMessageModal}/>
      <NotAtRestaurantModal open={showNotAtRestaurantModal} closeFunction={closeNotAtRestaurantModal}/>
      { dealId &&
        <IonButton fill="solid"
                   expand="block"
                   size="large"
                   color="danger"
                   disabled={fetchingCoords || createCheckInLoading}
                   onClick={handleCheckInButtonClick}
                   className="getDealButton"
        >{getButtonName()}</IonButton>
      }
    </>
  );
};

export default CheckInButton;
