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
import { logInOutline,
         personAddOutline
       } from 'ionicons/icons';
import './Menu.css';
import LogoutButton from "./LogoutButton";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Register',
    url: '/register',
    iosIcon: personAddOutline,
    mdIcon: personAddOutline
  },
  {
    title: 'Login',
    url: '/login',
    iosIcon: logInOutline,
    mdIcon: logInOutline
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
                  <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  { appPage.iosIcon && appPage.mdIcon &&
                    <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  }
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
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
