import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Storage } from "@capacitor/storage";
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
         IonInput,
         IonItem,
         IonHeader,
         IonToolbar,
         IonTitle,
         IonButtons,
         IonLoading,
         IonAlert,
         IonContent } from '@ionic/react';
import "./index.scss"
import Header from "../../Header";
import { authActions } from "../../../redux/actions/authActions";
import { goToCheckout } from "../../../utils/payments";

interface errorHandling {
  emailError: null;
}

interface Props {
  sendPasswordlessEmail: () => void;
  showModal: boolean;
  token: string;
  email: string;
  closeModal: () => void;
}

const PasswordlessLoginConfirm: React.FC<Props> = (
  { sendPasswordlessEmail, showModal, token, email, closeModal }) => {

  const dispatch = useDispatch();
  const router = useHistory();
  const [codeError, setCodeError] = useState<errorHandling | any>(null);
  const [code, setCode] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const confirmCodeLoading = useSelector((state: any) => {
    return state.auth.confirmPasswordlessLoginLoading;
  });
  const apiError = useSelector((state: any) => {
    return state.auth.confirmPasswordlessLoginFail;
  });

  useEffect(() => {
    if (apiError) {
      if (Array.isArray(apiError.message)) {
        let outputError = apiError.message.map((errMsg: any) => {
          return `<li>${errMsg}</li>`;
        });

        setAlertMessage(
          `<ul class="errorMessageStyle">${outputError.join("")}</ul`
        );
        setShowAlert(true);
      } else {
        setAlertMessage(
          `<ul class="errorMessageStyle"><li>${
            apiError ||
            "Oops looks like something went wrong. Please try again soon"
          }</li></ul`
        );
        setShowAlert(true);
      }
    } else {
    }
  }, [apiError]);

  const handleResendClick = () => {
    sendPasswordlessEmail();
  }

  const confirmCode = async () => {
    let res = await dispatch(authActions.passwordlessLoginConfirm(
      { code, token }));
    if (res && res.length > 0) {
      setLoading(true);
      setCode("");
      let { value } = await Storage.get({
        key: "redirectPath",
      });

      if (value) {
        await Storage.remove({key: "redirectPath"});
        if (value == "/membership_options?already_started=true") {
          goToCheckout(dispatch);
        } else {
          window.location.href = value;
        }
      } else {
        window.location.reload();
      }
    } else {
    }
  };

  return (
    <IonModal className="confirmCodeModal" isOpen={showModal}>
      <IonHeader>
        <IonToolbar>
          <IonImg className="passwordlessHeader" src="https://urc-public-images.s3.us-east-2.amazonaws.com/output-onlinepngtools.png" />
          <IonButtons slot="end">
            <IonButton onClick={() => closeModal()}>Cancel</IonButton>
          </IonButtons>

        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding bgImg ">
        <IonLoading
          spinner="bubbles"
          message="Please wait ..."
          duration={0}
          isOpen={confirmCodeLoading || loading}
        />

        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => {
            setShowAlert(false);
            setAlertMessage("");
          }}
          header={"Alert"}
          message={alertMessage}
          buttons={[
            {
              text: "Ok",
              cssClass: "confirmButtonStyle rightButton",
              handler: () => {
                setAlertMessage("");
              },
            },
          ]}
        />
        <br/>
        <br/>
        <br/>
        <br/>
        <IonCard className="confirmCodeCard">
         <IonCardHeader>
           <IonCardTitle>
             Check your email for a code
           </IonCardTitle>
         </IonCardHeader>
         <br/>
          <IonCardContent>
            <p>We’ve sent a 6-number code to {email}. The code expires shortly, so please enter it soon.</p>
            <br/>
            <IonItem>
              <div>
                <IonInput
                  autofocus={true}
                  placeholder="Enter code"
                  minlength={6}
                  required={true}
                  onIonChange={(e: any) => setCode(e.target.value)}
                ></IonInput>
              </div>
            </IonItem>
            <IonButton
              expand="block"
              onClick={confirmCode}
              style={{ marginTop: "1rem" }}
            >
              Confirm Code
            </IonButton>
            <br/>
            <IonGrid className="mailIcons">
              <IonRow>
                <IonCol sizeXs="6" sizeSm="6" className="gmailIcon">
                  <a href="https://mail.google.com/mail/u/0/" target="_blank">
                    <IonRow>
                      <img src="https://urc-public-images.s3.us-east-2.amazonaws.com/gmail-icon.png"
                           className="mailImage"
                           height="21" />

                      <p>Open Google</p>
                    </IonRow>
                  </a>
                </IonCol>
                <IonCol sizeXs="6" sizeSm="6" className="outlookIcon">
                  <a href="https://outlook.live.com/mail/0/inbox" target="_blank">
                    <IonRow className="outlookIcon">
                      <img src="https://urc-public-images.s3.us-east-2.amazonaws.com/outlook-icon.png"
                           className="mailImage"
                           height="21" />
                      <p>Open Outlook</p>
                    </IonRow>
                  </a>
                </IonCol>
              </IonRow>
            </IonGrid>
            <div className="spamText">
              <p>Can’t find your code?</p>
              <p>Check your spam folder!</p>
            </div>
            <br/>
          </IonCardContent>
        </IonCard>
            <br/>
            <br/>
      </IonContent>
    </IonModal>
  );
};

export default PasswordlessLoginConfirm;
