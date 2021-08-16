import { IonHeader,
         IonThumbnail,
         IonImg, IonTitle, IonToolbar, IonButtons,
         IonMenuButton } from "@ionic/react";
import { Link } from "react-router-dom";
import "./Header.css";

interface ContainerProps {}

const Header: React.FC<any> = props => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <Link to={"/"}>
          <IonImg className="urcHeader" src="https://urc-public-images.s3.us-east-2.amazonaws.com/output-onlinepngtools.png" />
        </Link>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
