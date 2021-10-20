import {
  IonButton,
  IonImg,
  IonRow,
  IonCol,
  IonGrid,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonContent,
  IonHeader,
  IonInput,
  IonCheckbox,
  IonList,
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
  const [isWriterError, setIsWriterError] = useState<errorHandling | any>(null);
  const [isPhotographerError, setIsPhotographerError] = useState<errorHandling | any>(null);
  const [isVideographerError, setIsVideographerError] = useState<errorHandling | any>(null);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  const [isWriter, setIsWriter] = useState(null);
  const [isPhotographer, setIsPhotographer] = useState(null);
  const [isVideographer, setIsVideographer] = useState(null);
  const [introApplicationText, setIntroApplicationText] = useState(null);
  const [experiencesApplicationText, setExperiencesApplicationText] = useState(null);
  const [whyJoinApplicationText, setWhyJoinApplicationText] = useState(null);

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
        isWriter,
        isPhotographer,
        isVideographer
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
                Writers/Photographers (Brooklyn)
              </IonCardTitle>
            </IonCardHeader>
            <IonImg height="100" className="applicationShieldLogo" src="https://urc-public-images.s3.us-east-2.amazonaws.com/output-onlinepngtools+(1).png"/>
            <br/>
            <p>Thank you for your interest!</p>
            <p>Please fill out the following fields and submit the form.</p>
            <p>We will review and reply to you shortly!</p>
            <br/>
            <IonImg src="https://urc-public-images.s3.us-east-2.amazonaws.com/photo-1592861956120-e524fc739696.jpeg"/>
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

            <p className="applyRequiredText">* Required</p>
            <IonGrid>
              <IonRow>
                <IonCol sizeSm="12" sizeMd="6">
                  <IonItem>
                    <IonLabel
                      color={firstNameError ? "danger" : ""}
                      position="floating"
                    >
                      First Name *
                    </IonLabel>
                    <IonInput
                      placeholder="First Name"
                      value={firstName}
                      onIonChange={(e: any) => setFirstName(e.target.value)}
                    />
                  </IonItem>
                </IonCol>
                <IonCol sizeSm="12" sizeMd="6">
                  <IonItem>
                    <IonLabel
                      color={lastNameError ? "danger" : ""}
                      position="floating"
                    >
                      Last Name *
                    </IonLabel>
                    <IonInput
                      placeholder="Last Name"
                      value={lastName}
                      onIonChange={(e: any) => setLastName(e.target.value)}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol sizeSm="12" sizeMd="6">
                  <IonItem>
                    <IonLabel
                      color={emailError ? "danger" : ""}
                      position="floating"
                    >
                      Email address *
                    </IonLabel>
                    <IonInput
                      placeholder="Enter your email address"
                      value={email}
                      required={true}
                      onIonChange={(e: any) => setEmail(e.target.value)}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <br/>
              <p className="positionOptionsTitle">
                Select all positions you would like to apply for *
              </p>
              <IonRow>
                <IonCol sizeSm="6" sizeMd="6">
                  <IonItem>
                    <IonLabel>Writer</IonLabel>
                    <IonCheckbox slot="start" checked={isWriter}
                      onIonChange={e => setIsWriter(e.detail.checked)} />
                  </IonItem>
                </IonCol>
                <IonCol sizeSm="6" sizeMd="6">
                  <IonItem>
                    <IonLabel>Photographer</IonLabel>
                    <IonCheckbox slot="start" checked={isPhotographer}
                      onIonChange={e => setIsPhotographer(e.detail.checked)} />
                  </IonItem>
                </IonCol>
                <IonCol sizeSm="6" sizeMd="6">
                  <IonItem>
                    <IonLabel>Videographer</IonLabel>
                    <IonCheckbox slot= "start" checked={isVideographer}
                        onIonChange={e => setIsVideographer(e.detail.checked)} />
                  </IonItem>
                </IonCol>
              </IonRow>
              <br/>
              <IonItem>
                <IonLabel position="floating">Tell us about yourself *</IonLabel>
                <IonTextarea className="applicationTextArea" value={introApplicationText}
                    autoGrow="true"
                    onIonChange={e => setIntroApplicationText(e.detail.value!)}>
                </IonTextarea>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">What experience do you have? *</IonLabel>
                <IonTextarea className="applicationTextArea" value={experiencesApplicationText}
                    autoGrow="true"
                    onIonChange={e => setExperiencesApplicationText(e.detail.value!)}>
                </IonTextarea>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Why do you want to join? *</IonLabel>
                <IonTextarea className="applicationTextArea" value={whyJoinApplicationText}
                    autoGrow="true"
                    onIonChange={e => setWhyJoinApplicationText(e.detail.value!)}>
                </IonTextarea>
              </IonItem>
              <br/>
              <br/>
              <IonItem>
                <IonLabel position="stacked">Social media/website links *</IonLabel>
                <IonInput value={whyJoinApplicationText}
                    placeholder="https://instagram.com/me, https://mywebsite.com etc..."
                    onIonChange={e => setWhyJoinApplicationText(e.detail.value!)}>
                </IonInput>
              </IonItem>
              <br/>
              <IonItem>
                <IonLabel
                  color={firstNameError ? "danger" : ""}
                  position="stacked"
                >
                Resume
                </IonLabel>
                <IonInput
                  type="file"
                  value={firstName}
                  onIonChange={(e: any) => setFirstName(e.target.value)}
                />
              </IonItem>
              <br/>
              { isWriter &&
                <IonItem>
                  <IonLabel
                    color={firstNameError ? "danger" : ""}
                    position="stacked"
                  >
                  Writing Example *
                  </IonLabel>
                  <IonInput
                    type="file"
                    value={firstName}
                    onIonChange={(e: any) => setFirstName(e.target.value)}
                  />
                </IonItem>
              }
              <IonButton
                expand="block"
                onClick={submitCreatorsApplication}
                style={{ marginTop: "1rem" }}
              >
                Submit Application
              </IonButton>

            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default CreatorApplicationForm;
