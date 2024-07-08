import type { DefineComponent } from "vue"
import IconLogout from "@/components/icons/IconLogout.vue"

export interface RouteDefined {
  path: string
  name: string
  showRoute?: boolean
  component?: () => Promise<typeof import("*.vue")> | DefineComponent<{}, {}, any>
  routePathActive?: string
  icon?: DefineComponent
}

const routes: RouteDefined[] & any = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home/index.vue")
  },
  {
    path: "/logout",
    name: "logout",
    showRoute: true,
    icon: IconLogout
  },
  {
    path: "/login",
    name: "login",
    showRoute: false,
    component: () => import("@/views/LoginPage/index.vue")
  },
]

export default routes
