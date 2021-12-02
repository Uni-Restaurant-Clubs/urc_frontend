import axios from "axios";
import airbrake from "./airbrake";
import { trackUrl } from "../config/analytics"

const track = async (eventName, data) => {
  try {
    const formData = {
      event: {
        event_name: eventName,
        label: data.label,
        category: data.category,
        properties: data.properties
      }
    }
    await axios.post(trackUrl, formData);
  } catch (error) {
    airbrake.notify({
      error: "log event could not be sent",
      params: { eventName, data, error }
    });
  }
}

const pageView = async (pageName, data = {}) => {
  data["label"] = pageName;
  track("Page View", data);
}

export { track, pageView }

