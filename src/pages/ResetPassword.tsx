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
  IonSpinner,
} from "@ionic/react";
import { useState } from "react";
import "./Login.css";
import { authActions } from "../redux/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
const ResetPassword: React.FC = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState(null);

  const signupLoading = useSelector((state: any) => state.signupLoading);

  console.log(signupLoading, " = stateUser");

  const resetPassword = async () => {
    console.log(password);
    if (password && password !== "") {
      console.log(password);
      let res: any = await dispatch(authActions.updatePassword({ password }));
      console.log(res);
      if (res) {
        setPassword(null);

        // Redirect logic
      }
    } else {
      return;
    }
  };

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
          {signupLoading && (
            <IonSpinner className="spinnerStyle" name="lines" color="white" />
          )}

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
