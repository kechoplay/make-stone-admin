import axios from "axios"
import type { AxiosInstance } from "axios"
import { useAuthStore } from "@/stores/auth.store"

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
  }
}

const innovationApi = axios.create({
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
    Accept: "application/json",
    "SECURITY-KEY": import.meta.env.VITE_SECURITY_KEY
  }
})

innovationApi.interceptors.request.use(
  async function (config) {
    const { token } = useAuthStore()
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

innovationApi.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    console.log(error.response)
    if (error?.response.status === 403) {
      const { logout } = useAuthStore()

      logout()
    }

    return error.response
  }
)

const ApiService = {
  setResponseType(type: any) {
    innovationApi.defaults.responseType = type
  },
  get(resource: any, config = {}) {
    return innovationApi.get(resource, config)
  },
  post(resource: any, params: any, config = {}) {
    return innovationApi.post(`${resource}`, params, config)
  },
  update(resource: any, params: any, config = {}) {
    return innovationApi.put(resource, params, config)
  },
  delete(resource: any, config = {}) {
    return innovationApi.delete(resource, config)
  },
  updateSingle(resource: any, params: any, config = {}) {
    return innovationApi.patch(resource, params, config)
  },
  customRequest(config: any) {
    return innovationApi(config)
  },
  postFormData(resource: any, params: any) {
    return innovationApi.post(resource, params, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
  }
}

export default ApiService
