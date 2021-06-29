const baseUrl =
  "https://virtserver.swaggerhub.com/Uni-Restaurant-Clubs/uni-restaurant-clubs-api/1.0.0/";

export const userRegistrationUrl = baseUrl + "users";
export const userLoginUrl = baseUrl + "sessions";
export const forgotPasswordUrl = baseUrl + "users/send_password_reset_email";
export const updatePasswordUrl = baseUrl + "users/update_password";
export const emailConfirmationUrl = baseUrl + "users/resend_confirm_email";
