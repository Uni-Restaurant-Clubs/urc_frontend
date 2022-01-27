import React, { useEffect, useState } from "react";
import { calendarOutline } from 'ionicons/icons';
import { format, parseISO } from 'date-fns';
import * as moment from 'moment';
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
    if (value) {
      return format(parseISO(value), 'MMM dd yyyy h:mm aaaa');
    } else {
      return "";
    }
  };

  const minimumStartDate = () => {
   return moment.default().add(7, 'days').format();
  }

  const closeButtonText = () => {
    return value ? "Close and submit" : "Close";
  }

  return (
    <>
      <IonModal isOpen={modalOpen} className="dateTimeModal"
                onDidDismiss={() => setModalOpen(false)}>
        <div className="dateTimeModalContainer">
          <IonDatetime
            min={minimumStartDate()}
            value={value}
            className="dateTimeComponent"
            onIonChange={ev => setValueFunction(ev.detail.value!)}
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
          className="dateTimeInputField"
          value={formatDate(value)}
          onClick={(e: any) => setModalOpen(true)}
        />
      </IonItem>
    </>
  );
};

export default DateTimeField;
