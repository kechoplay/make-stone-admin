<script setup lang="ts">
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import EditProduct from '@/components/Product/EditProduct.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import {ref} from "vue"

const pageTitle = ref('Chỉnh sửa sản phẩm')

</script>

<template>
  <default-layout>
    <breadcrumb-default :pageTitle="pageTitle"/>
    <div class="grid grid-cols-1 gap-9 sm:grid-cols-1">
      <edit-product />
    </div>
  </default-layout>
</template>
