<script setup lang="ts">
import MasterLayout from "@/components/MasterLayout/index.vue"
import { useAuthStore } from "@/stores/auth.store"

const authStore = useAuthStore()
// If token exists, fetch user info to save in store
if (authStore.token) {
  authStore.getMyProfile()
}
</script>

<template>
  <master-layout />
</template>
