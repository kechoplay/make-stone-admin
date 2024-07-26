export enum ApiUrl {
  ME = "/api/me",
  LOGIN = "/accounts/login",
  USERS = "/api/users",
  GET_LIST_PRODUCT = "product/list",
  CREATE_PRODUCT = "product/insert",
  DETAIL_PRODUCT = "product/{id}",
  UPDATE_PRODUCT = "product/{id}/update",
  DELETE_PRODUCT = "product/delete/{id}",
  START_BIDDING_PRODUCT = "product/{id}/start-bidding",
  STOP_BIDDING_PRODUCT = "product/{id}/stop-bidding",


  GET_LIST_CATEGORY = "category/list",
  CREATE_CATEGORY = "category/insert",
  DELETE_CATEGORY = "category/delete/{id}",
}
