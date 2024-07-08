<script setup lang="ts">
import SideBar from "@/components/Sidebar/index.vue"
import IconCollapse from "@/components/icons/IconCollapse.vue"
import Login from "@/views/LoginPage/index.vue"
import HeaderTitle from "@/configs/headerTitle"
import {useLayoutStore} from "@/stores"
import {storeToRefs} from "pinia"
import {RouterView, useRoute} from "vue-router"
import {useAuthStore} from "@/stores/auth.store"

const route = useRoute()

const authStore = useAuthStore()

const routerHideSidebar = ["/login", "/register", "/"]
const layoutStore = useLayoutStore()
const {collapse} = storeToRefs(layoutStore)
const {collapseSidebar} = useLayoutStore()
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <!--    <template v-if="authStore.token">-->
    <side-bar></side-bar>
    <router-view/>
    <!--    <template v-else>-->
    <!--      <div class="dark text-bodydark bg-boxdark-2">-->
    <!--        <login></login>-->
    <!--      </div>-->
    <!--    </template>-->
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/master-layout.scss";
@import "@/assets/css/style.css";
</style>
