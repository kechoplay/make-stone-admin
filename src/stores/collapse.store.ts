import { Stores } from "@/types"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useLayoutStore = defineStore(Stores.Collapse, () => {
  const collapse = ref(true)

  /**
   * Collapse sidebar
   */
  const collapseSidebar = () => {
    collapse.value = !collapse.value
  }

  return {
    collapse,
    collapseSidebar
  }
})
