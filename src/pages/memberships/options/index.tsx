import {
  IonText,
  IonList,
  IonLoading,
  IonAlert,
  IonListHeader,
  IonItem,
  IonAccordionGroup,
  IonAccordion,
  IonLabel,
  IonPage,
  IonContent,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonButton,
} from "@ionic/react";
import { arrowDownCircle } from 'ionicons/icons';
import { Link } from "react-router-dom";
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
const path = window.location.pathname
const MembershipOptions: React.FC = () => {
  useAnalytics("Membership Options");
  const dispatch = useDispatch();
  const recaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  connected = useIsAuthenticated();
  const currentUser = useSelector((state: any) => state.currentUser.currentUser);
  const activeSubscription = currentUser?.subscription_active;

  const contactLoading = useSelector((state: any) => state.payments.getCheckoutUrlLoading);
  const apiError = useSelector((state: any) => state.payments.getCheckoutUrlFail);

  useEffect(() => {
    let queryParams: any = parseQuery(window.location.search);
    if (queryParams.already_started && connected) {
      sendToCheckout();
    }
  }, [connected]);

  useEffect(() => {
    if (path == '/payment_success') {
      setAlertMessage("Payment Success!");
      setShowAlert(true);
    }

    if (path == '/payment_cancelled') {
      setAlertMessage("Payment Cancelled");
      setShowAlert(true);
    }

  }, [path])

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
            <IonAccordionGroup>

              {/* NO ADS */}
              <IonAccordion value="No Ads">
                <IonItem slot="header">
                  <IonLabel className="membershipBenefits">
                    No Ads
                  </IonLabel>
                </IonItem>
                <IonList slot="content">
                  <IonItem>
                    <IonLabel className="memberBenefitsDetails" class="ion-text-wrap" >
                      Enjoy reviews without ads!
                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonAccordion>

              {/* SUPPORT A LOCAL FOOD CHARITY */}
              <IonAccordion value="Support a local food charity">
                <IonItem slot="header">
                  <IonLabel className="membershipBenefits" class="ion-text-wrap">
                    10% goes to a food charity
                  </IonLabel>
                </IonItem>
                <IonList slot="content">
                  <IonItem>
                    <IonLabel className="memberBenefitsDetails" class="ion-text-wrap" >
                      10% of your payment goes to a food related charity that's based on your location.
                      <p> </p><a href="#">Click here for more info.</a>
                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonAccordion>

              {/* SUPPORT LOCAL RESTAURANTS*/}
              <IonAccordion value="Support local restaurants">
                <IonItem slot="header">
                  <IonLabel className="membershipBenefits">
                    Support local restaurants
                  </IonLabel>
                </IonItem>
                <IonList slot="content">
                  <IonItem>
                    <IonLabel className="memberBenefitsDetails" class="ion-text-wrap" >
                      One of our main missions is to support local restaurants by helping people discover them. By supporting us, you help us support more local restaurants!

                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonAccordion>

              {/* SUPPORT LOCAL ARTISTS*/}
              <IonAccordion value="Support local artists">
                <IonItem slot="header">
                  <IonLabel className="membershipBenefits">
                    Support local artists
                  </IonLabel>
                </IonItem>
                <IonList slot="content">
                  <IonItem>
                    <IonLabel className="memberBenefitsDetails" class="ion-text-wrap" >
                      We help local writers and photographers gain professional experience and eat great food for free. By supporting us, you help us support more local artists!

                    </IonLabel>
                  </IonItem>
                </IonList>
              </IonAccordion>

            </IonAccordionGroup>
            <br/>
            { activeSubscription &&
              <IonButton
                expand="block"
              >
                Currently Subscribed
              </IonButton>
            }
            { !activeSubscription &&
              <IonButton
                expand="block"
                onClick={sendToCheckout}
              >
                Sign Up
              </IonButton>
            }
          </IonCardContent>
        </IonCard>
        { !currentUser &&
          <IonText className="membershipsLoginTitle">
            <p>Already a member?</p>
            <Link className="membershipsLoginLink" to="/login">
              Login here
            </Link>
          </IonText>
        }
      </IonContent>
    </IonPage>
  );
};

export default MembershipOptions;
