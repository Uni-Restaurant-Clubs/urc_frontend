import { useEffect } from 'react';
import { pageView } from '../utils/analytics';

const useAnalytics = (pageName, data = {}) =>
  useEffect(() => {
    pageView(pageName, data)
  }, [pageName]);

export default useAnalytics;
