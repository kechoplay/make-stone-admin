import ApiService from "@/api/axios"
import {ApiUrl} from "@/stores/storeTypes"

const ProductService = {
  getProductList() {
    const url = ApiUrl.GET_LIST_PRODUCT
    return ApiService.get(url)
  },
  createProduct(formData) {
    return ApiService.postFormData(ApiUrl.CREATE_PRODUCT, formData)
  },
  deleteProduct(id) {
    const url = ApiUrl.DELETE_PRODUCT.replace(
        `{${"id"}}`,
        encodeURIComponent(String(id))
      )
    return ApiService.delete(url)
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
}

export default ProductService
