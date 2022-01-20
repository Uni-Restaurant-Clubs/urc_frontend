import React, { useEffect, useState } from "react";
import { calendarOutline } from 'ionicons/icons';
import { format, parseISO } from 'date-fns';
import {
  IonIcon,
  IonModal,
  IonDatetime,
  IonLabel,
  IonItem,
  IonInput,
  IonButtons,
  IonButton,
  IonHeader,
  IonToolbar,
  IonImg,
} from "@ionic/react";
import "./index.scss"

const DateTimeField: React.FC<{ value: string, setValueFunction: any,
   valueError: any, text: string}> = (
     { value, setValueFunction, valueError, text }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const formatDate = (value: string) => {
    return format(parseISO(value), 'MMM dd yyyy');
  };

  const closeButtonText = () => {
    return value ? "Close and submit" : "Close";
  }

  return (
    <>
      <IonModal isOpen={modalOpen} className="dateTimeModal"
                onDidDismiss={() => setModalOpen(false)}>
        <div className="dateTimeModalContainer">
          <IonDatetime
            className="dateTimeComponent"
            onIonChange={ev => setValueFunction(formatDate(ev.detail.value!))}
          />
          <IonButton className="dateTimeModalCloseButton"
                     color="danger"
                     onClick={() =>setModalOpen(false)}>
            {closeButtonText()}
          </IonButton>
        </div>
      </IonModal>
      <IonItem>
        <IonLabel
          color={valueError ? "danger" : ""}
          position="floating"
        >
          <IonIcon
          className="dateTimeFieldLabelIcon"
          icon={calendarOutline} />
          <span className="dateTimeFieldLabelText">
            {"   "+ text} *
          </span>
        </IonLabel>
        <IonInput
          value={value}
          onClick={(e: any) => setModalOpen(true)}
        />
      </IonItem>
    </>
  );
};

export default DateTimeField;
