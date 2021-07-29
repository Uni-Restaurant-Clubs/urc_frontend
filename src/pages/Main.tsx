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

const Main: React.FC = () => {
  return (
    <>
      <IonPage>
        <Header headertitle="Home" />
        <IonContent className="ion-padding bgImg ">
          <div className="home-container">
            <h2 className="main-title">Welcome to Uni Restuarant</h2>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Main;
