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
        <IonTitle>{props.headertitle}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
