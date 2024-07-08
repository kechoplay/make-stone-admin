<template>
  <div class="h-screen flex items-center">
    <div class="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 xl:w-[500px] w-full">
      <div class="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div class="border-stroke dark:border-strokedark">
          <div class="p-[10px] sm:p-12.5 xl:p-17.5">
            <h2 class="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2 text-center">
              Đăng nhập
            </h2>
            <el-form
                :rules="rules"
                ref="formRef"
                :model="ruleForm"
                label-width="120px"
                class="content_page_form"
                label-position="top"
                @keyup.enter="submitForm(formRef)"
            >
              <div class="mb-4">
                <el-form-item prop="username" class="block">
                  <label class="mb-2.5 block font-medium text-black dark:text-white leading-[24px]">Tên đăng
                    nhập</label>
                  <el-input v-model="ruleForm.username"
                            placeholder="Nhập tên đăng nhập"
                            class="w-full h-[34px] rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </el-form-item>
              </div>

              <div class="mb-6">
                <el-form-item prop="password" class="block">
                  <label class="mb-2.5 block font-medium text-black dark:text-white leading-[24px]">Mật khẩu</label>
                  <el-input v-model="ruleForm.password" type="password"
                            placeholder="Nhập mật khẩu"
                            class="w-full h-[34px] rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  />
                </el-form-item>
              </div>
              <div class="mb-5 mt-8">
                <input
                    type="button"
                    value="Đăng nhập"
                    class="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 font-medium text-white transition hover:bg-opacity-90"
                    v-loading.fullscreen.lock="fullscreenLoading"
                    @click="submitForm(formRef)"
                />
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
::v-deep(.el-input__wrapper) {
  padding: 0;

  .el-input__inner {
    color: #FFFFFF;
  }
}
</style>
<script setup lang="ts">
import {reactive, ref} from "vue"
import type {FormInstance, FormRules} from "element-plus"
import {useAuthStore} from "@/stores"
import {storeToRefs} from "pinia"
import {ElNotification} from "element-plus"

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

<style scoped lang="scss">
@import "@/assets/scss/login.scss";
</style>
