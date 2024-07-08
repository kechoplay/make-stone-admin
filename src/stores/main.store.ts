import { defineStore } from "pinia"
import { Stores } from "@/types"
import { ref } from "vue"

export const useMainStore = defineStore(Stores.Main, () => {
  const abortController = ref(null as AbortController | null)
  function establishSignal() {
    if (abortController.value) {
      abortController.value.abort()
      return
    }

    abortController.value = new AbortController()

    return abortController.value.signal
  }

  return {
    establishSignal,
    abortController
  }
})
