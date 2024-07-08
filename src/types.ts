import type { AxiosInstance } from "axios"

declare global {
  interface Window {
    axios: AxiosInstance
  }
}

export interface ErrorResponse {
  errors: {
    messages: {
      exception: string
    }
  }
}

export interface OptionItem {
  label: string
  value: number
}

export enum Stores {
  Main = "main",
  Auth = "auth",
  User = "user",
  Collapse = "collapse"
}

export interface UserApiData {
  email?: string
}

export interface ErrorResponseDataMessage {
  response: {
    data: {
      errors: {
        error_message: string
      }
    }
  }
}

export interface ErrorResponseMessage {
  message: string
}
