import "@/assets/css/main.scss"

import { createPinia } from "pinia"
import { createApp, markRaw } from "vue"

import App from "@/App.vue"
import router from "@/router"

import axios from "@/api/axios"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"

import {
  characterRules,
  emailRules,
  numberRules,
  passwordConfirmationRules,
  passwordRules,
  phoneRules,
  requiredRules,
  urlRules,
  zipcodeRules
} from "@/helpers/validations"

import Config from "@/configs/constant"
import commonHelpers from "@/helpers/common"
import type { Router } from "vue-router"
import "./style.css"

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $config: any
    $money: (value: number) => string
  }
}

declare module "pinia" {
  export interface PiniaCustomProperties {
    router: Router
  }
}

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(ElementPlus)
app.use(pinia)
app.use(router)

app.config.globalProperties.$axios = axios as any
app.config.globalProperties.$commonHelpers = commonHelpers
app.config.globalProperties.$validationRules = {
  requiredRules,
  emailRules,
  passwordRules,
  passwordConfirmationRules,
  zipcodeRules,
  phoneRules,
  characterRules,
  numberRules,
  urlRules
}

app.provide("config", Config)

app.provide("commonHelpers", commonHelpers)

app.mount("#app")
