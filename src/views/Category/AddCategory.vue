<script setup lang="ts">
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import {ref} from "vue"
import AddCategory from "@/components/Category/AddCategory.vue"

const pageTitle = ref('Thêm danh mục')

</script>

<template>
  <default-layout>
    <breadcrumb-default :pageTitle="pageTitle"/>
    <div class="grid grid-cols-1 gap-9 sm:grid-cols-1">
      <add-category/>
    </div>
  </default-layout>
</template>
