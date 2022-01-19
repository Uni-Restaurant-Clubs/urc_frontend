import {
  IonButton,
  IonNote,
  IonImg,
  IonRow,
  IonCol,
  IonGrid,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItemDivider,
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
import "./index.scss";
import { reviewActions } from "../../../redux/actions/reviewActions";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/Header";
import airbrake from "../../../utils/airbrake";
import useScript from '../../../hooks/useScript';
import useAnalytics from '../../../hooks/useAnalytics';

const ReviewSchedulingForm: React.FC = () => {
  useAnalytics("Review Scheduling Form");
  useScript(process.env.REACT_APP_RECAPTCHA_URL);
  const dispatch = useDispatch();
  const recaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY

  const [optionOne, setOptionOne] = useState(null);
  const [optionTwo, setOptionTwo] = useState(null);
  const [optionThree, setOptionThree] = useState(null);
  const [confirmSampleDishes, setConfirmSampleDishes] = useState(null);
  const [confirmNoCharge, setConfirmNoCharge] = useState(null);

  const [optionOneError, setOptionOneError] = useState(null);
  const [optionTwoError, setOptionTwoError] = useState(null);
  const [optionThreeError, setOptionThreeError] = useState(null);
  const [confirmSampleDishesError, setConfirmSampleDishesError] = useState(null);
  const [confirmNoChargeError, setConfirmNoChargeError] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const loading = useSelector((state: any) => {
    return state.reviews?.sendScheduleInfoLoading;
  });
  const apiError = useSelector((state: any) => {
    return state.reviews?.sendScheduleInfoFail;
  });

  interface Response {
    status?: number,
  }

  const schedulingInfoFormErrors = () => {
    if (optionOneError || optionTwoError || optionThreeError ||
      confirmSampleDishesError || confirmNoChargeError) {
      return (
        <ul className="reviewSchedulingErrors">
          { optionOneError && <li>{optionOneError}</li>}
          { optionTwoError && <li>{optionTwoError}</li>}
          { optionThreeError && <li>{optionThreeError}</li>}
          { confirmSampleDishesError && <li>{confirmSampleDishesError}</li>}
          { confirmNoChargeError && <li>{confirmNoChargeError}</li>}
        </ul>
      )
    } else {
      return null;
    }
  }

  const validateData = () => {
    let dataValid = true;
    // OPTION ONE
    if (!optionOne) {
      setOptionOneError("Best time option is required");
      dataValid = false;
    } else {
      setOptionOneError(null);
    }
    // OPTION TWO
    if (!optionTwo) {
      setOptionTwoError("2nd best time option is required");
      dataValid = false;
    } else {
      setOptionTwoError(null);
    }
    // OPTION THREE
    if (!optionThree) {
      setOptionThreeError("3rd best time option is required");
      dataValid = false;
    } else {
      setOptionThreeError(null);
    }
    if (!confirmSampleDishes) {
      setConfirmSampleDishesError('You must agree to "I will offer the writer and photographer free sample dishes for them to taste, experience, write about and take photos of"');
      dataValid = false;
    } else {
      setConfirmSampleDishesError(null);
    }
    if (!confirmNoCharge) {
      setConfirmNoChargeError("You must agree to 'I will not charge the writer or photographer for any of the sample food or drinks that we offer them'");
      dataValid = false;
    } else {
      setConfirmNoChargeError(null);
    }
    return dataValid;
  }

  const submitSchedulingInfoForm = async () => {
    const dataValid = validateData();
    if (dataValid) {
      const recaptchaToken = await grecaptcha.execute(recaptchaKey,
                                                    { action: 'submit' });

      const formData = {
          optionOne,
          optionTwo,
          optionThree,
        recaptchaToken
      };

      grecaptcha.ready(async () => {
        let res: any = await dispatch(
          reviewActions.submitSchedulingInfo(formData)
        );
        if (res?.status === 200) {
          setOptionOne(null);
          setOptionTwo(null);
          setOptionThree(null);
          setConfirmSampleDishes(false);
          setConfirmNoCharge(false);
          setAlertMessage("Your available time options were sent! We will now coordinate with our writers and photographers and get back to you soon. We have also sent an email. If you did not receive it, please check your spam folder. Thank you!");
          setShowAlert(true);
        } else if (apiError) {
          setAlertMessage("Oops looks like there was an issue. Please try again soon");
          setShowAlert(true);
          airbrake.notify({
            error: apiError,
            params: formData
          });
        }
      });
    }
  };

  useEffect(() => {
    if (apiError) {
      if (Array.isArray(apiError.message)) {
        let outputError = apiError.message.map((errMsg: any) => {
          return `<li>${errMsg}</li>`;
        });

        setAlertMessage(
          `<ul class="errorMessageStyle">${outputError.join("")}</ul>`
        );
        setShowAlert(true);
      } else {
        setAlertMessage(
          `<ul class="errorMessageStyle"><li>${
            apiError.message ||
            "Oops looks like something went wrong. Please try again soon"
          }</li></ul>`
        );
        setShowAlert(true);
      }
    } else {
    }
  }, [apiError]);

  return (
    <IonPage>
      <Header headertitle="Scheduling Info Form" />
      <IonContent>
        <IonCard className="schedulingInfoCard">
          <IonCardContent>
            <IonCardHeader>
              <IonCardTitle>
                Scheduling Info Form
              </IonCardTitle>
            </IonCardHeader>
            <IonImg className="schedulingInfoFormShieldLogo" src="https://urc-public-images.s3.us-east-2.amazonaws.com/output-onlinepngtools+(1).png?versionId=SchD4XB1FRH2gVCH3PikJsQD1Y2rRmYl"/>
            <br/>
            <p>Thank you for your interest!</p>
            <p>To get started, we just need a little info from you.</p>
            <p>With this info we will be able to coordinate with our photographers and writers to confirm an exact time with you.</p>
            <br/>
            <IonImg src="https://urc-public-images.s3.us-east-2.amazonaws.com/photo-1592861956120-e524fc739696.jpeg"/>
            <br/>

            {schedulingInfoFormErrors()}

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
                  cssClass: "schedulingConfirmButtonStyle rightButton",
                  handler: () => {
                    setAlertMessage("");
                  },
                },
              ]}
            />

            <p className="schedulingFormText">* Required</p>
            <IonGrid>
              <IonRow>
                <IonCol sizeSm="12" sizeMd="6">
                  <IonItem>
                    <IonLabel
                      color={optionOneError ? "danger" : ""}
                      position="floating"
                    >
                      Best time option *
                    </IonLabel>
                    <IonInput
                      placeholder="Best time option"
                      value={optionOne}
                      onIonChange={(e: any) => setOptionOne(e.target.value)}
                    />
                  </IonItem>
                </IonCol>
                <IonCol sizeSm="12" sizeMd="6">
                  <IonItem>
                    <IonLabel
                      color={optionTwoError ? "danger" : ""}
                      position="floating"
                    >
                      2nd best time option *
                    </IonLabel>
                    <IonInput
                      placeholder="2nd best time option"
                      value={optionTwo}
                      onIonChange={(e: any) => setOptionTwo(e.target.value)}
                    />
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol sizeSm="12" sizeMd="6">
                  <IonItem>
                    <IonLabel
                      color={optionThreeError ? "danger" : ""}
                      position="floating"
                    >
                      3rd best time option *
                    </IonLabel>
                    <IonInput
                      placeholder="3rd best date time option"
                      value={optionThree}
                      required={true}
                      onIonChange={(e: any) => setOptionThree(e.target.value)}
                    ></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <br/>
              <IonList>
                <IonItem>
                  <IonLabel
                    color={confirmSampleDishesError ? "danger" : ""}
                    className={`confirmSampleDishesLabel ion-text-wrap`}
                  >
* I agree to offer the writer and photographer free sample dishes for them to taste, experience, write about and take photos of.</IonLabel>
                  <IonCheckbox checked={confirmSampleDishes}
                     slot="start"
                     onIonChange={e => setConfirmSampleDishes(e.detail.checked)} />
                </IonItem>
              </IonList>
              <br/>
              <IonList>
                <IonItem>
                  <IonLabel
                    color={confirmNoChargeError ? "danger" : ""}
                    className={`confirmSampleDishesLabel ion-text-wrap`}
                  >
* I agree to not charge the photographers or writers for any of the sample food or drinks that are offered to them.</IonLabel>
                  <IonCheckbox checked={confirmNoCharge}
                     slot="start"
                     onIonChange={e => setConfirmNoCharge(e.detail.checked)} />
                </IonItem>
              </IonList>
              <IonButton
                expand="block"
                onClick={submitSchedulingInfoForm}
                style={{ marginTop: "1rem" }}
              >
                Submit Scheduling Info
              </IonButton>
              {schedulingInfoFormErrors() &&
                <p>See errors above!</p>
              }
            </IonGrid>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ReviewSchedulingForm;
