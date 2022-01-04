import React, { useEffect, useState } from "react";
import { dealActions } from "../../redux/actions/dealActions";
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
import "./index.scss";

const DealPage: React.FC = () => {

  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  let deal = useSelector((state: any) => state.deals.deals[id]);
  let restaurant = deal?.restaurant;
  let photo = deal?.review?.featured_photo?.photo;
  useAnalytics("Deal", {feature_period_id: id});

  useEffect(() => {
    const getDeal = async (id: string) => {
      return await dispatch(dealActions.getDeal({ id }));
    }

    getDeal(id);
  }, [id]);

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
                  </IonCardHeader>
                  <p className="dealDeal">{deal?.deal} off!</p>
                  <p className="dealPerk">{deal?.perks}</p>
                  { deal?.disclaimers  &&
                    <div className="dealPageDisclaimerContainer">
                      <p><i className="dealPageDisclaimers">Disclaimers:</i></p>
                      <i className="dealPageDisclaimers">{deal?.disclaimers}</i>
                    </div>
                  }
                  <br />
                  <p>{restaurant?.full_address}</p>
                  <br />
                  <p className="dealPageInstructions">Instructions:</p>
                  <p className="dealPageInstructions">When at restaurant, click on button below in order to receive the discount.</p>
                  <IonIcon className="dealPageIcon" ios={arrowDownOutline} md={arrowDownOutline}></IonIcon>
                  <CheckInButton dealId={id} />
                  <div className="dealImage">
                    <IonImg src={photo} />
                  </div>
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
