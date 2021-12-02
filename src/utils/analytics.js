import axios from "axios";
import airbrake from "./airbrake";

const track = async (eventName, data) => {
  try {
    formData = {
      event: {
        event_name: eventName,
        label: data.label,
        category: data.category,
        properties: data.properties
      }
    }
    await axios.post(finishPasswordlessLoginUrl, formData);
  } catch (error) {
    airbrake.notify({
      error: "log event could not be sent",
      params: { formData, error }
    });
  }
}

const pageView = async (pageName, data = {}) => {
  data["label"] = pageName;
  track("Page View", data);
}

export { track, pageView }

