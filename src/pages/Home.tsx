import {
  IonButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { Link } from "react-router-dom";
import "./Home.css";
import Header from "../components/Header";

const Home: React.FC = () => {
  return (
    <>
      <IonPage>
        <Header headertitle="Hello" />
        <IonContent className="ion-padding bgImg ">
          <div className="home-container">
            <h2 className="main-title">Home Page</h2>
            <IonContent fullscreen>
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
