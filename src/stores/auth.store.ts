import { defineStore } from "pinia"
import router from "@/router"
import type { UserApiData } from "@/types"
import { Stores } from "@/types"
import { UserService } from "@/api"
import { ref } from "vue"

export const useAuthStore = defineStore(Stores.Auth, () => {
  const token = ref(JSON.parse(localStorage.getItem("token") as string))
  const refreshToken = ref(JSON.parse(localStorage.getItem("refreshToken") as string))
  const returnUrl = ref("/admin")
  const user = ref(null as UserApiData | null)
  const errors = ref<string | null>("")

  /**
   * Login user
   * @param email
   * @param password
   */
  async function login({ email, password }: { email: string; password: string }) {
    try {
      const { data } = await UserService.login({ email, password })

      if (!data.success) {
        errors.value = data.errorMessage
        return false
      }

      token.value = data.data.accessToken
      refreshToken.value = data.data.refreshToken

      user.value = data.data.adminData

      localStorage.setItem("token", JSON.stringify(data.data.accessToken))

      router.push(returnUrl.value)
    } catch (error: any) {
      console.log(error)
      errors.value = error.response.data.message || error.message
    }
  }

  /**
   * Logout
   */
  function logout() {
    token.value = null
    localStorage.removeItem("token")
    router.push("/admin/login")
  }

  return {
    user,
    token,
    login,
    logout,
    returnUrl,
    errors
  }
})
