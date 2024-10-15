<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import Videos from '@/components/Video/List.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const pageTitle = ref('Video')
</script>

<template>
  <default-layout>
    <breadcrumb-default :pageTitle="pageTitle" />
    <div class="flex flex-col gap-10">
      <videos />
    </div>
  </default-layout>
</template>
