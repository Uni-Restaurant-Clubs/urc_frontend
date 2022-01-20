import {
  IonButton, IonDatetime, IonIcon, IonPopover, IonNote, IonImg, IonRow, IonCol,
  IonGrid, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItemDivider,
  IonContent, IonHeader, IonInput, IonCheckbox, IonList, IonItem, IonTextarea,
  IonLabel, IonPage, IonTitle, IonToolbar, IonLoading, IonAlert,
} from "@ionic/react";
import { useState, useEffect } from "react";
import "./index.scss";
import { reviewActions } from "../../../redux/actions/reviewActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import DateTimeField from "../../../components/reviews/dateTimeField";
import airbrake from "../../../utils/airbrake";
import useScript from '../../../hooks/useScript';
import useAnalytics from '../../../hooks/useAnalytics';

const ReviewSchedulingForm: React.FC = () => {
  useAnalytics("Review Scheduling Form");
  useScript(process.env.REACT_APP_RECAPTCHA_URL);
  const dispatch = useDispatch();
  const { token } = useParams<{ token: string }>();
  const recaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY
  let restaurantInfo = useSelector((state: any) => state.reviews?.infoForSchedulingForm);

  const [loading, setLoading] = useState(false);
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [optionThree, setOptionThree] = useState('');
  const [confirmSampleDishes, setConfirmSampleDishes] = useState(null);
  const [confirmNoCharge, setConfirmNoCharge] = useState(null);

  const [optionOneError, setOptionOneError] = useState(null);
  const [optionTwoError, setOptionTwoError] = useState(null);
  const [optionThreeError, setOptionThreeError] = useState(null);
  const [confirmSampleDishesError, setConfirmSampleDishesError] = useState(null);
  const [confirmNoChargeError, setConfirmNoChargeError] = useState(null);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const apiError = useSelector((state: any) => {
    return state.reviews?.sendScheduleInfoFail;
  });

  useEffect(() => {
    const getRestaurantInfo = async (token: string) => {
      setLoading(true);
      await dispatch(reviewActions.getInfoForSchedulingForm({ token }));
      setLoading(false);
    }

    if (token) {
      getRestaurantInfo(token);
    }
  }, [token]);

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
        setLoading(true);
        let res: any = await dispatch(
          reviewActions.submitSchedulingInfo(formData)
        );
        setLoading(false);
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
                { restaurantInfo &&
                  "Hello " + restaurantInfo?.name + "!"
                }
              </IonCardTitle>
            </IonCardHeader>
            <br/>
            <p>Thank you for your interest!</p>
            <br/>
            <p>To get started, we just need a little info from you.</p>
            <p>Then we will be able to coordinate with our photographers and writers to confirm an exact time for you.</p>
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
            <DateTimeField
              value={optionOne}
              setValueFunction={setOptionOne}
              valueError={optionOneError}
              text={"Best time option"}
            />
            <br/>
            <DateTimeField
              value={optionTwo}
              setValueFunction={setOptionTwo}
              valueError={optionTwoError}
              text={"2nd best time option"}
            />
            <br/>
            <DateTimeField
              value={optionThree}
              setValueFunction={setOptionThree}
              valueError={optionThreeError}
              text={"3rd best time option"}
            />
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
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ReviewSchedulingForm;
