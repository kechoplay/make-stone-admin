<template>
  <el-dialog
    v-model="visible"
    :show-close="false"
    width="30%"
    class="modal-height-screen"
    @close="handleClose()"
  >
    <div class="user-detail-title">気密及び一般遠隔監視システム</div>
    <div class="scroll-dialog">
      <div class="user-detail-header">
        <div class="user-info">
          <div class="user-name">ユーザー新規作成</div>
          <div class="user-logout">
            <!-- <el-button @click="redirectUserRegisterDevice">2台目以降</el-button> -->
          </div>
        </div>
      </div>
      <div class="form">
        <el-form
          ref="formRef"
          :rules="rules"
          :model="user"
          label-width="120px"
          class="content_page_form"
          label-position="top"
        >
          <div class="note">ユーザー新規作成確認</div>
          <el-form-item prop="company_name" class="content_page-code">
            <p class="field-input">会社名 <span class="text-required">【必須】</span></p>
            <el-input v-model="user.company_name" readonly />
          </el-form-item>
          <el-form-item prop="department" class="content_page-code">
            <p class="field-input">部署</p>
            <el-input v-model="user.department" readonly />
          </el-form-item>
          <el-form-item prop="postal_code" class="content_page-code form-code">
            <div class="input">
              <p class="field-input">
                郵便番号 (ハイフン不要) <span class="text-required">【必須】</span>
              </p>
              <el-input v-model="user.postal_code" readonly />
            </div>
          </el-form-item>
          <el-form-item prop="prefecture" class="content_page-code">
            <p class="field-input">都道府県 <span class="text-required">【必須】</span></p>
            <el-input v-model="user.prefecture" readonly />
          </el-form-item>
          <el-form-item prop="address" class="content_page-code">
            <p class="field-input">市町村群 <span class="text-required">【必須】</span></p>
            <el-input v-model="user.address" readonly />
          </el-form-item>
          <el-form-item prop="building_name" class="content_page-code">
            <p class="field-input">ビル名・マンション名</p>
            <el-input v-model="user.building_name" readonly />
          </el-form-item>
          <el-form-item prop="phone_number" class="content_page-code">
            <p class="field-input">
              電話番号（ハイフン不要） <span class="text-required">【必須】</span>
            </p>
            <el-input v-model="user.phone_number" readonly />
          </el-form-item>

          <!--user name-->
          <p class="title-user">担当者氏名【必須】</p>
          <div class="content-user-name">
            <div class="full-name">
              <el-form-item prop="user_code" class="item-name">
                <p class="field-input">姓</p>
                <el-input readonly />
              </el-form-item>
              <el-form-item prop="user_code" class="item-name">
                <p class="field-input">名</p>
                <el-input readonly />
              </el-form-item>
            </div>
            <div class="full-name">
              <el-form-item prop="user_code" class="item-name">
                <p class="field-input">セイ</p>
                <el-input readonly />
              </el-form-item>
              <el-form-item prop="user_code" class="item-name">
                <p class="field-input">メイ</p>
                <el-input readonly />
              </el-form-item>
            </div>
          </div>
          <!--end user name-->

          <el-form-item prop="email" class="content_page-code">
            <p class="field-input">メールアドレス <span class="text-required">【必須】</span></p>
            <el-input v-model="user.email" readonly />
          </el-form-item>
          <el-form-item prop="confirm_email" class="content_page-code">
            <p class="field-input">
              メールアドレス（確認） <span class="text-required">【必須】</span>
            </p>
            <el-input v-model="user.confirm_email" readonly />
          </el-form-item>

          <el-form-item prop="name" class="content_page-code">
            <p class="field-input">ユーザー名 <span class="text-required">【必須】</span></p>
            <el-input v-model="user.name" readonly />
          </el-form-item>
          <el-form-item prop="user_code" class="content_page-code">
            <p class="field-input">ユーザーID <span class="text-required">【必須】</span></p>
            <el-input v-model="user.user_code" readonly />
          </el-form-item>
          <el-form-item prop="password" class="content_page-code">
            <p class="field-input">パスワード <span class="text-required">【必須】</span></p>
            <el-input v-model="user.password" :type="typeInput" readonly />
            <div
              :class="[typeInput === 'password' ? 'unshow-password' : '', 'input-password']"
              @click="onChangeShowPassword"
            >
              <component :is="IconShowPassword" />
            </div>
          </el-form-item>

          <el-form-item class="button-list m-top-40">
            <el-button class="stop" @click="deleteUser"> 確認 </el-button>
            <el-button class="confirm" @click="stop"> 確認 </el-button>
            <el-button class="back" @click="handleClose"> 戻る </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import IconShowPassword from "@/components/icons/IconShowPassword.vue"

const emit = defineEmits(["closeUserModal", "stop", "delete"])
const props = defineProps<{
  dialogVisible: boolean
}>()

const visible = ref(false)
const formRef = ref<FormInstance>()
const typeInput = ref("password")

watch(
  () => props.dialogVisible,
  (newValue) => {
    visible.value = newValue
    typeInput.value = "password"
    document.getElementsByClassName("scroll-dialog")?.[0]?.scrollTo({ top: 0 })
  }
)

interface User {
  user_code: string
  name: string
  email: string
  company_name: string
  manager: string
  department: string
  postal_code: string
  prefecture: string
  address: string
  building_name: string
  phone_number: string
  password: string
  confirm_email?: string
}
const user = reactive<User>({
  user_code: "M000001",
  name: "アリソン・ウィルソン",
  email: "contact@gmail.com",
  company_name: "ドリームテック",
  manager: "ハリー",
  department: "クリエイティブ部門",
  postal_code: "よんさんごろく",
  prefecture: "トキョウ",
  address: "とうきょうと ちよだく ゆりおうじまち １－２－３",
  building_name: "サクラハイツ",
  phone_number: "982851486",
  password: "password@123"
})

const rules = reactive<FormRules<{ user_code: string; password: string }>>({
  user_code: [
    {
      required: true,
      message: "ユーザーIDを空白のままにすることはできません。",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "パスワードを空白のままにすることはできません。",
      trigger: "blur"
    }
  ]
})

const onChangeShowPassword = () => {
  if (typeInput.value === "password") {
    typeInput.value = "text"
  } else {
    typeInput.value = "password"
  }
}

const handleClose = () => {
  emit("closeUserModal")
}

const stop = () => {
  emit("stop")
}

const deleteUser = () => {
  emit("delete")
}
</script>

<style lang="scss">
@import "@/assets/scss/user-detail.scss";
</style>
