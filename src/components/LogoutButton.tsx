import {
  IonIcon,
  IonItem,
  IonLabel,
  IonListHeader,
  IonMenuToggle,
} from '@ionic/react';

import { logOutOutline,
       } from 'ionicons/icons';

import { useState, useEffect } from "react";
import { authActions } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const LogoutButton: React.FC = () => {

  const dispatch = useDispatch();
  const router = useHistory();

  const logoutUser = async () => {
    await dispatch(authActions.logoutUser());
    window.location.reload();
    router.push("/register");
  };

  return (
    <IonMenuToggle onClick={logoutUser} key="logout" autoHide={false}>
      <IonItem routerLink="#" routerDirection="none" lines="none" detail={false}>
        <IonIcon slot="start" ios={logOutOutline} md={logOutOutline} />
        <IonLabel>Logout</IonLabel>
      </IonItem>
    </IonMenuToggle>
  );
};

export default LogoutButton;
