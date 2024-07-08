declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $validationRules: {
      requiredRules: (value: string) => boolean | string
      emailRules: (value: string) => boolean | string
      zipcodeRules: (value: string) => boolean | string
      phoneRules: (value: string) => boolean | string
      passwordRules: (value: string) => boolean | string
      passwordConfirmationRules: (
        passwordValue: string,
        confirmationValue: string
      ) => boolean | string
      characterRules: (value: string) => boolean | string
      numberRules: (value: string) => boolean | string
      urlRules: (value: string) => boolean | string
    }
  }
}

export const requiredRules = (value: string) => !!value || "※必須項目です"

export const phoneRules = (value: string, isRequired = true) => {
  if (!value && isRequired) {
    return "電話番号を入力してください"
  }

  if (value) {
    if (/.*[a-zA-Z]|[`~,.<>;':"/[\]|{}()=_+].*/.test(value)) {
      return "数値以外の文字は入力できません"
    }
    if (value.length < 10 || value.length > 11) {
      return "10〜11文字で設定してください"
    }
  }

  return true
}

export const passwordRules = (value: string) => {
  if (!value) {
    return "パスワードを入力してください"
  }

  if (value.length < 8) {
    return "8文字以上で設定してください"
  }
  if (!/[a-z]/.test(value) || !/[A-Z]/.test(value)) {
    return "大文字と小文字を含める必要があります"
  }

  return true
}

export const passwordConfirmationRules = (passwordValue: string, confirmationValue: string) => {
  if (passwordValue !== confirmationValue) {
    return "パスワードが一致しません"
  }

  return true
}

export const zipcodeRules = (value: string) => {
  if (/.*[a-zA-Z]|[`~,.<>;':"/[\]|{}()=_+].*/.test(value)) {
    return "数値以外の文字は入力できません"
  }
  if (value.length !== 7) {
    return "7文字で設定してください"
  }
  return true
}

export const emailRules = (value: string) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  if (!value) {
    return "メールアドレスを入力してください"
  }
  if (!pattern.test(value)) {
    return "メールアドレスを正しい形式で入力してください"
  }

  return true
}

export const numberRules = (value: string) => {
  if (value && /.*[a-zA-Z]|[`~,.<>;':"/[\]|{}()=_+].*/.test(value)) {
    return "数値以外の文字は入力できません"
  }

  return true
}

export const characterRules = (value: string) => {
  const fourByte = /[\u{10000}-\u{10FFFF}]/gu
  const limit = 255

  if (value && value.length > limit) {
    return `入力は ${limit} 文字まで`
  }

  if (value?.match(fourByte)) {
    return "絵文字と外字は入力できません。"
  }

  return true
}

export const urlRules = (value: string) => {
  const pattern = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/gm

  if (value && !pattern.test(value)) {
    return "URLを正しい形式で入力してください"
  }

  return true
}
