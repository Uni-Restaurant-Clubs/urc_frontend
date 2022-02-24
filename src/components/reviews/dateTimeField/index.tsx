import React, { useEffect, useState } from "react";
import { calendarOutline } from 'ionicons/icons';
import { format, parseISO } from 'date-fns';
// or @mui/lab/Adapter{Dayjs,Luxon,Moment} or any valid date-io adapter
import AdapterMoment from '@mui/lab/AdapterMoment';
import TextField from '@mui/material/TextField';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDateTimePicker from '@mui/lab/StaticDateTimePicker';
import DateTimePicker from '@mui/lab/DateTimePicker';
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

const DateTimeField: React.FC<{ value: any, setValueFunction: any,
   valueError: any, text: string}> = (
     { value, setValueFunction, valueError, text }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const formatDate = (value: any) => {
    if (value) {
      if (typeof value === 'string')
        return format(parseISO(value), 'MMM dd yyyy h:mm aaaa');
      else {
        return format(parseISO(value.toISOString()), 'MMM dd yyyy h:mm aaaa');
      }
    } else {
      return "";
    }
  };

  const minimumStartDate = () => {
   return moment.default().set({'hour': 18, 'minute': 0}).add(7, 'days');
  }

  const maxDate = () => {
   return moment.default().add(45, 'days');
  }

  const closeButtonText = () => {
    return value ? "Close and submit" : "Close";
  }

  return (
    <>
      <IonModal isOpen={modalOpen} className="dateTimeModal"
                onDidDismiss={() => setModalOpen(false)}>
        <div className="dateTimeModalContainer">
          <br/>
          <small className="leftAlign">Note: First available dates are <strong>7 days</strong> from now</small>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <StaticDateTimePicker
              displayStaticWrapperAs="mobile"
              // @ts-ignore
              minutesStep="15"
              renderInput={(props) => <TextField {...props} />}
              minDate={minimumStartDate()}
              maxDate={maxDate()}
              value={value}
              onChange={(newValue) => {
                setValueFunction(newValue);
              }}
            />
          </LocalizationProvider>
          <IonButton className="dateTimeModalCloseButton"
                     color="danger"
                     size="small"
                     onClick={() =>setModalOpen(false)}>
            {"Close"}
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
