import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import "./ExploreContainer.css";

interface ContainerProps {}

const Header: React.FC<ContainerProps> = ({ headertitle = "Header" }: any) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{headertitle}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
