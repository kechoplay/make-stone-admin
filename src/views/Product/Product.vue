<script setup lang="ts">
import { ref } from 'vue'
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import ProductList from '@/components/Product/List.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const pageTitle = ref('Sản phẩm')
</script>

<template>
  <default-layout>
    <breadcrumb-default :pageTitle="pageTitle" />
    <div class="flex flex-col gap-10">
      <product-list />
    </div>
  </default-layout>
</template>
