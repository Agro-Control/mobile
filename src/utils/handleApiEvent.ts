import Event from "../interface/evento";
import { api } from "../api/api";

export const handleApiEvent = (event: Event) => {
  api.post("/eventos", event, {
    headers: {
      "Accept-Language": "pt_BR",
      Accept: "application/json",
    },
  });
};
