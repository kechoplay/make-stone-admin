<script setup lang="ts">
import {reactive, ref} from 'vue'
import {ElNotification} from "element-plus"
import ProductService from "@/api/product.service"
import CategoryService from "@/api/category.service"

const ruleForm = reactive<{
  name: string
  category: number
  price: number
  description: string
  mainImage: any
  subImage: any
}>({
  name: "",
  category: 0,
  price: 0,
  description: "",
  mainImage: "",
  subImage: "",
})

const isOptionSelected = ref<boolean>(false)
const loading = ref<boolean>(false)
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

const previewFiles = (event) => {
  const file = event.target.files[0]
  if (!file) return

  if (!['image/png', 'image/jpeg', 'image/gif', 'image/jpg'].includes(file.type)) {
    notificationError("Ảnh không đúng định dạng")
    return
  }
  ruleForm.mainImage = file
}

const submitForm = async () => {
  if (ruleForm.name == "") {
    notificationError("Hãy nhập tên sản phẩm")
    return
  }

  if (!ruleForm.mainImage) {
    notificationError("Hãy nhập ảnh sản phẩm")
    return
  }
  loading.value = true

  const {data} = await ProductService.createProduct(ruleForm)

  loading.value = false

  if (!data.status) {
    notificationError("Thất bại")
  } else {
    notificationSuccess("Thành công")
  }
}
</script>

<template>
  <div class="flex flex-col gap-9">
    <div
        class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <el-form
          v-loading.fullscreen.lock="loading"
      >
        <div class="p-6.5">
          <div class="w-full mb-4.5">
            <label class="mb-2.5 block text-black dark:text-white">Tên sản phẩm<span
                class="text-meta-1">*</span></label>
            <input type="text"
                   v-model="ruleForm.name"
                   class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div class="mb-4.5">
            <label class="mb-2.5 block text-black dark:text-white">Danh mục</label>
            <div class="relative z-20 bg-transparent dark:bg-form-input">
              <select
                  v-model="ruleForm.category"
                  class="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  :class="{ 'text-black dark:text-white': isOptionSelected }"
              >
                <option value="" disabled selected>Chon danh muc</option>
                <option :value="category.id" :key="key" v-for="(category, key) in categories">{{ category.name }}</option>
              </select>

              <span class="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                <svg
                    class="fill-current"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                  <g opacity="0.8">
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill=""
                    ></path>
                  </g>
                </svg>
              </span>
            </div>
          </div>

          <div class="w-full mb-4.5">
            <label class="mb-2.5 block text-black dark:text-white">Giá</label>
            <input type="text"
                v-model="ruleForm.price"
                class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div class="mb-6">
            <label class="mb-2.5 block text-black dark:text-white"> Mô tả </label>
            <textarea
                rows="6"
                v-model="ruleForm.description"
                placeholder="Type your message"
                class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></textarea>
          </div>

          <div class="mb-6">
            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
              Ảnh chính
            </label>
            <input type="file" accept="image/*"
                   @change="previewFiles($event)"
                   class="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-normal focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
            />
          </div>

          <div class="mb-6">
            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
              Ảnh phụ
            </label>
            <input type="file" multiple accept="image/*"
                   @change="previewFiles($event)"
                   class="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-normal focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
            />
          </div>

          <button type="button"
                  class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  @click="submitForm"
          >
            Lưu
          </button>
        </div>
      </el-form>
    </div>
  </div>
</template>
