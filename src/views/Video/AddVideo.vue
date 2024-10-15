<script setup lang="ts">
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import {ref} from "vue"
import AddVideo from "@/components/Video/AddVideo.vue"

const pageTitle = ref('Thêm video')

</script>

<template>
  <default-layout>
    <breadcrumb-default :pageTitle="pageTitle"/>
    <div class="grid grid-cols-1 gap-9 sm:grid-cols-1">
      <add-video />
    </div>
  </default-layout>
</template>
