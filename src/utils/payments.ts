import airbrake from "../utils/airbrake";
import { paymentActions } from "../redux/actions/paymentActions";

const goToCheckout = async (dispatch:any) => {
  let res: any = await dispatch(paymentActions.getCheckoutUrl({ }));
  if (res?.status === 200 && res?.data?.checkout_url) {
    window.location.href = res.data.checkout_url;
  } else {
    airbrake.notify({
      response: res
    });
  }
}

export { goToCheckout }

