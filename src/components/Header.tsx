import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import "./ExploreContainer.css";

interface ContainerProps {}

const Header: React.FC<any> = props => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{props.headertitle}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
