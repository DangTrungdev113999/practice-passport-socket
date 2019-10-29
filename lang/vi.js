export const transValidate = {
  email_incorrect:  "The email must be of the form example@gmail.com",
  password_incorrect: "The Password must contain at least 8 characters, uppercase letters, lowercase letters, numbers and special characters!",
  password_confirmation_incorrect: "The Password confirm wrrong",
  username_incorrect: "Names are only limited to 3-17 characters, no special characters are allowed!",
}


export const transSuccess = {
  register_success : "sign up success, please login !",
  login_success: (username) => {
    return `welcame to ${username}, have a nice day !`
  },
  logout_success: "logout success, see you again !"
}

export const transErrors = {
  account_deleted: "The account has been deleted",
  account_not_active: "The account is not active",
  account_already_exist: "The account is already exsit",
  email_pass_wrrong: "The email or password wrrong",
  server_error: "server error"
}