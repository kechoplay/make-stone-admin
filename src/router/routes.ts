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
    showRoute: true,
    component: () => import("@/views/Product/Product.vue")
  },
  {
    path: "",
    showRoute: true,
    component: () => import("@/views/Product/Product.vue")
  },
  {
    path: "/product",
    showRoute: true,
    component: () => import("@/views/Product/Product.vue")
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
  {
    path: "/product/add-product",
    name: "addProduct",
    showRoute: true,
    component: () => import("@/views/Product/AddProduct.vue")
  },
  {
    path: "/product/edit-product/:id",
    name: "editProduct",
    showRoute: true,
    component: () => import("@/views/Product/EditProduct.vue")
  },
  {
    path: "/category",
    showRoute: true,
    component: () => import("@/views/Category/Category.vue")
  },
  {
    path: "/add-category",
    showRoute: true,
    component: () => import("@/views/Category/AddCategory.vue")
  },
  {
    path: "/affiliate-link",
    showRoute: true,
    component: () => import("@/views/Category/Category.vue")
  },
  {
    path: "/add-affiliate-link",
    showRoute: true,
    component: () => import("@/views/Category/AddCategory.vue")
  },
  {
    path: "/video",
    showRoute: true,
    component: () => import("@/views/Video/Video.vue")
  },
  {
    path: "/video/add",
    showRoute: true,
    component: () => import("@/views/Video/AddVideo.vue")
  },
  {
    path: "/video/edit/:id",
    showRoute: true,
    component: () => import("@/views/Video/EditVideo.vue")
  },
]

export default routes
