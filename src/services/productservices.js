import urls from "../helpers/url_helpers";
import { post, get } from "../helpers/api_helpers";
import { cleanObject } from "~/utils/cleanObject";

const config = {
  headers: { Authorization: null },
};
//Authentication

//Markets
export async function getMarkets({ PageNumber = 1, PageSize = 10 }) {
  return await get(
    `${urls.GET_MARKETS}?PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}

export async function getProductsByTag(payload) {
  return await post(`${urls.GET_PRODUCTS_BY_TAG}`, payload, config);
}

export async function getMarketmenu({
  ShowSubMenu = false,
  PageNumber = 1,
  PageSize = 10,
  MarketId = "",
}) {
  return await get(
    `${urls.GET_MARKET_MENU}?ShowSubMenu=${ShowSubMenu}&PageNumber=${PageNumber}&PageSize=${PageSize}&MarketId=${MarketId}`,
    config
  );
}

//mANUFACTURER
export async function getFeaturedManufacturer({
  Search = "",
  PageNumber = 1,
  PageSize = 10,
}) {
  return await get(
    `${urls.GET_MANUFACTURERS}?Search=${Search}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}

//TECH
export async function getTech({ Search = "", PageNumber = 1, PageSize = 10 }) {
  return await get(
    `${urls.GET_TECH}?Search=${Search}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}
export async function getTechLevels() {
  return await get(`${urls.GET_TECH_LEVEL}`, config);
}
export async function getTechmenu({
  ShowSubMenu = false,
  PageNumber = 1,
  PageSize = 10,
  TechnologyId = "",
}) {
  return await get(
    `${urls.GET_TECH_MENU}?ShowSubMenu=${ShowSubMenu}&PageNumber=${PageNumber}&PageSize=${PageSize}&TechnologyId=${TechnologyId}`,
    config
  );
}

//products
export async function getProduct(productId) {
  return await get(`${urls.GET_PRODUCT}?productId=${productId}`, config);
}
export async function getProducts(payload) {
  return await post(`${urls.GET_PRODUCTS}`, cleanObject(payload), config);
}
export async function getSupplierProduct({ productId }) {
  return await get(
    `${urls.SUPPLIER_GET_PRODUCT}?productId=${productId}`,
    config
  );
}

export async function getSupplierProducts({
  Producer = "",
  PageNumber = 1,
  PageSize = 10,
  MarketId = "",
  Search = "",
  Status = "",
  SortOrder = "",
  MarketApplication = "",
}) {
  return await get(
    `${urls.SUPPLIER_GET_PRODUCTS}?Producer=${Producer}&SortOrder=${SortOrder}&MarketId=${MarketId}&PageNumber=${PageNumber}&PageSize=${PageSize}&Search=${Search}&Status=${Status}&MarketApplication=${MarketApplication}`,
    config
  );
}

export async function getProducers({
  Search = "",
  PageNumber = 1,
  PageSize = 10,
}) {
  return await get(
    `${urls.GET_PRODUCERS}?Search=${Search}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}

export async function searchmarket({
  PageNumber = 1,
  PageSize = 10,
  search = "",
}) {
  return await get(
    `${urls.SEARCH_MARKET}?search=${search}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}

export async function getsuppliers({
  PageNumber = 1,
  PageSize = 10,
  search = "",
  Producer = "",
}) {
  return await get(
    `${urls.GET_SUPPLIERS}?search=${search}&Producer=${Producer}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}
export async function getsupplier({ supplierId = "" }) {
  return await get(
    `${urls.GET_SUPPLIER_DETAIL}?supplierId=${supplierId}`,
    config
  );
}

export async function getmarketlevels() {
  return await get(`${urls.GET_MARKETS_LEVEL}`, config);
}

// export async function gettechlevels() {
//   return await get(`${urls.GET_TECH_LEVEL}`, config);
// }
export async function getStoreInfo(data) {
  return await get(`${urls.GET_STORE_INFO}?slug=${data}`, config);
}
