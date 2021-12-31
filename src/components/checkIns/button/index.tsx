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
import { checkInActions } from "../../../redux/actions/checkInActions";

const CheckInButton: React.FC<{ dealId: string}> = ({ dealId}) => {

  const dispatch = useDispatch();

  const [showPrePromptMessage, setShowPrePromptMessage] = useState(false);
  const [showDeniedMessage, setShowDeniedMessage] = useState(false);
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

  const checkUserIn = async () => {
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
          alert("status 200");
          // do something after check in created
          // check if user is at restaurant
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
    setFetchingCoords(true);

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
        { dealId &&
          <IonButton fill="solid"
                     disabled={fetchingCoords || createCheckInLoading}
                     onClick={handleCheckInButtonClick}
                     className="getDealButton"
          >Check in to unlock deal!</IonButton>
        }
      </IonContent>
    </>
  );
};

export default CheckInButton;
