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

  GET_LIST_VIDEO = "video/list",
  CREATE_VIDEO = "video/insert",
  DELETE_VIDEO = "video/delete/{id}",
  DETAIL_VIDEO = "video/{id}",
  UPDATE_VIDEO = "video/update/{id}",
}
