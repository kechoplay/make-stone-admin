<script setup lang="ts">
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import AddProduct from '@/components/Product/AddProduct.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import {reactive, ref} from "vue"

const pageTitle = ref('Thêm sản phẩm')

</script>

<template>
  <default-layout>
    <breadcrumb-default :pageTitle="pageTitle"/>
    <div class="grid grid-cols-1 gap-9 sm:grid-cols-1">
      <add-product/>
    </div>
  </default-layout>
</template>
