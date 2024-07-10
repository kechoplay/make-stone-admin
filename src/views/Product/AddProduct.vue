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
              <input-group
                  label="Tên sản phẩm"
                  type="text"
                  customClasses="w-full"
                  required
              />

              <input-group
                  label="Giá"
                  type="text"
                  customClasses="mb-4.5"
              />

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
