import ApiService from "@/api/axios"
import {ApiUrl} from "@/stores/storeTypes"

const CategoryService = {
  getCategoryList() {
    const url = ApiUrl.GET_LIST_CATEGORY
    return ApiService.get(url)
  },
  createCategory(data: object) {
    return ApiService.post(ApiUrl.CREATE_CATEGORY, data)
  },
  deleteCategory(id) {
    const url = ApiUrl.DELETE_CATEGORY.replace(
      `{${"id"}}`,
      encodeURIComponent(String(id))
    )
    return ApiService.delete(url)
  },
}

export default CategoryService
