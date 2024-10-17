import urls from "../helpers/url_helpers";
import { post, get } from "../helpers/api_helpers";

const config = {
  headers: { Authorization: "" },
};
//Authentication

//Markets
export async function getProfile() {
  return await get(`${urls.GET_PROFILE}`, config);
}
export async function getCompanyProfile() {
  return await get(`${urls.GET_COMPANY_PROFILE}`, config);
}
export async function updateProfile(data) {
  return await post(`${urls.UPDATE_PROFILE}`, data, config);
}
export async function updateDocuments(data) {
  return await post(`${urls.UPDATE_DOCUMENTS}`, data, config);
}
export async function updateDirectors(data) {
  return await post(`${urls.UPDATE_DIRECTORS}`, data, config);
}
export async function changepassword(data) {
  return await post(`${urls.CHANGE_PASSWORD}`, data, config);
}
export async function updateCompanyProfile(data) {
  return await post(`${urls.UPDATE_COMPANY_PROFILE}`, data, config);
}
export async function settimezone(data) {
  return await post(`${urls.SET_TIMEZONE}`, data, config);
}
export async function deleteaccount(data) {
  return await post(`${urls.DELETE_ACCOUNT}`, data, config);
}
export async function getesfrontstats({ StartDate, EndDate }) {
  return await get(
    `${urls.STOREFRONT_STAT}?StartDate=${StartDate}&EndDate=${EndDate}`,
    config
  );
}
export async function getstorefronttrending({ StartDate, EndDate, top }) {
  return await get(
    `${urls.STOREFRONT_TRENDING_PRODUCT}?StartDate=${StartDate}&EndDate=${EndDate}&top=${top}`,
    config
  );
}
