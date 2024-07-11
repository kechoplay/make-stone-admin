<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import CategoryList from '@/components/Category/List.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const pageTitle = ref('Danh mục')
</script>

<template>
  <default-layout>
    <breadcrumb-default :pageTitle="pageTitle" />
    <div class="flex flex-col gap-10">
      <category-list />
    </div>
  </default-layout>
</template>
