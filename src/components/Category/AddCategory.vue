<script setup lang="ts">
import {ref} from 'vue'
import CategoryService from "@/api/category.service"
import {ElNotification} from "element-plus"

const name = ref<string>('')
const loading = ref<boolean>(false)

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

const submitForm = async () => {
  if (name.value == "") {
    notificationError("Hãy nhập tên danh mục")
    return
  }

  loading.value = true

  const {data} = await CategoryService.createCategory({name: name.value})

  loading.value = false

  if (!data.status) {
    notificationError("Thất bại")
  } else {
    notificationSuccess("Thành công")
    name.value = ''
  }
}
</script>

<template>
  <div class="flex flex-col gap-9">
    <div
        class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
    >
      <el-form>
        <div class="p-6.5">
          <div class="w-full mb-4.5">
            <label class="mb-2.5 block text-black dark:text-white">Tên danh mục<span
                class="text-meta-1">*</span></label>
            <input type="text"
                   v-model="name"
                   class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <button type="button"
                  class="flex w-[200px] justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  @click="submitForm"
          >
            Lưu
          </button>
        </div>
      </el-form>
    </div>
  </div>
</template>
