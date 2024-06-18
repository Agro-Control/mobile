import { api } from "../api/api";
import { ApiEvents } from "../interface/ApiEvents";

export const handleApiEvent = (event: ApiEvents) => {
  api.post("/eventos", event, {
    headers: {
      "Accept-Language": "pt_BR",
      Accept: "application/json",
    },
  });
};
