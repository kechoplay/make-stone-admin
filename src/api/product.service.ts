import ApiService from "@/api/axios"
import {ApiUrl} from "@/stores/storeTypes"

const ProductService = {
  getProductList() {
    const url = ApiUrl.GET_LIST_PRODUCT
    return ApiService.get(url)
  },
  createProduct(formData) {
    return ApiService.postFormData(ApiUrl.CREATE_PRODUCT, {formData: formData})
  },
  // verifyCodeSearch(code: string) {
  //   const url = ApiUrl.VERIFY_CODE_SEARCH.replace(
  //     `{${"code"}}`,
  //     encodeURIComponent(String(code))
  //   )
  //   return ApiService.get(url)
  // },
  // searchRelatedItem(query) {
  //   const newQuery = Object.keys(query)
  //     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
  //     .join('&')
  //   return ApiService.get(ApiUrl.SEARCH_RELATED_ITEM + `?${newQuery}`)
  // },
  // uploadCsv(file) {
  //   return ApiService.postFormData(ApiUrl.UPLOAD_CSV, {file: file})
  // },
}

export default ProductService
