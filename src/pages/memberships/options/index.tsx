import {
  IonText,
  IonList,
  IonLoading,
  IonAlert,
  IonListHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { Storage } from "@capacitor/storage";
import "./index.css";
import Header from "../../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import airbrake from "../../../utils/airbrake";
import useAnalytics from '../../../hooks/useAnalytics';
import useScript from '../../../hooks/useScript';
import useIsAuthenticated from '../../../hooks/useIsAuthenticated';
import { track } from '../../../utils/analytics';
import { parseQuery } from "../../../utils/utils";
import { goToCheckout } from "../../../utils/payments";

let connected = false;
const MembershipOptions: React.FC = () => {
  useAnalytics("Membership Options");
  useScript(process.env.REACT_APP_RECAPTCHA_URL);
  const dispatch = useDispatch();
  const recaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  connected = useIsAuthenticated();

  const contactLoading = useSelector((state: any) => state.payments.getCheckoutUrlLoading);
  const apiError = useSelector((state: any) => state.payments.getCheckoutUrlFail);

  useEffect(() => {
    let queryParams: any = parseQuery(window.location.search);
    if (queryParams.already_started && connected) {
      sendToCheckout();
    }
  }, [connected]);

  const sendToCheckout = async () => {
    track("Button Click", {label: "Membership Purchase", category: "memberships"});
    if (connected) {
      goToCheckout(dispatch);
    } else {
      await Storage.set({
        key: "redirectPath",
        value: "/membership_options?already_started=true",
      });
      window.location.href = "/login";
    }
  }

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

  return (
    <IonPage>
      <Header headertitle="Creator Application" />
      <IonContent>
        <IonText className="membershipsTitle">
          <h1>Memberships</h1>
        </IonText>
        <IonCard className="membershipCard">
          <IonCardContent>
            <IonCardHeader>
              <IonCardTitle>
                Foodie
              </IonCardTitle>
            </IonCardHeader>
            <IonLoading
              spinner="bubbles"
              message="Please wait ..."
              duration={0}
              isOpen={contactLoading}
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
            <IonText>
              <h1>$2.99 / month</h1>
            </IonText>
            <br/>
            <IonText>
              <h2>What do I get?</h2>
            </IonText>
            <IonList>
              <IonItem>
                <IonLabel className="membershipBenefits">
                  No Ads
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel class="ion-text-wrap" className="membershipBenefits">
                  Support a local food charity
                  <ul className="charityDetails">
                    <li>
                      10% of your payment goes to a charity that's based on your location.
                    </li>
                    <li>
                      <a href="#">Click here for more info.</a>
                    </li>
                  </ul>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel className="membershipBenefits">
                  Support local restaurants
                  <ul className="supportLocalRestaurantDetails">
                    <li>
                      One of our main missions is to support locals restaurant by helping people discover them.
                    </li>
                    <li>
                      By supporting us, you help us support more local restaurants!
                    </li>
                  </ul>
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel className="membershipBenefits">
                  Support local artists
                  <ul className="supportLocalArtistDetails">
                    <li>
                      We help local artists (writers and photographers) gain professional experience and eat gourmet food for free!
                    </li>
                    <li>
                      By supporting us, you help us support more local artists!
                    </li>
                  </ul>
                </IonLabel>
              </IonItem>
            </IonList>
            <br/>
            <IonButton
              expand="block"
              onClick={sendToCheckout}
            >
              Sign Up
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default MembershipOptions;
