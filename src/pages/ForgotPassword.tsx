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
  
  const ForgotPassword: React.FC = () => {
    const [username, setUserName] = useState(null);
  
    function loginUser() {
      console.log(username);
    }
  
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Forgot Password Page</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonInput
            placeholder="User email"
            onIonChange={(e: any) => setUserName(e.target.value)}
          />
          
          <IonButton onClick={loginUser}>Send Email</IonButton>
  
        </IonContent>
      </IonPage>
    );
  };
  
  export default ForgotPassword;
  