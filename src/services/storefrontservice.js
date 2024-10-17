import urls from "../helpers/url_helpers";
import { get } from "../helpers/api_helpers";
import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer` },
};
//Orders

export const storefrontorders = withRetryHandling(
  ({ Status, SortOrder, Search, PageNumber, PageSize }) => {
    return get(
      `${urls.STOREFRONT_ORDERS}?PageSize=${PageSize}&PageNumber=${PageNumber}&Search=${Search}&SortOrder=${SortOrder}&Status=${Status}`,
      config
    );
  }
);

export const storefrontorderdetails = withRetryHandling((orderId) => {
  return get(`${urls.STOREFRONT_ORDER_DETAILS}?orderId=${orderId}`, config);
});
