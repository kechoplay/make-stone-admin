<script setup lang="ts">
import HeaderArea from '@/components/Header/HeaderArea.vue'
import SidebarArea from '@/components/Sidebar/SidebarArea.vue'
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <sidebar-area />
    <div class="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
      <header-area />
      <main>
        <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
          <slot></slot>
        </div>
      </main>
    </div>
  </div>
</template>
