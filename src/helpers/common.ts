export interface CommonHelpers {
  removeEmptyValues: <T extends { [key: string]: any }>(obj: T) => T
  addYenDelimiter: (num: number | string) => string
  scrollFirstErrorIntoView: () => void
  convertParamsToFormData: (params: { [key: string]: any }) => FormData
  checkValidations: (form: any, notify: any) => Promise<boolean>
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $commonHelpers: CommonHelpers
  }
}

export default {
  removeEmptyValues<T extends { [key: string]: any }>(obj: T): T {
    return Object.entries(obj)
      .filter(([, value]) => value)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as T)
  },

  addYenDelimiter(value: number | string) {
    if (value == undefined || value == null) return ""

    return value?.toString()?.replace(/(\d)(?=(\d{3})+$)/g, "$1,")
  },

  scrollFirstErrorIntoView() {
    const el = document.querySelector('[role="alert"]')
    const y = (el?.getBoundingClientRect().top || 0) + window.pageYOffset + -220
    window.scrollTo({ top: y, behavior: "smooth" })
  },

  convertParamsToFormData(obj: any) {
    const formData = new FormData()

    Object.entries(obj).forEach(([key, value]) => {
      if (value != undefined && value != null) {
        if (Array.isArray(value)) {
          if (key === "supplementary_sections") {
            value.forEach((item, index) => {
              for (const subKey in item) {
                const subValue = item[subKey]
                formData.append(
                  `supplementary_sections[${index}][${subKey}]`,
                  subValue === null || subValue === undefined ? "" : subValue
                )
              }
            })
          } else {
            value = JSON.stringify(value)
            formData.append(key, value as string)
          }
        } else {
          formData.append(key, value as string)
        }
      }
    })

    return formData
  },
  async checkValidations(form: any, notify: any) {
    const valid = await form.validate(true)

    if (!valid) {
      const errorElement = document.querySelector('[role="alert"]')
      const yOffset = errorElement?.getBoundingClientRect().top || 0
      window.scrollTo({
        top: window.pageYOffset + yOffset - 250,
        behavior: "smooth"
      })
    } else {
      notify({
        message: "申請は可能です",
        color: "positive",
        position: "bottom",
        timeout: 2000
      })
    }

    return valid
  }
}

interface item {
  [key: string]: any
}

export const convertCamelCaseToSnakeCase = (data: any) => {
  const dataSnakeCase = {} as item
  for (const key in data) {
    const snakeCaseKey = key.replace(/([A-Z])/g, "_$1").toLowerCase() as string
    dataSnakeCase[snakeCaseKey] = data[key]
  }
  return dataSnakeCase
}
