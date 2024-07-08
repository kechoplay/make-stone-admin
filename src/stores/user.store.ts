import { defineStore } from "pinia"
import { Stores } from "@/types"
import UserServicesApi from "@/api/services/user"

export const useUserStore = defineStore(Stores.User, () => {
  /**
   * Login admin
   * @param admin_code
   * @param password
   */
  async function listUser() {
    try {
      await UserServicesApi.userServicesApi.indexUser()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    listUser
  }
})
