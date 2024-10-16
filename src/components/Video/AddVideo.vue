<script setup lang="ts">
import {ref} from 'vue'
import VideoService from "@/api/video.service"
import {ElNotification} from "element-plus"
import { Plus } from "@element-plus/icons-vue"

const video = ref<{
  name: string
  iframe: string
  type: number,
  image: any
}>({
  name: "",
  iframe: "",
  type: 0,
  image: ""
})
const fileMain = ref<[]>([])
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
  if (video.value.iframe == "") {
    notificationError("Hãy nhập iframe")
    return
  }

  video.value.image = fileMain.value[0]
  loading.value = true

  const {data} = await VideoService.createVideo(video.value)

  loading.value = false

  if (!data.status) {
    notificationError("Thất bại")
  } else {
    notificationSuccess("Thành công")
    video.value = {
      name: "",
      iframe: "",
      type: 0,
      image: []
    }
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
            <label class="mb-2.5 block text-black dark:text-white">Tên video</label>
            <input type="text"
                   v-model="video.name"
                   class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
          <div class="w-full mb-4.5">
            <label class="mb-2.5 block text-black dark:text-white">Iframe<span
                class="text-meta-1">*</span></label>
            <textarea rows="10"
                   v-model="video.iframe"
                   class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          <div class="w-full mb-4.5">
            <label class="mb-2.5 block text-black dark:text-white">Type<span
                class="text-meta-1">*</span></label>
            <select
                      v-model="video.type"
                      class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              <option value="0">Trang đầu</option>
              <option value="1">Trang sau</option>
            </select>
          </div>
          <div class="mb-6">
            <label class="mb-3 block text-sm font-medium text-black dark:text-white">
              Ảnh kiểm định
            </label>
            <el-upload
              v-model:file-list="fileMain"
              :auto-upload="false"
              :limit="1"
              accept="image/*"
              list-type="picture-card"
            >
              <el-icon><plus /></el-icon>
            </el-upload>
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
