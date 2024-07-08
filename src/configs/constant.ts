export default {
  file: {
    image: {
      extension: ["jpg", "png", "jpeg"]
    }
  },
  locales: ["vi", "en", "ja"],
  errors_code: {
    unauthorized: 401,
    validate: 422,
    not_found: 404,
    system: 500,
    permission: 403
  },

  ERROR_TOKEN: {
    NOT_LOGIN: "E0401",
    TOKEN_EXPIRE: "E1402",
    REFRESH_TOKEN_EXPIRE: "E1406"
  },

  API_END_POINT: {
    REFRESH_TOKEN: "/auth/refresh",
    LOGOUT: "/logout"
  },

  PAGE_SIZE: import.meta.env.VITE_PAGE_SIZE || 15
}
