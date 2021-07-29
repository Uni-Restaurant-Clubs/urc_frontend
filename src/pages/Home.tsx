import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import "./Home.css";

const Home: React.FC = () => {
  return (
    <>
      <IonPage>
        <Header headertitle="Header" />
        <IonContent className="ion-padding bgImg ">
          <div className="home-container">
            <h2 className="main-title">Test Home Page</h2>
            <IonContent fullscreen>
              <IonHeader collapse="condense">
                <IonToolbar>
                  <IonTitle size="large">Blank</IonTitle>
                </IonToolbar>
              </IonHeader>
              <div className="center">
                <Link to="/register">
                  <IonButton>Register</IonButton>
                </Link>
                <Link to="/login">
                  <IonButton>Login</IonButton>
                </Link>
              </div>
            </IonContent>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
