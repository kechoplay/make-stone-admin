import { defineStore } from "pinia"
import router from "@/router"
import type { ErrorResponseDataMessage, ErrorResponseMessage, UserApiData } from "@/types"
import { Stores } from "@/types"
import { AuthService } from "@/api"
import { ref } from "vue"
import type { Profile, Register, Me } from "@/generator"
import { convertCamelCaseToSnakeCase } from "@/helpers/common"

export const useAuthStore = defineStore(Stores.Auth, () => {
  const token = ref(JSON.parse(localStorage.getItem("token") as string))
  const returnUrl = ref("/home")
  const user = ref(null as UserApiData | null)
  const errors = ref("" as string | null)
  const fullscreenLoading = ref(false)
  const myProfileData = ref({} as Profile)

  /**
   * Register admin
   * @param admin_code
   * @param password
   */
  async function register(dataRegister: Register) {
    fullscreenLoading.value = true
    try {
      await AuthService.authServicesApi.register(
        convertCamelCaseToSnakeCase(dataRegister) as Register
      )

      router.push("/login")
    } catch (error: any) {
      errors.value = error.response.data.errors.error_message || error.message
    } finally {
      fullscreenLoading.value = false
    }
  }

  /**
   * Login admin
   * @param admin_code
   * @param password
   */
  async function login({ admin_code, password }: { admin_code: string; password: string }) {
    fullscreenLoading.value = true
    try {
      const { data } = await AuthService.authServicesApi.login({ admin_code, password })

      token.value = data.data.access_token

      user.value = { email: data.data.admin?.admin_code || "" }

      localStorage.setItem("token", JSON.stringify(data.data.access_token as string))

      router.push(returnUrl.value)
    } catch (error: any) {
      errors.value = error.response.data.errors.error_message || error.message
    } finally {
      fullscreenLoading.value = false
    }
  }

  /**
   * Logout
   */
  async function logout(invalidToken?: boolean) {
    fullscreenLoading.value = true
    if (!invalidToken) {
      await AuthService.authServicesApi.logout()
    }
    token.value = null
    localStorage.removeItem("token")
    router.push("/login")
    fullscreenLoading.value = false
  }

  /**
   * My Profile
   */
  async function getMyProfile() {
    fullscreenLoading.value = true
    try {
      const response = await AuthService.authServicesApi.me()
      myProfileData.value = response.data.data
    } catch (error: unknown) {
      errors.value =
        (error as ErrorResponseDataMessage).response.data.errors.error_message ||
        (error as ErrorResponseMessage).message
    } finally {
      fullscreenLoading.value = false
    }
  }

  /**
   * Update My Profile
   */
  async function updateMyProfile(data: Me) {
    fullscreenLoading.value = true
    try {
      await AuthService.authServicesApi.updateProfile(data)
    } catch (error) {
      errors.value =
        (error as ErrorResponseDataMessage).response.data.errors.error_message ||
        (error as ErrorResponseMessage).message
    } finally {
      fullscreenLoading.value = false
    }
  }

  return {
    user,
    token,
    login,
    logout,
    returnUrl,
    errors,
    fullscreenLoading,
    getMyProfile,
    myProfileData,
    updateMyProfile,
    register
  }
})
