<script setup lang="ts">
import { ref } from 'vue'

import ProductOne from '@/assets/images/product/product-01.png'
import ProductTwo from '@/assets/images/product/product-02.png'
import ProductThree from '@/assets/images/product/product-03.png'
import ProductFour from '@/assets/images/product/product-04.png'

const products = ref([
  {
    id: 1,
    name: 'Apple Watch Series 7',
    category: 'Electronics',
    price: 269,
    sold: 22,
    profit: 45,
    imageSrc: ProductOne
  },
  {
    id: 2,
    name: 'Macbook Pro M1',
    category: 'Electronics',
    price: 546,
    sold: 34,
    profit: 125,
    imageSrc: ProductTwo
  },
  {
    id: 3,
    name: 'Dell Inspiron 15',
    category: 'Electronics',
    price: 443,
    sold: 64,
    profit: 247,
    imageSrc: ProductThree
  },
  {
    id: 4,
    name: 'HP Probook 450',
    category: 'Electronics',
    price: 499,
    sold: 72,
    profit: 103,
    imageSrc: ProductFour
  }
])
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
      <div class="col-span-1 flex items-center">
        <button>Sửa</button>
        <button>Xóa</button>
      </div>
    </div>
  </div>
</template>
