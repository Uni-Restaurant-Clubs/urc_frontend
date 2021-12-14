import { Link } from "react-router-dom";
import {
  IonButton,
  IonLabel,
  IonIcon,
  IonList,
  IonContent,
  IonHeader,
  IonItem,
  IonItemDivider,
  IonPage,
} from "@ionic/react";
import { logInOutline, eyeOutline, speedometerOutline, newspaperOutline,
         personAddOutline, restaurantOutline, mailOutline, diamondOutline,
       } from 'ionicons/icons';
import "./index.scss";
import Header from "../../components/Header";
import useAnalytics from '../../hooks/useAnalytics';

const TermsAndPolicies: React.FC = () => {
  useAnalytics("Terms and Policies");
  const appPages = [
    {
      title: 'Privacy Policy',
      url: 'https://www.iubenda.com/privacy-policy/25768068/full-legal',
      targetBlank: true,
      iosIcon: eyeOutline,
      mdIcon: eyeOutline
    },
    {
      title: 'Cookie Policy',
      url: 'https://www.iubenda.com/privacy-policy/25768068/cookie-policy',
      targetBlank: true,
      iosIcon: speedometerOutline,
      mdIcon: speedometerOutline
    },
    {
      title: 'Terms and Conditions',
      url: 'https://www.iubenda.com/terms-and-conditions/25768068',
      targetBlank: true,
      iosIcon: newspaperOutline,
      mdIcon: newspaperOutline
    },
  ];

  return (
    <IonPage>
      <Header headertitle="Register" />
      <IonContent className="ion-padding bgImg ">
        <IonList>
          {appPages.map((appPage, index) => {
            return (
              <Link className="menuListItem" key={index} target="_blank" to={appPage.url}>
                <IonItem  href={appPage.url} target="_blank" routerDirection="none" lines="none" detail={false}>
                  <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
                <IonItemDivider></IonItemDivider>
              </Link>
            );
          })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default TermsAndPolicies;

