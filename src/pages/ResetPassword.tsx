import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
  IonAlert
} from "@ionic/react";
import { useEffect, useState } from "react";
import "./Login.css";
import { authActions } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const router = useHistory();

  const [password, setPassword] = useState(null);


  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');


  const signupLoading = useSelector((state: any) => state.signupLoading);
  const apiError = useSelector((state: any) => state.updatePasswordFail);

  const resetPassword = async () => {
    console.log(password);
    if (password && password !== "") {
      console.log(password);
      let res: any = await dispatch(authActions.updatePassword({ password }));
      console.log(res);
      if (res) {
        setPassword(null);
        router.push('/login')
        // Redirect logic
      }
    } else {
      return;
    }
  };

  useEffect(()=>{
    if(apiError){
      console.log("apiError = ", apiError.message, apiError);
      setAlertMessage(apiError.message)
      setShowAlert(true);    
    }
  },[apiError])
  
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Reset Password Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent
          className="ion-padding bgImg "
          style={{ textAlign: "center", position: "relative" }}
        >
          {/* {signupLoading && ( */}
            {/* <IonSpinner className="spinnerStyle" name="lines" color="white" /> */}

            <IonLoading spinner="bubbles" message="Please wait ..."  duration={0} isOpen={signupLoading} />
            <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          // cssClass='my-custom-class'
          header={'Error'}
          // subHeader={'Subtitle'}
          message={alertMessage}
          buttons={[
            {
              text: 'Ok',
              handler: () => {
                console.log('Confirm Okay');
              }
            }
          ]}
        />
           {/* )} */}

          <div className="home-container">
            <h2 className="main-title">Reset Password</h2>
            <IonItem>
              <IonLabel position="floating">New Password</IonLabel>
              <IonInput
                placeholder="New Password"
                type="password"
                value={password}
                onIonChange={(e: any) => setPassword(e.target.value)}
              />
            </IonItem>

            <IonButton
              expand="block"
              onClick={resetPassword}
              style={{ marginTop: "1rem" }}
            >
              Reset Password
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ResetPassword;
