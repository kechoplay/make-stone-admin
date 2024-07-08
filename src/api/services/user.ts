import { UsersApi } from "@/generator"
import InnovationApi from "@/api/axios"
import { config } from "@/api/config"

namespace UserServicesApi {
  export const userServicesApi = new UsersApi(config, undefined, InnovationApi)
}

export default UserServicesApi
