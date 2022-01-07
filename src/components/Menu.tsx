import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
         personAddOutline, restaurantOutline, mailOutline, diamondOutline,
         earthOutline, accessibilityOutline
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
    title: 'Restaurants',
    url: '/',
    targetBlank: false,
    iosIcon: restaurantOutline,
    mdIcon: restaurantOutline
  },
  {
    title: 'Memberships',
    url: '/membership_options',
    targetBlank: false,
    iosIcon: diamondOutline,
    mdIcon: diamondOutline
  },
  {
    title: 'Charities',
    url: '/charities',
    targetBlank: false,
    iosIcon: accessibilityOutline,
    mdIcon: accessibilityOutline
  },
  {
    title: 'Contact',
    url: '/contact',
    targetBlank: false,
    iosIcon: mailOutline,
    mdIcon: mailOutline
  },
  {
    title: 'Terms and Policies',
    url: '/terms_and_policies',
    targetBlank: false,
    iosIcon: newspaperOutline,
    mdIcon: newspaperOutline
  },
];


const loggedInAppPages: AppPage[] = [
  {
    title: 'Restaurants',
    url: '/',
    targetBlank: false,
    iosIcon: restaurantOutline,
    mdIcon: restaurantOutline
  },
  {
    title: 'Memberships',
    url: '/membership_options',
    targetBlank: false,
    iosIcon: diamondOutline,
    mdIcon: diamondOutline
  },
  {
    title: 'Charities',
    url: '/charities',
    targetBlank: false,
    iosIcon: accessibilityOutline,
    mdIcon: accessibilityOutline
  },
  {
    title: 'Contact',
    url: '/contact',
    targetBlank: false,
    iosIcon: mailOutline,
    mdIcon: mailOutline
  },
  {
    title: 'Terms and Policies',
    url: '/terms_and_policies',
    targetBlank: false,
    iosIcon: newspaperOutline,
    mdIcon: newspaperOutline
  },

]

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
                  { !appPage.targetBlank &&
                    <Link className="menuListItem" key={index} to={appPage.url}>
                      <IonItem href={appPage.url} routerDirection="none" lines="none" detail={false}>
                        <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                        <IonLabel>{appPage.title}</IonLabel>
                      </IonItem>
                    </Link>
                  }

                </IonMenuToggle>
              );
            })
            :
            loggedInAppPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  { !appPage.targetBlank &&
                    <Link className="menuListItem" key={index} to={appPage.url}>
                      <IonItem href={appPage.url} routerDirection="none" lines="none" detail={false}>
                        <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                        <IonLabel>{appPage.title}</IonLabel>
                      </IonItem>
                    </Link>
                  }
                </IonMenuToggle>
              );
            })
          }
          { isAuthenticated &&
            <LogoutButton />
          }
          {appPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  { appPage.targetBlank &&
                    <Link className="menuListItem" key={index} target="_blank" to={appPage.url}>
                      <IonItem  href={appPage.url} target="_blank" routerDirection="none" lines="none" detail={false}>
                        <IonIcon slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                        <IonLabel>{appPage.title}</IonLabel>
                      </IonItem>
                    </Link>
                  }
                </IonMenuToggle>
              );
            })
          }
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
