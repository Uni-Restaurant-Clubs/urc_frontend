import {
  IonText,
  IonList,
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
import "./index.css";
import Header from "../../../components/Header";

const MembershipOptions: React.FC = () => {

  const sendToCheckout = () => {

  }

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
                The Foodie
              </IonCardTitle>
            </IonCardHeader>
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
                  Support local restaurants!
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
                  Support local artists!
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
            <br/>
            <IonButton
              expand="block"
              onClick={sendToCheckout}
            >
              Select
            </IonButton>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default MembershipOptions;
