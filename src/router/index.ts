import { createRouter, createWebHistory } from "vue-router"
import { useAuthStore } from "@/stores"

import routes from "@/router/routes"

const router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  const DEFAULT_TITLE = "Hermetic Remote"
  document.title = String(`Hermetic Remote` || DEFAULT_TITLE)

  const publicPages = ["/login", "/register"]
  const publicPagesLogin = ["/login", "/register", "/"]

  const authRequired = !publicPages.includes(to.path)
  const authRequiredLogin = !publicPagesLogin.includes(to.path)
  const { token } = useAuthStore()

  // Redirect to login page if not logged in and trying to access a restricted page
  // if (authRequired && !token) {
  //   return "/login"
  // }

  // Redirect to home page if authenticated user tries to access public page
  // if (!authRequiredLogin && token) {
  //   return "/home"
  // }

  return true
})

export default router
