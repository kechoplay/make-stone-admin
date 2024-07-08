const HeaderTitle = (path: string) => {
  switch (!!path) {
    case path === "/user-registration":
      return "ユーザー登録一覧"
    case path === "/user-remove-list":
      return "削除者リスト"
    case path === "/administrator-registration-list":
      return "管理者登録一覧"
    case path === "/change-administrator-registration":
      return "管理者登録内容変更"
    case path === "/employee-registration":
      return "社員登録"
    case path === "/admin-log":
      return "削除者リスト"
    case path === "/home":
      return "管理者メニュー"
    default:
      return "管理者用ログ"
  }
}

export default HeaderTitle
