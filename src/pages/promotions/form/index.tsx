import { useState, useEffect } from "react";
import "./index.scss";
import { promotionActions } from "../../../redux/actions/promotionActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import Intro from "../../../components/promotions/intro_form";
import airbrake from "../../../utils/airbrake";

const PromotionsForm: React.FC = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const { token } = useParams<{ token: string }>();

  // make a request to fetch promotion info for restaurant
  const apiError = useSelector((state: any) => {
    return state.promotions?.fetchPromotionInfoFail;
  });

  return (
    <>
      <Intro/>
    </>
  );
};

export default PromotionsForm;
