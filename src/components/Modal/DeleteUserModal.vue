<template>
  <el-dialog
    v-model="visible"
    width="calc(600/1440 * 100%)"
    center
    :show-close="false"
    @close="handleClose"
  >
    <div class="content">
      <icon-delete />
      <span class="message">本当に停止しますか？</span>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button class="button-stop">停止実行</el-button>
        <el-button class="button-cancel" @click="handleClose">戻る</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import IconDelete from "../icons/IconDelete.vue"
const emit = defineEmits(["closeDeleteModal"])
const props = defineProps<{
  dialogVisible: boolean
}>()

const visible = ref(false)
watch(
  () => props.dialogVisible,
  (newValue) => {
    visible.value = newValue
  }
)

watch(
  () => visible,
  (newValue) => {
    if (!newValue) {
      handleClose()
    }
  }
)

const handleClose = () => {
  emit("closeDeleteModal")
}
</script>

<style lang="scss">
@import "@/assets/scss/stop-modal.scss";
@import "@/assets/scss/common/button.scss";
</style>
