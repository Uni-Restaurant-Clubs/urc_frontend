import React, { useState } from "react";
import {
         IonImg,
         IonThumbnail,
         IonGrid,
         IonCard,
         IonCardHeader,
         IonCardContent,
         IonCardTitle,
         IonRow,
         IonCol,
         IonLabel,
         IonModal,
         IonButton,
         IonHeader,
         IonToolbar,
         IonTitle,
         IonButtons,
         IonContent } from '@ionic/react';
import "./index.css"

interface FuncProps {
}

interface Props {
  sendPasswordlessEmail: () => void;
  showModal: boolean;
  token: string;
}

const PasswordlessLoginConfirm: React.FC<Props> = (
  { sendPasswordlessEmail, showModal, token }) => {

  const handleResendClick = () => {
    sendPasswordlessEmail();
  }

  return (
    <IonModal isOpen={showModal}>
      <h1>Hwllo</h1>
    </IonModal>
  );
};

export default PasswordlessLoginConfirm;
