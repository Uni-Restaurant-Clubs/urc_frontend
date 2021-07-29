import { IonHeader, IonTitle, IonToolbar, IonButtons,
         IonMenuButton } from "@ionic/react";
import "./ExploreContainer.css";

interface ContainerProps {}

const Header: React.FC<any> = props => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle>Uni Restaurant Club</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
