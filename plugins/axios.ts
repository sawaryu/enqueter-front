import { Context } from "@nuxt/types";
import { AxiosError } from "axios";
export default (context: Context) => {
  const { $axios, $accessor } = context.app;
  const errorHandler = context.error;

  $axios.onError((error: AxiosError<any> | any) => {
    // Initially, get the status code.
    const statusCode = error.response.status;
    // when deleting the account, logout method occurs error. Below 'if ~' avoid its error infecting flash message.
    // Therefore in that case, logout methods work as only the method clearing local storage completely.
    // <Status Codes> 400: Bad Request, 409: Conflict(* used for optimistic lock), 401: Unauthorized
    if (!["/auth/logout", "/auth/protected"].includes(error.response.config.url) && (statusCode == 400 || statusCode == 409 || statusCode == 401)) {
      $accessor.flash.showMessage(
        {
          message: error.response.data.message,
          type: "warning",
          status: true,
        },
        { root: true }
      );
    }

    // When getting other status code from above,  move to the fixed error pages.
    else if (statusCode == 500) {
      errorHandler({
        statusCode: statusCode,
        message: "Server error occurred.",
      });
    } else if (statusCode == 404) {
      errorHandler({
        statusCode: statusCode,
        message: "This page doesn't exist.",
      });
    } else if (statusCode == 403) {
      errorHandler({
        statusCode: statusCode,
        message: "You don`t have the authorization.",
      });
    } else if (statusCode == 503) {
      errorHandler({
        statusCode: statusCode,
        message: "Sorry, Enqueter is under maintenance.",
      });
    }
    return;
  });
};