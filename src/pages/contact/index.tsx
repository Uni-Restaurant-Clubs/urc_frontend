import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonTextarea,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonAlert,
} from "@ionic/react";
import { useState, useEffect } from "react";
import "./index.css";
import { contactActions } from "../../redux/actions/contactActions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header";
import airbrake from "../../utils/airbrake";
import useScript from '../../hooks/useScript';
import useAnalytics from '../../hooks/useAnalytics';

interface errorHandling {
  nameError: null;
  emailError: null;
  textError: null;
}

const Login: React.FC = () => {
  useAnalytics("Contact");
  useScript(process.env.REACT_APP_RECAPTCHA_URL);
  const dispatch = useDispatch();
  const recaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY

  const [nameError, setNameError] = useState<errorHandling | any>(null);
  const [emailError, setEmailError] = useState<errorHandling | any>(null);
  const [textError, setTextError] = useState<errorHandling | any>(null);

  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [text, setText] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const contactLoading = useSelector((state: any) => state.contact.loading);
  const apiError = useSelector((state: any) => state.contact.fail);

  interface Response {
    status?: number,
  }

  const sendEmail = async () => {
    grecaptcha.ready(async () => {
      let recaptchaToken = await grecaptcha.execute(recaptchaKey, { action: 'submit' });
      let res: any = await dispatch(contactActions.sendEmail({ email, name, text, recaptchaToken }));
      if (res?.status === 200) {
        setName(null);
        setEmail(null);
        setText(null);
        setAlertMessage("Message Sent! Thank you for contacting us. We will get back to you soon.");
        setShowAlert(true);
      } else if (apiError) {
        setAlertMessage("Oops looks like there was an issue. Please try again soon");
        setShowAlert(true);
        airbrake.notify({
          error: apiError,
          params: { name, email, text }
        });
      }
    });
  };

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
            apiError.message ||
            "Oops looks like something went wrong. Please try again soon"
          }</li></ul`
        );
        setShowAlert(true);
      }
    } else {
    }
  }, [apiError]);

  return (
    <div className=" ">
      <IonPage>
        <Header headertitle="Contact" />
        <IonContent>
          <IonCard className="contactCard">
            <IonCardContent>
              <IonCardHeader>
                <IonCardTitle>
                  Contact Us
                </IonCardTitle>
              </IonCardHeader>

              <IonLoading
                spinner="bubbles"
                message="Please wait ..."
                duration={0}
                isOpen={contactLoading}
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

              <div className="">
                <IonItem>
                  <IonLabel
                    color={nameError ? "danger" : ""}
                    position="floating"
                  >
                    Name
                  </IonLabel>
                  <IonInput
                    placeholder="Your name"
                    value={name}
                    onIonChange={(e: any) => setName(e.target.value)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel
                    color={emailError ? "danger" : ""}
                    position="floating"
                  >
                    Email address
                  </IonLabel>
                  <IonInput
                    placeholder="Enter your email address"
                    value={email}
                    required={true}
                    onIonChange={(e: any) => setEmail(e.target.value)}
                  ></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel
                    color={textError ? "danger" : ""}
                    position="floating"
                  >
                    Message text
                  </IonLabel>
                  <IonTextarea
                    rows={5}
                    value={text}
                    placeholder="Enter text here...."
                    onIonChange={(e: any) => setText(e.target.value)}
                  />
                </IonItem>
                <IonButton
                  expand="block"
                  onClick={sendEmail}
                  style={{ marginTop: "1rem" }}
                >
                  Send Message
                </IonButton>

              </div>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default Login;
