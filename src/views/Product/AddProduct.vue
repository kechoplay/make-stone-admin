<script setup lang="ts">
import BreadcrumbDefault from '@/components/Breadcrumbs/BreadcrumbDefault.vue'
import InputGroup from '@/components/Forms/InputGroup.vue'
import SelectGroupTwo from '@/components/Forms/SelectGroup/SelectGroupTwo.vue'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import {reactive, ref} from "vue"
import type {FormInstance, FormRules} from "element-plus"
import {useAuthStore} from "@/stores"
import {storeToRefs} from "pinia"
import {ElNotification} from "element-plus"

const pageTitle = ref('Thêm sản phẩm')

const formRef = ref<FormInstance>()
const authStore = useAuthStore()

const {errors, fullscreenLoading} = storeToRefs(authStore)

const ruleForm = reactive<{
  password: string
  username: string
}>({
  password: "",
  username: ""
})

const error = ref(false)
const selectedOption = ref<string>('')
const isOptionSelected = ref<boolean>(false)

const rules = reactive<FormRules<{ username: string; password: string }>>({
  username: [
    {
      required: true,
      message: "Nhập tên đăng nhập",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "Nhập mật khẩu",
      trigger: "blur"
    }
  ]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid: any) => {
    if (valid) {
      await authStore.login({username: ruleForm.username, password: ruleForm.password})
      if (errors.value) {
        error.value = true

        ElNotification({
          title: "Error",
          message: errors.value,
          type: "error"
        })

        authStore.$patch({errors: null})
      } else {
        ElNotification({
          title: "Success",
          message: "Login Success",
          type: "success"
        })
      }
    }
  })
}

</script>

<template>
  <default-layout>
    <breadcrumb-default :pageTitle="pageTitle"/>
    <div class="grid grid-cols-1 gap-9 sm:grid-cols-1">
      <div class="flex flex-col gap-9">
        <div
            class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <el-form
              :rules="rules"
              ref="formRef"
              :model="ruleForm"
              label-width="120px"
              label-position="top"
              @keyup.enter="submitForm(formRef)"
          >
            <div class="p-6.5">
              <div class="w-full mb-4.5">
                <label class="mb-2.5 block text-black dark:text-white">Tên sản phẩm<span
                    class="text-meta-1">*</span></label>
                <input
                    type="text"
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div class="mb-4.5">
                <label class="mb-2.5 block text-black dark:text-white">Danh mục</label>
                <div class="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                      v-model="selectedOption"
                      class="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      :class="{ 'text-black dark:text-white': isOptionSelected }"
                  >
                    <option value="" disabled selected>Select your subject</option>
                    <option value="USA">USA</option>
                    <option value="UK">UK</option>
                    <option value="Canada">Canada</option>
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
                <input
                    type="text"
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div class="mb-6">
                <label class="mb-2.5 block text-black dark:text-white"> Mô tả </label>
                <textarea
                    rows="6"
                    placeholder="Type your message"
                    class="w-full rounded border-[1.5px] text-black border-stroke bg-transparent py-3 px-5 font-normal outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:text-white dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                ></textarea>
              </div>

              <div class="mb-6">
                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                  Ảnh chính
                </label>
                <input type="file" accept="image/*"
                       class="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-normal focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                />
              </div>

              <div class="mb-6">
                <label class="mb-3 block text-sm font-medium text-black dark:text-white">
                  Ảnh phụ
                </label>
                <input type="file" multiple accept="image/*"
                       class="w-full rounded-md border border-stroke p-3 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-1 file:px-2.5 file:text-sm file:font-normal focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white"
                />
              </div>

              <button type="button"
                      class="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                      v-loading.fullscreen.lock="fullscreenLoading"
                      @click="submitForm(formRef)"
              >
                Lưu
              </button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </default-layout>
</template>
