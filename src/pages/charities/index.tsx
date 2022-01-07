import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonText,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonTextarea,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonAlert,
  IonImg
} from "@ionic/react";
import "./index.scss";
import Header from "../../components/Header";
import useAnalytics from '../../hooks/useAnalytics';

const Charities: React.FC = () => {
  useAnalytics("Charities");

  return (
    <IonPage>
      <Header headertitle="Contact" />
      <IonContent>
        <div className="charityContainer">
          <IonCardHeader className="charityTitle">
            <IonCardTitle>
              Charities
            </IonCardTitle>
          </IonCardHeader>
          <br />
          <IonCardContent>
          <p>10% of all membership payments goes towards "The Campaign Against Hunger".</p>
          <div className="charityLogo">
            <IonImg src="https://urc-public-images.s3.us-east-2.amazonaws.com/tcah_logo_web.png" />
          </div>
          <p>They are a Brooklyn based, food related charity.</p>
          <p>Website: <a href="https://www.tcahnyc.org/" target="_blank">www.tcahnyc.org</a></p>
          <p>Their mission:</p>
          <i>"empower our neighbors to lead healthier, more productive, and self-sufficient lives by increasing access to safe, nutritious food and related resources."</i>
          <a href="https://www.tcahnyc.org/" target="_blank">
            <div className="charityPhoto2">
              <IonImg src="https://urc-public-images.s3.us-east-2.amazonaws.com/Screen+Shot+2022-01-07+at+1.48.32+PM.png" />
            </div>
            <div className="charityPhoto3">
              <IonImg src="https://urc-public-images.s3.us-east-2.amazonaws.com/Screen+Shot+2022-01-07+at+3.45.24+PM.png" />
            </div>
            <div className="charityPhoto4">
              <IonImg src="https://urc-public-images.s3.us-east-2.amazonaws.com/Screen+Shot+2022-01-07+at+2.42.10+PM.png" />
            </div>
            <div className="charityPhoto5">
              <IonImg src="https://urc-public-images.s3.us-east-2.amazonaws.com/Screen+Shot+2022-01-07+at+2.46.57+PM.png" />
            </div>
          </a>
          </IonCardContent>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Charities;
