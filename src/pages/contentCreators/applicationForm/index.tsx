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
import { contentCreatorActions } from "../../../redux/actions/contentCreatorActions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import airbrake from "../../../utils/airbrake";
import useScript from '../../../hooks/useScript';

interface errorHandling {
  firstNameError: null;
  lastNameError: null;
  emailError: null;
}

const CreatorApplicationForm: React.FC = () => {
  useScript(process.env.REACT_APP_RECAPTCHA_URL);
  const dispatch = useDispatch();
  const recaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY

  const [firstNameError, setfirstNameError] = useState<errorHandling | any>(null);
  const [lastNameError, setLastNameError] = useState<errorHandling | any>(null);
  const [emailError, setEmailError] = useState<errorHandling | any>(null);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const loading = useSelector((state: any) => {
    return state.contentCreators?.application?.loading;
  });
  const apiError = useSelector((state: any) => {
    return state.contentCreators?.application?.fail;
  });

  interface Response {
    status?: number,
  }

  const submitCreatorsApplication = async () => {
    const recaptchaToken = await grecaptcha.execute(recaptchaKey,
                                                  { action: 'submit' });

    const formData = {
      creator: {
        firstName,
        lastName,
        email,
      },
      recaptchaToken
    };

    grecaptcha.ready(async () => {
      let res: any = await dispatch(
        contentCreatorActions.submitApplication(formData)
      );
      if (res?.status === 200) {
        setFirstName(null);
        setLastName(null);
        setEmail(null);
        setAlertMessage("Application Sent! Thank you for applying!. We will get back to you soon.");
        setShowAlert(true);
      } else if (apiError) {
        setAlertMessage("Oops looks like there was an issue. Please try again soon");
        setShowAlert(true);
        airbrake.notify({
          error: apiError,
          params: { firstName, lastName, email }
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
        <Header headertitle="Creator Application" />
        <IonContent>
          <IonCard className="applicationCard">
            <IonCardContent>
              <IonCardHeader>
                <IonCardTitle>
                  Application Form
                </IonCardTitle>
                <IonCardTitle>
                  Writers/Photographers
                </IonCardTitle>
              </IonCardHeader>
              <br/>
              <p>Thank you for your interest!</p>
              <p>Please fill out the following fields and submit the form.</p>
              <p>We will review and reply to you shortly!</p>
              <br/>

              <IonLoading
                spinner="bubbles"
                message="Please wait ..."
                duration={0}
                isOpen={loading}
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
                    color={firstNameError ? "danger" : ""}
                    position="floating"
                  >
                    First Name
                  </IonLabel>
                  <IonInput
                    placeholder="First Name"
                    value={firstName}
                    onIonChange={(e: any) => setFirstName(e.target.value)}
                  />
                </IonItem>
                <IonItem>
                  <IonLabel
                    color={lastNameError ? "danger" : ""}
                    position="floating"
                  >
                    Last Name
                  </IonLabel>
                  <IonInput
                    placeholder="Last Name"
                    value={lastName}
                    onIonChange={(e: any) => setLastName(e.target.value)}
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
                <IonButton
                  expand="block"
                  onClick={submitCreatorsApplication}
                  style={{ marginTop: "1rem" }}
                >
                  Submit Application
                </IonButton>

              </div>
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default CreatorApplicationForm;
