import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { arrowDownOutline,
       } from 'ionicons/icons';
import {
  IonButton,
  IonIcon,
  IonImg,
  IonContent,
  IonCardTitle,
  IonCardHeader,
  IonCard,
  IonHeader,
  IonCardContent,
  IonPage,
  IonTitle,
  IonToolbar,
  IonLoading,
} from "@ionic/react";
import Header from "../../components/Header";
import CheckInButton from "../../components/checkIns/button";
import useAnalytics from '../../hooks/useAnalytics';
import { dealActions } from "../../redux/actions/dealActions";
import { track } from '../../utils/analytics';
import "./index.scss";

const DealPage: React.FC = () => {

  const [isAtRestaurant, setIsAtRestaurant] = useState(false);

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  let deal = useSelector((state: any) => state.deals.deals[id]);
  let restaurant = deal?.restaurant;
  let photo = deal?.review?.featured_photo?.photo;
  useAnalytics("Deal", {feature_period_id: id});

  useEffect(() => {
    setIsAtRestaurant(false);
    const getDeal = async (id: string) => {
      return await dispatch(dealActions.getDeal({ id }));
    }

    getDeal(id);
  }, [id]);

  const resetCheckIn = () => {
    setIsAtRestaurant(false);
    track("Button Click",
      {restaurant_id: restaurant?.id,
      label: "go back to Check In", category: "deals"});
  }

  return (
    <>
      <IonLoading
        spinner="bubbles"
        message="loading ..."
        duration={0}
        isOpen={!restaurant?.name}
      />

      <IonPage>
        <Header headertitle="Get Deal Page" />
        <IonContent>
          <IonCard className="dealPageCard">
            <IonCardContent className="dealPageCardContent">
              {restaurant?.name &&
                <>
                  <IonCardHeader>
                    <IonCardTitle>
                      <h1>Deal for {restaurant?.name}</h1>
                    </IonCardTitle>
                    <br />
                    <p>{restaurant?.full_address}</p>
                  </IonCardHeader>
                  <IonCard className="dealDealCard">
                    <p className="dealDeal">{deal?.deal}</p>
                    <p className="dealPerk">{deal?.perks}</p>
                    { deal?.disclaimers  &&
                      <div className="dealPageDisclaimerContainer">
                        <p><i className="dealPageDisclaimers">Disclaimers:</i></p>
                        <i className="dealPageDisclaimers">{deal?.disclaimers}</i>
                      </div>
                    }
                  </IonCard>
                  <br />
                  { !isAtRestaurant &&
                    <>
                      <p className="dealPageInstructions">Instructions:</p>
                      <p className="dealPageInstructions">When at restaurant, click on button below in order to receive the discount.</p>
                      <IonIcon className="dealPageIcon" ios={arrowDownOutline} md={arrowDownOutline}></IonIcon>
                      <CheckInButton restaurantId={restaurant?.id}
                                     restaurantName={restaurant?.name}
                                     setIsAtRestaurant={setIsAtRestaurant}
                                     dealId={id} />
                      <div className="dealImage">
                        <IonImg src={photo} />
                      </div>
                    </>
                  }
                  { isAtRestaurant &&
                    <>
                      <h3 className="checkedInTitle">Welcome and Enjoy!</h3>
                      <p className="">Show this image to your waiter</p>
                      <IonIcon className="dealPageIcon" ios={arrowDownOutline} md={arrowDownOutline}></IonIcon>
                      <div className="isAtRestaurantImage">
                        <IonImg src="https://urc-public-images.s3.us-east-2.amazonaws.com/output-onlinepngtools+(1).png" />
                      </div>
                      <IonButton fill="outline"
                                 className="resetCheckInButton"
                                 onClick={resetCheckIn}>Go back</IonButton>
                    </>
                  }
                </>
              }
            </IonCardContent>
          </IonCard>
        </IonContent>
      </IonPage>
    </>
  );
};

export default DealPage;
