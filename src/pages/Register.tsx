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
} from "@ionic/react";
import { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/actions/authActions";

const Register: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const registerUser = async () => {
    console.log(email, password);
    let res = await dispatch(authActions.registerUser({ email, password }));

    setEmail(null);
    setPassword(null);
  };

  return (
    <div className="">
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Register Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding bgImg ">
          <div className="main-container">
            <h2 className="main-title">Register</h2>

            <IonItem>
              <IonLabel position="floating">Email</IonLabel>
              <IonInput
                placeholder="Email"
                value={email}
                onIonChange={(e: any) => setEmail(e.target.value)}
                required
              ></IonInput>
            </IonItem>

            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                placeholder="Password"
                value={password}
                onIonChange={(e: any) => setPassword(e.target.value)}
              />
            </IonItem>

            <IonButton
              onClick={registerUser}
              expand="block"
              style={{ marginTop: "1rem" }}
            >
              Register
            </IonButton>

            <p className="center">
              Already have account ? <Link to="/login">Login</Link>
            </p>
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default Register;
