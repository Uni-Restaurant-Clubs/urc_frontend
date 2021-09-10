import { Notifier } from '@airbrake/browser';

const airbrake = new Notifier({
  projectId: process.env.REACT_APP_AIRBRAKE_ID,
  projectKey: process.env.REACT_APP_AIRBRAKE_KEY
});

export default airbrake;
