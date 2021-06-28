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
import "./Login.css";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  function loginUser() {
    console.log(username, password);
  }

  return (
    <div className=" ">
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Login Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding bgImg ">
          <div className="main-container">
            <h2 className="main-title">Login</h2>
            <IonItem>
              <IonLabel position="floating">Username</IonLabel>
              <IonInput
                placeholder="Username"
                onIonChange={(e: any) => setUserName(e.target.value)}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Password</IonLabel>
              <IonInput
                type="password"
                placeholder="Password"
                onIonChange={(e: any) => setPassword(e.target.value)}
              />
            </IonItem>

            <IonButton
              expand="block"
              onClick={loginUser}
              style={{ marginTop: "1rem" }}
            >
              Login
            </IonButton>

            <div className="center">
              <p>
                New here? <Link to="/register">Register</Link>
              </p>
              <p>
                <Link to="/forgotPassword">Forgot Password?</Link>
              </p>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </div>
  );
};

export default Login;
