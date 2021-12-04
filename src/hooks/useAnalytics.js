import { useEffect } from 'react';
import { pageView } from '../utils/analytics';

const useAnalytics = (pageName, data = {}) => {
  const restaurant_id = data.restaurant_id ? data.restaurant_id.toString() : "";
  const creator_id = data.creator_id ? data.creator_id.toString() : "";
  const user_id = data.user_id ? data.user_id.toString() : "";
  useEffect(() => {
    pageView(pageName, data)
  }, [pageName + data.public_unique_username, restaurant_id + creator_id + user_id]);
}

export default useAnalytics;
