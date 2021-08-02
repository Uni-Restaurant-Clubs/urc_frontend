const baseUrl = process.env.REACT_APP_BASE_URL;
export const userRegistrationUrl = baseUrl + "users";
export const userLoginUrl = baseUrl + "sessions";
export const forgotPasswordUrl = baseUrl + "users/send_password_reset_email";
export const updatePasswordUrl = baseUrl + "users/update_password";
export const emailConfirmationUrl = baseUrl + "users/resend_confirm_email";
export const userLoginWithSocialUrl = baseUrl + "oauth/";