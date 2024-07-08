import { AuthApi } from "@/generator"
import InnovationApi from "@/api/axios"
import { config } from "@/api/config"

namespace AuthServicesApi {
  export const authServicesApi = new AuthApi(config, undefined, InnovationApi)
}

export default AuthServicesApi
