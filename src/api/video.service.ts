import ApiService from "@/api/axios"
import {ApiUrl} from "@/stores/storeTypes"

const VideoService = {
  getVideoList() {
    const url = ApiUrl.GET_LIST_VIDEO
    return ApiService.get(url)
  },
  createVideo(data: object) {
    return ApiService.postFormData(ApiUrl.CREATE_VIDEO, data)
  },
  getDetailVideo(id: number) {
    const url = ApiUrl.DETAIL_VIDEO.replace(
      `{${"id"}}`,
      encodeURIComponent(String(id))
    )
    return ApiService.get(url)
  },
  updateProduct(id: number, formData: object) {
    const url = ApiUrl.UPDATE_VIDEO.replace(
      `{${"id"}}`,
      encodeURIComponent(String(id))
    )
    return ApiService.postFormData(url, formData)
  },
  deleteVideo(id: number) {
    const url = ApiUrl.DELETE_VIDEO.replace(
      `{${"id"}}`,
      encodeURIComponent(String(id))
    )
    return ApiService.delete(url)
  },
}

export default VideoService
