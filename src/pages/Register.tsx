import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";

const Register: React.FC = () => {
  const [username, setUserName] = useState(null);
  const [password, setPassword] = useState(null);

  const registerUser = async () => {
    console.log(username, password);
    let res = await axios.post("/users", {
      email: username,
      password: password,
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Register Page</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonInput
          placeholder="Username"
          value={username}
          onIonChange={(e: any) => setUserName(e.target.value)}
        />
        <IonInput
          type="password"
          placeholder="Password"
          value={password}
          onIonChange={(e: any) => setPassword(e.target.value)}
        />
        <IonButton onClick={registerUser}>Register</IonButton>

        <p>
          Already have account ? <Link to="/login">Login</Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
