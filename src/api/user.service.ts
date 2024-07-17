import ApiService from "@/api/axios"
import { ApiUrl } from "@/stores/storeTypes"

const UserService = {
  login(data) {
    return ApiService.post(ApiUrl.LOGIN, data)
  }
}

export default UserService
