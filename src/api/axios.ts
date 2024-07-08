import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
import { useAuthStore } from "@/stores/auth.store"
import Constants from "@/configs/constant"

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

const InnovationApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    contentType: "application/json",
    "Cache-Control": "no-cache",
    "Access-Control-Allow-Origin": "*",
    Pragma: "no-cache",
    Expires: "0",
    locale: "ja",
    Timezone: new Date().getTimezoneOffset(),
    "X-Requested-With": "XMLHttpRequest",
    Accept: "application/json"
  }
})

InnovationApi.interceptors.request.use(
  async function (config) {
    const token = JSON.parse(localStorage.getItem("token") as string)

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  function (err) {
    if (err?.response.status === 401) {
      const { logout } = useAuthStore()

      logout()
    }

    return Promise.reject(err)
  }
)

const checkErrorResponse = async (error: AxiosResponse & { response: AxiosRequestConfig }) => {
  const originalRequest = error.config
  const { logout } = useAuthStore()

  switch (!!error.response) {
    case error.response.data.errors.error_code === Constants.ERROR_TOKEN.TOKEN_EXPIRE &&
      !originalRequest.url?.includes(Constants.API_END_POINT.LOGOUT): {
      const response = await InnovationApi.post(Constants.API_END_POINT.REFRESH_TOKEN)

      localStorage.setItem("token", JSON.stringify(response.data.data.access_token))

      originalRequest.headers.Authorization = `Bearer ${response.data.data.access_token}`

      return await InnovationApi(originalRequest)
    }

    case error.response.data.errors.error_code === Constants.ERROR_TOKEN.REFRESH_TOKEN_EXPIRE:
    case error.response.data.errors.error_code === Constants.ERROR_TOKEN.NOT_LOGIN:
    case originalRequest.url?.includes(Constants.API_END_POINT.LOGOUT):
      logout(true)
      break

    default:
      return Promise.reject(error)
  }
}

InnovationApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    await checkErrorResponse(error)
  }
)

export default InnovationApi
