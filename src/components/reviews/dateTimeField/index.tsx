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
} from "@ionic/react";
import "./index.scss"

const DateTimeField: React.FC<{ value: string, setValueFunction: any,
   valueError: any, text: string}> = (
     { value, setValueFunction, valueError, text }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const formatDate = (value: string) => {
    return format(parseISO(value), 'MMM dd yyyy');
  };

  return (
    <>
      <IonModal isOpen={modalOpen}>
        <IonDatetime
          onIonChange={ev => setValueFunction(formatDate(ev.detail.value!))}
        />
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
