import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
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
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          placeholder="Username"
          onIonChange={(e: any) => setUserName(e.target.value)}
        />
        <IonInput
          type="password"
          placeholder="Password"
          onIonChange={(e: any) => setPassword(e.target.value)}
        />
        <IonButton onClick={loginUser}>Login</IonButton>

        <p>
          New here? <Link to="/register">Register</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Login;
