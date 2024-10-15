<script setup lang="ts">
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import {ref} from "vue"
import EditVideo from "@/components/Video/EditVideo.vue"

const pageTitle = ref('Thêm video')

</script>

<template>
  <default-layout>
    <breadcrumb-default :pageTitle="pageTitle"/>
    <div class="grid grid-cols-1 gap-9 sm:grid-cols-1">
      <edit-video />
    </div>
  </default-layout>
</template>
