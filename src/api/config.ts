import { Configuration } from "@/generator"

export const config = new Configuration({
  basePath: import.meta.env.VITE_API_URL || "localhost"
})
