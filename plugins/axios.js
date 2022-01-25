export default ({ app: { $axios, $accessor } }) => {
  $axios.onError(error => {
    // Initially, get the status code.
    const statusCode = error.response.status;

    // when deleting the account, logout method occurs error. Below 'if ~' avoid its error infecting flash message.
    // Therefore in that case, logout methods work as only the method clearing local storage completely.
    // <Status Codes> 400: Bad Request, 409: Conflict(* used for optimistic lock), 401: Unauthorized
    if (error.response.config.url !== "/auth/logout" && (statusCode == 400 || statusCode == 409 || statusCode == 401)) {
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
      $nuxt.error({
        statusCode: statusCode,
        message: "Server errors occurred.",
      });
    } else if (statusCode == 503) {
      $nuxt.error({
        statusCode: statusCode,
        message: "You can't use the service because of the server maintenance.",
      });
    } else if (statusCode == 404) {
      $nuxt.error({
        statusCode: statusCode,
        message: "This page is no longer available",
      });
    } else if (statusCode == 403) {
      $nuxt.error({
        statusCode: statusCode,
        message: "You don`t have the authorization for access to this page.",
      });
    }
    return;
  });
};