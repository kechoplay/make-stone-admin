<script setup lang="ts">
import { ref } from 'vue'
import CategoryService from "@/api/category.service"
import {ElNotification} from "element-plus"

const categories = ref([])

const notificationError = (message) => {
  ElNotification({
    title: "Error",
    message: message,
    type: "error"
  })
}

const notificationSuccess = (message) => {
  ElNotification({
    title: "Success",
    message: message,
    type: "success"
  })
}

const created = async () => {
  Promise.all([
    CategoryService.getCategoryList(),
  ]).then((response) => {
    categories.value = response[0].data.data
  })
}

created()

const deleteCategory = async (id) => {
  const {data} = await CategoryService.deleteCategory(id)
  if (!data.status) {
    notificationError("Thất bại")
  } else {
    notificationSuccess("Thành công")
    await created()
  }
}
</script>

<template>
  <div
      class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
  >
    <div
        class="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
    >
      <div class="col-span-3 flex items-center">
        <p class="font-medium">Tên danh mục</p>
      </div>
      <div class="col-span-2 hidden items-center sm:flex">
      </div>
    </div>

    <div
        v-for="category in categories"
        :key="category.id"
        class="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
    >
      <div class="col-span-3 flex items-center">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
          <p class="text-sm font-medium text-black dark:text-white">{{ category.name }}</p>
        </div>
      </div>
      <div class="col-span-1 flex items-center">
        <el-button type="warning" round>Sửa</el-button>
        <el-button type="danger" round @click="deleteCategory(category.id)">Xóa</el-button>
      </div>
    </div>
  </div>
</template>
