import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import airbrake from "../../../utils/airbrake";

const CheckInButton: React.FC<{ dealId: string}> = ({ dealId}) => {

  const [showPrePromptMessage, setShowPrePromptMessage] = useState(false);
  const [showDeniedMessage, setShowDeniedMessage] = useState(false);

  const checkUserIn = () => {
    navigator.geolocation.getCurrentPosition(
      (response) => {
        alert(response.coords.latitude);
        const lat = response.coords.latitude
        const lng = response.coords.longitude
      },
      (err) => {
        airbrake.notify({
          error: err,
          location: "getting location from user during deal check in"
        });
        setShowDeniedMessage(true);
    })
  }

  const checkLocation = () => {

    navigator.permissions.query({'name': 'geolocation'})
      .then( permission => {
        if (permission.state === "granted") { checkUserIn(); }
        if (permission.state === "prompt") { setShowPrePromptMessage(true); }
        if (permission.state === "denied") { setShowDeniedMessage(true); }
      })
  }

  const closeDeniedMessageModal = () => {
    setShowDeniedMessage(false);
  }

  const handleCheckInButtonClick = async () => {
    checkLocation();
  }

  const alertMessage = "We are now going to check that you are at the restaurant. If your browser or device asks you for permission to access your location, please accept.";

  return (
    <>
      <IonContent className="ion-padding bgImg ">
        <IonLoading
          spinner="bubbles"
          message="Please wait ..."
          duration={0}
          isOpen={false}
        />
        <IonAlert
          isOpen={showPrePromptMessage}
          onDidDismiss={() => setShowPrePromptMessage(false)}
          header={"We need your location!"}
          message={alertMessage}
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
        { dealId &&
          <IonButton fill="solid"
                     onClick={handleCheckInButtonClick}
                     className="getDealButton"
          >Check in to unlock deal!</IonButton>
        }
      </IonContent>
    </>
  );
};

export default CheckInButton;
