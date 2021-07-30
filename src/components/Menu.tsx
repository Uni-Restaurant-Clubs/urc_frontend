import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import { Storage } from "@capacitor/storage";
import { useLocation } from 'react-router-dom';
import { logInOutline, eyeOutline, speedometerOutline, newspaperOutline,
         personAddOutline
       } from 'ionicons/icons';
import './Menu.css';
import LogoutButton from "./LogoutButton";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  targetBlank: boolean;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Register',
    url: '/register',
    targetBlank: false,
    iosIcon: personAddOutline,
    mdIcon: personAddOutline
  },
  {
    title: 'Login',
    url: '/login',
    targetBlank: false,
    iosIcon: logInOutline,
    mdIcon: logInOutline
  },
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


const Menu: React.FC = () => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState("");

  useEffect(() => {
    const getAuth = async () => {
      let { value } = await Storage.get({
        key: "accessToken",
      });
      if (value === null) {
        value = ""
      }
      setIsAuthenticated(value);
    };
    getAuth();
  }, []);


  let targetBlankReached = false;
  return (
    <IonMenu side="start" contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <br/>
          <IonListHeader>Menu</IonListHeader>
          <br/>
          { !isAuthenticated
            ? appPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  { appPage.targetBlank ?
                    <IonItem href={appPage.url} target="_blank" routerDirection="none" lines="none" detail={false}>
                      <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>
                    :
                    <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                      <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                      <IonLabel>{appPage.title}</IonLabel>
                    </IonItem>

                  }

                </IonMenuToggle>
              );
            })
            :
            <LogoutButton />
          }
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
