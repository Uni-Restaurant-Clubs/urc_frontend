import {
  IonButton, IonDatetime, IonIcon, IonPopover, IonNote, IonImg, IonRow, IonCol,
  IonGrid, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItemDivider,
  IonContent, IonHeader, IonInput, IonCheckbox, IonList, IonItem, IonTextarea,
  IonLabel, IonPage, IonTitle, IonToolbar, IonLoading, IonAlert,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { isPlatform } from '@ionic/react';
import { useHistory } from "react-router-dom";
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
  const router = useHistory();
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
  const [schedulingPhoneNumber, setSchedulingPhoneNumber] = useState('');
  const [schedulingNotes, setSchedulingNotes] = useState('');
  const [confirmSampleDishes, setConfirmSampleDishes] = useState(null);
  const [confirmNoCharge, setConfirmNoCharge] = useState(null);

  const [optionOneError, setOptionOneError] = useState(null);
  const [optionTwoError, setOptionTwoError] = useState(null);
  const [optionThreeError, setOptionThreeError] = useState(null);
  const [confirmSampleDishesError, setConfirmSampleDishesError] = useState(null);
  const [confirmNoChargeError, setConfirmNoChargeError] = useState(null);
  const [schedulingPhoneNumberError, setSchedulingPhoneNumberError] = useState('');
  const [schedulingNotesError, setSchedulingNotesError] = useState('');

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
    //if (dataValid) {
    if (true) {
      const recaptchaToken = await grecaptcha.execute(recaptchaKey,
                                                    { action: 'submit' });

      const formData = {
        token,
        optionOne,
        optionTwo,
        optionThree,
        schedulingPhoneNumber,
        schedulingNotes,
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
          const token = res.data.promotionToken;
          router.push(`/promotion_form/${token}`)

          setAlertMessage("We will contact you soon. Click next to learn how we can feature you at the top of our list!");
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
            { !restaurantInfo?.name && loading &&
              <p>Loading...</p>
            }
            { !restaurantInfo?.name && !loading &&
              <p>Form no longer available</p>
            }
            { restaurantInfo?.name &&
              <>
                <IonCardHeader>
                  <IonCardTitle>
                    { restaurantInfo?.name &&
                      "Hello " + restaurantInfo?.name + "!"
                    }
                  </IonCardTitle>
                </IonCardHeader>
                <p>Thank you for your interest!</p>
                <br/>
                <p>To get started, we just need a little info from you.</p>
                <p>Then we will be able to coordinate with our photographers and writers to confirm an exact time for you.</p>
                <br/>
                <IonImg src="https://urc-public-images.s3.us-east-2.amazonaws.com/photo-1592861956120-e524fc739696.jpeg"/>

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
                  header={"Info received!"}
                  message={alertMessage}
                  buttons={[
                    {
                      text: "Next",
                      cssClass: "schedulingConfirmButtonStyle rightButton",
                      handler: () => {
                        setAlertMessage("");
                      },
                    },
                  ]}
                />

                <p className="schedulingFormText">* Required</p>
                <br/>
                <h2>Please select 3 best time options for us to send a photographer and writer to your restaurant.</h2>
                <br/>
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
                <br />
                <br />
                <h2>Contact Info</h2>
                <IonItem>
                  <IonLabel
                    color={schedulingPhoneNumberError ? "danger" : ""}
                    position="stacked">Phone number</IonLabel>
                  <IonInput value={schedulingPhoneNumber}
                      placeholder="Phone number we can reach you at..."
                      onIonChange={e => setSchedulingPhoneNumber(e.detail.value!)}>
                  </IonInput>
                </IonItem>
                <br />
                <br />
                <h2>Questions or comments</h2>
                <IonItem>
                  <IonLabel
                    color={schedulingNotesError ? "danger" : ""}
                    position="stacked">Anything you want us to know?</IonLabel>
                  <IonTextarea className="schedulingTextArea" value={schedulingNotes}
                      autoGrow={true}
                      onIonChange={e => setSchedulingNotes(e.detail.value!)}>
                  </IonTextarea>
                </IonItem>
                <br/>
                <br/>
                <h2>Sample dishes and no charge confirmation</h2>
                <br/>
                <div className="schedulingNoChargeSection">
                  <p>The only thing we ask from you is if you can <strong>please offer the photographer and writer some sample dishes</strong> that they can taste, write about and take photos of. That will really help us create a great positive review for you!</p>
                  <p>Just to avoid any confusion, we do need a confirmation that the photographer and writer will receive sample dishes and that at the end of the review, the writer and photographer will not be asked to pay for any of the sample food or drinks that you give to them when they come down to review.</p>
                </div>
                <IonList>
                  <IonItem>
                    <IonLabel
                      color={confirmSampleDishesError ? "danger" : ""}
                      className={`confirmSampleDishesLabel ion-text-wrap`}
                    >
    * I agree to offer the writer and photographer free sample dishes.</IonLabel>
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
                  size="large"
                  color="danger"
                  onClick={submitSchedulingInfoForm}
                  style={{ marginTop: "1rem" }}
                >
                  Submit Scheduling Info
                </IonButton>
                <div className="notReadyToScheduleText">
                  <br/>
                  <p><strong>Still not ready to schedule?</strong></p>
                  <p>If you have any questions or concerns, then please email us at <a href="mailto:hello@unirestaurantclub.com">hello@unirestaurantclub.com</a> and we will respond right away!</p>
                  <p>We could even hop on a quick phone call with you to discuss details.</p>
                  <br/>
                  <br/>
                </div>
                {schedulingInfoFormErrors() &&
                  <p>See errors above!</p>
                }
              </>
            }
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default ReviewSchedulingForm;
