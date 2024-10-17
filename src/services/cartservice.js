import urls from "../helpers/url_helpers";
import { post, get, del, put } from "../helpers/api_helpers";
import { withRetryHandling } from "../utils/retry-handling";
import { cleanObject } from "@/utils/cleanObject";

const config = {
  headers: { Authorization: `Bearer ` },
};
//Authentication

export async function createcart(data) {
  return await post(urls.CREATE_CART, data, config);
}
export async function updatecart(data) {
  return await post(urls.UPDATE_CART, data, config);
}
export async function getcart() {
  return await get(urls.GET_CART, config);
}
export async function clearcart() {
  return await post(urls.CLEAR_CART, {}, config);
}
export async function removecartitem(data) {
  return await post(`${urls.REMOVE_CART}/${data}`, data, config);
}
export async function deleteAddress(data) {
  return await post(`${urls.DELETE_SHIPPING}/${data}`, data, config);
}
export async function addshipping(data) {
  return await post(urls.ADD_SHIPPING_ADDRESS, cleanObject(data), config);
}

export async function editshipping(data) {
  return await post(urls.EDIT_SHIPPING_ADDRESS, data, config);
}
export async function applyDiscount(data) {
  return await post(urls.APPLY_DISCOUNT, data, config);
}

export async function setdefaultaddress(addressId) {
  return await post(
    `${urls.DEFAULT_SHIPPING_ADDRESS}/${addressId}`,
    "",
    config
  );
}

export const getalladdress = withRetryHandling(() => {
  return get(`${urls.GET_SHIPPING_ADDRESS}`, config);
});

export const getallpickuplocations = withRetryHandling(() => {
  return get(`${urls.GET_PICKUP_ADDRESS}`, config);
});

export async function deletePickupLocation(data) {
  return await del(`${urls.DELETE_PICKUP}/${data}`, data, config);
}
export async function addPickupLocation(data) {
  return await post(urls.ADD_PICKUP_ADDRESS, data, config);
}

export async function editPickupLocation(data) {
  return await put(`${urls.EDIT_PICKUP_ADDRESS}/${data.id}`, data, config);
}
export async function confirmpurchase(data) {
  return await post(`${urls.CONFIRM_PURCHASE}`, data, config);
}
export async function requestACall(data) {
  return await get(`${urls.REQUEST_A_CALL}`, data, config);
}

export async function shippingBreakdown() {
  return await get(`${urls.SHIPPONG_COST_BREAKDOWN}`, config);
}
export async function confirmpayment(data) {
  return await post(
    `${urls.CONFIRM_PAYMENT}?orderId=${data.orderId}`,
    data,
    config
  );
}

export async function getcartorder(data) {
  return await get(
    `${urls.GET_ORDER}?${new URLSearchParams(cleanObject(data))}`,
    config
  );
}
export async function getcartcustomer(data) {
  return await get(
    `${urls.GET_CUSTOMER_INFO}?${new URLSearchParams(cleanObject(data))}`,
    config
  );
}

export async function addressSearch(data) {
  return await get(
    `${urls.ADDRESS_SEARCH}?${new URLSearchParams(cleanObject(data))}`,
    config
  );
}
export async function placeSuggestion(data) {
  return await get(
    `${urls.PLCAE_SUGGESTION}?${new URLSearchParams(cleanObject(data))}`,
    config
  );
}
