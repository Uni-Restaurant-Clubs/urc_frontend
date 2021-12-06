import { useEffect } from 'react';
import { pageView } from '../utils/analytics';
import { useLocation } from "react-router-dom"

// lots of issues things being called twice or not at all
let loading = false;
let value = null;

const useAnalytics = (pageName, data = {}) => {
  const location = useLocation();
  useEffect(async () => {

    const path = window.location.pathname.split("/")[1]
    if (value != pageName &&
        (pageName.toLowerCase() == path ||
         (pageName == "Reviews" && path == '') ||
         (pageName == "Creator Profile" && path == 'creators') ||
         (pageName == "Review" && path == 'reviews'))) {
        pageView(pageName, data)
        value = pageName;
    }
  }, [location]);
}

export default useAnalytics;
