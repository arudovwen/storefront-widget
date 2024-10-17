import urls from "../helpers/url_helpers";
import { createApiClient } from "~/helpers/update_api_helpers";
// import { withRetryHandling } from "../utils/retry-handling";

const { post } = createApiClient("https://dev.gateway.deltalog.co/api");

const config = {
  headers: { Authorization: `Bearer` },
};
//Orders

export const calculateCost = (data) => {
  return post(`${urls.CALCULATOR_COST}`, data, config);
};

export const getEnquiry = (data) => {
  return post(`${urls.GET_ENQUIRY}`, data, config);
};
