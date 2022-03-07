import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isPlatform } from '@ionic/react';
import { useHistory } from "react-router-dom";
import {
  IonButton,
  IonItem,
  IonContent,
  IonCard,
  IonHeader,
  IonCardContent,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Ad from "../googleAdsense/ad";
import "./index.scss"
import { track } from '../../utils/analytics';

const Ads: React.FC = () => {

  let history = useHistory();
  const currentUser = useSelector((state: any) => state.currentUser.currentUser);
  const activeSubscription = currentUser?.subscription_active;

  const handleRemoveAdButtonClick = () => {
    track("Button Click", {label: "remove ad", category: "ads"});
    history.push(`/membership_options`);
  }

  // GOURMET FOOD
  // 125 X 125
  const iframe = '<iframe f=ifr&lt1=_new src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=21&l=ur1&category=gourmet&banner=1HN0SQGXKCCJ4YE167G2&f=ifr<1=_new&linkID=69a3cd67d71f12cd5ad579d57e8f7e70&t=unirestaurant-20&tracking_id=unirestaurant-20" width="125" height="125" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'
  const iframe2 = '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=21&l=ur1&category=gourmet&banner=1F6R1JY1XW26C7B9K2G2&f=ifr&linkID=c3950f4803d1fc1ff372fb6da56edc08&t=unirestaurant-20&tracking_id=unirestaurant-20" width="125" height="125" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'

  // 468 X 60
  const iframe3 = '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=13&l=ur1&category=gourmet&banner=01JS6W4RYN6KHF871E82&f=ifr&linkID=d529b00a2933408471a2ed4f22a52116&t=unirestaurant-20&tracking_id=unirestaurant-20" width="468" height="60" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'
  const iframe4 = '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=13&l=ur1&category=gourmet&banner=05HSXBAM75NQEPYG6682&f=ifr&linkID=6adc91107c30a79ffaa54d913bfbb582&t=unirestaurant-20&tracking_id=unirestaurant-20" width="468" height="60" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'

  // 234 X 60
  const iframe5 = '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=42&l=ur1&category=gourmet&banner=188V5ZBP7ZCWPNNDQJG2&f=ifr&linkID=dd09015162af6a4dc14171638c8bdc6b&t=unirestaurant-20&tracking_id=unirestaurant-20" width="234" height="60" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'

  const iframe7 = '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=42&l=ur1&category=gourmet&banner=041PRA92FWBTSP9MJ982&f=ifr&linkID=a479a03b840a47edb857d42b7928b77f&t=unirestaurant-20&tracking_id=unirestaurant-20" width="234" height="60" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'

  // 728 X 90
  const iframe6 = '<iframe src="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=48&l=ur1&category=gourmet&banner=0DSWRZ5A2FXV23WJNK02&f=ifr&linkID=d17358e0245dd0df87dbf40be51977c6&t=unirestaurant-20&tracking_id=unirestaurant-20" width="728" height="90" scrolling="no" border="0" marginwidth="0" style="border:none;" frameborder="0"></iframe>'

  const small = [iframe5, iframe7];
  const medium = [iframe3, iframe4];
  const getRandom = (list) => {
    return list[Math.floor((Math.random()*list.length))];
  }
  return (
    <>
      { !activeSubscription &&
        <IonItem className="reviewsPageAd">
          <div className="reviewPageAds">
            { isPlatform("desktop") &&
              <div dangerouslySetInnerHTML={ {__html: getRandom(medium)} } />
            }
            { isPlatform("mobile") &&
              <div dangerouslySetInnerHTML={ {__html: getRandom(small)} } />
            }
            <IonButton onClick={handleRemoveAdButtonClick}
                       color="danger" fill="clear"
                       className="removeAdsButton">remove ads</IonButton>
          </div>
        </IonItem>
      }
    </>
  );
};

export default Ads;
