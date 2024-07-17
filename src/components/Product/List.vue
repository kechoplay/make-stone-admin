<script setup lang="ts">
import { ref } from 'vue'
import ProductService from "@/api/product.service"

const products = ref([])

const created = async () => {
  Promise.all([
    ProductService.getProductList(),
  ]).then((response) => {
    products.value = response[0].data.data
  })
}

created()
</script>

<template>
  <div
      class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
  >
    <div class="py-6 px-4 md:px-6 xl:px-7.5">
      <h4 class="text-xl font-bold text-black dark:text-white">Top sản phẩm</h4>
    </div>
    <div
        class="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
    >
      <div class="col-span-3 flex items-center">
        <p class="font-medium">Tên sản phẩm</p>
      </div>
      <div class="col-span-2 hidden items-center sm:flex">
        <p class="font-medium">Danh mục</p>
      </div>
      <div class="col-span-1 flex items-center">
        <p class="font-medium">Giá</p>
      </div>
      <div class="col-span-1 flex items-center">
      </div>
    </div>

    <div
        v-for="product in products"
        :key="product.id"
        class="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5"
    >
      <div class="col-span-3 flex items-center">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div class="h-12.5 w-15 rounded-md">
            <img :src="product.imageSrc" :alt="`Product: ${product.name}`" />
          </div>
          <p class="text-sm font-medium text-black dark:text-white">{{ product.name }}</p>
        </div>
      </div>
      <div class="col-span-2 hidden items-center sm:flex">
        <p class="text-sm font-medium text-black dark:text-white">{{ product.category }}</p>
      </div>
      <div class="col-span-1 flex items-center">
        <p class="text-sm font-medium text-black dark:text-white">${{ product.price }}</p>
      </div>
      <div class="col-span-1 flex items-center">
        <button>Sửa</button>
        <button>Xóa</button>
      </div>
    </div>
  </div>
</template>
