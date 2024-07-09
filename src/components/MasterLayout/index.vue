<script setup lang="ts">
import SideBar from "@/components/Sidebar/index.vue"
import HeaderView from "@/components/Header/index.vue"
import { RouterView } from "vue-router"

</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <!--    <template v-if="authStore.token">-->
    <side-bar></side-bar>
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <header-view />
      <router-view />
    </div>
    <!--    <template v-else>-->
    <!--      <div class="dark text-bodydark bg-boxdark-2">-->
    <!--        <login></login>-->
    <!--      </div>-->
    <!--    </template>-->
  </div>
</template>

<style lang="scss">
@import "@/assets/css/style.css";
</style>
